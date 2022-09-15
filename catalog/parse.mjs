import fs from 'graceful-fs';
import process from 'node:process';
import events from 'node:events';
import { createCanvas, loadImage } from 'canvas';

const TRAINING_LOCATION = `${process.cwd()}/training`
const WAR_LOCATION = process.argv[2];
process.chdir(WAR_LOCATION);

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
    this.#selected = this.#data.find(e => e.Type == type);
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

  extractValues(path, properties, result) {
    if (result === undefined) {
      result = {};
    }

    let base = this.#selected;
    for (const element of path) {
      base = (base || {})[element];
    }

    const superProperties = [];
    for (const propertyPath of properties) {
      let value = base;
      for (const element of propertyPath) {
        value = (value || {})[element];
      }

      if (value !== undefined) {
        result[propertyPath[0]] = value;
      } else {
        superProperties.push(propertyPath);
      }
    }

    if (superProperties.length && this.#superStruct) {
      this.#superStruct.extractValues(path, superProperties, result);
    }

    return result;
  }

  bundleValues(path, properties, callback) {
    const values = this.extractValues(path, properties);
    if (Object.keys(values).length) {
      values.ObjectPath = this.getPath();
      callback(values);
    }
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
    ['ProfileType'],
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
    ['VehiclesPerCrateBonusQuantity'],
    ['VehicleBuildType'],
    ['MapIconType'],
    ['BuildLocationFilter'],
    ['BoostSpeedModifier'],
    ['BoostGasUsageModifier'],
    ['bIsLarge'],
    ['bSupportsVehicleMounts'],
    ['bRequiresVehicleToBuild'],
    ['bRequiresCoverOrLowStanceToInvoke'],
  ];

  coreObject.extractValues(
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
      ['SafeItem'],
      ['bCanFireFromVehicle'],
      ['bIsSingleUse'],
    ];

    combinedObject.ItemComponentClass = {
      ObjectPath: itemComponent.getPath(),
    };
    itemComponent.extractValues(
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

  let ammoName = combinedObject.CodeName;
  if (ammoTypes.size == 1) {
    ammoName = ammoTypes.values().next().value;
  }

  const ammoValues = common.ammoDynamicData.extractValues(
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
        combinedObject.SubTypeIcon = ammoValues.DamageType.Icon;
      }
    }
  }

  if ((combinedObject.CodeName == 'ISGTC') && !combinedObject.SubTypeIcon) {
    combinedObject.SubTypeIcon = 'War/Content/Textures/UI/ItemIcons/SubtypeSEIcon.0';
  }

  const grenadeProperties = [
    ['MinTossSpeed'],
    ['MaxTossSpeed'],
    ['GrenadeFuseTimer'],
    ['GrenadeRangeLimit'],
  ];
  common.grenadeDynamicData.bundleValues(
    ['Rows', combinedObject.CodeName],
    grenadeProperties,
    v => combinedObject.GrenadeDynamicData = v
  );

  const weaponProperties = [
    ['SuppressionMultiplier'],
    ['MaxAmmo'],
    ['MaxApexHalfAngle'],
    ['BaselineApexHalfAngle'],
    ['StabilityCostPerShot'],
    ['Agility'],
    ['CoverProvided'],
    ['StabilityFloorFromMovement'],
    ['StabilityGainRate'],
    ['MaximumRange'],
    ['MaximumReachability'],
    ['DamageMultiplier'],
    ['ArtilleryAccuracyMinDist'],
    ['ArtilleryAccuracyMaxDist'],
    ['MaxVehicleDeviationAngle'],
  ];
  common.weaponDynamicData.bundleValues(
    ['Rows', combinedObject.CodeName],
    weaponProperties,
    v => combinedObject.WeaponDynamicData = v
  );

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
  common.itemDynamicData.bundleValues(
    ['Rows', combinedObject.CodeName],
    productionProperties,
    function (values) {
      combinedObject.ItemDynamicData = values;

      for (const item of (values.CostPerCrate || [])) {
        item.DisplayName = materialNames[item.ItemCodeName];
      }
    }
  );

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

  common.itemProfiles.bundleValues(
    ['Properties', 'ItemProfileTable', combinedObject.ItemProfileType],
    profileProperties,
    v => combinedObject.ItemProfileData = v
  );

  const vehicleDynamicProperties = [
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
    vehicleDynamicProperties
  );
  if (Object.keys(vehicleDynamicValues).length) {
    vehicleDynamicValues.ObjectPath = common.vehicleDynamicData.getPath();
    combinedObject.VehicleDynamicData = vehicleDynamicValues;

    /*
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
    */
  }

  const vehicleProfileProperties = [
    ['bUsesRollTrace'],
    ['bCanTriggerMine'],
    ['bCanUseStructures'],
    ['RamDamageDealtFlags'],
    ['bUsesGas'],
    ['DrivingSpeedThreshold'],
    ['MaxVehicleAngle'],
    ['bEnableStealth'],
    ['DamageDrivingOverStructures'],
  ];
  common.vehicleProfileList.bundleValues(
    ['Properties', 'VehicleProfileMap', combinedObject.VehicleProfileType],
    vehicleProfileProperties,
    v => combinedObject.VehicleProfileData = v
  );

  const vehicleMovementProfileProperties = [
    ['Mass'],
    ['BrakeForce'],
    ['HandbrakeForce'],
    ['AirResistance'],
    ['RollingResistance'],
    ['LowSpeedEngineForceMultiplier'],
    ['LowGearCutoff'],
    ['CenterOfGravityHeight'],
    ['bUsesDifferentialSteering'],
    ['bCanRotateInPlace'],
  ];
  common.vehicleMovementProfileList.bundleValues(
    ['Properties', 'VehicleMovementProfileMap', combinedObject.VehicleMovementProfileType],
    vehicleMovementProfileProperties,
    v => combinedObject.VehicleMovementProfileData = v
  );

  const structureProfileProperties = [
    ['bSupportsAdvancedConstruction'],
    ['bHasDynamicStartingCondition'],
    ['bIsRepairable'],
    ['bIsOnlyMountableByFriendly'],
    ['bIsUpgradeRotationAllowed'],
    ['bIsUsableFromVehicle'],
    ['bAllowUpgradeWhenDamaged'],
    ['bCanOverlapNonBlockingFoliage'],
    ['bDisallowAdjacentUpgradesInIsland'],
    ['bIncludeInStructureIslands'],
    ['bCanDecayBePrevented'],
    ['VerticalEjectionDistance'],
    ['bEnableStealth'],
    ['bIsRuinable'],
    ['bBypassesRapidDecayForNearbyStructures'],
    ['bUsesImpactsMaterial'],
  ];
  common.structureProfileList.bundleValues(
    ['Properties', 'StructureProfileMap', combinedObject.ProfileType],
    structureProfileProperties,
    v => combinedObject.ProfileData = v
  );

  const structureDynamicProperties = [
    ['MaxHealth'],
    ['ResourceRequirements'],
    ['DecayStartHours'],
    ['DecayDurationHours'],
    ['RepairCost'],
    ['StructuralIntegrity'],
    ['StoredItemCapacity'],
    ['RamDamageReceivedFlags'],
    ['bCanBeHarvested'],
    ['IsVaultable'],
    ['bIsDamagedWhileDrivingOver'],
  ];
  const structureDynamicValues = common.structureDynamicData.extractValues(
    ['Rows', combinedObject.CodeName],
    structureDynamicProperties
  );
  if (Object.keys(structureDynamicValues).length) {
    structureDynamicValues.ObjectPath = common.structureDynamicData.getPath();
    combinedObject.StructureDynamicData = structureDynamicValues;

    /*
    const resources = [];
    for (const entry of Object.entries(structureDynamicValues.ResourceRequirements)) {
      if (entry[1] == 0) {
        continue;
      }

      resources.push({
        ItemCodeName: entry[0],
        DisplayName: materialNames[entry[0]],
        Quantity: entry[1],
      });
    }
    structureDynamicValues.ResourceRequirements = resources;
    */
  }

  const productionCategories = {};
  productionCategories.Factory = (common.factoryProductionCategories.find(c => c.CategoryItems.find(e => e.CodeName == combinedObject.CodeName)) || {}).Type;

  productionCategories.MassProductionFactory = (common.massProductionFactoryProductionCategories.find(c => c.CategoryItems.find(e => e.CodeName == combinedObject.CodeName)) || {}).Type;

  if (!productionCategories.MassProductionFactory) {
    const vehicleType = combinedObject.VehicleBuildType;
    const structureType = combinedObject.BuildLocationType;
    if (vehicleType && (vehicleType != 'EVehicleBuildType::NotBuildable')) {
      productionCategories.MassProductionFactory = 'EFactoryQueueType::Vehicles';
    } else if (structureType && ((structureType == 'EBuildLocationType::Anywhere') || (structureType == 'EBuildLocationType::ConstructionYard'))) {
      productionCategories.MassProductionFactory = 'EFactoryQueueType::Structures';
    }
  }

  if (Object.values(productionCategories).filter(e => !!e).length) {
    combinedObject.ProductionCategories = productionCategories;
  }

  return combinedObject;
}

