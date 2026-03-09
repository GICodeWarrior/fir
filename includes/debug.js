import fiw_init, { ScreenshotProcessor } from './wasm/fiw.js'

const VERSION = 'airborne-63';

const [
  OCR_RECOGNITION_ONNX,
  ICON_ONNX,
  ICON_CLASS_NAMES,
  QUANTITY_ONNX,
  QUANTITY_CLASS_NAMES,
] = await Promise.all([
  fetch(`./includes/text-recognition-model.onnx`).then(r => r.bytes()),
  fetch(`./foxhole/${VERSION}/classifier/model.onnx`).then(r => r.bytes()),
  fetch(`./foxhole/${VERSION}/classifier/class_names.json`).then(r => r.json()),
  fetch('./includes/quantities/model.onnx').then(r => r.bytes()),
  fetch('./includes/quantities/class_names.json').then(r => r.json()),
  fiw_init(),
]);

const SCREENSHOT_PROCESSOR = new ScreenshotProcessor(
  OCR_RECOGNITION_ONNX,
  ICON_ONNX,
  ICON_CLASS_NAMES,
  QUANTITY_ONNX,
  QUANTITY_CLASS_NAMES,
);

document.querySelector('form').addEventListener('submit', function(e) {
  // Prevent a submit that would cause a page refresh
  e.preventDefault();
});

document.querySelector('form input').addEventListener('change', function() {
  if (!this.files.length) {
    return;
  }

  const file = this.files[0];
  const image = document.createElement('img');
  image.addEventListener('load', function() {
    URL.revokeObjectURL(this.src);

    const canvas = document.createElement('canvas');
    const width = this.width;
    const height = this.height;
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d', { alpha: false, willReadFrequently: true });
    context.drawImage(this, 0, 0);
    const rgba = context.getImageData(0, 0, width, height).data;

    const stockpile = SCREENSHOT_PROCESSOR.extract_stockpile(rgba, width);
    //console.log(stockpile);
    if (stockpile) {
      globalThis.stockpile = stockpile;
      const box = stockpile.bounds;
      drawOutline(context, box, '#FF00FFAA');

      const stockpileCanvas = crop(canvas, box);
      const stockpileContext = stockpileCanvas.getContext('2d', { alpha: false, willReadFrequently: true });

      function offset(b) {
        return { x: b.x - box.x, y: b.y - box.y, width: b.width, height: b.height };
      }

      for (const element of stockpile.contents) {
        drawOutline(stockpileContext, offset(element.icon.bounds), '#00FFFFAA');
        drawOutline(stockpileContext, offset(element.quantity.bounds), '#FF00FFAA');
      }

      if (stockpile.header) {
        drawOutline(stockpileContext, offset(stockpile.header.structure_type.bounds), '#FF0000AA');
        //document.body.appendChild(crop(canvas, stockpile.header.structure_type.bounds));
        if (stockpile.header.stockpile_name) {
          drawOutline(stockpileContext, offset(stockpile.header.stockpile_name.bounds), '#00FF00AA');
          //document.body.appendChild(crop(canvas, stockpile.header.stockpile_name.bounds));
        }
      }

      for (const technology of stockpile.structure_technologies || []) {
        drawOutline(stockpileContext, offset(technology.bounds), '#FFFFFFAA');
      }

      document.body.appendChild(stockpileCanvas);
    }

    const canvasWidth = '500px';
    canvas.style.width = canvasWidth;
    canvas.addEventListener('click', function() {
      if (canvas.style.width == canvasWidth) {
        canvas.style.width = '';
      } else {
        canvas.style.width = canvasWidth;
      }
    });
    //document.body.appendChild(canvas);
  });
  image.src = URL.createObjectURL(file);
});

function crop(canvas, box) {
  const croppedCanvas = document.createElement('canvas');
  croppedCanvas.width = box.width;
  croppedCanvas.height = box.height;

  const context = croppedCanvas.getContext('2d', { alpha: false, willReadFrequently: true });
  context.drawImage(canvas,
    box.x, box.y, box.width, box.height,
    0, 0, box.width, box.height);

  return croppedCanvas;
}

function drawOutline(context, box, color) {
  context.strokeStyle = color;
  context.lineCap = 'square';

  const length = Math.round(box.height / 16);

  // Top
  strokeLine(context, box.x + 0.5, box.y - 0.5, 0, -length);
  strokeLine(context, box.x + box.width - 0.5, box.y - 0.5, 0, -length);

  // Bottom
  strokeLine(context, box.x + 0.5, box.y + box.height + 0.5, 0, length);
  strokeLine(context, box.x + box.width - 0.5, box.y + box.height + 0.5, 0, length);

  // Left
  strokeLine(context, box.x - 0.5, box.y + 0.5, -length, 0);
  strokeLine(context, box.x - 0.5, box.y + box.height - 0.5, -length, 0);

  // Right
  strokeLine(context, box.x + box.width + 0.5, box.y + 0.5, length, 0);
  strokeLine(context, box.x + box.width + 0.5, box.y + box.height - 0.5, length, 0);
}

function strokeLine(context, startX, startY, offsetX, offsetY) {
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(startX + offsetX, startY + offsetY);
  context.stroke();
}
