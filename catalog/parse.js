'use strict';

//import fs from 'node:fs';
//import process from 'node:process';
const fs = require('fs');
//const path = require('path');
const process = require('process');
const { createCanvas, loadImage } = require('canvas');
const events = require('events');

const warLocation = process.argv[2];
process.chdir(warLocation);

class NonBPError extends Error {}
class BPTypeMismatchError extends Error {}

class FHStruct {
  static #BPCLASS = 'BlueprintGeneratedClass';

  #structPath;
  #superStruct;
  #type;
  #data;
  #selected;

  constructor(structPath, type, isBlueprint) {
    this.#structPath = structPath.replace(/\.json$/, '');

    const file = this.#structPath.replace(/(\.[0-9]+)?$/, '.json');
    this.#data = JSON.parse(fs.readFileSync(file));

    if (isBlueprint === undefined) {
      isBlueprint = true;
    }

    if (isBlueprint) {
      const blueprint = this.#data.find(function(element) {
        return element.Type == FHStruct.#BPCLASS;
      });

      if (blueprint === undefined) {
        throw new NonBPError(`Unable to find blueprint in file: ${file}`);
      }

      if (type === undefined) {
        type = blueprint.Name;
      } else if (type != blueprint.Name) {
        throw new BPTypeMismatchError(`Blueprint (${blueprint.Name}) doesn't match specified type (${type}) in file: ${file}`);
      }