async function writePNG(canvas, file) {
  const out = fs.createWriteStream(file);
  const png = canvas.createPNGStream();
  png.pipe(out);
  await events.once(out, 'finish');
}

const CORNER_ICON_RATIO = 7 / 16;
const CORNER_ICON_ALPHA = 0.75;
async function drawIcon(objectValues, size, cache, modName) {
  const canvas = createCanvas(size, size);
  const context = canvas.getContext('2d');
  context.fillRect(0, 0, size, size);

  if (!cache.icon) {
    let iconFile = objectValues.Icon.replace(/\.[0-9]+$/, '.png');
    if (modName) {
      iconFile = `mod-files/${modName}/${iconFile}`;
      if (!fs.existsSync(iconFile)) {
        return;
      }
    }

    cache.icon = await loadImage(iconFile);
  }
  context.drawImage(cache.icon, 0, 0, size, size);

  if (objectValues.SubTypeIcon) {
    cache.subTypeIcon ||= await loadImage(objectValues.SubTypeIcon.replace(/\.[0-9]+$/, '.png'));
    const cornerSize = size * CORNER_ICON_RATIO;

    context.globalAlpha = CORNER_ICON_ALPHA;
    context.drawImage(cache.subTypeIcon, 0, 0, cornerSize, cornerSize);
    context.globalAlpha = 1;
  }

  return canvas;
}

