const Tesseract = (window && window.Tesseract) || (await import('tesseract'));

async function recognize(canvas) {
  //console.log('recognize: adding');
  const promise = (await getScheduler()).addJob('recognize', canvas);

  promise.then(function() {
    //console.log('recognize: complete');
    if (scheduler.getQueueLen() == 0) {
      scheduleStop();
    }
  });

  return await promise;
}

const OCR = {
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
  const cpuCount = (navigator && navigator.hardwareConcurrency)
      || (res.OS && res.OS.cpus().length)
      || 1;
  const workerCount = Math.max(Math.round(cpuCount / 2) - 1, 1);
  console.log("Launching " + workerCount + " Tesseract OCR workers.");

  scheduler = Tesseract.createScheduler();

  const workers = [];
  for (let i = 0; i < workerCount; ++i) {
    const worker = Tesseract.createWorker({
      //logger: m => console.log(m),
      langPath: 'https://tessdata.projectnaptha.com/4.0.0_best',
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
      tessedit_char_whitelist: '0123456789k+',
      tessedit_pageseg_mode: 7,  // Single line
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