      this.#superStruct = FHStruct.constructBPFromReference(blueprint.SuperStruct);
    }

    this.#type = type;
    this.#selected = this.#data.find(function(element) {
      return element.Type == type;
    });
  }

  static constructBPFromReference(node) {
    if (node && node.ObjectName.startsWith(FHStruct.#BPCLASS + ' ')) {
      const type = node.ObjectName.slice(FHStruct.#BPCLASS.length + 1);
      return new FHStruct(node.ObjectPath, type);
    }
  }

  getPath() {
    return this.#structPath;
  }

  extractValues(selector, path, properties, result) {
    if (result === undefined) {
      result = {};
    }

/*
    const selected = this.#data.find(function(element) {
      for (const pathElement of selector) {
        if (!element.hasOwnProperty(pathElement)) {
          return false;
        }
        element = element[pathElement]
      }
      return !!element;
    });

    if (selected === undefined) {
      if (this.#superStruct) {
        this.#superStruct.extractValues(selector, path, properties, result);
      }
      return result;
    }
*/

    //let base = selected;
    let base = this.#selected;
    for (const element of path) {
      //debugger;
      base = (base || {})[element];
    }

    //if (this.#structPath.match(/BPATRPGHeavyCProjectile/)) {
    //  debugger;
    //}

    const superProperties = [];
    for (const propertyPath of properties) {
      let value = base;
      for (const element of propertyPath) {
        //debugger;
        value = (value || {})[element];
      }

      if (value !== undefined) {
        result[propertyPath[0]] = value;
      } else {
        superProperties.push(propertyPath);
      }
    }

    if (superProperties.length && this.#superStruct) {
      this.#superStruct.extractValues(selector, path, superProperties, result);
    }

    return result;
  }

  static combineDetails(list, path, separator) {
    if (path === undefined) {
      path = ['Text', 'SourceString'];
    }

    if (separator === undefined) {
      separator = '\n';
    }

    return list.map(function(value) {
      for (const element of path) {
        value = (value || {})[element];
      }
      return value;
    }).join(separator);
  }
}

class FHDataTable extends FHStruct {
  constructor(name) {
    super('War/Content/Blueprints/Data/' + name, 'DataTable', false);
  }
}

function coalesceObject(coreObject) {

  const combinedObject = {
    ObjectPath: coreObject.getPath(),
  };

  const coreProperties = [
    ['CodeName'],
    ['ChassisName', 'SourceString'],
    ['DisplayName', 'SourceString'],
    ['Description', 'SourceString'],
    ['Encumbrance'],
    ['EquipmentSlot'],
    ['ItemCategory'],
    ['ItemProfileType'],
    ['FactionVariant'],
    ['TechID'],
    ['ItemFlagsMask'],
    ['Icon', 'ObjectPath'],
    ['SubTypeIcon', 'ResourceObject', 'ObjectPath'],
    ['ItemComponentClass'],
    ['VehicleProfileType'],
    ['VehicleMovementProfileType'],
    ['ArmourType'],
    ['ShippableInfo', 'Type'],
    ['FuelTank', 'FuelCapacity'],
    ['DepthCuttoffForSwimDamage'],
    ['BuildLocationType'],
    ['MaxHealth'],
    ['bIsLarge'],
    ['bSupportsVehicleMounts'],
  ];

  coreObject.extractValues(
    ['Properties', 'CodeName'],
    ['Properties'],
    coreProperties,
    combinedObject
  );

  const ammoTypes = new Set();
  const itemComponent = FHStruct.constructBPFromReference(combinedObject.ItemComponentClass);
  if (itemComponent) {
    const componentProperties = [
      ['ProjectileClasses'],
      ['EquippedGripType'],
      ['FiringMode'],
      ['FiringRate'],
      ['MultiAmmo', 'CompatibleAmmoNames'],
      ['CompatibleAmmoCodeName'],
      ['DeployCodeName'],
      ['bCanFireFromVehicle'],
      ['bIsSingleUse'],
    ];

    combinedObject.ItemComponentClass = {
      ObjectPath: itemComponent.getPath(),
    };
    itemComponent.extractValues(
      ['Properties'],
      ['Properties'],
      componentProperties,
      combinedObject.ItemComponentClass
    );

    //if (combinedObject.ItemComponentClass.ProjectileClasses && combinedObject.ItemComponentClass.ProjectileClasses.length > 1) {
    //  console.log(combinedObject.CodeName);
    //}

    const componentData = combinedObject.ItemComponentClass;
    ammoTypes.add(componentData.CompatibleAmmoCodeName);
    (componentData.MultiAmmo || []).forEach(e => ammoTypes.add(e));

    if (componentData.ProjectileClasses) {
      if (componentData.ProjectileClasses.length == 1) {
        const projectileData = new FHStruct(componentData.ProjectileClasses[0].ObjectPath);
        const projectileProperties = [
          ['ExplosiveCodeName'],
          ['AutoDetonateTime'],
          ['PenetrationBonusMaxRange'],
          ['ProjectileDeathDelay'],
        ];

        //if (combinedObject.CodeName == 'ATRPGHeavyC') {
        //  debugger;
        //}
        componentData.ProjectileClass = projectileData.extractValues(
          ['Properties', 'ExplosiveCodeName'],
          ['Properties'],
          projectileProperties
        );

        ammoTypes.add(componentData.ProjectileClass.ExplosiveCodeName);
      }
      delete componentData.ProjectileClasses;
    }

    ammoTypes.delete(undefined);

    if (ammoTypes.has('RPGAmmo')) {
      ammoTypes.add('RpgAmmo');
      ammoTypes.delete('RPGAmmo');
    }
  }

  const ammoProperties = [
    ['Damage'],
    ['Suppression'],
    ['ExplosionRadius'],
    ['DamageType', 'ObjectPath'],
    ['DamageInnerRadius'],
    ['DamageFalloff'],
    ['AccuracyRadius'],
    ['EnvironmentImpactAmount'],
  ];

  //if (combinedObject.CodeName == 'RPGTW') {
  //  //process.stderr.write(componentData.CompatibleAmmoCodeName + "\n");
  //  process.stderr.write(JSON.stringify(Array.from(ammoTypes), null, 2) + "\n");
  //}

  let ammoName = combinedObject.CodeName;
  if (ammoTypes.size == 1) {
    ammoName = ammoTypes.values().next().value;
  }

  const ammoValues = common.ammoDynamicData.extractValues(
    ['Rows', ammoName],
    ['Rows', ammoName],
    ammoProperties
  );
  if (Object.keys(ammoValues).length) {
    ammoValues.ObjectPath = common.ammoDynamicData.getPath();
    combinedObject.AmmoDynamicData = ammoValues;

    if (ammoValues.DamageType && ammoValues.DamageType.startsWith('War/')) {
      const damageType = new FHStruct(ammoValues.DamageType);

      const damageTypeProperties = [
        ['DisplayName', 'SourceString'],
        ['Type'],
        ['DescriptionDetails'],
        ['Icon', 'ResourceObject', 'ObjectPath'],
        ['TankArmourEffectType'],
        ['TankArmourPenetrationFactor'],
        ['VehicleSubSystemOverride'],
        ['VehicleSubSystemOverride'],
        ['VehicleSubsystemDisableMultipliers'],
        ['bApplyTankArmourMechanics'],
        ['bApplyTankArmourAngleRangeBonuses'],
        ['bCanRuinStructures'],
        ['bApplyDamageFalloff'],
        ['bCanWoundCharacter'],
        ['bAlwaysAppliesBleeding'],
        ['bExposeInUI'],
      ];

      ammoValues.DamageType = {
        ObjectPath: damageType.getPath(),
      };
      damageType.extractValues(
        ['Properties', 'DisplayName'],
        ['Properties'],
        damageTypeProperties,
        ammoValues.DamageType
      );

      if (ammoValues.DamageType.DescriptionDetails) {
        ammoValues.DamageType.DescriptionDetails = FHStruct.combineDetails(
          ammoValues.DamageType.DescriptionDetails
        );
      }

      if (!Object.hasOwn(combinedObject, 'SubTypeIcon')
            && !(combinedObject.ItemFlagsMask & 128)) {
        //  && (combinedObject.ItemProfileType != 'EItemProfileType::HandheldWeapon')
        //  || (combinedObject.ItemCategory != 'EItemCategory::SmallArms')) {
        combinedObject.SubTypeIcon = ammoValues.DamageType.Icon;
      }
    }
  }

  // TODO: Replace with data lookups instead of hard-coding.
  const materialNames = {
    Cloth: 'Basic Materials',  // BPBasicMaterials.uasset
    Wood: 'Refined Materials',  // BPRefinedMaterials.uasset
    Explosive: 'Explosive Materials',  // BPExplosiveMaterial.uasset
    HeavyExplosive: 'Heavy Explosive Materials',  // BPHeavyExplosiveMaterial.uasset
  };

  const productionProperties = [
    ['CostPerCrate'],
    ['QuantityPerCrate'],
    ['CrateProductionTime'],
    ['SingleRetrieveTime'],
    ['CrateRetrieveTime'],
  ];

  const itemDynamicValues = common.itemDynamicData.extractValues(
    ['Rows', combinedObject.CodeName],
    ['Rows', combinedObject.CodeName],
    productionProperties
  );
  if (Object.keys(itemDynamicValues).length) {
    itemDynamicValues.ObjectPath = common.itemDynamicData.getPath();
    combinedObject.ItemDynamicData = itemDynamicValues;

    for (const item of (itemDynamicValues.CostPerCrate || [])) {
      item.DisplayName = materialNames[item.ItemCodeName];
    }
  }

  const profileProperties = [
    ['bIsStockpilable'],
    ['bIsStackable'],
    ['bIsConvertableToCrate'],
    ['bIsCratable'],
    ['bIsStockpiledWithAmmo'],
    ['bUsableInVehicle'],
    ['StackTransferLimit'],
    ['RetrieveQuantity'],
    ['ReserveStockpileMaxQuantity'],
  ];

  const itemProfileValues = common.itemProfiles.extractValues(
    ['Properties', 'ItemProfileTable', combinedObject.ItemProfileType],
    ['Properties', 'ItemProfileTable', combinedObject.ItemProfileType],
    profileProperties
  );

  if (Object.keys(itemProfileValues).length) {
    itemProfileValues.ObjectPath = common.itemProfiles.getPath();
    combinedObject.ItemProfileData = itemProfileValues;
  }

  const vehicleDynamicProperties = [
    ['ResourceRequirements'],
    ['ResourceRequirements'],
    ['MaxHealth'],
    ['MinorDamagePercent'],
    ['MajorDamagePercent'],
    ['RepairCost'],
    ['ResourcesPerBuildCycle'],
    ['ItemHolderCapacity'],
    ['FuelCapacity'],
    ['FuelConsumptionPerSecond'],
    ['SwimmingFuelConsumptionModifier'],
    ['DefaultSurfaceMovementRate'],
    ['OffroadSnowPenalty'],
    ['ReverseSpeedModifier'],
    ['RotationRate'],
    ['RotationSpeedCuttoff'],
    ['SpeedSqrThreshold'],
    ['EngineForce'],
    ['MassOverride'],
    ['TankArmour'],
    ['MinTankArmourPercent'],
    ['TankArmourMinPenetrationChance'],
    ['VehicleSubsystemDisableChances'],
  ];

  const vehicleDynamicValues = common.vehicleDynamicData.extractValues(
    ['Rows', combinedObject.CodeName],
    ['Rows', combinedObject.CodeName],
    vehicleDynamicProperties
  );
  if (Object.keys(vehicleDynamicValues).length) {
    vehicleDynamicValues.ObjectPath = common.vehicleDynamicData.getPath();
    combinedObject.VehicleDynamicData = vehicleDynamicValues;

    const resources = [];
    for (const entry of Object.entries(vehicleDynamicValues.ResourceRequirements)) {
      if (entry[1] == 0) {
        continue;
      }

      resources.push({
        ItemCodeName: entry[0],
        DisplayName: materialNames[entry[0]],
        Quantity: entry[1],
      });
    }
    vehicleDynamicValues.ResourceRequirements = resources;
  }

  //console.log(combinedObject);
  return combinedObject;
}

const PHASH_CANVAS = createCanvas();
// Perceptual Hash implementation per:
// https://content-blockchain.org/research/testing-different-image-hash-functions/
function pHashImage(image) {
  const HASH_SIZE = 8;
  const HASH_FACTOR = 4;

  const width = image.width;
  const height = image.height;

  const workSize = HASH_SIZE * HASH_FACTOR;

  PHASH_CANVAS.width = HASH_SIZE * HASH_FACTOR;
  PHASH_CANVAS.height = HASH_SIZE * HASH_FACTOR;

  const context = PHASH_CANVAS.getContext('2d');

  context.filter = 'grayscale(100%)';
  context.drawImage(image, 0, 0, workSize, workSize);

  const greyPixels = context.getImageData(0, 0, workSize, workSize).data;
  const rows = [];
  for (let row = 0; row < workSize; ++row) {
    const rowPixels = greyPixels.subarray(row * workSize * 4, (row + 1) * workSize * 4);
    rows.push(discreteCosineTransform(rowPixels, 4));
  }

  const cols = [];
  for (let col = 0; col < workSize; ++col) {
    const colPixels = rows.map(r => r[col]);
    cols.push(discreteCosineTransform(colPixels));
  }

  cols.length = HASH_SIZE;
  const hashPixels = [];
  let totalValue = 0;
  for (let row = 0; row < HASH_SIZE; ++row) {
    for (const col of cols) {
      totalValue += col[row];
      hashPixels.push(col[row]);
    }
  }
  const averageValue = totalValue / hashPixels.length;
  //const medianValue = hashPixels.slice().sort()[Math.floor(hashPixels.length / 2)];

  let pHash = 0n;
  for (const pixel of hashPixels) {
    pHash = pHash << 1n;
    if (pixel > averageValue) {
      pHash = pHash | 1n;
    }
  }

  return pHash;
}

// DCT-II, orthogonal
// https://en.wikipedia.org/wiki/Discrete_cosine_transform#DCT-II
// Use skipFactor to operate on RGBA data. Always returns single-channel data.
function discreteCosineTransform(vector, skipFactor) {
  if (!skipFactor) skipFactor = 1;
  const N = vector.length / skipFactor;

  const result = [];
  for (let k = 0; k < N; ++k) {
    let total = 0;
    for (let n = 0; n < N; ++n) {
      total += vector[n * skipFactor] * Math.cos(Math.PI / N * (n + 0.5) * k);
    }
    total *= Math.sqrt(2 / N);

    if (k == 0) {
      total *= 1 / Math.sqrt(2);
    }

    result[k] = total;
  }

  return result;
}

const CRATE_ICON = loadImage('War/Content/Textures/UI/Menus/IconFilterCrates.png');
async function hashIcon(objectValues) {
  const ICON_SIZE = 32;
  const canvas = createCanvas(ICON_SIZE, ICON_SIZE);
  const context = canvas.getContext('2d');

  context.fillStyle = 'black';
  context.fillRect(0, 0, ICON_SIZE, ICON_SIZE);

  const icon = await loadImage(objectValues.Icon.replace(/\.[0-9]+$/, '.png'));

  context.drawImage(icon, 0, 0, ICON_SIZE, ICON_SIZE);

  const SUB_ICON_SIZE = 14;
  if (objectValues.SubTypeIcon) {
    const subTypeIcon = await loadImage(objectValues.SubTypeIcon.replace(/\.[0-9]+$/, '.png'));

    context.globalAlpha = 0.75;
    context.drawImage(subTypeIcon, 0, 0, SUB_ICON_SIZE, SUB_ICON_SIZE);
    context.globalAlpha = 1;
  }

  if (objectValues.DisplayName == 'Shrapnel Mortar Shell') {
    const out = fs.createWriteStream('debugicon.png');
    const png = canvas.createPNGStream();
    png.pipe(out);
    await events.once(png, 'end');
  }

  const hashes = {
    pHash: pHashImage(canvas).toString(),
  }

  const CRATE_OFFSET = ICON_SIZE - SUB_ICON_SIZE;
  context.globalAlpha = 0.75;
  context.drawImage(await CRATE_ICON, CRATE_OFFSET, CRATE_OFFSET, SUB_ICON_SIZE, SUB_ICON_SIZE);
  context.globalAlpha = 1;

  hashes.pHashCrated = pHashImage(canvas).toString();

  return hashes;
}

const common = {
  ammoDynamicData: new FHDataTable('BPAmmoDynamicData'),
  itemDynamicData: new FHDataTable('BPItemDynamicData'),
  itemProfiles: new FHDataTable('BPItemProfileTable'),
  vehicleDynamicData: new FHDataTable('BPVehicleDynamicData'),
};

const searchDirectories = [
  'War/Content/Blueprints/ItemPickups/',
  'War/Content/Blueprints/ItemPickups/LargeResources/',
  'War/Content/Blueprints/ItemPickups/TankAmmo/',
  'War/Content/Blueprints/ItemPickups/Uniforms/',
  'War/Content/Blueprints/Vehicles/',
  'War/Content/Blueprints/Vehicles/ArmoredCar/',
  'War/Content/Blueprints/Vehicles/BattleTanks/',
  'War/Content/Blueprints/Vehicles/DestroyerTank/',
  'War/Content/Blueprints/Vehicles/FieldWeapons/',
  'War/Content/Blueprints/Vehicles/Gunboats/',
  'War/Content/Blueprints/Vehicles/Halftrack/',
  'War/Content/Blueprints/Vehicles/LandingCraft/',
  'War/Content/Blueprints/Vehicles/LightTank/',
  'War/Content/Blueprints/Vehicles/LogisticsVehicles/',
  'War/Content/Blueprints/Vehicles/Mech/',
  'War/Content/Blueprints/Vehicles/MediumTank/',
  'War/Content/Blueprints/Vehicles/MortarTank/',
  'War/Content/Blueprints/Vehicles/Motorcycle/',
  'War/Content/Blueprints/Vehicles/ScoutTank/',
  'War/Content/Blueprints/Vehicles/ScoutVehicle/',
  'War/Content/Blueprints/Vehicles/Tankette/',
  'War/Content/Blueprints/Vehicles/Truck/',
  'War/Content/Blueprints/Structures/',
];

const objects = [];
const promises = [];
for (const directory of searchDirectories) {
  for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) {
      continue;
    }
    const file = directory + entry.name;
    //if (file != 'War/Content/Blueprints/Vehicles/LightTank/BPLightTankC.json') {
    //  continue;
    //}
    process.stderr.write('Processing: ' + file + '\n');

    try {
      const coreObject = new FHStruct(file);
      const objectValues = coalesceObject(coreObject);

      //process.stderr.write(objectValues.CodeName + '\n');

      if (objectValues.CodeName
          && objectValues.DisplayName
          && objectValues.Description
          && objectValues.Icon) {
        objects.push(objectValues);

        const promise = hashIcon(objectValues);
        promises.push(promise);
        promise.then(function(objectValues, hashes) {
          //process.stderr.write(objectValues.CodeName + '\n');
          objectValues.IconHashes = hashes;
        }.bind(null, objectValues));
      }
    } catch (e) {
      if (e instanceof NonBPError) {
        continue;
      } else {
        throw e;
      }
    }
  }
}

