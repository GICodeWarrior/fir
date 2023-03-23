import Screenshot from './screenshot.mjs'

const VERSION = 'inferno-52';

const ICON_CLASS_NAMES = await fetch(`./foxhole/${VERSION}/classifier/class_names.json`).then(r => r.json());
const ICON_MODEL_URL = `./foxhole/${VERSION}/classifier/model.json`;
const QUANTITY_CLASS_NAMES = await fetch('./includes/quantities/class_names.json').then(r => r.json());
const QUANTITY_MODEL_URL = './includes/quantities/model.json';

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
    canvas.width = this.width;
    canvas.height = this.height;

    const context = canvas.getContext('2d', { alpha: false, willReadFrequently: true });
    context.drawImage(this, 0, 0);

    Screenshot.process(canvas, ICON_MODEL_URL, ICON_CLASS_NAMES, QUANTITY_MODEL_URL, QUANTITY_CLASS_NAMES).then(function(stockpile) {
      //console.log(stockpile);
      if (stockpile) {
        globalThis.stockpile = stockpile;
        const box = stockpile.box;
        drawOutline(context, box, '#FF00FFAA');

        const stockpileCanvas = document.createElement('canvas');
        stockpileCanvas.width = box.width;
        stockpileCanvas.height = box.height;

        const stockpileContext = stockpileCanvas.getContext('2d', { alpha: false, willReadFrequently: true });
        stockpileContext.drawImage(canvas,
          box.x, box.y, box.width, box.height,
          0, 0, box.width, box.height);

        for (const element of stockpile.contents) {
          drawOutline(stockpileContext, element.iconBox, '#00FFFFAA');
          drawOutline(stockpileContext, element.quantityBox, '#FF00FFAA');
        }

        if (stockpile.header.typeBox) {
          drawOutline(stockpileContext, stockpile.header.typeBox, '#FF0000AA');
        }
        if (stockpile.header.nameBox) {
          drawOutline(stockpileContext, stockpile.header.nameBox, '#00FF00AA');
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
  });
  image.src = URL.createObjectURL(file);
});

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
