import Screenshot from '../includes/screenshot.mjs';

const JASMINE_TIMEOUT = 60000;
const CLASS_NAMES = await fetch('./includes/class_names.json').then(r => r.json());
const MODEL_URL = './includes/classifier/model.json';

const expectedStockpiles = await fetch('./spec/data/stockpiles.json').then(r => r.json());

for (const expectedStockpile of expectedStockpiles) {
  describe(`Screenshot ${expectedStockpile.file}`, function() {
    beforeAll(async function() {
      const image = new Image();
      image.src = `spec/data/${expectedStockpile.file}`;

      const canvas = await new Promise(function(resolve) {
        image.addEventListener('load', function() {
          const canvas = document.createElement('canvas');
          canvas.width = this.width;
          canvas.height = this.height;

          const context = canvas.getContext('2d');
          context.drawImage(this, 0, 0);

          resolve(canvas);
        });
      });

      this.actualStockpile = await Screenshot.process(canvas, MODEL_URL, CLASS_NAMES);
    }, JASMINE_TIMEOUT);

    for (let index = 0; index < expectedStockpile.contents.length; ++index) {
      const expectedElement = expectedStockpile.contents[index];
      const suffix = expectedElement.isCrated ? ' (crated)' : '';
      it(`contains ${expectedElement.quantity} ${expectedElement.CodeName}${suffix}`, function() {
        const actualElement = this.actualStockpile.contents[index] || {};
        expect(actualElement.CodeName).toBe(expectedElement.CodeName);
        expect(actualElement.quantity).toBe(expectedElement.quantity);
        expect(actualElement.isCrated).toBe(expectedElement.isCrated);
      });
    }

    it(`contains no more than ${expectedStockpile.contents.length} items`, function() {
      expect(this.actualStockpile.contents.length).toBeLessThanOrEqual(expectedStockpile.contents.length);
    });
  });
}

// Default is window.onload, but our specs are added later.
jasmine.getEnv().execute();