/*
const iconMap = new Map([
  ["War/Content/Textures/UI/ItemIcons/SubtypeAPIcon.0", 'Armour Piercing'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeATIcon.0", 'Anti-Tank Explosive'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeAmmoIcon.0", 'Heavy Ammo Uniform'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeAntiTank.0", 'Anti-Tank Kinetic'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeArmourIcon.0", 'Armour Uniform'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeEngineerIcon.0", 'Engineer Uniform'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeFLIcon.0", 'Flare'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeGAIcon.0", 'Poisonous Gas'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeGrenadeIcon.0", 'Grenade Uniform'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeHBIcon.0", 'Heavy Kinetic'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeHEIcon.0", 'High Explosive'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeLRAIcon.0", 'Demolitions'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeMedicIcon.0", 'Medic Uniform'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeOfficerIcon.0", 'Officer Uniform'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeRainIcon.0", 'Rain Uniform'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0", 'Light Kinetic'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeSEIcon.0", 'Explosive'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeSHIcon.0", 'Shrapnel'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeSMKIcon.0", 'Smoke'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeScoutIcon.0", 'Scout Uniform'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeSnowIcon.0", 'Snow Uniform'],
  ["War/Content/Textures/UI/ItemIcons/SubtypeTankIcon.0", 'Tank Uniform'],
]);

for (const element of objects) {
  const fields = [
    element.DisplayName,
    iconMap.get(element.SubTypeIcon),
    element.ItemFlagsMask,
    element.Description,
    element.Icon,
  ];
  process.stdout.write(fields.join('\t') + '\n');
}
*/

Promise.allSettled(promises).then(function() {
  process.stdout.write('const itemCatalog = ');
  process.stdout.write(JSON.stringify(objects, null, 2));
});