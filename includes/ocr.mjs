class OCR {
  static CPU_COUNT = navigator.hardwareConcurrency || 1;
  static DEFAULT_CONCURRENCY = Math.max(Math.round(OCR.CPU_COUNT / 2) - 1, 1);
  static DEFAULT_STOP_DELAY = 2500;

  #concurrency;
  #stop_delay;
  #charset;

  constructor(options) {
    options ||= {};
    this.#concurrency = options.concurrency || OCR.DEFAULT_CONCURRENCY;
    this.#stop_delay = options.stop_delay || OCR.DEFAULT_STOP_DELAY;
  }

  async recognize(canvas) {
    const result = await (await this.#getScheduler()).addJob('recognize', canvas);

    if (this.#scheduler.getQueueLen() == 0) {
      this.#scheduleStop();
    }

    return result;
  }

  #state = 'stopped'; // 'starting', 'started', 'stopping'
  #scheduler = undefined;
  #starting = undefined;
  async #getScheduler() {
    if (this.#state == 'stopping') {
      this.#cancelStop();
    } else if (this.#state == 'stopped') {
      await this.#start();
    } else if (this.#state == 'starting') {
      await this.#starting;
    }

    return this.#scheduler;
  }

  async #start() {
    this.#state = 'starting';
    console.log("Launching " + this.#concurrency + " Tesseract OCR workers.");

    this.#scheduler = Tesseract.createScheduler();

    const workers = [];
    for (let i = 0; i < this.#concurrency; ++i) {
      workers.push(initWorker(this.#scheduler));
    }

    await (this.#starting = Promise.all(workers));
    this.#state = 'started';

    async function initWorker(scheduler) {
      const worker = await Tesseract.createWorker("engJost-final3", undefined, {
        //logger: m => console.log(m),
        langPath: 'https://files.kubuxu.com/foxhole/tesseract',
        workerPath: "https://cdn.jsdelivr.net/npm/tesseract.js@7.0.0/dist/worker.min.js",
        corePath:   "https://cdn.jsdelivr.net/npm/tesseract.js-core@7.0.0/tesseract-core.wasm.js",
      }, {
        //load_system_dawg: "0",
        //load_freq_dawg: "0",
      });

      //await worker.setParameters({
      //  tessedit_pageseg_mode: 13,
      //});

      scheduler.addWorker(worker);
    }
  }

  #stopTimeout = undefined;
  #scheduleStop() {
    if (!((this.#state == 'started') || (this.#state == 'stopping'))) {
      console.error(`scheduleStop(): invalid state=${this.#state}`);
      return;
    }

    if (this.#stopTimeout) {
      this.#cancelStop();
    }
    this.#state = 'stopping';
    this.#stopTimeout = setTimeout(this.#stop.bind(this), this.#stop_delay);
  }

  #cancelStop() {
    if (this.#state != 'stopping') {
      console.error(`cancelStop(): invalid state=${this.#state}`);
      return;
    }

    clearTimeout(this.#stopTimeout);
    this.#stopTimeout = undefined;
    this.#state = 'started';
  }

  async #stop() {
    this.#stopTimeout = undefined;
    this.#state = 'stopped';
    console.log('Terminating Tesseract OCR workers.');
    await this.#scheduler.terminate();
  }
}

export default OCR;
