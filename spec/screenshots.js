import Screenshot from '../includes/screenshot.mjs';

const BRANCH=location.search.replace(/^\?/, '');

const JASMINE_TIMEOUT = 60000;
const ICON_MODEL_URL = `./includes/classifier${BRANCH}/model.json`;
const ICON_CLASS_NAMES = await fetch(`./includes/classifier${BRANCH}/class_names.json`).then(r => r.json());
const QUANTITY_MODEL_URL = './includes/quantities/model.json';
const QUANTITY_CLASS_NAMES = await fetch('./includes/quantities/class_names.json').then(r => r.json());

const expectedStockpiles = await fetch('./spec/data/stockpiles.json').then(r => r.json());

const branchMapping = {
  '': {},
  '_devbranch': {
    SmallShippingContainer: null,
    MetalBeamPlatform: null,
    SandbagPlatform: null,
    BarbedWirePlatform: null,
    FieldATDamageC: 'FieldCannonDamageC',
    FieldCannonDamageW: 'FieldATDamageW',
    EmplacedMachineGun: 'EmplacedInfantryW',
    EmplacedAT: 'EmplacedATW',
  }
}

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

      this.actualStockpile = await Screenshot.process(canvas, ICON_MODEL_URL, ICON_CLASS_NAMES, QUANTITY_MODEL_URL, QUANTITY_CLASS_NAMES);
    }, JASMINE_TIMEOUT);

    const box = expectedStockpile.box;
    it(`has stockpile box x:${box.x}, y:${box.y}, width:${box.width}, height:${box.height}`, function() {
      expect(this.actualStockpile.box.x).toBe(expectedStockpile.box.x);
      expect(this.actualStockpile.box.y).toBe(expectedStockpile.box.y);
      expect(this.actualStockpile.box.width).toBe(expectedStockpile.box.width);
      expect(this.actualStockpile.box.height).toBe(expectedStockpile.box.height);
    });

    if (expectedStockpile.header.type) {
      it(`has structure type ${expectedStockpile.header.type}`, function() {
        expect(this.actualStockpile.header.type).toBe(expectedStockpile.header.type);
      });
    } else {
      it(`has no structure type`, function() {
        expect(this.actualStockpile.header.type).toBeUndefined();
      });
    }

    if (expectedStockpile.header.name) {
      it(`has stockpile name ${expectedStockpile.header.name}`, function() {
        expect(this.actualStockpile.header.name).toBe(expectedStockpile.header.name);
      });
    } else {
      it(`has no stockpile name`, function() {
        expect(this.actualStockpile.header.name).toBeUndefined();
      });
    }

    for (let index = 0; index < expectedStockpile.contents.length; ++index) {
      const expectedElement = expectedStockpile.contents[index];
      if (Object.hasOwn(branchMapping[BRANCH], expectedElement.CodeName)) {
        expectedElement.CodeName = branchMapping[BRANCH][expectedElement.CodeName];
        if (expectedElement.CodeName === null) {
          continue;
        }
      }

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
