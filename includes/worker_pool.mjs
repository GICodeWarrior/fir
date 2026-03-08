class WorkerPool {
  #idle = [];
  #queue = [];

  #active = 0;
  #running = false;

  #idleTimeout;
  #idleDelay;

  #url;
  #size;
  #version;

  constructor(url, { size = Math.ceil(navigator.hardwareConcurrency / 2), version, idleTimeout = 15_000 } = {}) {
    this.#url = url;
    this.#size = size;
    this.#version = version;
    this.#idleDelay = idleTimeout;
  }

  #start() {
    const workers = Array.from({ length: this.#size }, () => new Worker(this.#url, { type: 'module' }));
    workers.forEach(w => w.postMessage({ type: 'init', version: this.#version }));

    this.#running = true;
    this.#idle = workers;
  }

  async extract_stockpile(rgba, width) {
    if (!this.#running) this.#start();
    clearTimeout(this.#idleTimeout);
    this.#active++;

    const buffer = rgba.buffer;
    const message = {
      rgba_buffer: buffer,
      width
    };
    const transfer = [ buffer ];

    const result = await new Promise((resolve, reject) => {
      const task = { message: message, transfer, resolve, reject };
      const worker = this.#idle.pop();
      if (worker) {
        this.#dispatch(worker, task);
      } else {
        this.#queue.push(task);
      }
    });

    return result;
  }

  #dispatch(worker, task) {
    worker.onmessage = (e) => {
      const next = this.#queue.shift();
      if (next) {
        this.#dispatch(worker, next);
      } else {
        this.#idle.push(worker);
      }
      this.#active--;
      if (this.#active === 0) {
        this.#idleTimeout = setTimeout(() => this.#terminate(), this.#idleDelay);
      }
      task.resolve(e.data);
    };
    worker.onerror = (e) => {
      this.#active--;
      if (this.#active === 0) {
        this.#idleTimeout = setTimeout(() => this.#terminate(), this.#idleDelay);
      }
      task.reject(e);
    };
    worker.postMessage(task.message, task.transfer);
  }

  #terminate() {
    this.#idle.forEach(w => w.terminate());
    this.#idle = [];
    this.#running = false;
  }
}

export default WorkerPool;
