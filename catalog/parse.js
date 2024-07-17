import fs from 'graceful-fs';
import process from 'node:process';

const WAR_LOCATION = process.argv[2];
const CATALOG_LOCATION = process.argv[3];

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
    this.#data = JSON.parse(fs.readFileSync(`${WAR_LOCATION}/${file}`));

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
    if (node && node.ObjectName.startsWith(FHStruct.#BPCLASS + "'")) {
      const type = node.ObjectName.slice(FHStruct.#BPCLASS.length + 1, node.ObjectName.length - 1);
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
      if (Array.isArray(base)) {
        base = base.find(v => v[element])?.[element];
      } else {
        base = (base || {})[element];
      }
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
    ['bCanUseStructures'],
    ['bIsLarge'],
    ['bRequiresCoverOrLowStanceToInvoke'],
    ['bRequiresVehicleToBuild'],
    ['bSupportsVehicleMounts'],
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

  if ((combinedObject.CodeName == 'WaterBucket') && (ammoTypes.size > 1)) {
    // There are two damage types?  We need the SubTypeIcon below, so get rid of one type here.
    ammoTypes.delete('Water');
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
    Explosive: 'Explosive Powder',  // BPExplosiveMaterial.uasset
    HeavyExplosive: 'Heavy Explosive Powder',  // BPHeavyExplosiveMaterial.uasset
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
    ['bIsConvertibleToCrate'],
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
    ['bHasTierUpgrades'],
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
      'War/Content/Blueprints/Structures/BPMassProduction',
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
  'War/Content/Blueprints/Vehicles/DestroyerTank/',
  'War/Content/Blueprints/Vehicles/FieldWeapons/',
  'War/Content/Blueprints/Vehicles/Gunboats/GunboatC/',
  'War/Content/Blueprints/Vehicles/Gunboats/GunboatW/',
  'War/Content/Blueprints/Vehicles/Halftrack/',
  'War/Content/Blueprints/Vehicles/HeavyTruck/',
  'War/Content/Blueprints/Vehicles/LandingCraft/',
  'War/Content/Blueprints/Vehicles/LandingShips/LandingShipC/',
  'War/Content/Blueprints/Vehicles/LandingShips/LandingShipW/',
  'War/Content/Blueprints/Vehicles/LargeShips/BattleShipC/',
  'War/Content/Blueprints/Vehicles/LargeShips/BattleShipW/',
  'War/Content/Blueprints/Vehicles/LargeShips/DestroyerC/',
  'War/Content/Blueprints/Vehicles/LargeShips/StorageShip/',
  'War/Content/Blueprints/Vehicles/LargeShips/SubmarineW/',
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
  'War/Content/Blueprints/Vehicles/Trailers/',
  'War/Content/Blueprints/Vehicles/Truck/',
  'War/Content/Blueprints/Structures/',
  'War/Content/Blueprints/Structures/Emplacements/',
  'War/Content/Blueprints/Structures/Facilities/',
  'War/Content/Blueprints/Structures/Rocket/',
  'War/Content/Blueprints/Structures/Ships/',
];

const objects = [];
for (const directory of searchDirectories) {
  const entries = fs.readdirSync(`${WAR_LOCATION}/${directory}`, {withFileTypes: true});

  //process.stderr.write(`Processing JSON files in: ${directory}\n`);

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) {
      continue;
    }
    if (entry.name == 'BPRareMaterialsPickup.json') {
      // RareMaterials and RareMetal have the same icon, and only RareMetal is used in game?
      continue;
    }

    const file = directory + entry.name;
    //process.stderr.write('Processing: ' + file + '\n');

    try {
      const coreObject = new FHStruct(file);
      const objectValues = coalesceObject(coreObject);
      //process.stderr.write(objectValues.CodeName + '\n');

      //if (objectValues.CodeName == "ShipPart1") {
      //  process.stderr.write(objectValues.CodeName + '\n');
      //  process.stderr.write(objectValues.DisplayName + '\n');
      //  process.stderr.write(objectValues.Description + '\n');
      //  process.stderr.write(objectValues.Icon + '\n');
      //  process.stderr.write(objectValues.TechID + '\n');
      //  process.stderr.write(objectValues.ItemCategory + '\n');
      //  process.stderr.write(objectValues.VehicleProfileType + '\n');
      //  process.stderr.write(objectValues.BuildLocationType + '\n');
      //  process.stderr.write(objectValues.ProfileType + '\n');
      //}

      if (objectValues.CodeName
          && objectValues.DisplayName
          && objectValues.Description
          && objectValues.Icon
          && ((objectValues.TechID || '') != 'ETechID::ETechID_MAX')
          && (objectValues.ItemCategory
              || objectValues.VehicleProfileType
              || (objectValues.BuildLocationType == 'EBuildLocationType::ConstructionYard')
              || (objectValues.ProfileType == 'EStructureProfileType::Shippable'))) {
        objects.push(objectValues);
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

objects.sort(function(a, b) {
  const aName = a.CodeName.toLowerCase();
  const bName = b.CodeName.toLowerCase();
  if (aName > bName) {
    return 1;
  }
  if (aName < bName) {
    return -1;
  }
  return 0;
});

fs.writeFileSync(CATALOG_LOCATION, JSON.stringify(objects, null, 2));
