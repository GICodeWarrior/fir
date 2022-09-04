
class OCR {
  static CPU_COUNT = navigator.hardwareConcurrency || 1;
  static DEFAULT_CONCURRENCY = Math.max(Math.round(OCR.CPU_COUNT / 2) - 1, 1);
  static DEFAULT_STOP_DELAY = 2500;

  static CHARSETS = {
    any: '',
    quantity: '0123456789k+',
  };
  static DEFAULT_CHARSET = OCR.CHARSETS['quantity'];

  #concurrency;
  #stop_delay;
  #charset;

  constructor(options) {
    options ||= {};
    this.#concurrency = options.concurrency || OCR.DEFAULT_CONCURRENCY;
    this.#stop_delay = options.stop_delay || OCR.DEFAULT_STOP_DELAY;
    this.#charset = options.charset !== undefined ? options.charset : OCR.DEFAULT_CHARSET;
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
    const workerCharset = this.#charset;
    for (let i = 0; i < this.#concurrency; ++i) {
      const worker = Tesseract.createWorker({
        //logger: m => console.log(m),
        langPath: 'https://tessdata.projectnaptha.com/4.0.0_best',
        //cacheMethod: 'none',
      });

      workers.push(initWorker(this.#scheduler, worker));
    }

    await (this.#starting = Promise.all(workers));
    this.#state = 'started';

    async function initWorker(scheduler, worker) {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      await worker.setParameters({
        //tessedit_ocr_engine_mode: Tesseract.OEM.LSTM_ONLY,
        tessedit_char_whitelist: workerCharset,
        tessedit_pageseg_mode: 7, // Tesseract.PSM.SINGLE_LINE
        //classify_enable_learning: 0,
        //classify_enable_adaptive_matcher: 0,
      });

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
