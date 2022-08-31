import Screenshot from './screenshot.mjs'

const CLASS_NAMES = await fetch('./includes/class_names.json').then(r => r.json());
const MODEL_URL = './includes/classifier/model.json';

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

    const context = canvas.getContext('2d');
    context.drawImage(this, 0, 0);

    Screenshot.process(canvas, MODEL_URL, CLASS_NAMES).then(function(stockpile) {
      //console.log(stockpile);
      if (stockpile) {
        globalThis.stockpile = stockpile;
        const box = stockpile.box;
        drawOutline(context, box, '#FF00FFAA');

        const stockpileCanvas = document.createElement('canvas');
        stockpileCanvas.width = box.width;
        stockpileCanvas.height = box.height;

        const stockpileContext = stockpileCanvas.getContext('2d');
        stockpileContext.drawImage(canvas,
          box.x, box.y, box.width, box.height,
          0, 0, box.width, box.height);

        for (const element of stockpile.contents) {
          drawOutline(stockpileContext, element.iconBox, '#00FFFFAA');
          drawOutline(stockpileContext, element.quantityBox, '#FF00FFAA');
          //break;
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