const CRATE_ICON = loadImage('War/Content/Textures/UI/Menus/IconFilterCrates.png');
async function addCrate(canvas) {
  const size = canvas.width;
  const cornerSize = size * CORNER_ICON_RATIO;
  const crateOffset = size - cornerSize;

  const context = canvas.getContext('2d');
  context.globalAlpha = CORNER_ICON_ALPHA;
  context.drawImage(await CRATE_ICON, crateOffset, crateOffset, cornerSize, cornerSize);
  context.globalAlpha = 1;
}

async function writeTrainingPNG(objectValues, baseName, size, cache, modName) {
  const canvas = await drawIcon(objectValues, size, cache, modName);
  if (!canvas) {
    return;
  }
  modName = modName ? `${modName}-` : '';

  await fs.promises.mkdir(baseName, {recursive: true});
  await writePNG(canvas, `${baseName}/${modName}${size}.png`);

  await addCrate(canvas);
  await fs.promises.mkdir(`${baseName}-crated`, {recursive: true});
  await writePNG(canvas, `${baseName}-crated/${modName}${size}.png`);
}

async function writeTrainingPNGs(objectValues, destination) {
  const smallestSize = 28;
  const largestSize = 72;
  const baseName = `${destination}/${objectValues.CodeName}`;

  const mods = fs.readdirSync('mod-files/')
  mods.push(undefined);

  const promises = [];

  for (const modName of mods) {
    const cache = {};
    for (let size = smallestSize; size <= largestSize; ++size) {
      promises.push(writeTrainingPNG(objectValues, baseName, size, cache, modName));
    }
  }

  await Promise.all(promises);
}

