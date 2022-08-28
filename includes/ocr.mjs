const Tesseract = (globalThis.window && window.Tesseract) || (await import('tesseract.js')).default;

let os = undefined;
if (!globalThis.navigator) {
  os = await import('node:os');
}

const cpuCount = (globalThis.navigator && navigator.hardwareConcurrency)
    || (os && os.cpus().length)
    || 1;
const DEFAULT_CONCURRENCY = Math.max(Math.round(cpuCount / 2) - 1, 1);
let concurrency = DEFAULT_CONCURRENCY;

async function recognize(canvas) {
  //console.log('recognize: adding');
  let image = canvas;
  if (!globalThis.window) {
    /*
    async function streamToBuffer(stream) {
      const buffers = [];
      return await new Promise(function (resolve) {
        stream.on('readable', function() {
          let buffer;
          while (buffer = stream.read()) {
            buffers.push(buffer);
          }
        });
        stream.on('end', function() {
          resolve(Buffer.concat(buffers));
        });
      });
    }

    image = await streamToBuffer(canvas.createPNGStream());
    */
    image = await canvas.toBuffer("png");
    //console.log(image);
  }
  const promise = (await getScheduler()).addJob('recognize', image);

  promise.then(function() {
    //console.log('recognize: complete');
    if (scheduler.getQueueLen() == 0) {
      scheduleStop();
    }
  });

  return await promise;
}

const OCR = {
  DEFAULT_CONCURRENCY,
  concurrency,
  recognize,
};
export default OCR;

let state = 'stopped'; // 'starting', 'started', 'stopping'
let scheduler = undefined;
let starting = undefined;
async function getScheduler() {
  if (state == 'stopping') {
    cancelStop();
  } else if (state == 'stopped') {
    await start();
  } else if (state == 'starting') {
    await starting;
  }

  return scheduler;
}

async function start() {
  state = 'starting';
  console.log("Launching " + concurrency + " Tesseract OCR workers.");

  scheduler = Tesseract.createScheduler();

  const workers = [];
  for (let i = 0; i < concurrency; ++i) {
    const worker = Tesseract.createWorker({
      //logger: m => console.log(m),
      langPath: 'https://tessdata.projectnaptha.com/4.0.0_best',
      //cacheMethod: 'none',
    });

    workers.push(initWorker(scheduler, worker));
  }

  await (starting = Promise.all(workers));
  state = 'started';

  async function initWorker(scheduler, worker) {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    await worker.setParameters({
      //tessedit_ocr_engine_mode: Tesseract.OEM.LSTM_ONLY,
      tessedit_char_whitelist: '0123456789k+',
      tessedit_pageseg_mode: 7, // Tesseract.PSM.SINGLE_LINE
      //classify_enable_learning: 0,
      //classify_enable_adaptive_matcher: 0,
    });

    scheduler.addWorker(worker);
  }
}

const STOP_DELAY = 1000;
let stopTimeout = undefined;
function scheduleStop() {
  if (!((state == 'started') || (state == 'stopping'))) {
    console.error(`scheduleStop(): invalid state=${state}`);
    return;
  }

  if (stopTimeout) {
    cancelStop();
  }
  state = 'stopping';
  stopTimeout = setTimeout(stop, STOP_DELAY);
}

function cancelStop() {
  if (state != 'stopping') {
    console.error(`cancelStop(): invalid state=${state}`);
    return;
  }

  clearTimeout(stopTimeout);
  stopTimeout = undefined;
  state = 'started';
}

async function stop() {
  stopTimeout = undefined;
  state = 'stopped';
  console.log("Terminating Tesseract OCR workers.");
  await scheduler.terminate();
}
