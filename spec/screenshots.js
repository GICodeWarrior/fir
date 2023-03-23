import Screenshot from '../includes/screenshot.mjs';

const CURRENT_VERSION = 'inferno-52';

const JASMINE_TIMEOUT = 60000;
const ICON_MODEL_URL = `./includes/foxhole/${CURRENT_VERSION}/classifier/model.json`;
const ICON_CLASS_NAMES = await fetch(`./includes/foxhole/${CURRENT_VERSION}/classifier/class_names.json`).then(r => r.json());
const QUANTITY_MODEL_URL = './includes/quantities/model.json';
const QUANTITY_CLASS_NAMES = await fetch('./includes/quantities/class_names.json').then(r => r.json());

const EXPECTED_STOCKPILES = await fetch('./spec/data/stockpiles.json').then(r => r.json());

const CRATED_LABEL = {
  true: 'crated',
  false: 'individual',
};

const VERSION_HISTORY = [
  'entrenched',
  'inferno',
  'inferno-52',
];
const VERSION_CHANGES = {
  'inferno': {
    SmallShippingContainer: null,
    MetalBeamPlatform: null,
    SandbagPlatform: null,
    BarbedWirePlatform: null,
    FieldATDamageC: 'FieldCannonDamageC',
    FieldCannonDamageW: 'FieldATDamageW',
    EmplacedMachineGun: 'EmplacedInfantryW',
    EmplacedAT: 'EmplacedATW',
  },
  'inferno-52': {
    ArmoredCarMobilityC: 'TanketteC',
    Concrete: null, // Icon changed
    CrudeOil: null,
    GarrisonSupplies: 'MaintenanceSupplies',
    SatchelCharge: 'SatchelChargeW',
    Water: null, // SubTypeIcon added at some point
  },
};

function mapCodeNameIfChanged(stockpileVersion, codeName) {
  let nextVersionIndex = VERSION_HISTORY.indexOf(stockpileVersion) + 1;
  while (nextVersionIndex < VERSION_HISTORY.length) {
    let change = VERSION_CHANGES[VERSION_HISTORY[nextVersionIndex]][codeName];
    if (change === null) {
      return null;
    } else if (change !== undefined) {
      codeName = change;
    }
    ++nextVersionIndex;
  }

  return codeName;
}

for (const expectedStockpile of EXPECTED_STOCKPILES) {
  describe(`Screenshot ${expectedStockpile.file}`, function() {
    beforeAll(async function() {
      const image = new Image();
      image.src = `spec/data/${expectedStockpile.file}`;

      const canvas = await new Promise(function(resolve) {
        image.addEventListener('load', function() {
          const canvas = document.createElement('canvas');
          canvas.width = this.width;
          canvas.height = this.height;

          const context = canvas.getContext('2d', { alpha: false, willReadFrequently: true });
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
      expectedElement.CodeName = mapCodeNameIfChanged(expectedStockpile.version, expectedElement.CodeName);
      if (expectedElement.CodeName === null) {
        continue;
      }

      const expectedCratedStatus = CRATED_LABEL[expectedElement.isCrated];
      it(`contains ${expectedElement.quantity} ${expectedElement.CodeName} (${expectedCratedStatus})`, function() {
        const actualElement = this.actualStockpile.contents[index] || {};
        const actualCratedStatus = CRATED_LABEL[actualElement.isCrated];

        expect(actualElement.CodeName).toBe(expectedElement.CodeName);
        expect(actualElement.quantity).toBe(expectedElement.quantity);
        expect(actualCratedStatus).toBe(expectedCratedStatus);
      });
    }

    it(`contains no more than ${expectedStockpile.contents.length} items`, function() {
      expect(this.actualStockpile.contents.length).toBeLessThanOrEqual(expectedStockpile.contents.length);
    });
  });
}

// Default is window.onload, but our specs are added later.
jasmine.getEnv().execute();