const common = {
  ammoDynamicData: new FHDataTable('BPAmmoDynamicData'),
  itemDynamicData: new FHDataTable('BPItemDynamicData'),
  itemProfiles: new FHStruct('War/Content/Blueprints/Data/BPItemProfileTable'),
  grenadeDynamicData: new FHDataTable('BPGrenadeDynamicData'),
  weaponDynamicData: new FHDataTable('BPWeaponDynamicData'),
  vehicleDynamicData: new FHDataTable('BPVehicleDynamicData'),
  vehicleProfileList: new FHStruct('War/Content/Blueprints/Data/BPVehicleProfileList'),
  vehicleMovementProfileList: new FHStruct('War/Content/Blueprints/Data/BPVehicleMovementProfileList'),
  structureProfileList: new FHStruct('War/Content/Blueprints/Data/BPStructureProfileList'),
  structureDynamicData: new FHDataTable('BPStructureDynamicData'),
  factoryProductionCategories: new FHStruct(
      'War/Content/Blueprints/Structures/BPFactory',
      'SpecializedFactoryComponent',
      false).extractValues(
        ['Properties'],
        [['ProductionCategories']]).ProductionCategories,
  massProductionFactoryProductionCategories: new FHStruct(
      'War/Content/Blueprints/Structures/BPMassProductionFactory',
      'SpecializedFactoryComponent',
      false).extractValues(
        ['Properties'],
        [['ProductionCategories']]).ProductionCategories,
};

const searchDirectories = [
  'War/Content/Blueprints/ItemPickups/',
  'War/Content/Blueprints/ItemPickups/Facilities/',
  'War/Content/Blueprints/ItemPickups/LargeResources/',
  'War/Content/Blueprints/ItemPickups/TankAmmo/',
  'War/Content/Blueprints/ItemPickups/Uniforms/',
  'War/Content/Blueprints/Vehicles/',
  'War/Content/Blueprints/Vehicles/ArmoredCar/',
  'War/Content/Blueprints/Vehicles/BattleTanks/',
  'War/Content/Blueprints/Vehicles/Cranes/',
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
  'War/Content/Blueprints/Vehicles/Rail/',
  'War/Content/Blueprints/Vehicles/ScoutTank/',
  'War/Content/Blueprints/Vehicles/ScoutVehicle/',
  'War/Content/Blueprints/Vehicles/SuperTank/',
  'War/Content/Blueprints/Vehicles/Tankette/',
  'War/Content/Blueprints/Vehicles/Truck/',
  'War/Content/Blueprints/Structures/',
];

const objects = [];
const promises = [];
for (const directory of searchDirectories) {
  const entries = fs.readdirSync(directory, {withFileTypes: true});
  entries.sort(function(a, b) {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    if (aName > bName) {
      return 1;
    }
    if (aName < bName) {
      return -1;
    }
    return 0;
  });

  process.stderr.write(`Processing JSON files in: ${directory}\n`);

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) {
      continue;
    }
    const file = directory + entry.name;
    //if (file != 'War/Content/Blueprints/Vehicles/LightTank/BPLightTankC.json') {
    //  continue;
    //}
    //process.stderr.write('Processing: ' + file + '\n');

    try {
      const coreObject = new FHStruct(file);
      const objectValues = coalesceObject(coreObject);

      //process.stderr.write(objectValues.CodeName + '\n');

      if (objectValues.CodeName
          && objectValues.DisplayName
          && objectValues.Description
          && objectValues.Icon
          && ((objectValues.TechID || '') != 'ETechID::ETechID_MAX')
          && (objectValues.ItemCategory
              || objectValues.VehicleProfileType
              || (objectValues.BuildLocationType == 'EBuildLocationType::ConstructionYard'))
          && objectValues.CodeName != 'FieldMultiW') {
        objects.push(objectValues);
        promises.push(writeTrainingPNGs(objectValues, TRAINING_LOCATION));
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

process.stderr.write('Processing icons.\n');
Promise.all(promises).then(function() {
  process.stdout.write(JSON.stringify(objects, null, 2));
});
