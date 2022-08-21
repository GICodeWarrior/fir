const itemCatalog = [
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/AntiTankMinePickup",
    "CodeName": "TankMine",
    "ChassisName": "Explosive Charge",
    "DisplayName": "Abisme AT-99",
    "Description": "A simple mine that is placed under terrain and fitted with a pressure-sensitive plate to detonate under the weight of heavy vehicles. Mines are visible to friendlies and enemies on foot and deactivate after 48 in-game days.",
    "Encumbrance": 40,
    "EquipmentSlot": "EEquipmentSlot::Tertiary",
    "ItemCategory": "EItemCategory::Utility",
    "ItemProfileType": "EItemProfileType::Tool",
    "Icon": "War/Content/Textures/UI/ItemIcons/AntiTankMineItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/AntiTankMineItemComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::HeavySingleHandItem"
    },
    "AmmoDynamicData": {
      "Damage": 850,
      "Suppression": 0,
      "ExplosionRadius": 400,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPAntiTankExplosiveMineDamageType.0",
        "DisplayName": "Anti-Tank Explosive",
        "Type": "EDamageType::AntiTankExplosive",
        "DescriptionDetails": "Always disables the Track subsystem",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeATIcon.0",
        "VehicleSubsystemDisableMultipliers": 10,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeATIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Explosive",
          "Quantity": 10,
          "DisplayName": "Explosive Materials"
        }
      ],
      "QuantityPerCrate": 10,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15123204209236612726",
        "topLeft": "10045134609074116359",
        "bottomRight": "14467963439856746496"
      },
      "crated": {
        "topLeft": "10045134609074116359",
        "full": "9637837399450308246",
        "bottomRight": "15409145842870779904"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/ATAmmoPickup",
    "CodeName": "ATAmmo",
    "DisplayName": "68mm",
    "Description": "A standard anti-tank shell.",
    "Encumbrance": 100,
    "ItemCategory": "EItemCategory::HeavyAmmo",
    "ItemProfileType": "EItemProfileType::HeavyAmmo",
    "ItemFlagsMask": 17,
    "Icon": "War/Content/Textures/UI/ItemIcons/ATAmmoIcon.0",
    "AmmoDynamicData": {
      "Damage": 600,
      "Suppression": 85,
      "ExplosionRadius": 150,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPArmourPiercingDamageType.0",
        "DisplayName": "Armour Piercing",
        "Type": "EDamageType::ArmourPiercing",
        "DescriptionDetails": "High chance to penetrate armoured vehicles",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeAPIcon.0",
        "TankArmourEffectType": "ETankArmourEffectType::Large",
        "TankArmourPenetrationFactor": 1.5,
        "bApplyTankArmourMechanics": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeAPIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Explosive",
          "Quantity": 120,
          "DisplayName": "Explosive Materials"
        },
        {
          "ItemCodeName": "Cloth",
          "Quantity": 120,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 200,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14118898408345509392",
        "topLeft": "15028845445381961585",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "15028845445381961585",
        "full": "9507212940752919056",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BandagesPickup",
    "CodeName": "Bandages",
    "DisplayName": "Bandages",
    "Description": "Used to stem bleeding.",
    "Encumbrance": 1,
    "EquipmentSlot": "EEquipmentSlot::Tertiary",
    "ItemCategory": "EItemCategory::Medical",
    "ItemProfileType": "EItemProfileType::StackableTool",
    "ItemFlagsMask": 513,
    "Icon": "War/Content/Textures/UI/ItemIcons/BandagesItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BandagesComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::SingleHandItem"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 80,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 50,
      "CrateProductionTime": 40,
      "SingleRetrieveTime": 0.5,
      "CrateRetrieveTime": 8,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "11255737140398507996",
        "topLeft": "12489244459931044198",
        "bottomRight": "17933341407402246144"
      },
      "crated": {
        "topLeft": "12489244459931044198",
        "full": "10697871879573555160",
        "bottomRight": "17645148300829016064"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BinocularsPickup",
    "CodeName": "Binoculars",
    "DisplayName": "Binoculars",
    "Description": "An optical instrument used for viewing distant objects.",
    "Encumbrance": 10,
    "EquipmentSlot": "EEquipmentSlot::Secondary",
    "ItemCategory": "EItemCategory::Utility",
    "ItemProfileType": "EItemProfileType::Tool",
    "TechID": "ETechID::UnlockBinoculars",
    "Icon": "War/Content/Textures/UI/ItemIcons/BinocularsItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPBinocularsComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::SingleHandItem"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 75,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 50,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14166142067613786754",
        "topLeft": "9403447367745357106",
        "bottomRight": "10418115205222654016"
      },
      "crated": {
        "topLeft": "9403447367745357106",
        "full": "14184437940028334722",
        "bottomRight": "10778302019002491072"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPAluminum",
    "CodeName": "Aluminum",
    "DisplayName": "Aluminum",
    "Description": "Aluminum can be refined into Aluminum Alloy, which is used in the prototyping process for items.",
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::RawResource",
    "ItemFlagsMask": 2049,
    "Icon": "War/Content/Textures/UI/ItemIcons/ResouceAluminumIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [],
      "QuantityPerCrate": 100,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 6,
      "CrateRetrieveTime": 6,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14551190111576810593",
        "topLeft": "9761759756159967676",
        "bottomRight": "17941488763603517440"
      },
      "crated": {
        "topLeft": "9761759756159967676",
        "full": "9604549146815382625",
        "bottomRight": "15419334431395028992"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPAluminumAlloy",
    "CodeName": "AluminumA",
    "DisplayName": "Aluminum Alloy",
    "Description": "Aluminum Alloy can be used to produce Item Prototypes at the Engineering Center.",
    "Encumbrance": 15,
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::RefinedResource",
    "ItemFlagsMask": 257,
    "Icon": "War/Content/Textures/UI/ItemIcons/ResouceAluminumRefinedIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "AluminumA",
          "Quantity": 20
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 1000,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10778655882097270640",
        "topLeft": "12560731090695998643",
        "bottomRight": "13889313184910704768"
      },
      "crated": {
        "topLeft": "12560731090695998643",
        "full": "10757756347913412464",
        "bottomRight": "14249524189286367360"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPAssaultRifleAmmoPickup",
    "CodeName": "AssaultRifleAmmo",
    "DisplayName": "7.92mm",
    "Description": "Standard ammunition for Storm Rifles and Armoured Cars.",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::LightAmmo",
    "ItemFlagsMask": 4161,
    "Icon": "War/Content/Textures/UI/ItemIcons/AssaultRifleAmmoItemIcon.0",
    "AmmoDynamicData": {
      "Damage": 35,
      "Suppression": 10,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 120,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 30,
      "CrateProductionTime": 60,
      "SingleRetrieveTime": 1.5,
      "CrateRetrieveTime": 12,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14028774279689959623",
        "topLeft": "9823262746129731161",
        "bottomRight": "17940353960493711617"
      },
      "crated": {
        "topLeft": "9823262746129731161",
        "full": "13985990082827286727",
        "bottomRight": "15418206227770900480"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPAssaultRifleHeavyCPickup",
    "CodeName": "AssaultRifleHeavyC",
    "ChassisName": "Assault Rifle",
    "DisplayName": "“Dusk” ce.III",
    "Description": "This unique assault rifle includes a high-capacity drum magazine designed for sustained rapid fire.",
    "Encumbrance": 125,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockAssaultRifleHeavy",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/AssaultRifleHeavyCItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPAssaultRifleHeavyCComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "FiringRate": 0.2,
      "CompatibleAmmoCodeName": "AssaultRifleAmmo"
    },
    "AmmoDynamicData": {
      "Damage": 35,
      "Suppression": 10,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 165,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 10,
      "CrateProductionTime": 80,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14996811694648946530",
        "topLeft": "0",
        "bottomRight": "16276538888567251425"
      },
      "crated": {
        "topLeft": "0",
        "full": "10385129798245109602",
        "bottomRight": "9647126985215926497"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPAssaultRifleHeavyWPickup",
    "CodeName": "AssaultRifleHeavyW",
    "ChassisName": "Assault Rifle",
    "DisplayName": "Booker Storm Rifle Model 838",
    "Description": "The Booker is a high-impact three-round burst Storm Rifle for those who like to shoot first.",
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockAssaultRifleHeavy",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/AssaultRifleHeavyWItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/AssaultRifleHeavyW.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "CompatibleAmmoCodeName": "AssaultRifleAmmo"
    },
    "AmmoDynamicData": {
      "Damage": 35,
      "Suppression": 10,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 165,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 10,
      "CrateProductionTime": 80,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13843907779778649074",
        "topLeft": "0",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "0",
        "full": "9520381907266767858",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPAssaultRiflePickup",
    "CodeName": "AssaultRifleW",
    "ChassisName": "Assault Rifle",
    "DisplayName": "Aalto Storm Rifle 24",
    "Description": "Widely considered to be the first storm rifle, the Aalto is a marvel in Caoivish engineering. With its two fire modes, it can be used as a rapid-fire assault weapon or a mid-range rifle.",
    "Encumbrance": 150,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockAssaultRifle",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/AssaultRifleItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPAssaultRifleComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "CompatibleAmmoCodeName": "AssaultRifleAmmo"
    },
    "AmmoDynamicData": {
      "Damage": 35,
      "Suppression": 10,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 165,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 10,
      "CrateProductionTime": 80,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14131574656420287348",
        "topLeft": "0",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "0",
        "full": "10671689329003201396",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPATGrenadeWPickup",
    "CodeName": "ATGrenadeW",
    "ChassisName": "Anti-Tank Grenade",
    "DisplayName": "BF5 White Ash Flask Grenade",
    "Description": "An explosive flask used for melting enemy armour. This carefully designed liquid bomb explodes into a dazzling flash of molten debris upon impact.",
    "Encumbrance": 90,
    "ItemCategory": "EItemCategory::HeavyArms",
    "TechID": "ETechID::UnlockATGrenade",
    "Icon": "War/Content/Textures/UI/ItemIcons/ATGrenadeWIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPATGrenadeWComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::SingleHandItem"
    },
    "EquipmentSlot": "EEquipmentSlot::Tertiary",
    "ItemProfileType": "EItemProfileType::Throwable",
    "FactionVariant": "EFactionId::Wardens",
    "ItemFlagsMask": 9,
    "AmmoDynamicData": {
      "Damage": 350,
      "Suppression": 0,
      "ExplosionRadius": 125,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPAntiTankExplosiveStickyBombDamageType.0",
        "DisplayName": "Anti-Tank Explosive",
        "Type": "EDamageType::AntiTankExplosive",
        "DescriptionDetails": "High chance of disabling Track subsystem",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeATIcon.0",
        "VehicleSubsystemDisableMultipliers": 7,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeATIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Explosive",
          "Quantity": 40,
          "DisplayName": "Explosive Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 75,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14767365073847283554",
        "topLeft": "9461839223721594631",
        "bottomRight": "17357084096123895808"
      },
      "crated": {
        "topLeft": "9461839223721594631",
        "full": "14155438741772857186",
        "bottomRight": "15413112879284486144"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPATRifleAmmoPickup",
    "CodeName": "ATRifleAmmo",
    "DisplayName": "20mm",
    "Description": "Standard ammunition for anti-tank rifles.",
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HeavyAmmo",
    "ItemFlagsMask": 65,
    "Icon": "War/Content/Textures/UI/ItemIcons/ATRifleAmmoItemIcon.0",
    "AmmoDynamicData": {
      "Damage": 150,
      "Suppression": 20,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPAntiTankKineticDamageType.0",
        "DisplayName": "Anti-Tank Kinetic",
        "Type": "EDamageType::AntiTankKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeAntiTank.0",
        "TankArmourEffectType": "ETankArmourEffectType::Small",
        "VehicleSubsystemDisableMultipliers": 0.33,
        "bApplyTankArmourMechanics": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeAntiTank.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 10,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 7.5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14107593071041865595",
        "topLeft": "10337866098564701116",
        "bottomRight": "16487731426827497696"
      },
      "crated": {
        "topLeft": "10337866098564701116",
        "full": "13963477918659536441",
        "bottomRight": "15415866467028105440"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPATRiflePickup",
    "CodeName": "ATRifleW",
    "ChassisName": "Anti-Tank Rifle",
    "DisplayName": "20 Neville Anti-Tank Rifle",
    "Description": "The Neville is unmatched in its versatility as a portable, magazine-based anti-armour firearm.",
    "Encumbrance": 200,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockATRifle",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/ATRifleItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPATRifleComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LargeProneRifle",
      "CompatibleAmmoCodeName": "ATRifleAmmo"
    },
    "AmmoDynamicData": {
      "Damage": 150,
      "Suppression": 20,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPAntiTankKineticDamageType.0",
        "DisplayName": "Anti-Tank Kinetic",
        "Type": "EDamageType::AntiTankKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeAntiTank.0",
        "TankArmourEffectType": "ETankArmourEffectType::Small",
        "VehicleSubsystemDisableMultipliers": 0.33,
        "bApplyTankArmourMechanics": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 150,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 37.5,
      "SingleRetrieveTime": 7.5,
      "CrateRetrieveTime": 12,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14356684855049393860",
        "topLeft": "0",
        "bottomRight": "16204198816044162588"
      },
      "crated": {
        "topLeft": "0",
        "full": "9734865427153231556",
        "bottomRight": "9646845574785018892"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPATRifleTC",
    "CodeName": "ATRifleTC",
    "ChassisName": "Mounted Anti-Tank Rifle",
    "DisplayName": "“Typhon” ra.XII",
    "Description": "This mounted anti-tank rifle boasts improved accuracy over its free-standing counterparts. The Typhon was specifically designed with shock absorption in mind, allowing for faster, more consistent firing patterns.",
    "Encumbrance": 300,
    "EquipmentSlot": "EEquipmentSlot::Large",
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockATRifleT",
    "Icon": "War/Content/Textures/UI/ItemIcons/ATRifleTCIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPATRifleTCGunComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LargeDeployableItem",
      "DeployCodeName": "DeployedATRifleTC"
    },
    "bIsLarge": true,
    "bSupportsVehicleMounts": true,
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Wood",
          "Quantity": 5,
          "DisplayName": "Refined Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 125,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13915895005114340190",
        "topLeft": "0",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "0",
        "full": "9592439501355025246",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPATRPGAmmoPickup",
    "CodeName": "ATRPGAmmo",
    "DisplayName": "AP/RPG",
    "Description": "An armour piercing projectile used with specialized RPG launchers.",
    "Encumbrance": 95,
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HeavyAmmo",
    "FactionVariant": "EFactionId::Colonials",
    "ItemFlagsMask": 17,
    "Icon": "War/Content/Textures/UI/ItemIcons/ATRpgAmmoItemIcon.0",
    "AmmoDynamicData": {
      "Damage": 550,
      "Suppression": 20,
      "ExplosionRadius": 200,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPArmourPiercingDamageType.0",
        "DisplayName": "Armour Piercing",
        "Type": "EDamageType::ArmourPiercing",
        "DescriptionDetails": "High chance to penetrate armoured vehicles",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeAPIcon.0",
        "TankArmourEffectType": "ETankArmourEffectType::Large",
        "TankArmourPenetrationFactor": 1.5,
        "bApplyTankArmourMechanics": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeAPIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Explosive",
          "Quantity": 75,
          "DisplayName": "Explosive Materials"
        },
        {
          "ItemCodeName": "Cloth",
          "Quantity": 60,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15110531603066132084",
        "topLeft": "15028845445381961585",
        "bottomRight": "6989303482343251968"
      },
      "crated": {
        "topLeft": "15028845445381961585",
        "full": "10503349185348245108",
        "bottomRight": "9619261078612502528"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPATRPGCPickup",
    "CodeName": "ATRPGC",
    "ChassisName": "Anti-Tank RPG",
    "DisplayName": "Venom c.II 35",
    "Description": "The Venom RPG launcher fires anti-tank charges. Its simple design makes it easy to deploy, even in high-stakes operations.",
    "Encumbrance": 165,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockATRPG",
    "ItemFlagsMask": 33,
    "Icon": "War/Content/Textures/UI/ItemIcons/ATRPGCItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPATRPGCItemComponent.0",
      "MultiAmmo": [
        "ATRPGAmmo"
      ],
      "ProjectileClass": {
        "ExplosiveCodeName": "ATRPGAmmo",
        "AutoDetonateTime": 0.9,
        "ProjectileDeathDelay": 8
      }
    },
    "AmmoDynamicData": {
      "Damage": 550,
      "Suppression": 20,
      "ExplosionRadius": 200,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPArmourPiercingDamageType.0",
        "DisplayName": "Armour Piercing",
        "Type": "EDamageType::ArmourPiercing",
        "DescriptionDetails": "High chance to penetrate armoured vehicles",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeAPIcon.0",
        "TankArmourEffectType": "ETankArmourEffectType::Large",
        "TankArmourPenetrationFactor": 1.5,
        "bApplyTankArmourMechanics": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeAPIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Wood",
          "Quantity": 15,
          "DisplayName": "Refined Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 50,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13884990619423146846",
        "topLeft": "15028845445381961585",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "15028845445381961585",
        "full": "13893997270000026462",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPATRPGHeavyCPickup",
    "CodeName": "ATRPGHeavyC",
    "ChassisName": "Anti-Tank RPG",
    "DisplayName": "Bane 45",
    "Description": "This shoulder-mounted heavy launcher is the first of its kind. It features heavy blast shielding and is capable of launching anti-tank charges over relatively large distances. ",
    "Encumbrance": 280,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockATRPGHeavy",
    "ItemFlagsMask": 33,
    "Icon": "War/Content/Textures/UI/ItemIcons/ATRpgItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPATRPGHeavyCItemComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::RPGHeavy",
      "MultiAmmo": [
        "ATRPGAmmo"
      ],
      "ProjectileClass": {
        "AutoDetonateTime": 1.25,
        "ExplosiveCodeName": "ATRPGAmmo",
        "ProjectileDeathDelay": 8
      }
    },
    "AmmoDynamicData": {
      "Damage": 550,
      "Suppression": 20,
      "ExplosionRadius": 200,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPArmourPiercingDamageType.0",
        "DisplayName": "Armour Piercing",
        "Type": "EDamageType::ArmourPiercing",
        "DescriptionDetails": "High chance to penetrate armoured vehicles",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeAPIcon.0",
        "TankArmourEffectType": "ETankArmourEffectType::Large",
        "TankArmourPenetrationFactor": 1.5,
        "bApplyTankArmourMechanics": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeAPIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 150,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Wood",
          "Quantity": 40,
          "DisplayName": "Refined Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 125,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13958732004153365366",
        "topLeft": "15028845445314852721",
        "bottomRight": "17940352998421094592"
      },
      "crated": {
        "topLeft": "15028845445314852721",
        "full": "13935088106910782326",
        "bottomRight": "15419333364628350976"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPATRPGIndirectAmmo",
    "CodeName": "ATRPGIndirectAmmo",
    "DisplayName": "ARC/RPG",
    "Description": "An armour piercing projectile used with indirect RPG launchers.",
    "Encumbrance": 95,
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HeavyAmmo",
    "FactionVariant": "EFactionId::Wardens",
    "ItemFlagsMask": 17,
    "Icon": "War/Content/Textures/UI/ItemIcons/ATMortarAmmoItemIcon.0",
    "AmmoDynamicData": {
      "Damage": 750,
      "Suppression": 20,
      "ExplosionRadius": 200,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPArmourPiercingNoBonusesDamageType.0",
        "DisplayName": "Armour Piercing",
        "Type": "EDamageType::ArmourPiercing",
        "DescriptionDetails": "High chance to penetrate armoured vehicles.\nAdditional 100% chance to penetrate armoured vehicles.",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeAPIcon.0",
        "TankArmourEffectType": "ETankArmourEffectType::Large",
        "TankArmourPenetrationFactor": 2.5,
        "bApplyTankArmourMechanics": true,
        "bApplyTankArmourAngleRangeBonuses": false,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeAPIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Explosive",
          "Quantity": 75,
          "DisplayName": "Explosive Materials"
        },
        {
          "ItemCodeName": "Cloth",
          "Quantity": 60,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15039596597347422980",
        "topLeft": "15028845445381961585",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "15028845445381961585",
        "full": "12741634888563774212",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPATRPGLightCPickup",
    "CodeName": "ATRPGLightC",
    "ChassisName": "Anti-Tank RPG",
    "DisplayName": "Ignifist 30",
    "Description": "This single-use rocket can be fired a short distance. Designed to punch holes into tanks, the Ignifist is the perfect tool for infantry anticipating armoured resistance. ",
    "Encumbrance": 120,
    "EquipmentSlot": "EEquipmentSlot::Tertiary",
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockATRPGLight",
    "ItemFlagsMask": 33,
    "Icon": "War/Content/Textures/UI/ItemIcons/ATRPGLightCItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPATRPGLightCItemComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "MultiAmmo": [],
      "bIsSingleUse": true,
      "ProjectileClass": {
        "ExplosiveCodeName": "ATRPGLightCAmmo",
        "AutoDetonateTime": 0.55,
        "PenetrationBonusMaxRange": 1500,
        "ProjectileDeathDelay": 8
      }
    },
    "AmmoDynamicData": {
      "Damage": 325,
      "Suppression": 20,
      "ExplosionRadius": 200,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPArmourPiercingDamageType.0",
        "DisplayName": "Armour Piercing",
        "Type": "EDamageType::ArmourPiercing",
        "DescriptionDetails": "High chance to penetrate armoured vehicles",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeAPIcon.0",
        "TankArmourEffectType": "ETankArmourEffectType::Large",
        "TankArmourPenetrationFactor": 1.5,
        "bApplyTankArmourMechanics": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeAPIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 85,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Explosive",
          "Quantity": 35,
          "DisplayName": "Explosive Materials"
        }
      ],
      "QuantityPerCrate": 10,
      "CrateProductionTime": 75,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13958172912052274804",
        "topLeft": "15028845445314852657",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "15028845445314852657",
        "full": "10786653611960779380",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPATRPGTWPickup",
    "CodeName": "ATRPGTW",
    "ChassisName": "Mounted Anti-Tank RPG",
    "DisplayName": "Bonesaw MK.3",
    "Description": "This variant of the Bonesaw MK.3 is specially designed for use with tripod mounts. This affords it with increased stability and maximum potential range.",
    "Encumbrance": 300,
    "EquipmentSlot": "EEquipmentSlot::Large",
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockATRPGHeavy",
    "ItemFlagsMask": 33,
    "Icon": "War/Content/Textures/UI/ItemIcons/ATMortarWTripodItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPATRPGTWComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LargeDeployableItem",
      "CompatibleAmmoCodeName": "ATRPGIndirectAmmo",
      "DeployCodeName": "DeployedATRPGTW"
    },
    "bIsLarge": true,
    "bSupportsVehicleMounts": true,
    "AmmoDynamicData": {
      "Damage": 750,
      "Suppression": 20,
      "ExplosionRadius": 200,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPArmourPiercingNoBonusesDamageType.0",
        "DisplayName": "Armour Piercing",
        "Type": "EDamageType::ArmourPiercing",
        "DescriptionDetails": "High chance to penetrate armoured vehicles.\nAdditional 100% chance to penetrate armoured vehicles.",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeAPIcon.0",
        "TankArmourEffectType": "ETankArmourEffectType::Large",
        "TankArmourPenetrationFactor": 2.5,
        "bApplyTankArmourMechanics": true,
        "bApplyTankArmourAngleRangeBonuses": false,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeAPIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Wood",
          "Quantity": 5,
          "DisplayName": "Refined Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 250,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13877667906652211004",
        "topLeft": "9355150010732082993",
        "bottomRight": "2917486471324641344"
      },
      "crated": {
        "topLeft": "9355150010732082993",
        "full": "10435791858076485436",
        "bottomRight": "9618698128656984128"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPATRPGWPickup",
    "CodeName": "ATRPGW",
    "ChassisName": "Anti-Tank RPG",
    "DisplayName": "Bonesaw MK.3",
    "Description": "The pride of the Warden anti-armour arsenal, the Bonesaw MK.3 has one job: to cut through the heavy metal plating of Colonial tanks.",
    "Encumbrance": 220,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockATRPG",
    "ItemFlagsMask": 33,
    "Icon": "War/Content/Textures/UI/ItemIcons/ATMortarItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPATRPGWItemComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LargeProneRifle",
      "MultiAmmo": [
        "ATRPGIndirectAmmo"
      ],
      "ProjectileClass": {
        "ExplosiveCodeName": "ATRPGIndirectAmmo",
        "AutoDetonateTime": 2,
        "ProjectileDeathDelay": 8
      }
    },
    "AmmoDynamicData": {
      "Damage": 750,
      "Suppression": 20,
      "ExplosionRadius": 200,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPArmourPiercingNoBonusesDamageType.0",
        "DisplayName": "Armour Piercing",
        "Type": "EDamageType::ArmourPiercing",
        "DescriptionDetails": "High chance to penetrate armoured vehicles.\nAdditional 100% chance to penetrate armoured vehicles.",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeAPIcon.0",
        "TankArmourEffectType": "ETankArmourEffectType::Large",
        "TankArmourPenetrationFactor": 2.5,
        "bApplyTankArmourMechanics": true,
        "bApplyTankArmourAngleRangeBonuses": false,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeAPIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Wood",
          "Quantity": 25,
          "DisplayName": "Refined Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 50,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13958170162265854828",
        "topLeft": "15028845445314852721",
        "bottomRight": "17363661486110736384"
      },
      "crated": {
        "topLeft": "15028845445314852721",
        "full": "9358869043625329452",
        "bottomRight": "15419333431183736832"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPBasicMaterials",
    "CodeName": "Cloth",
    "DisplayName": "Basic Materials",
    "Description": "Resource used for building basic structures and producing items.",
    "Encumbrance": 6,
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::RefinedResourceFastRetrieve",
    "ItemFlagsMask": 259,
    "Icon": "War/Content/Textures/UI/ItemIcons/BasicMaterialsIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 100,
      "CrateProductionTime": 500,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 5,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9634658966038842745",
        "topLeft": "11698583038029550245",
        "bottomRight": "17361623678751605506"
      },
      "crated": {
        "topLeft": "11698583038029550245",
        "full": "10753804023192030585",
        "bottomRight": "15415956489541517312"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPBayonetPickup",
    "CodeName": "Bayonet",
    "ChassisName": "Bayonet",
    "DisplayName": "Buckhorn CCQ-18",
    "Description": "Attached to the barrel of a rifle, this short blade can spear enemies in close quarters encounters.",
    "Encumbrance": 10,
    "EquipmentSlot": "EEquipmentSlot::Accessory",
    "ItemCategory": "EItemCategory::Utility",
    "ItemProfileType": "EItemProfileType::Accessory",
    "TechID": "ETechID::UnlockBayonet",
    "Icon": "War/Content/Textures/UI/ItemIcons/BayonetIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 40,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 30,
      "SingleRetrieveTime": 1.5,
      "CrateRetrieveTime": 6,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13888873537270731350",
        "topLeft": "10551250501304685165",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "10551250501304685165",
        "full": "10673303403271049814",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPBloodPlasmaPickUp",
    "CodeName": "BloodPlasma",
    "DisplayName": "Blood Plasma",
    "Description": "A blood component used to treat wounded soldiers on the battlefield.",
    "ItemCategory": "EItemCategory::Medical",
    "ItemProfileType": "EItemProfileType::Tool",
    "ItemFlagsMask": 513,
    "Icon": "War/Content/Textures/UI/ItemIcons/BloodPlasmaItemIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 80,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 50,
      "CrateProductionTime": 40,
      "SingleRetrieveTime": 0.5,
      "CrateRetrieveTime": 8,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14716413159499513266",
        "topLeft": "12273904765277482346",
        "bottomRight": "14703711700761010449"
      },
      "crated": {
        "topLeft": "12273904765277482346",
        "full": "10122741265638653939",
        "bottomRight": "9585747856732397825"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPCarbinePickup",
    "CodeName": "RifleLightW",
    "ChassisName": "Rifle",
    "DisplayName": "Blakerow 871",
    "Description": "The Blakerow is a carbine with a high rate of fire compared to its bolt-action predecessor. This increased fire rate does come at the cost of innate stopping power; however, its versatility and lightweight frame more than make up for any perceived shortcomings.",
    "Encumbrance": 70,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockRifleLight",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/CarbineItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPCarbineComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "CompatibleAmmoCodeName": "RifleAmmo"
    },
    "AmmoDynamicData": {
      "Damage": 45,
      "Suppression": 17,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 140,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 80,
      "SingleRetrieveTime": 3.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13915895116791288734",
        "topLeft": "0",
        "bottomRight": "18230571285019099136"
      },
      "crated": {
        "topLeft": "0",
        "full": "10475145019729646558",
        "bottomRight": "9619542553581873152"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPComponentsPickup",
    "CodeName": "Components",
    "DisplayName": "Components",
    "Description": "Components that can be salvaged into Refined Materials at a Refinery",
    "Encumbrance": 12,
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::RawResource",
    "ItemFlagsMask": 2049,
    "Icon": "War/Content/Textures/UI/ItemIcons/ComponentsIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Components",
          "Quantity": 70
        }
      ],
      "QuantityPerCrate": 100,
      "CrateProductionTime": 200,
      "SingleRetrieveTime": 6,
      "CrateRetrieveTime": 6,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10902118091275199654",
        "topLeft": "10766493838540775597",
        "bottomRight": "13893623430534775564"
      },
      "crated": {
        "topLeft": "10766493838540775597",
        "full": "9754267294048018599",
        "bottomRight": "15334757557986246913"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPConcreteMaterials",
    "CodeName": "Concrete",
    "DisplayName": "Concrete Materials",
    "Description": "A concrete compound that is used to build heavily fortified structures.",
    "Encumbrance": 100,
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::OnSiteResources",
    "ItemFlagsMask": 257,
    "Icon": "War/Content/Textures/UI/ItemIcons/CivicMaterialsIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "StrongMaterials",
          "Quantity": 20
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 200,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10420551016478893950",
        "topLeft": "13424827678307017865",
        "bottomRight": "16194962608158195712"
      },
      "crated": {
        "topLeft": "13424827678307017865",
        "full": "10781119911815368574",
        "bottomRight": "15406823948117131264"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPCopper",
    "CodeName": "Copper",
    "DisplayName": "Copper",
    "Description": "Copper can be refined into Copper Alloy, which is used in the prototyping process for vehicles.",
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::RawResource",
    "ItemFlagsMask": 2049,
    "Icon": "War/Content/Textures/UI/ItemIcons/ResourceCopperIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [],
      "QuantityPerCrate": 100,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 6,
      "CrateRetrieveTime": 6,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10823673565061035441",
        "topLeft": "12273905834858816858",
        "bottomRight": "14757395207752327424"
      },
      "crated": {
        "topLeft": "12273905834858816858",
        "full": "10689691475886207409",
        "bottomRight": "14180824538652082176"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPCopperAlloy",
    "CodeName": "CopperA",
    "DisplayName": "Copper Alloy",
    "Description": "Copper Alloy can be used to produce Vehicle Prototypes at the Engineering Center.",
    "Encumbrance": 15,
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::RefinedResource",
    "Icon": "War/Content/Textures/UI/ItemIcons/ResourceCopperRefinedIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "CopperA",
          "Quantity": 20
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 1000,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14174019119416066229",
        "topLeft": "10338157661142883512",
        "bottomRight": "15191436017852768256"
      },
      "crated": {
        "topLeft": "10338157661142883512",
        "full": "9536441800041415060",
        "bottomRight": "15335454371332775936"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPCriticalSoldierPickUp",
    "CodeName": "CriticalSoldier",
    "DisplayName": "Critically Wounded Soldier",
    "Description": "A soldier that has been critically wounded on the battlefield. Deliver this soldier to a Hospital to recover Soldier Supplies.",
    "Encumbrance": 300,
    "EquipmentSlot": "EEquipmentSlot::Large",
    "ItemCategory": "EItemCategory::Medical",
    "ItemProfileType": "EItemProfileType::UniqueItem",
    "Icon": "War/Content/Textures/UI/ItemIcons/CriticallyWoundedIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPCriticalSoldierComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::CarryingCriticalSoldier"
    },
    "bIsLarge": true,
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 50,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 50,
      "CrateProductionTime": 125,
      "SingleRetrieveTime": 2.5,
      "CrateRetrieveTime": 25,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9894040252822525625",
        "topLeft": "11838650969999649365",
        "bottomRight": "15378225597265767604"
      },
      "crated": {
        "topLeft": "11838650969999649365",
        "full": "10163200716616107769",
        "bottomRight": "15366399541986797712"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPCrudeOilPickup",
    "CodeName": "CrudeOil",
    "DisplayName": "Crude Oil",
    "Description": "Unprocessed oil that can be refined into valuable fuel.",
    "Encumbrance": 325,
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::UnstackableRawResource",
    "Icon": "War/Content/Textures/UI/ItemIcons/CrudeOilIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 1,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 1,
      "CrateProductionTime": 4,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 5,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "11125409730138759578",
        "topLeft": "11843142575358911562",
        "bottomRight": "16276300286459379712"
      },
      "crated": {
        "topLeft": "11843142575358911562",
        "full": "11417228848071532954",
        "bottomRight": "17717197080520318976"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPDieselPickup",
    "CodeName": "Diesel",
    "DisplayName": "Diesel",
    "Description": "Common fuel used to power all vehicles and resource mines.",
    "Encumbrance": 290,
    "EquipmentSlot": "EEquipmentSlot::Tertiary",
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::RefinedFuel",
    "Icon": "War/Content/Slate/Images/ResourceFuelIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPDieselComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::HeavySingleHandItem"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "None",
          "Quantity": 0
        }
      ],
      "QuantityPerCrate": 1,
      "CrateProductionTime": 5,
      "SingleRetrieveTime": 1.5,
      "CrateRetrieveTime": 5,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14389397090714989261",
        "topLeft": "13503027827486468786",
        "bottomRight": "14756053249555695712"
      },
      "crated": {
        "topLeft": "13503027827486468786",
        "full": "9750408012642857620",
        "bottomRight": "15333640507523858496"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPExplosiveLightCPickup",
    "CodeName": "ExplosiveLightC",
    "ChassisName": "Explosive Charge",
    "DisplayName": "Hydra’s Whisper",
    "Description": "This unique demolition tool is a long, metal tube packed with explosives. The Hydra’s Whisper is designed to destroy out-of-reach movement impairing structures and detonate any mines along the length of the tube.",
    "Encumbrance": 300,
    "EquipmentSlot": "EEquipmentSlot::Large",
    "ItemCategory": "EItemCategory::Utility",
    "ItemProfileType": "EItemProfileType::Tool",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockExplosiveLight",
    "Icon": "War/Content/Textures/UI/Menus/BangaloreItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPExplosiveLightCComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LargeDeployableItem"
    },
    "bIsLarge": true,
    "AmmoDynamicData": {
      "Damage": 250,
      "Suppression": 100,
      "ExplosionRadius": 200,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPDemolitionDamageType.0",
        "DisplayName": "Demolition",
        "Type": "EDamageType::Demolition",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeLRAIcon.0",
        "bCanRuinStructures": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeLRAIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Explosive",
          "Quantity": 40,
          "DisplayName": "Explosive Materials"
        },
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13957044399798555422",
        "topLeft": "15678762210738368655",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "15678762210738368655",
        "full": "11655845694169223966",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPExplosiveMaterial",
    "CodeName": "Explosive",
    "DisplayName": "Explosive Materials",
    "Description": "Resource used for producing heavy explosive weapons.",
    "Encumbrance": 30,
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::RefinedResource",
    "Icon": "War/Content/Textures/UI/ItemIcons/ExplosiveMaterialIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Explosive",
          "Quantity": 200,
          "DisplayName": "Explosive Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 750,
      "SingleRetrieveTime": 7.5,
      "CrateRetrieveTime": 7.5,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14716692398586249267",
        "topLeft": "12345678650954896810",
        "bottomRight": "15042233999627960448"
      },
      "crated": {
        "topLeft": "12345678650954896810",
        "full": "9541497875834128695",
        "bottomRight": "15409183497914433536"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPGasMaskFilterPickUp",
    "CodeName": "GasMaskFilter",
    "DisplayName": "Gas Mask Filter",
    "Description": "When attached to a Gas Mask, this filter provides fresh air to the wearer.",
    "Encumbrance": 20,
    "ItemCategory": "EItemCategory::Utility",
    "ItemProfileType": "EItemProfileType::Tool",
    "ItemFlagsMask": 5,
    "Icon": "War/Content/Textures/UI/ItemIcons/GasMaskFilterIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 50,
      "SingleRetrieveTime": 2.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10715241410181292965",
        "topLeft": "10048737614504610393",
        "bottomRight": "16484511676675129344"
      },
      "crated": {
        "topLeft": "10048737614504610393",
        "full": "10723685801254281605",
        "bottomRight": "15414775617282899968"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPGrenadeAdapterPickup",
    "CodeName": "GrenadeAdapter",
    "ChassisName": "Grenade Launcher",
    "DisplayName": "The Ospreay",
    "Description": "A rifle attachment that fires grenades with pneumatic force. Along with specialized grenades, it can launch standard grenades.",
    "Encumbrance": 10,
    "EquipmentSlot": "EEquipmentSlot::Accessory",
    "ItemCategory": "EItemCategory::Utility",
    "ItemProfileType": "EItemProfileType::Accessory",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockGrenadeAdapter",
    "Icon": "War/Content/Textures/UI/ItemIcons/GrenadeAdapterIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Wood",
          "Quantity": 10,
          "DisplayName": "Refined Materials"
        },
        {
          "ItemCodeName": "Cloth",
          "Quantity": 85,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10528959412908943212",
        "topLeft": "0",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "0",
        "full": "10817189893142308716",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPGrenadeCPickup",
    "CodeName": "GrenadeC",
    "DisplayName": "Bomastone Grenade",
    "Description": "The Bomastone is a ‘stick’ style fragmentation grenade with a handle designed to aid in lobbing over moderate distances.",
    "FactionVariant": "EFactionId::Colonials",
    "Icon": "War/Content/Textures/UI/ItemIcons/GrenadeCItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/GrenadeCComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::SingleHandItem"
    },
    "ChassisName": "Grenade",
    "EquipmentSlot": "EEquipmentSlot::Tertiary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::Throwable",
    "ItemFlagsMask": 9,
    "AmmoDynamicData": {
      "Damage": 150,
      "Suppression": 20,
      "ExplosionRadius": 650,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPShrapnelDamageType.0",
        "DisplayName": "Shrapnel",
        "Type": "EDamageType::Shrapnel",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSHIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bCanWoundCharacter": true,
        "bAlwaysAppliesBleeding": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSHIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Explosive",
          "Quantity": 20,
          "DisplayName": "Explosive Materials"
        }
      ],
      "QuantityPerCrate": 25,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 4,
      "CrateRetrieveTime": 12,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15030605766186239868",
        "topLeft": "10391843171734792136",
        "bottomRight": "12261847362488814378"
      },
      "crated": {
        "topLeft": "10391843171734792136",
        "full": "10707079721879865212",
        "bottomRight": "9595616119706642464"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPGrenadeLauncherCPickup",
    "CodeName": "GrenadeLauncherC",
    "ChassisName": "Grenade Launcher",
    "DisplayName": "KLG901-2 Lunaire F",
    "Description": "A weapon designed to launch specialty grenades over long-distances.  This modern Kraunian firearm uses advanced propulsion designed for increased efficiency due to the overall weight of the weapon and projectiles. ",
    "Encumbrance": 80,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockGrenadeLauncher",
    "ItemFlagsMask": 33,
    "Icon": "War/Content/Textures/UI/ItemIcons/GrenadeLauncherCItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPGrenadeLauncherCItemComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "FiringMode": "EProjectileFiringMode::Grenade",
      "MultiAmmo": [
        "GreenAsh",
        "SmokeGrenade",
        "HELaunchedGrenade"
      ]
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Wood",
          "Quantity": 5,
          "DisplayName": "Refined Materials"
        },
        {
          "ItemCodeName": "Cloth",
          "Quantity": 50,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 10,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15032787301414017906",
        "topLeft": "12273903644374837845",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "12273903644374837845",
        "full": "10673302862120442738",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPHeavyExplosiveMaterial",
    "CodeName": "HeavyExplosive",
    "DisplayName": "Heavy Explosive Materials",
    "Description": "Resource used for producing heavy explosive weapons.",
    "Encumbrance": 50,
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::RefinedResource",
    "Icon": "War/Content/Textures/UI/ItemIcons/HeavyExplosiveMaterialIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "HeavyExplosive",
          "Quantity": 400,
          "DisplayName": "Heavy Explosive Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 1000,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15000979918018191077",
        "topLeft": "12202127629128143978",
        "bottomRight": "14178669182858563600"
      },
      "crated": {
        "topLeft": "12202127629128143978",
        "full": "10685422892398563301",
        "bottomRight": "15345007205380259984"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPHEGrenadePickup",
    "CodeName": "HEGrenade",
    "ChassisName": "HE Grenade",
    "DisplayName": "Mammon 91-b",
    "Description": "This densely packed, high-explosive grenade is designed to damage structures and vehicles. ",
    "Encumbrance": 90,
    "EquipmentSlot": "EEquipmentSlot::Tertiary",
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::Throwable",
    "ItemFlagsMask": 9,
    "Icon": "War/Content/Textures/UI/ItemIcons/HEGrenadeItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPHEGrenadeItemComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::SingleHandItem"
    },
    "AmmoDynamicData": {
      "Damage": 240,
      "Suppression": 8,
      "ExplosionRadius": 175,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPExplosiveDamageType.0",
        "DisplayName": "Explosive",
        "Type": "EDamageType::Explosive",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSEIcon.0",
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSEIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Explosive",
          "Quantity": 10,
          "DisplayName": "Explosive Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 80,
      "SingleRetrieveTime": 4,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10418642808533960680",
        "topLeft": "14153752149198227514",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "14153752149198227514",
        "full": "10706802816742608872",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPInfantrySupportGun",
    "CodeName": "ISGTC",
    "ChassisName": "Mounted Infantry Support Gun",
    "DisplayName": "Daucus isg.III",
    "Description": "This heavy infantry cannon requires a tripod for stability. The Daucus is designed to give infantry a foothold against enemy vehicles and light fortifications or established fortified garrisons.",
    "Encumbrance": 220,
    "EquipmentSlot": "EEquipmentSlot::Large",
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockISG",
    "ItemFlagsMask": 33,
    "Icon": "War/Content/Textures/UI/ItemIcons/InfantrySupportGunItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPInfantrySupportGunComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LargeDeployableItem",
      "DeployCodeName": "DeployedISG"
    },
    "bIsLarge": true,
    "bSupportsVehicleMounts": true,
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSEIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Wood",
          "Quantity": 5,
          "DisplayName": "Refined Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 125,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14100824747924865986",
        "topLeft": "14154033624175200318",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "14154033624175200318",
        "full": "14364285600737608642",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPIron",
    "CodeName": "Iron",
    "DisplayName": "Iron",
    "Description": "Iron can be refined into Iron Alloy, which is used in the prototyping process for vehicles.",
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::RawResource",
    "ItemFlagsMask": 2049,
    "Icon": "War/Content/Textures/UI/ItemIcons/ResouceIronIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [],
      "QuantityPerCrate": 100,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 6,
      "CrateRetrieveTime": 6,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10391053161379781042",
        "topLeft": "12273623273254856010",
        "bottomRight": "17361623678751604736"
      },
      "crated": {
        "topLeft": "12273623273254856010",
        "full": "10672457734927800754",
        "bottomRight": "15415938898437619712"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPIronAlloy",
    "CodeName": "IronA",
    "DisplayName": "Iron Alloy",
    "Description": "Iron Alloy can be used to produce Vehicle Prototypes at the Engineering Center.",
    "Encumbrance": 15,
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::RefinedResource",
    "Icon": "War/Content/Textures/UI/ItemIcons/ResouceIronRefinedIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "IronA",
          "Quantity": 20
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 1000,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10420607581996006354",
        "topLeft": "12273894814055764589",
        "bottomRight": "16204198715727069312"
      },
      "crated": {
        "topLeft": "12273894814055764589",
        "full": "10685687191808867282",
        "bottomRight": "14258513934330904704"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPItemCrate",
    "CodeName": "Crate",
    "DisplayName": "Crate",
    "Description": "A crate of items. These must be submitted to a stockpile before contained items can be retrieved.",
    "Encumbrance": 300,
    "ItemProfileType": "EItemProfileType::UniqueItem",
    "Icon": "War/Content/Textures/UI/ItemIcons/CrateItemIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "None",
          "Quantity": 0
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 600,
      "SingleRetrieveTime": 30,
      "CrateRetrieveTime": 120,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10499350137471091342",
        "topLeft": "11780508105540808813",
        "bottomRight": "16771616153334714368"
      },
      "crated": {
        "topLeft": "11780508105540808813",
        "full": "10744249855525637022",
        "bottomRight": "15410271742917607424"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPLightMachineGunPickup",
    "CodeName": "AssaultRifleC",
    "ChassisName": "Light Machine Gun",
    "DisplayName": "Catara mo.II",
    "Description": "A titanic light machine gun capable of scattering infantry lines with ease, the Catara is a modern weapon for the modern Colonial.",
    "Encumbrance": 180,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockAssaultRifle",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/LightMachineGunIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPLightMachineGunItemComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LightMachineGun",
      "CompatibleAmmoCodeName": "MGAmmo"
    },
    "AmmoDynamicData": {
      "Damage": 55,
      "Suppression": 18,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPHeavyKineticDamageType.0",
        "DisplayName": "Heavy Kinetic",
        "Type": "EDamageType::HeavyKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeHBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 165,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 10,
      "CrateProductionTime": 80,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14132138158345761768",
        "topLeft": "0",
        "bottomRight": "14757395258967641292"
      },
      "crated": {
        "topLeft": "0",
        "full": "9537269993552565224",
        "bottomRight": "9587172450232723592"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPListeningKitPickup",
    "CodeName": "ListeningKit",
    "ChassisName": "Equipment",
    "DisplayName": "Listening Kit",
    "Description": "A device used to intercept enemy radio broadcasts transmitted from nearby sources.",
    "Encumbrance": 300,
    "EquipmentSlot": "EEquipmentSlot::Large",
    "ItemCategory": "EItemCategory::Utility",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "TechID": "ETechID::UnlockListeningKit",
    "Icon": "War/Content/Textures/UI/ItemIcons/ListeningKitIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPListeningKitComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LargeDeployableItem",
      "DeployCodeName": "DeployedListeningKit"
    },
    "bIsLarge": true,
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 150,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 60,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10551209978858738029",
        "topLeft": "11983456647066200490",
        "bottomRight": "14757390055151550656"
      },
      "crated": {
        "topLeft": "11983456647066200490",
        "full": "10756970379980720550",
        "bottomRight": "15419313573431631872"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPLongRangeArtilleryAmmoPickup",
    "CodeName": "LRArtilleryAmmo",
    "DisplayName": "300mm",
    "Description": "Standard payload used with Storm Cannons.",
    "Encumbrance": 400,
    "EquipmentSlot": "EEquipmentSlot::Large",
    "ItemCategory": "EItemCategory::HeavyAmmo",
    "ItemProfileType": "EItemProfileType::HeavyAmmo",
    "TechID": "ETechID::UnlockLongRangeArtillery",
    "ItemFlagsMask": 17,
    "Icon": "War/Content/Textures/UI/ItemIcons/LRArtilleryAmmoItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPLongRangeArtilleryAmmoComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LargeDeployableItem"
    },
    "bIsLarge": true,
    "AmmoDynamicData": {
      "Damage": 1500,
      "Suppression": 200,
      "ExplosionRadius": 1500,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPHighExplosiveRuinDamageType.0",
        "DisplayName": "High Explosive",
        "Type": "EDamageType::HighExplosive",
        "DescriptionDetails": "Reduced damage against Trenches",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeHEIcon.0",
        "bCanRuinStructures": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 450,
      "DamageFalloff": 2,
      "AccuracyRadius": 5000,
      "EnvironmentImpactAmount": 1,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeHEIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "HeavyExplosive",
          "Quantity": 30,
          "DisplayName": "Heavy Explosive Materials"
        },
        {
          "ItemCodeName": "Cloth",
          "Quantity": 135,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 125,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13958103628978347075",
        "topLeft": "9474777381175337999",
        "bottomRight": "17941493161786343424"
      },
      "crated": {
        "topLeft": "9474777381175337999",
        "full": "9634648123808176195",
        "bottomRight": "9654726908765560832"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPMGCPickup",
    "CodeName": "MGC",
    "ChassisName": "Machine Gun",
    "DisplayName": "KRN886-127 Gast Machine Gun",
    "Description": "The Gast is a deadly but cumbersome Kraunian heavy machine gun. It is best suited to holding and defending established fortifications or garrisoned structures against encroaching infantry.",
    "Encumbrance": 200,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockMG",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/MGCItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPMGCItemComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LargeProneRifle",
      "CompatibleAmmoCodeName": "MGAmmo"
    },
    "AmmoDynamicData": {
      "Damage": 55,
      "Suppression": 18,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPHeavyKineticDamageType.0",
        "DisplayName": "Heavy Kinetic",
        "Type": "EDamageType::HeavyKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeHBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Wood",
          "Quantity": 25,
          "DisplayName": "Refined Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14068176266267267782",
        "topLeft": "12273903644374837845",
        "bottomRight": "17363908872188133376"
      },
      "crated": {
        "topLeft": "12273903644374837845",
        "full": "9591598237470511814",
        "bottomRight": "10807647480133517312"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPMGTC",
    "CodeName": "MGTC",
    "ChassisName": "Mounted Machinegun",
    "DisplayName": "Lamentum mm.IV",
    "Description": "Built on the bones of the first automatic weapons introduced to the Legion, the “Lamentum” mm.IV is still quite an intimidating force to encounter on the battlefield. Boasting a large magazine and impressive active range, this mounted machinegun excels at laying down consistent suppressive fire.",
    "Encumbrance": 300,
    "EquipmentSlot": "EEquipmentSlot::Large",
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockMGT",
    "Icon": "War/Content/Textures/UI/ItemIcons/HeavyMachineGunIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPMGTCGunComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LargeDeployableItem",
      "DeployCodeName": "DeployedMGTC"
    },
    "bIsLarge": true,
    "bSupportsVehicleMounts": true,
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Wood",
          "Quantity": 5,
          "DisplayName": "Refined Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 125,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15176621014505866034",
        "topLeft": "0",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "0",
        "full": "10816015623112966962",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPMGTW",
    "CodeName": "MGTW",
    "ChassisName": "Mounted Machinegun",
    "DisplayName": "Malone Ratcatcher MK.1",
    "Description": "Early iterations of this machinegun were built to be emplaced in bunkers and on the decks of lightly armed warships, the Ratcatcher is Harvey Malone’s first freely mountable infantry weapon designed for field use. Just like its predecessors, this heavy weapon suppresses enemy soldiers with unmatched efficiency. ",
    "Encumbrance": 300,
    "EquipmentSlot": "EEquipmentSlot::Large",
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockMGT",
    "Icon": "War/Content/Textures/UI/ItemIcons/MGHeavyTWItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPMGTWGunComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LargeDeployableItem",
      "DeployCodeName": "DeployedMGTW"
    },
    "bIsLarge": true,
    "bSupportsVehicleMounts": true,
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Wood",
          "Quantity": 5,
          "DisplayName": "Refined Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 125,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13843838501997560590",
        "topLeft": "0",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "0",
        "full": "9520382998238741262",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPMGWPickup",
    "CodeName": "MGW",
    "DisplayName": "Malone MK.2",
    "Description": "This heavy machine gun is bulky enough to require a steady surface maintain stability. The Malone series of machine guns are unmatched defenders on the battlefield.",
    "FactionVariant": "EFactionId::Wardens",
    "Icon": "War/Content/Textures/UI/ItemIcons/MGWItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPMGWItemComponent.0",
      "FiringRate": 0.2,
      "EquippedGripType": "EEquippedWeaponGripType::LargeProneRifle",
      "CompatibleAmmoCodeName": "MGAmmo"
    },
    "ChassisName": "Machine Gun",
    "Encumbrance": 200,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "TechID": "ETechID::UnlockMG",
    "ItemFlagsMask": 129,
    "AmmoDynamicData": {
      "Damage": 55,
      "Suppression": 18,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPHeavyKineticDamageType.0",
        "DisplayName": "Heavy Kinetic",
        "Type": "EDamageType::HeavyKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeHBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Wood",
          "Quantity": 25,
          "DisplayName": "Refined Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10681804733988095644",
        "topLeft": "0",
        "bottomRight": "14107464018608308224"
      },
      "crated": {
        "topLeft": "0",
        "full": "10689615629162530460",
        "bottomRight": "9639790931964092608"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPMiniTankAmmoPickup",
    "CodeName": "MiniTankAmmo",
    "DisplayName": "30mm",
    "Description": "Standard explosive shell used with certain small vehicles and infantry weapons.",
    "Encumbrance": 95,
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::LargeItemAmmo",
    "ItemFlagsMask": 16401,
    "Icon": "War/Content/Textures/UI/ItemIcons/MiniTankAmmoItemIcon.0",
    "AmmoDynamicData": {
      "Damage": 400,
      "Suppression": 0,
      "ExplosionRadius": 200,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPExplosivePenetratingDamageType.0",
        "DisplayName": "Explosive",
        "Type": "EDamageType::Explosive",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSEIcon.0",
        "TankArmourEffectType": "ETankArmourEffectType::Large",
        "bApplyTankArmourMechanics": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSEIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 80,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Explosive",
          "Quantity": 20,
          "DisplayName": "Explosive Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13958099239500961409",
        "topLeft": "9258603511915325566",
        "bottomRight": "8141660387661602816"
      },
      "crated": {
        "topLeft": "9258603511915325566",
        "full": "9600888728698148481",
        "bottomRight": "9654726925678045184"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPMortarAmmoFLPickup",
    "CodeName": "MortarAmmoFL",
    "DisplayName": "Flare Mortar Shell",
    "Description": "A long-burning flare that ignites midair to illuminate a large area and reveals enemy targets.",
    "Encumbrance": 75,
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HeavyAmmo",
    "ItemFlagsMask": 17,
    "Icon": "War/Content/Textures/UI/ItemIcons/MortarAmmoIcon.0",
    "AmmoDynamicData": {
      "Damage": 0,
      "Suppression": 0,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPFlareDamageType.0",
        "DisplayName": "Flare",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeFLIcon.0",
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 200,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeFLIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Explosive",
          "Quantity": 10,
          "DisplayName": "Explosive Materials"
        },
        {
          "ItemCodeName": "Cloth",
          "Quantity": 60,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15110816363772604942",
        "topLeft": "15895842688634454796",
        "bottomRight": "6989303482343251968"
      },
      "crated": {
        "topLeft": "15895842688634454796",
        "full": "10456346149619200526",
        "bottomRight": "9618134938186442752"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPMortarAmmoPickup",
    "CodeName": "MortarAmmo",
    "DisplayName": "Mortar Shell",
    "Description": "An explosive payload used with mortar tubes.",
    "Encumbrance": 75,
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HeavyAmmo",
    "ItemFlagsMask": 17,
    "Icon": "War/Content/Textures/UI/ItemIcons/MortarAmmoIcon.0",
    "AmmoDynamicData": {
      "Damage": 300,
      "Suppression": 45,
      "ExplosionRadius": 500,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPHighExplosiveDamageType.0",
        "DisplayName": "High Explosive",
        "Type": "EDamageType::HighExplosive",
        "DescriptionDetails": "Reduced damage against Trenches",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeHEIcon.0",
        "bExposeInUI": true
      },
      "DamageInnerRadius": 250,
      "DamageFalloff": 1,
      "AccuracyRadius": 200,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeHEIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Explosive",
          "Quantity": 35,
          "DisplayName": "Explosive Materials"
        },
        {
          "ItemCodeName": "Cloth",
          "Quantity": 60,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 7.5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13957894859157369359",
        "topLeft": "9451221582838805519",
        "bottomRight": "6989303482343251968"
      },
      "crated": {
        "topLeft": "9451221582838805519",
        "full": "15100683264623604239",
        "bottomRight": "9618134938186442752"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPMortarAmmoSHPickup",
    "CodeName": "MortarAmmoSH",
    "DisplayName": "Shrapnel Mortar Shell",
    "Description": "An payload filled with shrapnel used with mortar tubes. Devastates nearby infantry.",
    "Encumbrance": 75,
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HeavyAmmo",
    "ItemFlagsMask": 17,
    "Icon": "War/Content/Textures/UI/ItemIcons/MortarAmmoIcon.0",
    "AmmoDynamicData": {
      "Damage": 125,
      "Suppression": 150,
      "ExplosionRadius": 750,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPShrapnelDamageType.0",
        "DisplayName": "Shrapnel",
        "Type": "EDamageType::Shrapnel",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSHIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bCanWoundCharacter": true,
        "bAlwaysAppliesBleeding": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 450,
      "DamageFalloff": 0,
      "AccuracyRadius": 200,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSHIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Explosive",
          "Quantity": 15,
          "DisplayName": "Explosive Materials"
        },
        {
          "ItemCodeName": "Cloth",
          "Quantity": 60,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13958176334150857230",
        "topLeft": "10391843171734792136",
        "bottomRight": "6989303482343251968"
      },
      "crated": {
        "topLeft": "10391843171734792136",
        "full": "10492656420625019406",
        "bottomRight": "9618134938186442752"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPMortarTankAmmoPickup",
    "CodeName": "MortarTankAmmo",
    "DisplayName": "250mm",
    "Description": "A shell that is launched over short distances by a spigot mortar.",
    "Encumbrance": 300,
    "EquipmentSlot": "EEquipmentSlot::Large",
    "ItemCategory": "EItemCategory::HeavyAmmo",
    "ItemProfileType": "EItemProfileType::HeavyAmmo",
    "ItemFlagsMask": 17,
    "Icon": "War/Content/Textures/UI/ItemIcons/MortarTankIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPMortarTankAmmoComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LargeDeployableItem"
    },
    "bIsLarge": true,
    "AmmoDynamicData": {
      "Damage": 1000,
      "Suppression": 0.85,
      "ExplosionRadius": 500,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPDemolitionDamageType.0",
        "DisplayName": "Demolition",
        "Type": "EDamageType::Demolition",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeLRAIcon.0",
        "bCanRuinStructures": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 250,
      "DamageFalloff": 0,
      "AccuracyRadius": 200,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeLRAIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 120,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "HeavyExplosive",
          "Quantity": 25,
          "DisplayName": "Heavy Explosive Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 150,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14029108036801178643",
        "topLeft": "9932449805276082318",
        "bottomRight": "17361641481138401504"
      },
      "crated": {
        "topLeft": "9932449805276082318",
        "full": "10552329640949328915",
        "bottomRight": "9651349174292078816"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPPetrolPickup",
    "CodeName": "Petrol",
    "DisplayName": "Petrol",
    "Description": "High end fuel that's refined from Crude Oil. Vehicles and resource mines that run on Petrol are more effective.",
    "Encumbrance": 325,
    "EquipmentSlot": "EEquipmentSlot::Tertiary",
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::RefinedFuel",
    "Icon": "War/Content/Textures/UI/ItemIcons/RefinedFuelIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPPetrolComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::HeavySingleHandItem"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "None",
          "Quantity": 0
        }
      ],
      "QuantityPerCrate": 1,
      "CrateProductionTime": 15,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14282103867654743747",
        "topLeft": "12919821911606963625",
        "bottomRight": "16196649533873905664"
      },
      "crated": {
        "topLeft": "12919821911606963625",
        "full": "9759926759679550355",
        "bottomRight": "15331426173037076480"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPPistolAmmoPickup",
    "CodeName": "PistolAmmo",
    "DisplayName": "8mm",
    "Description": "Standard ammunition for pistols.",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::LightAmmo",
    "ItemFlagsMask": 12353,
    "Icon": "War/Content/Textures/UI/ItemIcons/PistolAmmoItemIcon.0",
    "AmmoDynamicData": {
      "Damage": 30,
      "Suppression": 5,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 40,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 40,
      "CrateProductionTime": 20,
      "SingleRetrieveTime": 1,
      "CrateRetrieveTime": 8,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14247194488908303435",
        "topLeft": "9896428579194276953",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "9896428579194276953",
        "full": "14202158493444099147",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPPrototypeKit",
    "CodeName": "PrototypeKit",
    "DisplayName": "Prototype Kit",
    "Description": "Prototype parts to produce new types of equipment.",
    "ItemProfileType": "EItemProfileType::UniqueItem",
    "Icon": "War/Content/Textures/UI/ItemIcons/PrototypeKitIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [],
      "QuantityPerCrate": 0,
      "CrateProductionTime": 0,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15305829222052436192",
        "topLeft": "9546476227574319269",
        "bottomRight": "14617015429574426880"
      },
      "crated": {
        "topLeft": "9546476227574319269",
        "full": "9604553602994981056",
        "bottomRight": "15409692848832905216"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPRefinedMaterials",
    "CodeName": "Wood",
    "DisplayName": "Refined Materials",
    "Description": "Resource used for building advanced structures and producing special items.",
    "Encumbrance": 15,
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::RefinedResource",
    "ItemFlagsMask": 257,
    "Icon": "War/Content/Textures/UI/ItemIcons/RefinedMaterialsIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Wood",
          "Quantity": 400,
          "DisplayName": "Refined Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 1000,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10715514217689938115",
        "topLeft": "12273899203040203437",
        "bottomRight": "17940353960493711360"
      },
      "crated": {
        "topLeft": "12273899203040203437",
        "full": "10678360070528325827",
        "bottomRight": "15418206228307771392"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPRelicMaterials",
    "CodeName": "RelicMaterials",
    "DisplayName": "Relic Materials",
    "Description": "Vehicle parts used to assemble Relic vehicles.",
    "Encumbrance": 12,
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::RefinedResource",
    "ItemFlagsMask": 257,
    "Icon": "War/Content/Textures/UI/ItemIcons/RelicMaterialItemIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "RelicMaterials",
          "Quantity": 100
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 200,
      "SingleRetrieveTime": 6,
      "CrateRetrieveTime": 6,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "11256301613767925436",
        "topLeft": "12202105621114099305",
        "bottomRight": "17352515138404491296"
      },
      "crated": {
        "topLeft": "12202105621114099305",
        "full": "11264182910904901300",
        "bottomRight": "15334757284450402304"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPRevolverAmmo",
    "CodeName": "RevolverAmmo",
    "DisplayName": ".44mm",
    "Description": "Standard ammunition for revolvers.",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::LightAmmo",
    "ItemFlagsMask": 12353,
    "Icon": "War/Content/Textures/UI/ItemIcons/RevolverAmmoItemIcon.0",
    "AmmoDynamicData": {
      "Damage": 60,
      "Suppression": 6,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 40,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 40,
      "CrateProductionTime": 40,
      "SingleRetrieveTime": 1,
      "CrateRetrieveTime": 8,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14091878000753613494",
        "topLeft": "9897571855372799321",
        "bottomRight": "16773868502893723651"
      },
      "crated": {
        "topLeft": "9897571855372799321",
        "full": "9320314745351788978",
        "bottomRight": "15418188225423867904"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPRevolverPickup",
    "CodeName": "Revolver",
    "ChassisName": "Revolver",
    "DisplayName": "Cometa T2-9",
    "Description": "The Cometa T2-9 boasts remarkable stopping power for a sidearm. This Estrellan mainstay has lived through several generations due to its fine craftsmanship and design.",
    "Encumbrance": 65,
    "EquipmentSlot": "EEquipmentSlot::Secondary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "TechID": "ETechID::UnlockRevolver",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/RevolverItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPRevolverComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Pistol",
      "CompatibleAmmoCodeName": "RevolverAmmo",
      "bCanFireFromVehicle": true
    },
    "AmmoDynamicData": {
      "Damage": 60,
      "Suppression": 6,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 60,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 30,
      "CrateProductionTime": 50,
      "SingleRetrieveTime": 1.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14383424512954423515",
        "topLeft": "11766977188206531109",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "11766977188206531109",
        "full": "14347396282879793371",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPRifleAmmoPickup",
    "CodeName": "RifleAmmo",
    "DisplayName": "7.62mm",
    "Description": "Standard ammunition for rifles.",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::LightAmmo",
    "ItemFlagsMask": 4161,
    "Icon": "War/Content/Textures/UI/ItemIcons/RifleAmmoItemIcon.0",
    "AmmoDynamicData": {
      "Damage": 45,
      "Suppression": 17,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 80,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 40,
      "CrateProductionTime": 50,
      "SingleRetrieveTime": 1.25,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13958977152598089255",
        "topLeft": "10049037313844358489",
        "bottomRight": "16782875667587667992"
      },
      "crated": {
        "topLeft": "10049037313844358489",
        "full": "13931955272443961127",
        "bottomRight": "15419316322207074312"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPRifleWPickup",
    "CodeName": "RifleW",
    "ChassisName": "Rifle",
    "DisplayName": "No.2 Loughcaster",
    "Description": "Standard-issue Warden rifle. This bolt-action firearm is as robust as they come and has seen over a century of use on the battlefield.",
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Wardens",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/RifleW.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/RifleComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "CompatibleAmmoCodeName": "RifleAmmo"
    },
    "AmmoDynamicData": {
      "Damage": 45,
      "Suppression": 17,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 70,
      "SingleRetrieveTime": 3.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13843907231092906978",
        "topLeft": "0",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "0",
        "full": "10673514243161136098",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPRpgAmmoPickup",
    "CodeName": "RpgAmmo",
    "DisplayName": "RPG",
    "Description": "A fast-moving explosive projectile used with RPG launchers.",
    "Encumbrance": 75,
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HeavyAmmo",
    "ItemFlagsMask": 17,
    "Icon": "War/Content/Textures/UI/ItemIcons/RpgAmmoItemIcon.0",
    "AmmoDynamicData": {
      "Damage": 550,
      "Suppression": 20,
      "ExplosionRadius": 175,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPExplosivePenetratingDamageType.0",
        "DisplayName": "Explosive",
        "Type": "EDamageType::Explosive",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSEIcon.0",
        "TankArmourEffectType": "ETankArmourEffectType::Large",
        "bApplyTankArmourMechanics": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSEIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Explosive",
          "Quantity": 45,
          "DisplayName": "Explosive Materials"
        },
        {
          "ItemCodeName": "Cloth",
          "Quantity": 60,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15030306836489700324",
        "topLeft": "9258603511915325566",
        "bottomRight": "6989303482343251968"
      },
      "crated": {
        "topLeft": "9258603511915325566",
        "full": "10435443347068290020",
        "bottomRight": "9619261078612502528"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPRPGTWPickup",
    "CodeName": "RPGTW",
    "ChassisName": "Mounted RPG Launcher",
    "DisplayName": "Cutler Foebreaker",
    "Description": "This unique dual-barrelled RPG launcher can fire two RPG shells in relatively quick succession. This increase in firepower makes it nearly impossible for a single soldier to operate without the support of a sturdy mount.",
    "Encumbrance": 300,
    "EquipmentSlot": "EEquipmentSlot::Large",
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockRPGT",
    "ItemFlagsMask": 33,
    "Icon": "War/Content/Textures/UI/ItemIcons/ATRPGTWIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPRPGTWComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LargeDeployableItem",
      "CompatibleAmmoCodeName": "RPGAmmo",
      "DeployCodeName": "DeployedRPGTW"
    },
    "bIsLarge": true,
    "bSupportsVehicleMounts": true,
    "AmmoDynamicData": {
      "Damage": 550,
      "Suppression": 20,
      "ExplosionRadius": 175,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPExplosivePenetratingDamageType.0",
        "DisplayName": "Explosive",
        "Type": "EDamageType::Explosive",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSEIcon.0",
        "TankArmourEffectType": "ETankArmourEffectType::Large",
        "bApplyTankArmourMechanics": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSEIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Wood",
          "Quantity": 5,
          "DisplayName": "Refined Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 250,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13876770657604950721",
        "topLeft": "9618611104559181178",
        "bottomRight": "35887507618889598"
      },
      "crated": {
        "topLeft": "9618611104559181178",
        "full": "14165005982666279617",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPRpgWPickup",
    "CodeName": "RpgW",
    "ChassisName": "RPG",
    "DisplayName": "Cutler Launcher 4",
    "Description": "The Cutler Launcher is capable of firing an unguided, rocket-propelled grenade over short distances with startling efficiency. Its simple design allows for easy deployment and storage.",
    "Encumbrance": 165,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockRPG",
    "ItemFlagsMask": 33,
    "Icon": "War/Content/Textures/UI/ItemIcons/RpgItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPRPGWItemComponent.0",
      "MultiAmmo": [
        "RPGAmmo"
      ],
      "ProjectileClass": {
        "ExplosiveCodeName": "RpgAmmo",
        "AutoDetonateTime": 1,
        "ProjectileDeathDelay": 8
      }
    },
    "AmmoDynamicData": {
      "Damage": 550,
      "Suppression": 20,
      "ExplosionRadius": 175,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPExplosivePenetratingDamageType.0",
        "DisplayName": "Explosive",
        "Type": "EDamageType::Explosive",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSEIcon.0",
        "TankArmourEffectType": "ETankArmourEffectType::Large",
        "bApplyTankArmourMechanics": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSEIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Wood",
          "Quantity": 15,
          "DisplayName": "Refined Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 50,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14173163705289262038",
        "topLeft": "14152626249358493754",
        "bottomRight": "12273903644374837845"
      },
      "crated": {
        "topLeft": "14152626249358493754",
        "full": "9543463562961830870",
        "bottomRight": "9588861270019303424"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPScrap",
    "CodeName": "Metal",
    "DisplayName": "Salvage",
    "Description": "Salvage that can be recycled into other resources at a Refinery",
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::RawResource",
    "ItemFlagsMask": 2049,
    "Icon": "War/Content/Textures/UI/ItemIcons/SalvageIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Metal",
          "Quantity": 45
        }
      ],
      "QuantityPerCrate": 100,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 3,
      "CrateRetrieveTime": 3,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10608067054328865037",
        "topLeft": "10623347586949157462",
        "bottomRight": "16196084182462496768"
      },
      "crated": {
        "topLeft": "10623347586949157462",
        "full": "10462825966878417165",
        "bottomRight": "15342647655037665280"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPShotgunAmmoPickup",
    "CodeName": "ShotgunAmmo",
    "DisplayName": "Buckshot",
    "Description": "Standard ammunition for Shotguns.",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::LightAmmo",
    "ItemFlagsMask": 4161,
    "Icon": "War/Content/Textures/UI/ItemIcons/ShotgunAmmoItemIcon.0",
    "AmmoDynamicData": {
      "Damage": 180,
      "Suppression": 6,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 80,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 40,
      "CrateProductionTime": 50,
      "SingleRetrieveTime": 1.25,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14225884485052766259",
        "topLeft": "10470123056535063721",
        "bottomRight": "15046667102746345472"
      },
      "crated": {
        "topLeft": "10470123056535063721",
        "full": "14226377066257258679",
        "bottomRight": "15335894179209281536"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPSledgeHammer",
    "CodeName": "SledgeHammer",
    "DisplayName": "Sledge Hammer",
    "Description": "A tool used to salvage components from remains of old vehicles and equipment.",
    "Encumbrance": 100,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::Utility",
    "ItemProfileType": "EItemProfileType::Tool",
    "TechID": "ETechID::UnlockSledgeHammer",
    "Icon": "War/Content/Textures/UI/ItemIcons/SledgeHammerItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPSledgeHammerComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Mortar"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 200,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 10,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10787656366568982252",
        "topLeft": "0",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "0",
        "full": "13050645321687977708",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPSMGHeavyCPickup",
    "CodeName": "SMGHeavyC",
    "ChassisName": "Submachine Gun",
    "DisplayName": "“Lionclaw” mc.VIII",
    "Description": "A heavier, modern variation of the Pitch Gun, the Lionclaw performs well as a decent, all-around submachine gun designed as a primary firearm in urban and close-quarters combat operations.",
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockSMGHeavy",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/SMGHeavyCItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/SMGHeavyC.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "CompatibleAmmoCodeName": "SMGAmmo",
      "bCanFireFromVehicle": true
    },
    "AmmoDynamicData": {
      "Damage": 27,
      "Suppression": 9,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 120,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 80,
      "SingleRetrieveTime": 3.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14643793695048569822",
        "topLeft": "12273903644374837845",
        "bottomRight": "16204215858474257927"
      },
      "crated": {
        "topLeft": "12273903644374837845",
        "full": "10905806140633338782",
        "bottomRight": "14263035226393149440"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPSMGHeavyWPickup",
    "CodeName": "SMGHeavyW",
    "ChassisName": "Submachine Gun",
    "DisplayName": "No.1 “The Liar” Submachinegun",
    "Description": "This unique, heavy-duty submachine gun is not very useful on the run, but with careful aim and adequate cover, becomes a razorblade in the night.",
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockSMGHeavy",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/SMGHeavyWItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/SMGHeavyW.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "FiringRate": 0.35,
      "CompatibleAmmoCodeName": "SMGAmmo",
      "bCanFireFromVehicle": true
    },
    "AmmoDynamicData": {
      "Damage": 27,
      "Suppression": 9,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 120,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 80,
      "SingleRetrieveTime": 3.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14132067357687286754",
        "topLeft": "11841452904618273109",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "11841452904618273109",
        "full": "9520381632389319650",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPSniperRifleAmmo",
    "CodeName": "SniperRifleAmmo",
    "DisplayName": "8.5mm",
    "Description": "Standard ammunition for sniper rifles.",
    "Encumbrance": 15,
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::LightAmmo",
    "ItemFlagsMask": 4161,
    "Icon": "War/Content/Textures/UI/ItemIcons/SniperRifleAmmoItemIcon.0",
    "AmmoDynamicData": {
      "Damage": 100,
      "Suppression": 35,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 150,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 10,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13899302070602437465",
        "topLeft": "9743577907255987817",
        "bottomRight": "16194958347533811712"
      },
      "crated": {
        "topLeft": "9743577907255987817",
        "full": "13862710358132396952",
        "bottomRight": "17708268908676382720"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPSulfurPickup",
    "CodeName": "Sulfur",
    "DisplayName": "Sulfur",
    "Description": "Sulfur that can be refined into Heavy Explosive Materials at a Refinery",
    "Encumbrance": 24,
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::RawResource",
    "ItemFlagsMask": 2049,
    "Icon": "War/Content/Textures/UI/ItemIcons/SulfurIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Sulfur",
          "Quantity": 105
        }
      ],
      "QuantityPerCrate": 100,
      "CrateProductionTime": 200,
      "SingleRetrieveTime": 6,
      "CrateRetrieveTime": 6,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10490359498501112442",
        "topLeft": "10766584540029096553",
        "bottomRight": "13889876134864143556"
      },
      "crated": {
        "topLeft": "10766584540029096553",
        "full": "10777463993138004602",
        "bottomRight": "14249506597637251268"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPTraumaKit",
    "CodeName": "TraumaKit",
    "DisplayName": "Trauma Kit",
    "Description": "Used by medics to revive wounded soldiers.",
    "Encumbrance": 100,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::Medical",
    "ItemProfileType": "EItemProfileType::Tool",
    "ItemFlagsMask": 1025,
    "Icon": "War/Content/Textures/UI/ItemIcons/TraumaKitItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPTraumaKitComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::HeavySingleHandItem"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 80,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 10,
      "CrateProductionTime": 50,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13937020810290185067",
        "topLeft": "11268999231483466572",
        "bottomRight": "15191204633743720448"
      },
      "crated": {
        "topLeft": "11268999231483466572",
        "full": "13937020930885075767",
        "bottomRight": "15337580830042095616"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPTripodPickup",
    "CodeName": "Tripod",
    "DisplayName": "Tripod",
    "Description": "A mount point for deployable infantry weapons and equipment.",
    "Encumbrance": 220,
    "EquipmentSlot": "EEquipmentSlot::Large",
    "ItemCategory": "EItemCategory::Utility",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "Icon": "War/Content/Textures/UI/ItemIcons/DeployableTripodItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPTripodComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LargeDeployableItem",
      "DeployCodeName": "DeployedTripod"
    },
    "bIsLarge": true,
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 60,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14742868896371795045",
        "topLeft": "12346149274955422378",
        "bottomRight": "14323526480496452248"
      },
      "crated": {
        "topLeft": "12346149274955422378",
        "full": "10113169028926500196",
        "bottomRight": "9638666251844935873"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPWoundedCarriedPlayerPickUp",
    "CodeName": "WoundedCarriedPlayer",
    "DisplayName": "Wounded Player",
    "Description": "A wounded player{0}. Drop this soldier off at a safe location for medical aid.",
    "Encumbrance": 300,
    "Icon": "War/Content/Textures/UI/ItemIcons/WoundedIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPWoundedCarriedPlayerItemComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::CarryingPlayer"
    },
    "ItemDynamicData": {
      "CostPerCrate": [],
      "QuantityPerCrate": 0,
      "CrateProductionTime": 0,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9825623102353446824",
        "topLeft": "12491391785981594262",
        "bottomRight": "15378170621683527556"
      },
      "crated": {
        "topLeft": "12491391785981594262",
        "full": "10167685560288811000",
        "bottomRight": "15348964860982143104"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BPWreckagePickup",
    "CodeName": "Wreckage",
    "DisplayName": "Wreckage",
    "Description": "Destroyed equipment reclaimed from the battlefield. Can be sorted into useful resources at a Refinery (using the right click context menu)",
    "Encumbrance": 10,
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::UnstackableRawResource",
    "ItemFlagsMask": 2049,
    "Icon": "War/Content/Textures/UI/ItemIcons/Salvage02Icon.0",
    "ItemDynamicData": {
      "CostPerCrate": [],
      "QuantityPerCrate": 0,
      "CrateProductionTime": 0,
      "SingleRetrieveTime": 2.5,
      "CrateRetrieveTime": 5,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9299502807150769649",
        "topLeft": "9254444051287325094",
        "bottomRight": "15119750410661853184"
      },
      "crated": {
        "topLeft": "9254444051287325094",
        "full": "9304005857018410481",
        "bottomRight": "15407985049575946240"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/BunkerSupplies",
    "CodeName": "BunkerSupplies",
    "DisplayName": "Bunker Supplies",
    "Description": "Supplies for maintaining structures. Store at Bases to prevent decay on surrounding Bunker/Trench structures when Garrison Supplies are not available.",
    "Encumbrance": 40,
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::Supplies",
    "TechID": "ETechID::UnlockGarrisonSupplies",
    "Icon": "War/Content/Textures/UI/ItemIcons/BunkerSuppliesIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 75,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 150,
      "CrateProductionTime": 190,
      "SingleRetrieveTime": 1.5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9985078959723258498",
        "topLeft": "13135115235280252236",
        "bottomRight": "16420414515683786944"
      },
      "crated": {
        "topLeft": "13135115235280252236",
        "full": "10329626065095713682",
        "bottomRight": "15416147806175363072"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/DeadlyGasGrenadePickup",
    "CodeName": "GreenAsh",
    "ChassisName": "Gas Grenade",
    "DisplayName": "Green Ash Grenade",
    "Description": "Green Ash is an asphyxiating toxin. Inhaling it without protection will result in a quick death. Be sure to wear a gas mask with fresh filters when handling Green Ash.",
    "EquipmentSlot": "EEquipmentSlot::Tertiary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::Throwable",
    "TechID": "ETechID::UnlockGreenAsh",
    "ItemFlagsMask": 9,
    "Icon": "War/Content/Textures/UI/ItemIcons/DeadlyGas01Icon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/DeadlyGasItemComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::SingleHandItem"
    },
    "AmmoDynamicData": {
      "Damage": 0,
      "Suppression": 0,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPPoisonGasDamageType.0",
        "DisplayName": "Poisonous Gas",
        "Type": "EDamageType::PoisonGas",
        "DescriptionDetails": "Causes damage over time",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeGAIcon.0",
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeGAIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 140,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 10,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 4,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14695358615708843926",
        "topLeft": "9710671653715665621",
        "bottomRight": "17938048422099550208"
      },
      "crated": {
        "topLeft": "9710671653715665621",
        "full": "13939316554189320086",
        "bottomRight": "15418187675135377408"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/FieldMGAmmoPickup",
    "CodeName": "FieldMGAmmo",
    "DisplayName": "14.5mm",
    "Description": "Standard ammunition for Field Machine Guns and Gunboats.",
    "Encumbrance": 50,
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HeavyAmmo",
    "ItemFlagsMask": 65,
    "Icon": "War/Content/Textures/UI/ItemIcons/FieldMGAmmoItemIcon.0",
    "AmmoDynamicData": {
      "Damage": 65,
      "Suppression": 18,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPHeavyKineticDamageType.0",
        "DisplayName": "Heavy Kinetic",
        "Type": "EDamageType::HeavyKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeHBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeHBIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10459445879572997752",
        "topLeft": "9967646186359480918",
        "bottomRight": "15335900638827520064"
      },
      "crated": {
        "topLeft": "9967646186359480918",
        "full": "10477459986021576376",
        "bottomRight": "15335883183015067648"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/FirstAidKitPickup",
    "CodeName": "FirstAidKit",
    "DisplayName": "First Aid Kit",
    "Description": "Used by medics to heal other soldiers.",
    "Encumbrance": 50,
    "EquipmentSlot": "EEquipmentSlot::Tertiary",
    "ItemCategory": "EItemCategory::Medical",
    "ItemProfileType": "EItemProfileType::Tool",
    "ItemFlagsMask": 1025,
    "Icon": "War/Content/Textures/UI/ItemIcons/FirstAidKitItem.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/FirstAidKitComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::HeavySingleHandItem"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 60,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 10,
      "CrateProductionTime": 35,
      "SingleRetrieveTime": 3.5,
      "CrateRetrieveTime": 7,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14140295416203220007",
        "topLeft": "11636950857093895737",
        "bottomRight": "15336041030308904960"
      },
      "crated": {
        "topLeft": "11636950857093895737",
        "full": "9520094771140417719",
        "bottomRight": "15335900775206387712"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/GarrisonSupplies",
    "CodeName": "GarrisonSupplies",
    "DisplayName": "Garrison Supplies",
    "Description": "Supplies for maintaining structures. Store at Bases to prevent decay on surrounding structures.",
    "Encumbrance": 40,
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::Supplies",
    "TechID": "ETechID::UnlockGarrisonSupplies",
    "Icon": "War/Content/Textures/UI/ItemIcons/GarrisonSuppliesIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 75,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 150,
      "CrateProductionTime": 190,
      "SingleRetrieveTime": 1.5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14861154812356159343",
        "topLeft": "12280913162524863835",
        "bottomRight": "16630694947342270480"
      },
      "crated": {
        "topLeft": "12280913162524863835",
        "full": "10338063116064220007",
        "bottomRight": "15333640452016463872"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/GasMaskPickup",
    "CodeName": "GasMask",
    "DisplayName": "Gas Mask",
    "Description": "Protects against poison gas",
    "EquipmentSlot": "EEquipmentSlot::Head",
    "ItemCategory": "EItemCategory::Utility",
    "ItemProfileType": "EItemProfileType::Accessory",
    "TechID": "ETechID::UnlockGasMask",
    "Icon": "War/Content/Textures/UI/ItemIcons/GasmaskIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 160,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 4,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14851854253301189067",
        "topLeft": "12491386995627890093",
        "bottomRight": "17361623678751604736"
      },
      "crated": {
        "topLeft": "12491386995627890093",
        "full": "9519592294423218507",
        "bottomRight": "15415954427957215232"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/GrenadeWPickup",
    "CodeName": "GrenadeW",
    "ChassisName": "Grenade",
    "DisplayName": "A3 Harpa Fragmentation Grenade",
    "Description": "This anti-personnel fragmentation grenade is designed with pull-pin mechanics and a timed fuse for user safety. Serrations in the casing allow for a better grip and increased fragmentation effectiveness.",
    "EquipmentSlot": "EEquipmentSlot::Tertiary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::Throwable",
    "FactionVariant": "EFactionId::Wardens",
    "ItemFlagsMask": 9,
    "Icon": "War/Content/Textures/UI/ItemIcons/GrenadeItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPGrenadeWItemComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::SingleHandItem"
    },
    "AmmoDynamicData": {
      "Damage": 200,
      "Suppression": 20,
      "ExplosionRadius": 550,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Explosive",
          "Quantity": 20,
          "DisplayName": "Explosive Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 4,
      "CrateRetrieveTime": 12,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14028824762857053006",
        "topLeft": "9896160262579703225",
        "bottomRight": "16204162565922095104"
      },
      "crated": {
        "topLeft": "9896160262579703225",
        "full": "9741327558524164938",
        "bottomRight": "15411432825450135552"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/HeavyArtilleryAmmoPickup",
    "CodeName": "HeavyArtilleryAmmo",
    "DisplayName": "150mm",
    "Description": "Payload for heavy artillery weapons.",
    "Encumbrance": 300,
    "EquipmentSlot": "EEquipmentSlot::Large",
    "ItemCategory": "EItemCategory::HeavyAmmo",
    "ItemProfileType": "EItemProfileType::HeavyAmmo",
    "ItemFlagsMask": 17,
    "Icon": "War/Content/Textures/UI/ItemIcons/HeavyArtilleryAmmoItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPHeavyArtilleryAmmoComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LargeDeployableItem"
    },
    "bIsLarge": true,
    "AmmoDynamicData": {
      "Damage": 900,
      "Suppression": 200,
      "ExplosionRadius": 1125,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPHighExplosiveRuinDamageType.0",
        "DisplayName": "High Explosive",
        "Type": "EDamageType::HighExplosive",
        "DescriptionDetails": "Reduced damage against Trenches",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeHEIcon.0",
        "bCanRuinStructures": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 700,
      "DamageFalloff": 1,
      "AccuracyRadius": 4000,
      "EnvironmentImpactAmount": 3,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeHEIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "HeavyExplosive",
          "Quantity": 10,
          "DisplayName": "Heavy Explosive Materials"
        },
        {
          "ItemCodeName": "Cloth",
          "Quantity": 120,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 65,
      "SingleRetrieveTime": 6,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13958103641796135283",
        "topLeft": "9456833489113228303",
        "bottomRight": "17942056128919633920"
      },
      "crated": {
        "topLeft": "9456833489113228303",
        "full": "9634648136686782835",
        "bottomRight": "9655289875630415872"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/HeavyMachineGunPickup",
    "CodeName": "HMG",
    "DisplayName": "HMG",
    "Description": "A heavy machine gun that is capable of long range, indirect sustained fire. This weapon must be mounted on a tripod before it can be fired.",
    "Encumbrance": 200,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "TechID": "ETechID::ETechID_MAX",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/HeavyMachineGunIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPHeavyMachineGunItemComponent.0",
      "CompatibleAmmoCodeName": "HMGAmmo"
    },
    "IconHashes": {
      "individual": {
        "full": "15176621014505866034",
        "topLeft": "0",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "0",
        "full": "10816015623112966962",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/HELaunchedGrenadePickup",
    "CodeName": "HELaunchedGrenade",
    "ChassisName": "Grenade",
    "DisplayName": "Tremola Grenade GPb-1",
    "Description": "A highly explosive Estrellan grenade specially designed for use with handheld grenade launchers. This modern grenade boasts a larger payload and is deadly to lingering infantry and structural supports.",
    "Encumbrance": 90,
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::Throwable",
    "ItemFlagsMask": 9,
    "Icon": "War/Content/Textures/UI/ItemIcons/HELaunchedGrenadeItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPHEGrenadeItemComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::SingleHandItem"
    },
    "AmmoDynamicData": {
      "Damage": 200,
      "Suppression": 8,
      "ExplosionRadius": 275,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPExplosiveDamageType.0",
        "DisplayName": "Explosive",
        "Type": "EDamageType::Explosive",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSEIcon.0",
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSEIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 150,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Explosive",
          "Quantity": 10,
          "DisplayName": "Explosive Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 80,
      "SingleRetrieveTime": 4,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13957822300013873227",
        "topLeft": "9258603511915341950",
        "bottomRight": "17363902111404843104"
      },
      "crated": {
        "topLeft": "9258603511915341950",
        "full": "10786162263440640075",
        "bottomRight": "9653601008868155488"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/LightArtilleryAmmoPickup",
    "CodeName": "LightArtilleryAmmo",
    "DisplayName": "120mm",
    "Description": "Payload for light artillery weapons.",
    "Encumbrance": 250,
    "EquipmentSlot": "EEquipmentSlot::Large",
    "ItemCategory": "EItemCategory::HeavyAmmo",
    "ItemProfileType": "EItemProfileType::HeavyAmmo",
    "ItemFlagsMask": 17,
    "Icon": "War/Content/Textures/UI/ItemIcons/LightArtilleryAmmoItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPLightArtilleryAmmoComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LargeDeployableItem"
    },
    "bIsLarge": true,
    "AmmoDynamicData": {
      "Damage": 400,
      "Suppression": 200,
      "ExplosionRadius": 1125,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPHighExplosiveRuinDamageType.0",
        "DisplayName": "High Explosive",
        "Type": "EDamageType::HighExplosive",
        "DescriptionDetails": "Reduced damage against Trenches",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeHEIcon.0",
        "bCanRuinStructures": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 400,
      "DamageFalloff": 1,
      "AccuracyRadius": 4000,
      "EnvironmentImpactAmount": 1,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeHEIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Explosive",
          "Quantity": 15,
          "DisplayName": "Explosive Materials"
        },
        {
          "ItemCodeName": "Cloth",
          "Quantity": 60,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 55,
      "SingleRetrieveTime": 6,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14046840818599442110",
        "topLeft": "9451221582838805519",
        "bottomRight": "17942056128920682496"
      },
      "crated": {
        "topLeft": "9451221582838805519",
        "full": "14046840818609935038",
        "bottomRight": "9655289875630415872"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/MachineGunAmmoPickup",
    "CodeName": "MGAmmo",
    "DisplayName": "12.7mm",
    "Description": "Standard ammunition for machine guns.",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HeavyAmmo",
    "ItemFlagsMask": 65,
    "Icon": "War/Content/Textures/UI/ItemIcons/MachineGunAmmoIcon.0",
    "AmmoDynamicData": {
      "Damage": 55,
      "Suppression": 18,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPHeavyKineticDamageType.0",
        "DisplayName": "Heavy Kinetic",
        "Type": "EDamageType::HeavyKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeHBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeHBIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 70,
      "SingleRetrieveTime": 3.5,
      "CrateRetrieveTime": 14,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13966277643616483901",
        "topLeft": "9240952544032439000",
        "bottomRight": "15697402672980951040"
      },
      "crated": {
        "topLeft": "9240952544032439000",
        "full": "13891985843024718140",
        "bottomRight": "15418188223415320576"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/MortarPickup",
    "CodeName": "Mortar",
    "ChassisName": "Mortar",
    "DisplayName": "Cremari Mortar",
    "Description": "This short-range cannon is designed to bombard enemy infantry with indirect fire.",
    "Encumbrance": 180,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "TechID": "ETechID::UnlockMortar",
    "ItemFlagsMask": 33,
    "Icon": "War/Content/Textures/UI/ItemIcons/MortarItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPMortarItemComponent.0",
      "MultiAmmo": [
        "MortarAmmo",
        "MortarAmmoSH",
        "MortarAmmoFL"
      ]
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Wood",
          "Quantity": 25,
          "DisplayName": "Refined Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 50,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9634664492949984980",
        "topLeft": "0",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "0",
        "full": "10744802350858392276",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/PistolLightWPickup",
    "CodeName": "PistolLightW",
    "ChassisName": "Pistol",
    "DisplayName": "Cascadier 873",
    "Description": "This unique sidearm fires in three-round bursts. The Cascadier may not have the stopping power of its cousins, but it more than makes up for it with its lightweight frame, concealability and fire rate.",
    "Encumbrance": 50,
    "EquipmentSlot": "EEquipmentSlot::Secondary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockPistolLight",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/PistolLightWItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/PistolLightWComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Pistol",
      "CompatibleAmmoCodeName": "PistolAmmo",
      "bCanFireFromVehicle": true
    },
    "AmmoDynamicData": {
      "Damage": 30,
      "Suppression": 5,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 60,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 40,
      "CrateProductionTime": 30,
      "SingleRetrieveTime": 2.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13924064491345943378",
        "topLeft": "11915017504451958445",
        "bottomRight": "17940361794514059264"
      },
      "crated": {
        "topLeft": "11915017504451958445",
        "full": "9303370996642634578",
        "bottomRight": "15347275770590396416"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/PistolPickup",
    "CodeName": "PistolC",
    "ChassisName": "Pistol",
    "DisplayName": "Ferro 879",
    "Description": "A pistol imported from Estrella in the east, the Ferro 879 is a common sight on many battlefields.",
    "Encumbrance": 50,
    "EquipmentSlot": "EEquipmentSlot::Secondary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Colonials",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/PistolItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/PistolComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Pistol",
      "CompatibleAmmoCodeName": "PistolAmmo",
      "bCanFireFromVehicle": true
    },
    "AmmoDynamicData": {
      "Damage": 30,
      "Suppression": 5,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 60,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 50,
      "SingleRetrieveTime": 1.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14750189032286481865",
        "topLeft": "12273903665502901417",
        "bottomRight": "18374687579166474495"
      },
      "crated": {
        "topLeft": "12273903665502901417",
        "full": "10120488752792759753",
        "bottomRight": "10736699157180868863"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/PistolWPickup",
    "CodeName": "PistolW",
    "ChassisName": "Pistol",
    "DisplayName": "Ahti Model 2",
    "Description": "Standard issue Warden pistol. Designed by a Nevish gunsmith, the Ahti Model 2 is a reliable sidearm that any soldier should feel proud to carry.",
    "Encumbrance": 50,
    "EquipmentSlot": "EEquipmentSlot::Secondary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Wardens",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/PistolWItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/PistolWComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Pistol",
      "CompatibleAmmoCodeName": "PistolAmmo",
      "bCanFireFromVehicle": true
    },
    "AmmoDynamicData": {
      "Damage": 30,
      "Suppression": 5,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 60,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 50,
      "SingleRetrieveTime": 1.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14355292977940405705",
        "topLeft": "12273899203006780973",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "12273899203006780973",
        "full": "14346276705495947721",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/RadioBackpackPickup",
    "CodeName": "RadioBackpack",
    "DisplayName": "Radio Backpack",
    "Description": "Automatically gathers map intel periodically when equipped. The Radio Backpack is also used to transmit other sensitive information across long distances.",
    "Encumbrance": 150,
    "EquipmentSlot": "EEquipmentSlot::Utility",
    "ItemCategory": "EItemCategory::Utility",
    "ItemProfileType": "EItemProfileType::Accessory",
    "TechID": "ETechID::UnlockRadioBackpack",
    "Icon": "War/Content/Textures/UI/ItemIcons/RadioBackpackItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPRadioBackpackItemComponent.0"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 150,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 75,
      "SingleRetrieveTime": 15,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14644646966975162169",
        "topLeft": "13135230218383353930",
        "bottomRight": "16348656469844963328"
      },
      "crated": {
        "topLeft": "13135230218383353930",
        "full": "9761610059804992280",
        "bottomRight": "15411925681524727808"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/RadioPickup",
    "CodeName": "Radio",
    "DisplayName": "Radio",
    "Description": "Receives map intelligence updates",
    "EquipmentSlot": "EEquipmentSlot::Utility",
    "ItemCategory": "EItemCategory::Utility",
    "ItemProfileType": "EItemProfileType::Tool",
    "Icon": "War/Content/Textures/UI/ItemIcons/RadioItemIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 75,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 50,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9348458425139477539",
        "topLeft": "12273903644374837845",
        "bottomRight": "18230286487757258752"
      },
      "crated": {
        "topLeft": "12273903644374837845",
        "full": "10744504507815836707",
        "bottomRight": "9655289858718965760"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/RifleAutomaticWPickup",
    "CodeName": "RifleAutomaticW",
    "ChassisName": "Rifle",
    "DisplayName": "Sampo Auto-Rifle 77",
    "Description": "The precursor to the storm rifle, the Sampo Auto-Rifle, is a mastercraft of its day. With a single shot and automatic fire mode, this versatile rifle may not reach the fire rates of automatic weapons but more than makes up for it with utility.",
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockRifleAutomatic",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/RifleAutomaticW.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/ItemPickups/RifleAutomaticWComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "CompatibleAmmoCodeName": "RifleAmmo"
    },
    "AmmoDynamicData": {
      "Damage": 45,
      "Suppression": 17,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 125,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 70,
      "SingleRetrieveTime": 3.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13843907367458642930",
        "topLeft": "0",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "0",
        "full": "9520381632388865010",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/RifleCPickup",
    "CodeName": "RifleC",
    "ChassisName": "Rifle",
    "DisplayName": "Argenti r.II Rifle",
    "Description": "The primary infantry rifle of the Colonial Legion. Its predecessor, The Volta Repeater, was a sturdy, reliable firearm but had many limitations, namely, fire rate. The Argenti solves this limitation as well as being more compact and lightweight.",
    "Encumbrance": 70,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Colonials",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/RifleCItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/RifleCComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "CompatibleAmmoCodeName": "RifleAmmo"
    },
    "AmmoDynamicData": {
      "Damage": 45,
      "Suppression": 17,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 70,
      "SingleRetrieveTime": 3.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13843907771188188134",
        "topLeft": "0",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "0",
        "full": "10385073027131970532",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/RifleHeavyCPickup",
    "CodeName": "RifleHeavyC",
    "ChassisName": "Heavy Rifle",
    "DisplayName": "Volta r.I Repeater",
    "Description": "An old war Mesean rifle. It boasts high stopping power, but not as accurate as its modern variant. A weapon of legend, the Howling Lions wielded the Volta during their raid on the beaches of Fisherman’s Row.",
    "Encumbrance": 115,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockRifleHeavy",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/RifleHeavyCItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/ItemPickups/RifleHeavyCComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "CompatibleAmmoCodeName": "RifleAmmo"
    },
    "AmmoDynamicData": {
      "Damage": 45,
      "Suppression": 17,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 3.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13843908879289753570",
        "topLeft": "0",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "0",
        "full": "10691318635016821730",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/RifleHeavyWPickup",
    "CodeName": "RifleHeavyW",
    "ChassisName": "Heavy Rifle",
    "DisplayName": "The Hangman 757",
    "Description": "The weapon of choice for pirates and smugglers, its legend is well-earned. With incredibly high stopping power and unique revolver mechanism, the Hangman often plays judge, jury, and executioner.",
    "Encumbrance": 115,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockRifleHeavy",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/RevolvingRifleWItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/ItemPickups/RifleHeavyWComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "CompatibleAmmoCodeName": "RevolverAmmo"
    },
    "AmmoDynamicData": {
      "Damage": 60,
      "Suppression": 6,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 125,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 80,
      "SingleRetrieveTime": 3.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13843907917251089398",
        "topLeft": "0",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "0",
        "full": "10673303411924407286",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/RifleLightCPickup",
    "CodeName": "RifleLightC",
    "ChassisName": "Rifle",
    "DisplayName": "Fuscina pi.I",
    "Description": "This unique rifle fires three rounds in rapid succession. The Fuscina is the first of its kind, designed for laying down suppressive fire during assaults on fortified enemy entrenchments.",
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockRifleLight",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/RifleLightCItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/RifleLightCComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "CompatibleAmmoCodeName": "RifleAmmo"
    },
    "AmmoDynamicData": {
      "Damage": 45,
      "Suppression": 17,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 140,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 80,
      "SingleRetrieveTime": 3.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14996829284393878490",
        "topLeft": "0",
        "bottomRight": "18229723537797545984"
      },
      "crated": {
        "topLeft": "0",
        "full": "10385073035738680282",
        "bottomRight": "10807648413097664512"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/RifleLongCPickup",
    "CodeName": "RifleLongC",
    "ChassisName": "Long Rifle",
    "DisplayName": "KRR2-790 Omen",
    "Description": "An older but reliable model of Kraunian long rifle. The Omen is a sturdy, simple weapon best used in long-distance skirmishes.",
    "Encumbrance": 120,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockRifleLong",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/RifleLongC.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/ItemPickups/RifleLongCComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "CompatibleAmmoCodeName": "RifleAmmo"
    },
    "AmmoDynamicData": {
      "Damage": 45,
      "Suppression": 17,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 155,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 3.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13843907231096052706",
        "topLeft": "0",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "0",
        "full": "9232221624981330914",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/RifleLongWPickup",
    "CodeName": "RifleLongW",
    "ChassisName": "Long Rifle",
    "DisplayName": "Clancy Cinder M3",
    "Description": "The Clancy Cinder is a classic, high-powered long rifle designed for use in mid-to-long range encounters. First deployed with the Hands during a high-risk operation in Acrithia.",
    "Encumbrance": 120,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockRifleLong",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/RifleLongW.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/ItemPickups/RifleLongWComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "CompatibleAmmoCodeName": "RifleAmmo"
    },
    "AmmoDynamicData": {
      "Damage": 45,
      "Suppression": 17,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 130,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 3.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13843907367461788658",
        "topLeft": "0",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "0",
        "full": "10691317535505189874",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/RocketBooster",
    "CodeName": "RocketBooster",
    "DisplayName": "Rocket Booster",
    "Description": "A booster engine that provides thrust for launching Ballistic Rockets to long distant targets.",
    "Encumbrance": 1000,
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::UniqueItem",
    "TechID": "ETechID::UnlockRocketBooster",
    "Icon": "War/Content/Textures/UI/ItemIcons/RocketBoosterIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Wood",
          "Quantity": 800,
          "DisplayName": "Refined Materials"
        }
      ],
      "QuantityPerCrate": 1,
      "CrateProductionTime": 600,
      "SingleRetrieveTime": 600,
      "CrateRetrieveTime": 600,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13964886291024365260",
        "topLeft": "11488897727161920185",
        "bottomRight": "14468263573526154240"
      },
      "crated": {
        "topLeft": "11488897727161920185",
        "full": "9604557590536178630",
        "bottomRight": "15409482293433073664"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/SatchelChargePickup",
    "CodeName": "SatchelCharge",
    "ChassisName": "Explosive Charge",
    "DisplayName": "Alligator Charge",
    "Description": "This heavy-duty explosive device is designed to deal significant damage to structures and stationary vehicles. ",
    "Encumbrance": 385,
    "EquipmentSlot": "EEquipmentSlot::Tertiary",
    "ItemCategory": "EItemCategory::Utility",
    "ItemProfileType": "EItemProfileType::Tool",
    "TechID": "ETechID::UnlockSatchelCharge",
    "Icon": "War/Content/Textures/UI/StructureIcons/SatchelCharge.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/SatchelChargeComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::HeavySingleHandItem"
    },
    "AmmoDynamicData": {
      "Damage": 1500,
      "Suppression": 45,
      "ExplosionRadius": 700,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPDemolitionDamageType.0",
        "DisplayName": "Demolition",
        "Type": "EDamageType::Demolition",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeLRAIcon.0",
        "bCanRuinStructures": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 600,
      "DamageFalloff": 1,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeLRAIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "HeavyExplosive",
          "Quantity": 15,
          "DisplayName": "Heavy Explosive Materials"
        },
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15320519568171482381",
        "topLeft": "10327430679908967599",
        "bottomRight": "14470085560381218912"
      },
      "crated": {
        "topLeft": "10327430679908967599",
        "full": "14184205122898509189",
        "bottomRight": "15337055538361950272"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/ShotgunPickup",
    "CodeName": "Shotgun",
    "ChassisName": "Shotgun",
    "DisplayName": "Brasa Shotgun",
    "Description": "This close-range firearm is an Estrellan import originally designed for hunting wild game. The Brasa is primarily used in urban operations.",
    "Encumbrance": 160,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "TechID": "ETechID::UnlockShotgun",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/ShotgunItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPShotgunComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "CompatibleAmmoCodeName": "ShotgunAmmo"
    },
    "AmmoDynamicData": {
      "Damage": 180,
      "Suppression": 6,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 80,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 80,
      "SingleRetrieveTime": 3.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13843838622263472918",
        "topLeft": "12273903644374837845",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "12273903644374837845",
        "full": "9232152604905632534",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/ShovelPickup",
    "CodeName": "Shovel",
    "DisplayName": "Shovel",
    "Description": "A tool for digging Trenches and other entrenched structures.",
    "Encumbrance": 100,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::Utility",
    "ItemProfileType": "EItemProfileType::Tool",
    "Icon": "War/Content/Textures/UI/ItemIcons/ShovelIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPShovelComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Shovel"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 200,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 10,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 7.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "16149693722080101900",
        "topLeft": "0",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "0",
        "full": "16149693722075907596",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/SMGCPickup",
    "CodeName": "SMGC",
    "ChassisName": "Submachine Gun",
    "DisplayName": "“The Pitch Gun” mc.V",
    "Description": "This classic submachine gun is sturdy and irreplacable as a general tool for close-range engagements. The Pitch Gun earned its namesake from Mesean sailors who employed the weapon to successfully defend against a night raid on the Geraston docks. ",
    "Encumbrance": 80,
    "EquipmentSlot": "EEquipmentSlot::Secondary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockSMG",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/SMGCItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/SMGCComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "CompatibleAmmoCodeName": "SMGAmmo",
      "bCanFireFromVehicle": true
    },
    "AmmoDynamicData": {
      "Damage": 27,
      "Suppression": 9,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 80,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 80,
      "SingleRetrieveTime": 2.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14996812927035055090",
        "topLeft": "12273903644374837845",
        "bottomRight": "14395694378036310321"
      },
      "crated": {
        "topLeft": "12273903644374837845",
        "full": "10385074130976840690",
        "bottomRight": "14250352132835336561"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/SmokeGrenadePickup",
    "CodeName": "SmokeGrenade",
    "ChassisName": "Smoke Grenade",
    "DisplayName": "PT-815 Smoke Grenade",
    "Description": "A standard smoke grenade designed for concealing allied movement or screening the enemy’s vision.",
    "EquipmentSlot": "EEquipmentSlot::Tertiary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::Throwable",
    "TechID": "ETechID::UnlockSmokeGrenade",
    "ItemFlagsMask": 9,
    "Icon": "War/Content/Textures/UI/ItemIcons/Smokegrenadeicon1.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPSmokeGrenadeItemComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::SingleHandItem"
    },
    "AmmoDynamicData": {
      "Damage": 0,
      "Suppression": 0,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPSmokeDamageType.0",
        "DisplayName": "Smoke",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSMKIcon.0",
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSMKIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 120,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 10,
      "CrateProductionTime": 75,
      "SingleRetrieveTime": 4,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14019763231479184527",
        "topLeft": "9392587867757817447",
        "bottomRight": "17940362756586733568"
      },
      "crated": {
        "topLeft": "9392587867757817447",
        "full": "14310245408526728335",
        "bottomRight": "15419334328311619584"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/SniperRifleCPickup",
    "CodeName": "SniperRifleC",
    "ChassisName": "Sniper Rifle",
    "DisplayName": "KRR3-792 Auger",
    "Description": "A Kraunian rifle modified for long-range engagements. It doesn’t have the range or stopping power of other marksman rifles but more than makes up for it with unmatched reliability in a range of environments and a superior effective rate of fire.",
    "Encumbrance": 125,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockSniperRifle",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/SniperRifleCItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/SniperRifleCComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "CompatibleAmmoCodeName": "RifleAmmo"
    },
    "AmmoDynamicData": {
      "Damage": 45,
      "Suppression": 17,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 200,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Wood",
          "Quantity": 25,
          "DisplayName": "Refined Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 125,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13843836999789190130",
        "topLeft": "12273903644374837845",
        "bottomRight": "12273903644374837845"
      },
      "crated": {
        "topLeft": "12273903644374837845",
        "full": "10673302587244551154",
        "bottomRight": "9588861270019303424"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/SniperRiflePickup",
    "CodeName": "SniperRifleW",
    "ChassisName": "Sniper Rifle",
    "DisplayName": "Clancy-Raca M4",
    "Description": "A heavy-duty, long-range marksman rifle. The Clancy-Raca has one hell of a kick but is fitted with a powerful scope, allowing infantry to survey the battlefield and provide support from a safe location.",
    "Encumbrance": 200,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockSniperRifle",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/SniperRifleItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/SniperRifleComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "CompatibleAmmoCodeName": "RifleAmmo"
    },
    "AmmoDynamicData": {
      "Damage": 45,
      "Suppression": 17,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 200,
          "DisplayName": "Basic Materials"
        },
        {
          "ItemCodeName": "Wood",
          "Quantity": 15,
          "DisplayName": "Refined Materials"
        }
      ],
      "QuantityPerCrate": 3,
      "CrateProductionTime": 125,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13843836984807134198",
        "topLeft": "12202126412967228842",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "12202126412967228842",
        "full": "9515878281918288886",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/SoldierSupplies",
    "CodeName": "SoldierSupplies",
    "DisplayName": "Soldier Supplies",
    "Description": "A standard issue set of supplies for foot soldiers. Bases must be stockpiled with Soldier Supplies in order for players to spawn.",
    "Encumbrance": 40,
    "ItemCategory": "EItemCategory::Medical",
    "ItemProfileType": "EItemProfileType::Supplies",
    "Icon": "War/Content/Textures/UI/ItemIcons/ClothItemIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 80,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 10,
      "CrateProductionTime": 80,
      "SingleRetrieveTime": 8,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10387055391103509628",
        "topLeft": "12199848577531528361",
        "bottomRight": "16194944809813721088"
      },
      "crated": {
        "topLeft": "12199848577531528361",
        "full": "10684292966553971892",
        "bottomRight": "15341521754593968128"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/StickyBombPickup",
    "CodeName": "StickyBomb",
    "DisplayName": "Anti-Tank Sticky Bomb",
    "Description": "A adherable grenade designed to penetrate heavy tank armor. The Sticky Bomb can only be thrown a short distance and is ineffective against structures.",
    "Encumbrance": 90,
    "EquipmentSlot": "EEquipmentSlot::Tertiary",
    "ItemCategory": "EItemCategory::HeavyArms",
    "ItemProfileType": "EItemProfileType::Throwable",
    "ItemFlagsMask": 9,
    "Icon": "War/Content/Textures/UI/ItemIcons/StickyBombIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPStickyBombComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::SingleHandItem"
    },
    "AmmoDynamicData": {
      "Damage": 450,
      "Suppression": 0,
      "ExplosionRadius": 200,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPAntiTankExplosiveStickyBombDamageType.0",
        "DisplayName": "Anti-Tank Explosive",
        "Type": "EDamageType::AntiTankExplosive",
        "DescriptionDetails": "High chance of disabling Track subsystem",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeATIcon.0",
        "VehicleSubsystemDisableMultipliers": 7,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeATIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Explosive",
          "Quantity": 50,
          "DisplayName": "Explosive Materials"
        },
        {
          "ItemCodeName": "Cloth",
          "Quantity": 50,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 10,
      "CrateProductionTime": 75,
      "SingleRetrieveTime": 7.5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10787581595550304236",
        "topLeft": "15090265701142253319",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "15090265701142253319",
        "full": "13093424604766095212",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/SubMachineGunAmmoPickup",
    "CodeName": "SMGAmmo",
    "DisplayName": "9mm",
    "Description": "Standard ammunition for submachine guns.",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::LightAmmo",
    "ItemFlagsMask": 4161,
    "Icon": "War/Content/Textures/UI/ItemIcons/SubMachineGunAmmoIcon.0",
    "AmmoDynamicData": {
      "Damage": 27,
      "Suppression": 9,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 80,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 40,
      "CrateProductionTime": 50,
      "SingleRetrieveTime": 1.25,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13951923368343638327",
        "topLeft": "9895298280074906985",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "9895298280074906985",
        "full": "13932783062411122999",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/SubMachineGunPickup",
    "CodeName": "SMGW",
    "ChassisName": "Submachine Gun",
    "DisplayName": "Fiddler Submachine Gun Model 868",
    "Description": "The Fiddler Submachine gun is a widely used urban combat weapon. Its high rate of fire and compact frame make it ideal for close-quarters engagements.",
    "Encumbrance": 80,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::SmallArms",
    "ItemProfileType": "EItemProfileType::HandheldWeapon",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockSMG",
    "ItemFlagsMask": 129,
    "Icon": "War/Content/Textures/UI/ItemIcons/SubMachineGunIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/SubMachineGunItem.0",
      "EquippedGripType": "EEquippedWeaponGripType::Rifle",
      "CompatibleAmmoCodeName": "SMGAmmo"
    },
    "AmmoDynamicData": {
      "Damage": 27,
      "Suppression": 9,
      "ExplosionRadius": 0,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPLightKineticDamageType.0",
        "DisplayName": "Light Kinetic",
        "Type": "EDamageType::LightKinetic",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSBIcon.0",
        "VehicleSubsystemDisableMultipliers": 0,
        "bApplyDamageFalloff": true,
        "bCanWoundCharacter": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 120,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 80,
      "SingleRetrieveTime": 3.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14992268645484818694",
        "topLeft": "12273903644374837845",
        "bottomRight": "14323632521499211992"
      },
      "crated": {
        "topLeft": "12273903644374837845",
        "full": "10380573829896958342",
        "bottomRight": "14251478170181132512"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/UnexplodedOrdnancePickup",
    "CodeName": "UnexplodedOrdnance",
    "DisplayName": "Unexploded Ordnance",
    "Description": "An old war artillery shell that failed to detonate. Etchings on the side indicate a powerful payload and should be handled carefully.",
    "Encumbrance": 200,
    "EquipmentSlot": "EEquipmentSlot::Tertiary",
    "ItemCategory": "EItemCategory::Utility",
    "ItemProfileType": "EItemProfileType::UniqueItem",
    "TechID": "ETechID::UnlockSatchelCharge",
    "Icon": "War/Content/Textures/UI/ItemIcons/UnexplodedOrdnanceIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/UnexplodedOrdnanceComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LargeDeployableItem"
    },
    "AmmoDynamicData": {
      "Damage": 1200,
      "Suppression": 0,
      "ExplosionRadius": 700,
      "DamageType": "/Script/War",
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "HeavyExplosive",
          "Quantity": 15,
          "DisplayName": "Heavy Explosive Materials"
        },
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 100,
      "SingleRetrieveTime": 20,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13876823434162937721",
        "topLeft": "9428051061959927933",
        "bottomRight": "8142225536638271488"
      },
      "crated": {
        "topLeft": "9428051061959927933",
        "full": "10416933021509295993",
        "bottomRight": "9619261078612502528"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/Warhead",
    "CodeName": "Warhead",
    "DisplayName": "Warhead",
    "Description": "The payload for Ballistic Rockets. A high yield bomb that delivers over 3 tons of TNT and is capable of leveling an entire village or town block.",
    "Encumbrance": 1000,
    "ItemCategory": "EItemCategory::HeavyAmmo",
    "ItemProfileType": "EItemProfileType::UniqueItem",
    "TechID": "ETechID::UnlockWarhead",
    "Icon": "War/Content/Textures/UI/ItemIcons/RocketWarheadIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Wood",
          "Quantity": 200,
          "DisplayName": "Refined Materials"
        },
        {
          "ItemCodeName": "HeavyExplosive",
          "Quantity": 1000,
          "DisplayName": "Heavy Explosive Materials"
        }
      ],
      "QuantityPerCrate": 1,
      "CrateProductionTime": 600,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14369924916573818533",
        "topLeft": "13350527085133861993",
        "bottomRight": "13889312984547733504"
      },
      "crated": {
        "topLeft": "13350527085133861993",
        "full": "9613560752530935717",
        "bottomRight": "15334873831341817856"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/WorkHammer",
    "CodeName": "WorkHammer",
    "DisplayName": "Hammer",
    "Description": "A tool used to build structures and assemble materials.",
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::Utility",
    "ItemProfileType": "EItemProfileType::Tool",
    "Icon": "War/Content/Textures/UI/ItemIcons/HammerIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPHammerComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::SingleHandItem"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 20,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 50,
      "SingleRetrieveTime": 4,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10565008698254632886",
        "topLeft": "9223372036854775808",
        "bottomRight": "9223372036854775808"
      },
      "crated": {
        "topLeft": "9223372036854775808",
        "full": "10816013973843945462",
        "bottomRight": "9583794698963675136"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/WorkWrench",
    "CodeName": "WorkWrench",
    "DisplayName": "Wrench",
    "Description": "A multipurpose tool. Can be used to dismantle mines/barbed wire and unlock vehicles.",
    "Encumbrance": 30,
    "EquipmentSlot": "EEquipmentSlot::Primary",
    "ItemCategory": "EItemCategory::Utility",
    "ItemProfileType": "EItemProfileType::Tool",
    "Icon": "War/Content/Textures/UI/ItemIcons/WorkWrench.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/WorkWrenchComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::SingleHandItem"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 75,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 50,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10490418894049117050",
        "topLeft": "12273903644374837845",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "12273903644374837845",
        "full": "10673307260166865786",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/LargeResources/BPBarbedWireMaterials",
    "CodeName": "BarbedWireMaterials",
    "ChassisName": "Large Material",
    "DisplayName": "Barbed Wire",
    "Description": "Used to construct Barbed Wire defenses.",
    "Encumbrance": 300,
    "EquipmentSlot": "EEquipmentSlot::Large",
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::LargeResource",
    "Icon": "War/Content/Textures/UI/ItemIcons/BarbedWireMaterialItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPBarbedWireMaterialsComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LargeDeployableItem"
    },
    "bIsLarge": true,
    "ItemDynamicData": {
      "CostPerCrate": [],
      "QuantityPerCrate": 0,
      "CrateProductionTime": 0,
      "SingleRetrieveTime": 1.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13851171270161326392",
        "topLeft": "11915036052754903621",
        "bottomRight": "16204198574618231491"
      },
      "crated": {
        "topLeft": "11915036052754903621",
        "full": "9518708429846733112",
        "bottomRight": "14263034986545307842"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/LargeResources/BPMetalBeamMaterials",
    "CodeName": "MetalBeamMaterials",
    "ChassisName": "Large Material",
    "DisplayName": "Metal Beam",
    "Description": "Used to construct Metal Beam defenses.",
    "Encumbrance": 300,
    "EquipmentSlot": "EEquipmentSlot::Large",
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::LargeResource",
    "Icon": "War/Content/Textures/UI/ItemIcons/MetalBeamMaterialItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPMetalBeamMaterialsComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LargeDeployableItem"
    },
    "bIsLarge": true,
    "ItemDynamicData": {
      "CostPerCrate": [],
      "QuantityPerCrate": 0,
      "CrateProductionTime": 0,
      "SingleRetrieveTime": 1.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14309120075512926742",
        "topLeft": "12273903644374837845",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "12273903644374837845",
        "full": "10816015614472339990",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/LargeResources/BPSandbagMaterials",
    "CodeName": "SandbagMaterials",
    "ChassisName": "Large Material",
    "DisplayName": "Sandbag",
    "Description": "Used to construct Sandbag defenses.",
    "Encumbrance": 300,
    "EquipmentSlot": "EEquipmentSlot::Large",
    "ItemCategory": "EItemCategory::Supplies",
    "ItemProfileType": "EItemProfileType::LargeResource",
    "Icon": "War/Content/Textures/UI/ItemIcons/SandbagMaterialItemIcon.0",
    "ItemComponentClass": {
      "ObjectPath": "War/Content/Blueprints/Items/BPSandbagMaterialsComponent.0",
      "EquippedGripType": "EEquippedWeaponGripType::LargeDeployableItem"
    },
    "bIsLarge": true,
    "ItemDynamicData": {
      "CostPerCrate": [],
      "QuantityPerCrate": 0,
      "CrateProductionTime": 0,
      "SingleRetrieveTime": 1.5,
      "CrateRetrieveTime": 10,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14525864071469171736",
        "topLeft": "11693762653512305066",
        "bottomRight": "18228565782386704384"
      },
      "crated": {
        "topLeft": "11693762653512305066",
        "full": "9591044779781112856",
        "bottomRight": "15419313575029637120"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/TankAmmo/LightTankAmmoPickup",
    "CodeName": "LightTankAmmo",
    "DisplayName": "40mm",
    "Description": "Standard payload for light tanks.",
    "Encumbrance": 135,
    "ItemCategory": "EItemCategory::HeavyAmmo",
    "ItemProfileType": "EItemProfileType::HeavyAmmo",
    "ItemFlagsMask": 17,
    "Icon": "War/Content/Textures/UI/ItemIcons/LightTankAmmoItemIcon.0",
    "AmmoDynamicData": {
      "Damage": 600,
      "Suppression": 85,
      "ExplosionRadius": 200,
      "DamageType": {
        "ObjectPath": "War/Content/Blueprints/DamageTypes/BPExplosivePenetratingDamageType.0",
        "DisplayName": "Explosive",
        "Type": "EDamageType::Explosive",
        "Icon": "War/Content/Textures/UI/ItemIcons/SubtypeSEIcon.0",
        "TankArmourEffectType": "ETankArmourEffectType::Large",
        "bApplyTankArmourMechanics": true,
        "bExposeInUI": true
      },
      "DamageInnerRadius": 0,
      "DamageFalloff": 0,
      "AccuracyRadius": 0,
      "EnvironmentImpactAmount": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPAmmoDynamicData"
    },
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSEIcon.0",
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Explosive",
          "Quantity": 120,
          "DisplayName": "Explosive Materials"
        },
        {
          "ItemCodeName": "Cloth",
          "Quantity": 160,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 20,
      "CrateProductionTime": 200,
      "SingleRetrieveTime": 10,
      "CrateRetrieveTime": 20,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14028769254126093204",
        "topLeft": "14152626249358493754",
        "bottomRight": "0"
      },
      "crated": {
        "topLeft": "14152626249358493754",
        "full": "9680541614878213012",
        "bottomRight": "9591113069832988672"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/Uniforms/BPAmmoUniformW",
    "CodeName": "AmmoUniformW",
    "ChassisName": "Warden Heavy Ammo Uniform",
    "DisplayName": "Specialist’s Overcoat",
    "Description": "Warden specialists require a uniform designed to optimize their capacity to haul a variety of heavy ammunition.",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockAmmoUniform",
    "Icon": "War/Content/Textures/UI/ItemIcons/Uniforms/AmmoUniformWIcon.0",
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeAmmoIcon.0",
    "Encumbrance": 125,
    "EquipmentSlot": "EEquipmentSlot::Body",
    "ItemCategory": "EItemCategory::Uniforms",
    "ItemProfileType": "EItemProfileType::Uniform",
    "ItemComponentClass": {
      "ObjectName": "Class UniformItemComponent",
      "ObjectPath": "/Script/War"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15882060089208894262",
        "topLeft": "11559097939625585621",
        "bottomRight": "14757299872897957900"
      },
      "crated": {
        "topLeft": "11559097939625585621",
        "full": "11270941418781438774",
        "bottomRight": "15910206500811833344"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/Uniforms/BPArmourUniformC",
    "CodeName": "ArmourUniformC",
    "ChassisName": "Colonial Armour Uniform",
    "DisplayName": "Velian Flak Vest",
    "Description": "A heavily reinforced vest designed to protect grenadiers from shrapnel back blasts. As such, the Flak Vest reduces cuts and scrapes on top of dampening bullet impacts. ",
    "Encumbrance": 220,
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockArmourUniform",
    "Icon": "War/Content/Textures/UI/ItemIcons/Uniforms/ArmourUniformC.0",
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeArmourIcon.0",
    "EquipmentSlot": "EEquipmentSlot::Body",
    "ItemCategory": "EItemCategory::Uniforms",
    "ItemProfileType": "EItemProfileType::Uniform",
    "ItemComponentClass": {
      "ObjectName": "Class UniformItemComponent",
      "ObjectPath": "/Script/War"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 5,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13898224058616443099",
        "topLeft": "9394083999909492936",
        "bottomRight": "15910095363165177856"
      },
      "crated": {
        "topLeft": "9394083999909492936",
        "full": "13862195261597442715",
        "bottomRight": "15910101238688008192"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/Uniforms/BPArmourUniformW",
    "CodeName": "ArmourUniformW",
    "ChassisName": "Warden Armour Uniform",
    "DisplayName": "Gunner’s Breastplate",
    "Description": "Repurposed from ancient wars, these armour plates are highly effective at stopping enemy small arms fire. That protection comes at the cost of weight, and the wearer will feel quite restricted and encumbered. ",
    "Encumbrance": 330,
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockArmourUniform",
    "Icon": "War/Content/Textures/UI/ItemIcons/Uniforms/ArmourUniformW.0",
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeArmourIcon.0",
    "EquipmentSlot": "EEquipmentSlot::Body",
    "ItemCategory": "EItemCategory::Uniforms",
    "ItemProfileType": "EItemProfileType::Uniform",
    "ItemComponentClass": {
      "ObjectName": "Class UniformItemComponent",
      "ObjectPath": "/Script/War"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 3,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14150425706075681613",
        "topLeft": "9401885859425893768",
        "bottomRight": "15603970162548539392"
      },
      "crated": {
        "topLeft": "9401885859425893768",
        "full": "14150425706067291020",
        "bottomRight": "15386680724371800064"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/Uniforms/BPEngineerUniformC",
    "CodeName": "EngineerUniformC",
    "ChassisName": "Colonial Engineer Uniform",
    "DisplayName": "Fabri Rucksack",
    "Description": "Engineers are the bones of the Mesean Republic. They are outfitted with a heavy bag and belts for easy access to tools and handheld materials.",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockEngineerUniform",
    "Icon": "War/Content/Textures/UI/ItemIcons/Uniforms/EngineerUniformCIcon.0",
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeEngineerIcon.0",
    "Encumbrance": 125,
    "EquipmentSlot": "EEquipmentSlot::Body",
    "ItemCategory": "EItemCategory::Uniforms",
    "ItemProfileType": "EItemProfileType::Uniform",
    "ItemComponentClass": {
      "ObjectName": "Class UniformItemComponent",
      "ObjectPath": "/Script/War"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15663639991219090212",
        "topLeft": "9971591200086237256",
        "bottomRight": "15621971235913596928"
      },
      "crated": {
        "topLeft": "9971591200086237256",
        "full": "9899032536904065828",
        "bottomRight": "15910206535171571712"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/Uniforms/BPEngineerUniformW",
    "CodeName": "EngineerUniformW",
    "ChassisName": "Warden Engineer Uniform",
    "DisplayName": "Sapper Gear",
    "Description": "Caoivish engineers are legendary in song and stature. They wear specialized uniforms, outfitted with belts and bags for easy access to tools and handheld materials.",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockEngineerUniform",
    "Icon": "War/Content/Textures/UI/ItemIcons/Uniforms/EngineerUniformWIcon.0",
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeEngineerIcon.0",
    "Encumbrance": 125,
    "EquipmentSlot": "EEquipmentSlot::Body",
    "ItemCategory": "EItemCategory::Uniforms",
    "ItemProfileType": "EItemProfileType::Uniform",
    "ItemComponentClass": {
      "ObjectName": "Class UniformItemComponent",
      "ObjectPath": "/Script/War"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15015121576166568758",
        "topLeft": "9971871575555514461",
        "bottomRight": "14757299872897957900"
      },
      "crated": {
        "topLeft": "9971871575555514461",
        "full": "10403435695178150198",
        "bottomRight": "15910206500811833344"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/Uniforms/BPGrenadeUniformC",
    "CodeName": "GrenadeUniformC",
    "ChassisName": "Colonial Grenade Uniform",
    "DisplayName": "Grenadier’s Baldric",
    "Description": "Of the most distinguished divisions of the Legion are the Grenadiers. They are outfitted with specialized satchels and pockets for maximizing their capacity to haul explosives.",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockGrenadeUniform",
    "Icon": "War/Content/Textures/UI/ItemIcons/Uniforms/GrenadeUniformCIcon.0",
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeGrenadeIcon.0",
    "Encumbrance": 125,
    "EquipmentSlot": "EEquipmentSlot::Body",
    "ItemCategory": "EItemCategory::Uniforms",
    "ItemProfileType": "EItemProfileType::Uniform",
    "ItemComponentClass": {
      "ObjectName": "Class UniformItemComponent",
      "ObjectPath": "/Script/War"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14222483776771154735",
        "topLeft": "10433217549346104922",
        "bottomRight": "15603959589471518720"
      },
      "crated": {
        "topLeft": "10433217549346104922",
        "full": "14222483776846652198",
        "bottomRight": "15892192413696131072"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/Uniforms/BPMedicUniformC",
    "CodeName": "MedicUniformC",
    "ChassisName": "Colonial Medic Uniform",
    "DisplayName": "Medic Fatigues",
    "Description": "For medics of the Legion, this uniform has a plethora of pockets and bags designed to carry and deploy first aid gear easily.",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockMedicUniform",
    "Icon": "War/Content/Textures/UI/ItemIcons/Uniforms/MedicUniformCIcon.0",
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeMedicIcon.0",
    "Encumbrance": 125,
    "EquipmentSlot": "EEquipmentSlot::Body",
    "ItemCategory": "EItemCategory::Uniforms",
    "ItemProfileType": "EItemProfileType::Uniform",
    "ItemComponentClass": {
      "ObjectName": "Class UniformItemComponent",
      "ObjectPath": "/Script/War"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15231290028942649702",
        "topLeft": "9892788087550190186",
        "bottomRight": "15693958962649006080"
      },
      "crated": {
        "topLeft": "9892788087550190186",
        "full": "13934253473709386086",
        "bottomRight": "15892192413695868928"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/Uniforms/BPMedicUniformW",
    "CodeName": "MedicUniformW",
    "ChassisName": "Warden Medic Uniform",
    "DisplayName": "Physician’s Jacket",
    "Description": "Physicians in the Warden army are unmatched and this uniform has a plethora of pockets and bags designed to carry and deploy first aid gear easily.",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockMedicUniform",
    "Icon": "War/Content/Textures/UI/ItemIcons/Uniforms/MedicUniformWIcon.0",
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeMedicIcon.0",
    "Encumbrance": 125,
    "EquipmentSlot": "EEquipmentSlot::Body",
    "ItemCategory": "EItemCategory::Uniforms",
    "ItemProfileType": "EItemProfileType::Uniform",
    "ItemComponentClass": {
      "ObjectName": "Class UniformItemComponent",
      "ObjectPath": "/Script/War"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15015398653102666551",
        "topLeft": "9820726078280639013",
        "bottomRight": "14448729356266111232"
      },
      "crated": {
        "topLeft": "9820726078280639013",
        "full": "13862195810943382327",
        "bottomRight": "15313479859422887936"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/Uniforms/BPOfficerUniformC",
    "CodeName": "OfficerUniformC",
    "ChassisName": "Colonial Officer Uniform",
    "DisplayName": "Officialis’ Attire",
    "Description": "This uniform, while impractical in combat, denotes the head of a regiment. Appropriately dressed officers may freely discipline their subordinates. Ancient Mesean officialis were key to the Legion’s organization. This modern attire honours their lasting legacy.",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockOfficerUniform",
    "Icon": "War/Content/Textures/UI/ItemIcons/Uniforms/OfficerUniformCIcon.0",
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeOfficerIcon.0",
    "Encumbrance": 125,
    "EquipmentSlot": "EEquipmentSlot::Body",
    "ItemCategory": "EItemCategory::Uniforms",
    "ItemProfileType": "EItemProfileType::Uniform",
    "ItemComponentClass": {
      "ObjectName": "Class UniformItemComponent",
      "ObjectPath": "/Script/War"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 3,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15664203078408551872",
        "topLeft": "9248757329192911447",
        "bottomRight": "15607590521499811856"
      },
      "crated": {
        "topLeft": "9248757329192911447",
        "full": "11341028906814617792",
        "bottomRight": "15907075485771759616"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/Uniforms/BPOfficerUniformW",
    "CodeName": "OfficerUniformW",
    "ChassisName": "Warden Officer Uniform",
    "DisplayName": "Officer’s Regalia",
    "Description": "A formal uniform that denotes a regiment’s leading officer. While impractical, the officer on duty may use their authority to discipline subordinates without reparation. Officers hold an important role in the Warden military, dating back to ancient times when Caoiva was ruled by a dozen kings.",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockOfficerUniform",
    "Icon": "War/Content/Textures/UI/ItemIcons/Uniforms/OfficerUniformWIcon.0",
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeOfficerIcon.0",
    "Encumbrance": 125,
    "EquipmentSlot": "EEquipmentSlot::Body",
    "ItemCategory": "EItemCategory::Uniforms",
    "ItemProfileType": "EItemProfileType::Uniform",
    "ItemComponentClass": {
      "ObjectName": "Class UniformItemComponent",
      "ObjectPath": "/Script/War"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 3,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15591859063806115041",
        "topLeft": "9319689087770875439",
        "bottomRight": "17909689958814187520"
      },
      "crated": {
        "topLeft": "9319689087770875439",
        "full": "10980735993184663777",
        "bottomRight": "18196909230945484800"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/Uniforms/BPRainUniformC",
    "CodeName": "RainUniformC",
    "ChassisName": "Colonial Rain Uniform",
    "DisplayName": "Legionary’s Oilcoat",
    "Description": "Quite accustomed to the temperate climates of the south, Colonials wear this oilcloth jacket paired with thick boots to operate at high efficiency in all but the heaviest storms.",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockRainUniform",
    "Icon": "War/Content/Textures/UI/ItemIcons/Uniforms/RainUniformCIcon.0",
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeRainIcon.0",
    "Encumbrance": 125,
    "EquipmentSlot": "EEquipmentSlot::Body",
    "ItemCategory": "EItemCategory::Uniforms",
    "ItemProfileType": "EItemProfileType::Uniform",
    "ItemComponentClass": {
      "ObjectName": "Class UniformItemComponent",
      "ObjectPath": "/Script/War"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13934257317696992103",
        "topLeft": "10261509274376024781",
        "bottomRight": "15621971227424358500"
      },
      "crated": {
        "topLeft": "10261509274376024781",
        "full": "13934257253272413030",
        "bottomRight": "15892192135588610048"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/Uniforms/BPScoutUniformC",
    "CodeName": "ScoutUniformC",
    "ChassisName": "Colonial Scout Uniform",
    "DisplayName": "Recon Camo",
    "Description": "Legion scouts are deployed on the most dangerous missions. Their gear is lightweight, sturdy and well-suited for extended operations in rugged terrain.",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockScoutUniform",
    "Icon": "War/Content/Textures/UI/ItemIcons/Uniforms/ScoutUniformCIcon.0",
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeScoutIcon.0",
    "Encumbrance": 125,
    "EquipmentSlot": "EEquipmentSlot::Body",
    "ItemCategory": "EItemCategory::Uniforms",
    "ItemProfileType": "EItemProfileType::Uniform",
    "ItemComponentClass": {
      "ObjectName": "Class UniformItemComponent",
      "ObjectPath": "/Script/War"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14873253998088231223",
        "topLeft": "11550935182044372141",
        "bottomRight": "15621973907385352192"
      },
      "crated": {
        "topLeft": "11550935182044372141",
        "full": "14873253927288326454",
        "bottomRight": "15910206482558484480"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/Uniforms/BPScoutUniformW",
    "CodeName": "ScoutUniformW",
    "ChassisName": "Warden Scout Uniform",
    "DisplayName": "Outrider’s Mantle",
    "Description": "The Warden army relies on outriders to provide and recieve vital intelligence. Their gear is sturdy and well-suited for extended operations in rugged terrain and inclement weather.",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockScoutUniform",
    "Icon": "War/Content/Textures/UI/ItemIcons/Uniforms/ScoutUniformWIcon.0",
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeScoutIcon.0",
    "Encumbrance": 125,
    "EquipmentSlot": "EEquipmentSlot::Body",
    "ItemCategory": "EItemCategory::Uniforms",
    "ItemProfileType": "EItemProfileType::Uniform",
    "ItemComponentClass": {
      "ObjectName": "Class UniformItemComponent",
      "ObjectPath": "/Script/War"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "16026461369357580607",
        "topLeft": "11550113856523151533",
        "bottomRight": "14739279684772560896"
      },
      "crated": {
        "topLeft": "11550113856523151533",
        "full": "14871006521226197311",
        "bottomRight": "15315731661384318976"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/Uniforms/BPSnowUniformC",
    "CodeName": "SnowUniformC",
    "ChassisName": "Colonial Snow Uniform",
    "DisplayName": "Heavy Topcoat",
    "Description": "Unaccustomed to the cold, Legionaries must always adapt. This heavy topcoat is designed to mitigate the effects of cold while still allowing for optimal mobility and combat effectiveness.",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockSnowUniform",
    "Icon": "War/Content/Textures/UI/ItemIcons/Uniforms/SnowUniformCIcon.0",
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSnowIcon.0",
    "Encumbrance": 125,
    "EquipmentSlot": "EEquipmentSlot::Body",
    "ItemCategory": "EItemCategory::Uniforms",
    "ItemProfileType": "EItemProfileType::Uniform",
    "ItemComponentClass": {
      "ObjectName": "Class UniformItemComponent",
      "ObjectPath": "/Script/War"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14801196401969691437",
        "topLeft": "9821038284470349989",
        "bottomRight": "15621971227357216772"
      },
      "crated": {
        "topLeft": "9821038284470349989",
        "full": "14801196333250341668",
        "bottomRight": "15315731384358666240"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/Uniforms/BPSnowUniformW",
    "CodeName": "SnowUniformW",
    "ChassisName": "Warden Snow Uniform",
    "DisplayName": "Caoivish Parka",
    "Description": "Born and bred in the northern cold, this heavy parka protects Warden infantry from all but the worst blizzards.",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockSnowUniform",
    "Icon": "War/Content/Textures/UI/ItemIcons/Uniforms/SnowUniformWIcon.0",
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeSnowIcon.0",
    "Encumbrance": 125,
    "EquipmentSlot": "EEquipmentSlot::Body",
    "ItemCategory": "EItemCategory::Uniforms",
    "ItemProfileType": "EItemProfileType::Uniform",
    "ItemComponentClass": {
      "ObjectName": "Class UniformItemComponent",
      "ObjectPath": "/Script/War"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15306442269325157171",
        "topLeft": "9820712916001616628",
        "bottomRight": "14418384295695482884"
      },
      "crated": {
        "topLeft": "9820712916001616628",
        "full": "15594672643329385271",
        "bottomRight": "15852785040774660096"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/Uniforms/BPSoldierUniformC",
    "CodeName": "SoldierUniformC",
    "ChassisName": "Colonial Soldier Uniform",
    "DisplayName": "Legionary Fatigues",
    "Description": "Standard issue infantry uniform for the Colonial Legion, designed for general frontline warfare with ballistics weapons such as rifles and machine guns.",
    "FactionVariant": "EFactionId::Colonials",
    "Icon": "War/Content/Textures/UI/ItemIcons/Uniforms/SoldierUniformCIcon.0",
    "Encumbrance": 125,
    "EquipmentSlot": "EEquipmentSlot::Body",
    "ItemCategory": "EItemCategory::Uniforms",
    "ItemProfileType": "EItemProfileType::Uniform",
    "ItemComponentClass": {
      "ObjectName": "Class UniformItemComponent",
      "ObjectPath": "/Script/War"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "11346939819184055085",
        "topLeft": "12198726734445390426",
        "bottomRight": "15621971785669412864"
      },
      "crated": {
        "topLeft": "12198726734445390426",
        "full": "11346939818118701862",
        "bottomRight": "15910206535171571712"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/Uniforms/BPSoldierUniformW",
    "CodeName": "SoldierUniformW",
    "ChassisName": "Warden Soldier Uniform",
    "DisplayName": "Infantry Battledress",
    "Description": "Most common Warden infantry uniform, designed for general frontline warfare with ballistics weapons such as rifles and machine guns.",
    "FactionVariant": "EFactionId::Wardens",
    "Icon": "War/Content/Textures/UI/ItemIcons/Uniforms/SoldierUniformWIcon.0",
    "Encumbrance": 125,
    "EquipmentSlot": "EEquipmentSlot::Body",
    "ItemCategory": "EItemCategory::Uniforms",
    "ItemProfileType": "EItemProfileType::Uniform",
    "ItemComponentClass": {
      "ObjectName": "Class UniformItemComponent",
      "ObjectPath": "/Script/War"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "11270378483860529958",
        "topLeft": "12271080099219352149",
        "bottomRight": "14757295442639192076"
      },
      "crated": {
        "topLeft": "12271080099219352149",
        "full": "11274882226295431990",
        "bottomRight": "15910206500811833344"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/Uniforms/BPTankUniformC",
    "CodeName": "TankUniformC",
    "ChassisName": "Colonial Tank Uniform",
    "DisplayName": "Tankman’s Coveralls",
    "Description": "Nothing compares to the efficiency and destructive capabilities of the Colonial armour division. Tank crew are provided with sturdy coveralls and satchel belts for easy access to essential tools required for tank maintenance and operation.",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockTankUniform",
    "Icon": "War/Content/Textures/UI/ItemIcons/Uniforms/TankUniformCIcon.0",
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeTankIcon.0",
    "Encumbrance": 125,
    "EquipmentSlot": "EEquipmentSlot::Body",
    "ItemCategory": "EItemCategory::Uniforms",
    "ItemProfileType": "EItemProfileType::Uniform",
    "ItemComponentClass": {
      "ObjectName": "Class UniformItemComponent",
      "ObjectPath": "/Script/War"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14798944597861423981",
        "topLeft": "9748945673877688756",
        "bottomRight": "15621971708360032256"
      },
      "crated": {
        "topLeft": "9748945673877688756",
        "full": "14798944533436848958",
        "bottomRight": "15910206483631964160"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/ItemPickups/Uniforms/BPTankUniformW",
    "CodeName": "TankUniformW",
    "ChassisName": "Warden Tank Uniform",
    "DisplayName": "Padded Boiler Suit",
    "Description": "Caoivish armour is unmatched in its design and resilience. All crew are provided with a sturdy boilersuit and satchel belts to access essential tools required for tank maintenance and operation.",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockTankUniform",
    "Icon": "War/Content/Textures/UI/ItemIcons/Uniforms/TankUniformWIcon.0",
    "SubTypeIcon": "War/Content/Textures/UI/ItemIcons/SubtypeTankIcon.0",
    "Encumbrance": 125,
    "EquipmentSlot": "EEquipmentSlot::Body",
    "ItemCategory": "EItemCategory::Uniforms",
    "ItemProfileType": "EItemProfileType::Uniform",
    "ItemComponentClass": {
      "ObjectName": "Class UniformItemComponent",
      "ObjectPath": "/Script/War"
    },
    "ItemDynamicData": {
      "CostPerCrate": [
        {
          "ItemCodeName": "Cloth",
          "Quantity": 100,
          "DisplayName": "Basic Materials"
        }
      ],
      "QuantityPerCrate": 15,
      "CrateProductionTime": 90,
      "SingleRetrieveTime": 5,
      "CrateRetrieveTime": 16,
      "ObjectPath": "War/Content/Blueprints/Data/BPItemDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14729138807932087102",
        "topLeft": "9965127802885214868",
        "bottomRight": "14757229504153780236"
      },
      "crated": {
        "topLeft": "9965127802885214868",
        "full": "14729138739212610366",
        "bottomRight": "15892192102310739968"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/BPMech",
    "CodeName": "Mech",
    "ChassisName": "Mech",
    "DisplayName": "Centurion MV-2",
    "Description": "Designed for the soul purpose of fighting back the cursed undead, the “Centurion” Mechanized Utility Vehicle is equipped with two high powered, heavy machine guns and a deadly, front-facing cannon.",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockMech",
    "Icon": "War/Content/Textures/Event/MechVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Mech",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "FuelTank": 250,
    "DepthCuttoffForSwimDamage": 350,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 230
        }
      ],
      "MaxHealth": 9850,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 200,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 3,
      "FuelCapacity": 250,
      "FuelConsumptionPerSecond": 0.75,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 1,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.6,
      "RotationRate": 0.25,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 200,
      "EngineForce": 15500,
      "MassOverride": 10500,
      "TankArmour": 9000,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10865339058085978411",
        "topLeft": "13145243511891862964",
        "bottomRight": "13898459770337101824"
      },
      "crated": {
        "topLeft": "13145243511891862964",
        "full": "10869842795156496683",
        "bottomRight": "14194355108334010496"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/BPRelicAPC",
    "CodeName": "RelicAPC",
    "DisplayName": "Heavy Infantry Carrier",
    "Description": "An armoured landship reinforced with an alloy now lost to time. This nearly indestructible beast carries up to 8 passengers. Whispers of its existence date back to the first breaching.",
    "Icon": "War/Content/Textures/UI/VehicleIcons/RelicApc.0",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "ArmourType": "EArmourType::Tier1Tank",
    "FuelTank": 250,
    "DepthCuttoffForSwimDamage": 250,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Relic",
          "Quantity": 35676
        }
      ],
      "MaxHealth": 40000,
      "MinorDamagePercent": 0.85,
      "MajorDamagePercent": 0.95,
      "RepairCost": 0,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 15,
      "FuelCapacity": 250,
      "FuelConsumptionPerSecond": 0.75,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.6,
      "RotationRate": 0.15,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 0,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15362687404980706929",
        "topLeft": "11699707971606452074",
        "bottomRight": "15625477228454739968"
      },
      "crated": {
        "topLeft": "11699707971606452074",
        "full": "10757761149689011825",
        "bottomRight": "15409201092256333824"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/BPRelicArmouredCar",
    "CodeName": "RelicArmouredCar",
    "DisplayName": "Armoured Fighting Tractor",
    "Description": "A recovered Colonial prototype once found in early mechanized warfare. Built on the frame of a powerful tractor, this amoured vehicle was seen escorting soldiers or, later, in support of larger armoured forces.",
    "TechID": "ETechID::UnlockLightTankAmmoHE",
    "Icon": "War/Content/Textures/UI/VehicleIcons/RelicArmouredCarVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::WheeledArmoured",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FulltrackLight",
    "ArmourType": "EArmourType::Tier2Tank",
    "FuelTank": 200,
    "DepthCuttoffForSwimDamage": 230,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Relic",
          "Quantity": 120
        }
      ],
      "MaxHealth": 1250,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 2,
      "FuelCapacity": 200,
      "FuelConsumptionPerSecond": 0.5,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.4,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 700,
      "EngineForce": 7850,
      "MassOverride": 3150,
      "TankArmour": 3700,
      "MinTankArmourPercent": 0.15,
      "TankArmourMinPenetrationChance": 0.65,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10744580333755080169",
        "topLeft": "12419438397260913578",
        "bottomRight": "15263420486317531392"
      },
      "crated": {
        "topLeft": "12419438397260913578",
        "full": "10756894859691219425",
        "bottomRight": "15410889665097523200"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/BPRelicLightTank",
    "CodeName": "RelicLightTank",
    "DisplayName": "Storm Tank",
    "Description": "A light armoured mechanized vehicle first seen in early border skirmishes between Caoiva and Veli. With its thin frame, it was deployed in wide formations, often overwhelming enemy forces.",
    "TechID": "ETechID::UnlockRelicLightTank",
    "Icon": "War/Content/Textures/UI/VehicleIcons/RelicLightTankVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Fulltrack",
    "ArmourType": "EArmourType::Tier2Tank",
    "FuelTank": 200,
    "DepthCuttoffForSwimDamage": 220,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Relic",
          "Quantity": 125
        }
      ],
      "MaxHealth": 2500,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 160,
      "ResourcesPerBuildCycle": 2,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 200,
      "FuelConsumptionPerSecond": 0.35,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.75,
      "RotationRate": 0.145,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 20500,
      "MassOverride": 16000,
      "TankArmour": 4800,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0.5,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9555928547917141198",
        "topLeft": "13135199277701831781",
        "bottomRight": "14468025458917126176"
      },
      "crated": {
        "topLeft": "13135199277701831781",
        "full": "9605679242467068110",
        "bottomRight": "14251756194665332736"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/BPRelicMediumTank",
    "CodeName": "RelicMediumTank",
    "ChassisName": "Relic Assault Tank",
    "DisplayName": "PL-1 “Phalanx”",
    "Description": "Ancient by modern standards, this first iteration heavily armoured Colonial Assault tank is fitted with full coverage shielding and equipped with twin sponson cannons.",
    "TechID": "ETechID::UnlockRelicMediumTank",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ColonialRelicMediumTankVehicleIcon.0",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::BattleTank",
    "ShippableInfo": "EShippableType::None",
    "FuelTank": 350,
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "ArmourType": "EArmourType::Tier2Tank",
    "DepthCuttoffForSwimDamage": 225,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Relic",
          "Quantity": 150
        }
      ],
      "MaxHealth": 4850,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 195,
      "ResourcesPerBuildCycle": 4,
      "ItemHolderCapacity": 6,
      "FuelCapacity": 350,
      "FuelConsumptionPerSecond": 0.4,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.6,
      "RotationRate": 0.165,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 22500,
      "MassOverride": 15000,
      "TankArmour": 5400,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0.33,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15293991034690769679",
        "topLeft": "9761696452939031755",
        "bottomRight": "15046684771184869632"
      },
      "crated": {
        "topLeft": "9761696452939031755",
        "full": "9537286905319971102",
        "bottomRight": "15406823673243369472"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/BPRelicScoutVehicle",
    "CodeName": "RelicScoutVehicle",
    "ChassisName": "Staff Car",
    "DisplayName": "Staff Car",
    "Description": "A vehicle once used by officers to survey the battlefield, or to deliver emergency supplies and orders.",
    "TechID": "ETechID::UnlockRelicScoutVehicle",
    "Icon": "War/Content/Textures/UI/VehicleIcons/RelicCarVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::ScoutVehicle",
    "ArmourType": "EArmourType::LightVehicle",
    "FuelTank": 150,
    "DepthCuttoffForSwimDamage": 240,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Relic",
          "Quantity": 80
        }
      ],
      "MaxHealth": 900,
      "MinorDamagePercent": 0.6,
      "MajorDamagePercent": 0.8,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 9,
      "FuelCapacity": 150,
      "FuelConsumptionPerSecond": 0.125,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.3,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.65,
      "RotationSpeedCuttoff": 15,
      "SpeedSqrThreshold": 800,
      "EngineForce": 7500,
      "MassOverride": 1450,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10671960883621452433",
        "topLeft": "12489225362282992165",
        "bottomRight": "13891564983638032384"
      },
      "crated": {
        "topLeft": "12489225362282992165",
        "full": "10689975300116109969",
        "bottomRight": "15337143499292147712"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/BPRelicTruck",
    "CodeName": "RelicTruck",
    "DisplayName": "Repurposed Truck",
    "Description": "A sturdy old farmer's truck that's been reinforced for military use.",
    "TechID": "ETechID::UnlockRelicTruck",
    "Icon": "War/Content/Textures/UI/VehicleIcons/RelicTruckVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Truck",
    "ArmourType": "EArmourType::LightVehicle",
    "FuelTank": 150,
    "DepthCuttoffForSwimDamage": 240,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Relic",
          "Quantity": 80
        }
      ],
      "MaxHealth": 800,
      "MinorDamagePercent": 0.1875,
      "MajorDamagePercent": 0.7,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 17,
      "FuelCapacity": 150,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.3,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.4,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 800,
      "EngineForce": 17500,
      "MassOverride": 8000,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9625664000147033244",
        "topLeft": "12421943881461114009",
        "bottomRight": "16059511712335790080"
      },
      "crated": {
        "topLeft": "12421943881461114009",
        "full": "9626794261603667356",
        "bottomRight": "15338832417871888384"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/ArmoredCar/BPArmoredCarATW",
    "CodeName": "ArmoredCarATW",
    "ChassisName": "Armoured Car",
    "DisplayName": "O’Brien V.113 Gravekeeper",
    "Description": "A slight variation of the V.110, the Gravekeeper comes fitted with an embedded Bonesaw launcher, transforming the humble armoured car into an effective indirect anti-armour vehicle.",
    "TechID": "ETechID::UnlockArmoredCarAT",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ArmoredCarATWVehicleIcon.0",
    "FactionVariant": "EFactionId::Wardens",
    "VehicleProfileType": "EVehicleProfileType::WheeledArmoured",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::ArmoredCar",
    "ArmourType": "EArmourType::Tier1Tank",
    "ShippableInfo": "EShippableType::Normal",
    "FuelTank": 150,
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 45
        }
      ],
      "MaxHealth": 900,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 115,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 4,
      "FuelCapacity": 150,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.3,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.7,
      "RotationRate": 0.3,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 700,
      "EngineForce": 9500,
      "MassOverride": 2500,
      "TankArmour": 2450,
      "MinTankArmourPercent": 0.05,
      "TankArmourMinPenetrationChance": 0.85,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9526075171608120760",
        "topLeft": "13422305403219650669",
        "bottomRight": "15046755898569785344"
      },
      "crated": {
        "topLeft": "13422305403219650669",
        "full": "9532848141227707565",
        "bottomRight": "15408072994399977472"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/ArmoredCar/BPArmoredCarC",
    "CodeName": "ArmoredCarC",
    "ChassisName": "Armoured Car",
    "DisplayName": "T3 “Xiphos”",
    "Description": "Colonial Armoured Cars are quick, well-rounded urban assault platforms. These anti-infantry vehicles are equipped with twin-barrelled machineguns.",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockArmoredCar",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ArmoredCarVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::WheeledArmoured",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::ArmoredCar",
    "ArmourType": "EArmourType::Tier1Tank",
    "ShippableInfo": "EShippableType::Normal",
    "FuelTank": 150,
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 40
        }
      ],
      "MaxHealth": 1000,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 95,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 150,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.3,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.7,
      "RotationRate": 0.3,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 700,
      "EngineForce": 8500,
      "MassOverride": 2000,
      "TankArmour": 2100,
      "MinTankArmourPercent": 0.05,
      "TankArmourMinPenetrationChance": 0.85,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14165296823405020060",
        "topLeft": "12486188901315267747",
        "bottomRight": "17361923917375078400"
      },
      "crated": {
        "topLeft": "12486188901315267747",
        "full": "9537285221978082204",
        "bottomRight": "15128007660315607040"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/ArmoredCar/BPArmoredCarMobilityC",
    "CodeName": "ArmoredCarMobilityC",
    "ChassisName": "Tankette",
    "DisplayName": "T12 “Actaeon” Tankette",
    "Description": "This complete overhaul of the T3 Armoured Car is reinforced with tank armour. While these extra defenses lower the T12’s overall speed and handling, the addition of treads provide increased performance in less than ideal terrain.",
    "TechID": "ETechID::UnlockArmoredCarMobility",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ArmoredCarDefensiveVehicleIcon.0",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FulltrackLightTanks",
    "ArmourType": "EArmourType::Tier2Tank",
    "FactionVariant": "EFactionId::Colonials",
    "VehicleProfileType": "EVehicleProfileType::WheeledArmoured",
    "ShippableInfo": "EShippableType::Normal",
    "FuelTank": 150,
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 50
        }
      ],
      "MaxHealth": 1150,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 120,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 4,
      "FuelCapacity": 150,
      "FuelConsumptionPerSecond": 0.2,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.85,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.35,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 15600,
      "MassOverride": 2900,
      "TankArmour": 7200,
      "MinTankArmourPercent": 0.1,
      "TankArmourMinPenetrationChance": 0.6,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10679842227194008816",
        "topLeft": "12202139987837561686",
        "bottomRight": "15047793079218339840"
      },
      "crated": {
        "topLeft": "12202139987837561686",
        "full": "10689975317773520114",
        "bottomRight": "15417062327127638016"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/ArmoredCar/BPArmoredCarMobilityW",
    "CodeName": "ArmoredCarMobilityW",
    "ChassisName": "Armoured Car",
    "DisplayName": "O’Brien V.121 Highlander",
    "Description": "Fitted with all-terrain treads, the Highlander brings significant all-terrain mobility and performs especially well in snowy and mountainous environments. ",
    "TechID": "ETechID::UnlockArmoredCarMobility",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ArmoredCarMobilityWarVehicleIcon.0",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FulltrackLightTanks",
    "FactionVariant": "EFactionId::Wardens",
    "VehicleProfileType": "EVehicleProfileType::WheeledArmoured",
    "ArmourType": "EArmourType::Tier1Tank",
    "ShippableInfo": "EShippableType::Normal",
    "FuelTank": 150,
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 40
        }
      ],
      "MaxHealth": 900,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 115,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 150,
      "FuelConsumptionPerSecond": 0.15,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.85,
      "OffroadSnowPenalty": 0.1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.5,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 700,
      "EngineForce": 17500,
      "MassOverride": 2900,
      "TankArmour": 2700,
      "MinTankArmourPercent": 0.05,
      "TankArmourMinPenetrationChance": 0.85,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10666330181968041716",
        "topLeft": "13424548399418070453",
        "bottomRight": "15046738011304763392"
      },
      "crated": {
        "topLeft": "13424548399418070453",
        "full": "10685470618896781300",
        "bottomRight": "15338266924224086016"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/ArmoredCar/BPArmoredCarOffensiveC",
    "CodeName": "ArmoredCarOffensiveC",
    "ChassisName": "Armoured Car",
    "DisplayName": "T5 “Percutio”",
    "Description": "This “Xiphos” variant is fitted with a high-powered anti-tank turret in place of the twin machine gun platform.",
    "TechID": "ETechID::UnlockArmoredCarOffensive",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ArmoredCarOffensiveCVehicleIcon.0",
    "FactionVariant": "EFactionId::Colonials",
    "VehicleProfileType": "EVehicleProfileType::WheeledArmoured",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::ArmoredCar",
    "ArmourType": "EArmourType::Tier1Tank",
    "ShippableInfo": "EShippableType::Normal",
    "FuelTank": 150,
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 40
        }
      ],
      "MaxHealth": 1000,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 95,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 150,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.3,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.7,
      "RotationRate": 0.3,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 8500,
      "MassOverride": 2500,
      "TankArmour": 2100,
      "MinTankArmourPercent": 0.05,
      "TankArmourMinPenetrationChance": 0.85,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9554173754696713106",
        "topLeft": "11836473810099618897",
        "bottomRight": "17361641274167296002"
      },
      "crated": {
        "topLeft": "11836473810099618897",
        "full": "9517019055622867858",
        "bottomRight": "15415956493308002304"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/ArmoredCar/BPArmoredCarOffensiveW",
    "CodeName": "ArmoredCarOffensiveW",
    "ChassisName": "Armoured Car",
    "DisplayName": "O’Brien V.101 Freeman",
    "Description": "This early O’Brien variant, the V.101 Freeman is fitted with a 360 degree ballistics cannon turret at the expense of top speed.",
    "TechID": "ETechID::UnlockArmoredCarOffensive",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ArmoredCarOffensiveWVehicleIcon.0",
    "FactionVariant": "EFactionId::Wardens",
    "VehicleProfileType": "EVehicleProfileType::WheeledArmoured",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::ArmoredCar",
    "ArmourType": "EArmourType::Tier1Tank",
    "ShippableInfo": "EShippableType::Normal",
    "FuelTank": 150,
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 60
        }
      ],
      "MaxHealth": 1000,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 130,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 150,
      "FuelConsumptionPerSecond": 0.2,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.3,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.2,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 8250,
      "MassOverride": 3650,
      "TankArmour": 2100,
      "MinTankArmourPercent": 0.05,
      "TankArmourMinPenetrationChance": 0.75,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10706035844523715736",
        "topLeft": "11843258018209310554",
        "bottomRight": "15625468433443848192"
      },
      "crated": {
        "topLeft": "11843258018209310554",
        "full": "10672258845703628952",
        "bottomRight": "15337143568011624448"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/ArmoredCar/BPArmoredCarTwinC",
    "CodeName": "ArmoredCarTwinC",
    "ChassisName": "Armoured Car",
    "DisplayName": "T8 “Gemini”",
    "Description": "Fitted with twin RPG launchers, the T8 employs hit-and-run assaults against enemy structures and emplacements.",
    "TechID": "ETechID::UnlockArmoredCarTwin",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ArmoredCarTwinCItemIcon.0",
    "FactionVariant": "EFactionId::Colonials",
    "VehicleProfileType": "EVehicleProfileType::WheeledArmoured",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::ArmoredCar",
    "ArmourType": "EArmourType::Tier1Tank",
    "ShippableInfo": "EShippableType::Normal",
    "FuelTank": 150,
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 45
        }
      ],
      "MaxHealth": 1000,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 115,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 12,
      "FuelCapacity": 150,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.3,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.7,
      "RotationRate": 0.3,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 700,
      "EngineForce": 8500,
      "MassOverride": 2750,
      "TankArmour": 2350,
      "MinTankArmourPercent": 0.05,
      "TankArmourMinPenetrationChance": 0.85,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14138820582335044508",
        "topLeft": "12848086550555303203",
        "bottomRight": "17361887632409231364"
      },
      "crated": {
        "topLeft": "12848086550555303203",
        "full": "9519271405469289372",
        "bottomRight": "15128570609195286528"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/ArmoredCar/BPArmoredCarW",
    "CodeName": "ArmoredCarW",
    "ChassisName": "Armoured Car",
    "DisplayName": "O’Brien V.110",
    "Description": "Warden Armoured Cars are quick, well-rounded urban assault platforms. These anti-infantry vehicles are equipped with twin-barrelled machineguns.",
    "FactionVariant": "EFactionId::Wardens",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ArmoredCarWarVehicleIcon.0",
    "TechID": "ETechID::UnlockArmoredCar",
    "VehicleProfileType": "EVehicleProfileType::WheeledArmoured",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::ArmoredCar",
    "ArmourType": "EArmourType::Tier1Tank",
    "ShippableInfo": "EShippableType::Normal",
    "FuelTank": 150,
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 35
        }
      ],
      "MaxHealth": 900,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 105,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 150,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.3,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.7,
      "RotationRate": 0.3,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 700,
      "EngineForce": 9500,
      "MassOverride": 2000,
      "TankArmour": 2700,
      "MinTankArmourPercent": 0.05,
      "TankArmourMinPenetrationChance": 0.85,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14165644272301690560",
        "topLeft": "13494081524421268649",
        "bottomRight": "15625758807866523776"
      },
      "crated": {
        "topLeft": "13494081524421268649",
        "full": "9536999903007755968",
        "bottomRight": "10509566242720891008"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/DestroyerTank/BPDestroyerTankW",
    "CodeName": "DestroyerTankW",
    "ChassisName": "Destroyer Tank",
    "DisplayName": "Noble Widow MK. XIV",
    "Description": "This deadly tank turns predator into prey. A tank Destroyer, the Noble Widow specializes in ambush tactics, waiting for its quarry and striking with destructive high-velocity shells.",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockDestroyerTank",
    "Icon": "War/Content/Textures/UI/VehicleIcons/DestroyerTankWVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::BattleTank",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "FuelTank": 225,
    "DepthCuttoffForSwimDamage": 225,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 160
        }
      ],
      "MaxHealth": 2200,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 150,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 225,
      "FuelConsumptionPerSecond": 0.5,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.6,
      "RotationRate": 0.12,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 200,
      "EngineForce": 24000,
      "MassOverride": 12000,
      "TankArmour": 17650,
      "MinTankArmourPercent": 0.5,
      "TankArmourMinPenetrationChance": 0.17,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10751898539790310115",
        "topLeft": "11915017508226962021",
        "bottomRight": "15046738288058568704"
      },
      "crated": {
        "topLeft": "11915017508226962021",
        "full": "10757527765461129955",
        "bottomRight": "15337143498218405888"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/FieldWeapons/BPFieldArtillery",
    "CodeName": "FieldLightArtilleryC",
    "ChassisName": "Field Artillery",
    "DisplayName": "120-68 “Koronides” Field Gun",
    "Description": "A long range Colonial mobile artillery used to lay siege to fortified positions.",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockFieldArtillery",
    "Icon": "War/Content/Textures/UI/VehicleIcons/FieldArtilleryColVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::FieldWeapon",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FieldWalked",
    "ArmourType": "EArmourType::Tier1Tank",
    "ShippableInfo": "EShippableType::Normal",
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 25
        }
      ],
      "MaxHealth": 1000,
      "MinorDamagePercent": 0.5,
      "MajorDamagePercent": 0.7,
      "RepairCost": 120,
      "ResourcesPerBuildCycle": 2,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.6,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.25,
      "RotationSpeedCuttoff": -1,
      "SpeedSqrThreshold": 600,
      "EngineForce": 3200,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15018730232474078150",
        "topLeft": "11053676925379449693",
        "bottomRight": "16349768796059205632"
      },
      "crated": {
        "topLeft": "11053676925379449693",
        "full": "13856238578058513350",
        "bottomRight": "14187581827882942464"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/FieldWeapons/BPFieldATDamageC",
    "CodeName": "FieldATDamageC",
    "ChassisName": "Heavy Field Gun",
    "DisplayName": "68-45 “Smelter” Heavy Field Gun",
    "Description": "Armed with heavy anti-tank rounds, the Smelter is perfect for engaging enemy armour. The frontal blast shielding providers operators with ample cover in heated skirmishes.",
    "TechID": "ETechID::UnlockFieldATDamageGun",
    "Icon": "War/Content/Textures/UI/VehicleIcons/FieldATOffensiveCIcon.0",
    "FactionVariant": "EFactionId::Colonials",
    "VehicleProfileType": "EVehicleProfileType::FieldWeapon",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FieldWalked",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Normal",
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 40
        }
      ],
      "MaxHealth": 5000,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.6,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.1,
      "RotationSpeedCuttoff": -1,
      "SpeedSqrThreshold": 600,
      "EngineForce": 2850,
      "MassOverride": 1450,
      "TankArmour": 0,
      "MinTankArmourPercent": 0,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10798341237033874714",
        "topLeft": "11556131638328934463",
        "bottomRight": "10995697785744974016"
      },
      "crated": {
        "topLeft": "11556131638328934463",
        "full": "10757809939894461212",
        "bottomRight": "9624327166351171744"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/FieldWeapons/BPFieldATGunC",
    "CodeName": "FieldATC",
    "ChassisName": "Field AT Gun",
    "DisplayName": "AA-2 Battering Ram",
    "Description": "The Battering Ram is a mobile Anti-Tank field gun firing 68mm armour-piercing rounds.",
    "TechID": "ETechID::UnlockFieldATGun",
    "Icon": "War/Content/Textures/UI/VehicleIcons/FieldAntiTankColVehicleIcon.0",
    "FactionVariant": "EFactionId::Colonials",
    "VehicleProfileType": "EVehicleProfileType::FieldWeapon",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FieldWalked",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Normal",
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 30
        }
      ],
      "MaxHealth": 2850,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.6,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.1,
      "RotationSpeedCuttoff": -1,
      "SpeedSqrThreshold": 600,
      "EngineForce": 3500,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10694478556502898120",
        "topLeft": "0",
        "bottomRight": "15623798989462765664"
      },
      "crated": {
        "topLeft": "0",
        "full": "10685462561151937964",
        "bottomRight": "15049476078462566400"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/FieldWeapons/BPFieldATGunW",
    "CodeName": "FieldATW",
    "ChassisName": "Field AT Gun",
    "DisplayName": "Collins Cannon 68mm",
    "Description": "The Collins Cannon is a mobile Anti-Tank field gun firing 68mm armour-piercing rounds.",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockFieldATGun",
    "Icon": "War/Content/Textures/UI/VehicleIcons/FieldAntiTankWarVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::FieldWeapon",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FieldWalked",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Normal",
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 30
        }
      ],
      "MaxHealth": 2850,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.6,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.1,
      "RotationSpeedCuttoff": -1,
      "SpeedSqrThreshold": 600,
      "EngineForce": 3500,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10532624117330507209",
        "topLeft": "12273903644374837845",
        "bottomRight": "13889348574087220230"
      },
      "crated": {
        "topLeft": "12273903644374837845",
        "full": "10829580085698654669",
        "bottomRight": "14249522126091452416"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/FieldWeapons/BPFieldCannonW",
    "CodeName": "FieldCannonW",
    "ChassisName": "Field Cannon",
    "DisplayName": "Balfour Wolfhound 40mm",
    "Description": "This destructive short-ranged cannon is designed for direct engagement with enemy fortifications. The Wolfhound is fitted with reinforced shielding and a 40mm barrel. ",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockFieldCannon",
    "Icon": "War/Content/Textures/UI/VehicleIcons/FieldCannonWVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::FieldWeapon",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FieldWalked",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Normal",
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 30
        }
      ],
      "MaxHealth": 2850,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.6,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.1,
      "RotationSpeedCuttoff": -1,
      "SpeedSqrThreshold": 600,
      "EngineForce": 3500,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13865808993636260452",
        "topLeft": "11125468215627668515",
        "bottomRight": "16493457341411364352"
      },
      "crated": {
        "topLeft": "11125468215627668515",
        "full": "9316327725349690038",
        "bottomRight": "14261889020563816448"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/FieldWeapons/BPFieldMachineGun",
    "CodeName": "FieldMGC",
    "ChassisName": "Field Machine Gun",
    "DisplayName": "G40 “Sagittarii”",
    "Description": "A dual barrelled, high calibre anti-infantry machine gun. The “Sagittarii” is fitted with forward-facing armour plating and is excellent for suppression. ",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockFieldMG",
    "Icon": "War/Content/Textures/UI/VehicleIcons/FieldMachineGun.0",
    "VehicleProfileType": "EVehicleProfileType::FieldWeapon",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FieldWalked",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Normal",
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 25
        }
      ],
      "MaxHealth": 1850,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.6,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.25,
      "RotationSpeedCuttoff": -1,
      "SpeedSqrThreshold": 600,
      "EngineForce": 3500,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10865612729551066309",
        "topLeft": "13139711604974822601",
        "bottomRight": "14757673587397623808"
      },
      "crated": {
        "topLeft": "13139711604974822601",
        "full": "10829588263045847173",
        "bottomRight": "14252882095645917184"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/FieldWeapons/BPFieldMachineGunWarden",
    "CodeName": "FieldMGW",
    "ChassisName": "Field Machine Gun",
    "DisplayName": "Swallowtail 988/127-2 ",
    "Description": "A dual barrelled, high calibre anti-infantry machine gun. The Swallowtail is fitted with forward-facing armour plating and is excellent for suppression. ",
    "FactionVariant": "EFactionId::Wardens",
    "Icon": "War/Content/Textures/UI/VehicleIcons/FieldMachineGunWar.0",
    "TechID": "ETechID::UnlockFieldMG",
    "VehicleProfileType": "EVehicleProfileType::FieldWeapon",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FieldWalked",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Normal",
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 25
        }
      ],
      "MaxHealth": 1850,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.6,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.25,
      "RotationSpeedCuttoff": -1,
      "SpeedSqrThreshold": 600,
      "EngineForce": 3500,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10866175697015437901",
        "topLeft": "11842683841025828314",
        "bottomRight": "16204225204254343936"
      },
      "crated": {
        "topLeft": "11842683841025828314",
        "full": "10829579518509217869",
        "bottomRight": "14193227199456215040"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/FieldWeapons/BPFieldMortarW",
    "CodeName": "FieldMortarW",
    "ChassisName": "Field Mortar",
    "DisplayName": "Balfour Falconer 250mm",
    "Description": "A heavy mobile mortar platform fitted with a thick frontal shield for assaulting fortified locations.",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockFieldMortar",
    "Icon": "War/Content/Textures/UI/VehicleIcons/FieldMortarWIcon.0",
    "ArmourType": "EArmourType::Tier2Tank",
    "VehicleProfileType": "EVehicleProfileType::FieldWeapon",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FieldWalked",
    "ShippableInfo": "EShippableType::Normal",
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 35
        }
      ],
      "MaxHealth": 2850,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 6,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.6,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.25,
      "RotationSpeedCuttoff": -1,
      "SpeedSqrThreshold": 600,
      "EngineForce": 3500,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13863556962423753667",
        "topLeft": "11125446447888962135",
        "bottomRight": "16276855738339426560"
      },
      "crated": {
        "topLeft": "11125446447888962135",
        "full": "13856238629673061315",
        "bottomRight": "15411997424658415616"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/FieldWeapons/FieldCannonDamageW",
    "CodeName": "FieldCannonDamageW",
    "ChassisName": "Heavy Field Cannon",
    "DisplayName": "Balfour Rampart 40mm",
    "Description": "The Rampart is a high-velocity, anti-armour field cannon capable of dealing devastating damage to all but the heaviest armoured vehicles while providing its crew with comprehensive ballistic shielding.",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockFieldCannonDamage",
    "Icon": "War/Content/Textures/UI/VehicleIcons/FieldCannonOffensiveWIcon.0",
    "VehicleProfileType": "EVehicleProfileType::FieldWeapon",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FieldWalked",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Normal",
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 40
        }
      ],
      "MaxHealth": 4000,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.6,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.1,
      "RotationSpeedCuttoff": -1,
      "SpeedSqrThreshold": 600,
      "EngineForce": 3000,
      "MassOverride": 1250,
      "TankArmour": 0,
      "MinTankArmourPercent": 0,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10838027641934199533",
        "topLeft": "11843240281600807597",
        "bottomRight": "13889330707601293312"
      },
      "crated": {
        "topLeft": "11843240281600807597",
        "full": "10901561744463116709",
        "bottomRight": "15408072787167805440"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Gunboats/BPGunboat",
    "CodeName": "GunboatC",
    "ChassisName": "Gunboat",
    "DisplayName": "Type C - “Charon”",
    "Description": "A naval vessel designed to bombard coastal targets. The Charon is fitted with a 120mm light artillery cannon and a 12.7mm Machinegun.",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockGunboat",
    "Icon": "War/Content/Textures/UI/VehicleIcons/GunBoatVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::CombatShip",
    "ArmourType": "EArmourType::Tier1Tank",
    "FuelTank": 200,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 160
        }
      ],
      "MaxHealth": 1320,
      "MinorDamagePercent": 0.5,
      "MajorDamagePercent": 0.9,
      "RepairCost": 160,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 20,
      "FuelCapacity": 200,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.8,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.25,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 500,
      "EngineForce": 0,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9601528997660772529",
        "topLeft": "12489235287130199721",
        "bottomRight": "13889313183832739856"
      },
      "crated": {
        "topLeft": "12489235287130199721",
        "full": "9591394799122303153",
        "bottomRight": "14256279587649486864"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Gunboats/BPGunboatOffensiveW",
    "CodeName": "GunboatOffensiveW",
    "ChassisName": "Gunboat",
    "DisplayName": "74c-2 Ronan Meteora Gunship",
    "Description": "The Meteora Gunship replaces the machinegun with another identical 120mm artillery cannon on the bow. ",
    "TechID": "ETechID::UnlockGunboatOffensive",
    "Icon": "War/Content/Textures/UI/VehicleIcons/GunboatWarDoubleArtilleryVehicleIcon.0",
    "FactionVariant": "EFactionId::Wardens",
    "VehicleProfileType": "EVehicleProfileType::CombatShip",
    "ArmourType": "EArmourType::Tier1Tank",
    "FuelTank": 200,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 160
        }
      ],
      "MaxHealth": 1320,
      "MinorDamagePercent": 0.5,
      "MajorDamagePercent": 0.9,
      "RepairCost": 160,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 30,
      "FuelCapacity": 200,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.8,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.25,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 500,
      "EngineForce": 0,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14132078891962453208",
        "topLeft": "13135230347365997413",
        "bottomRight": "17361623819961286656"
      },
      "crated": {
        "topLeft": "13135230347365997413",
        "full": "9520392874684304600",
        "bottomRight": "14263035126144319488"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Gunboats/BPGunboatW",
    "CodeName": "GunboatW",
    "ChassisName": "Gunboat",
    "DisplayName": "74b-1 Ronan Gunship",
    "Description": "A naval vessel designed to bombard coastal targets. The Ronan is fitted with a 120mm light artillery cannon and a 12.7mm Machinegun.",
    "FactionVariant": "EFactionId::Wardens",
    "Icon": "War/Content/Textures/UI/VehicleIcons/GunboatWarVehicleIcon.0",
    "TechID": "ETechID::UnlockGunboat",
    "VehicleProfileType": "EVehicleProfileType::CombatShip",
    "ArmourType": "EArmourType::Tier1Tank",
    "FuelTank": 200,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 160
        }
      ],
      "MaxHealth": 1320,
      "MinorDamagePercent": 0.5,
      "MajorDamagePercent": 0.9,
      "RepairCost": 160,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 20,
      "FuelCapacity": 200,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.8,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.25,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 500,
      "EngineForce": 0,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14132079991474080984",
        "topLeft": "13135231464090391149",
        "bottomRight": "17361623819961286656"
      },
      "crated": {
        "topLeft": "13135231464090391149",
        "full": "9520393974195932376",
        "bottomRight": "14263035126144319488"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Halftrack/BPHalfTrackArtilleryC",
    "CodeName": "HalfTrackArtilleryC",
    "ChassisName": "Half-Track",
    "DisplayName": "HH-d “Peltast”",
    "Description": "This “Javelin” variant is fitted with a 360 degree mortar platform, designed to support infantry in frontline operations.",
    "TechID": "ETechID::UnlockHalfTrackArtillery",
    "Icon": "War/Content/Textures/UI/VehicleIcons/HalfTrackArtilleryCIcon.0",
    "FactionVariant": "EFactionId::Colonials",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Halftrack",
    "ArmourType": "EArmourType::Tier1Tank",
    "ShippableInfo": "EShippableType::Large",
    "FuelTank": 150,
    "DepthCuttoffForSwimDamage": 260,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 70
        }
      ],
      "MaxHealth": 1350,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 95,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 20,
      "FuelCapacity": 150,
      "FuelConsumptionPerSecond": 0.15,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.6,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.7,
      "RotationRate": 0.3,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 300,
      "EngineForce": 13750,
      "MassOverride": 3300,
      "TankArmour": 3200,
      "MinTankArmourPercent": 0.1,
      "TankArmourMinPenetrationChance": 0.75,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14346334134375782456",
        "topLeft": "13135230215308286822",
        "bottomRight": "15625450563151343728"
      },
      "crated": {
        "topLeft": "13135230215308286822",
        "full": "9590462560336336952",
        "bottomRight": "15409198616207696112"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Halftrack/BPHalfTrackC",
    "CodeName": "HalfTrackC",
    "ChassisName": "Half-Track",
    "DisplayName": "HH-a “Javelin”",
    "Description": "Designed for escort missions and to support infantry operations, the HH-a class “Javelin” Half-Track is an armoured, versatile all-terrain vehicle that can be equipped with a variety of mounted weapons.",
    "Icon": "War/Content/Textures/UI/VehicleIcons/HalfTrackColVehicleIcon.0",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockHalfTrack",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Halftrack",
    "ArmourType": "EArmourType::Tier1Tank",
    "ShippableInfo": "EShippableType::Large",
    "FuelTank": 150,
    "DepthCuttoffForSwimDamage": 260,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 55
        }
      ],
      "MaxHealth": 1350,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 95,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 7,
      "FuelCapacity": 150,
      "FuelConsumptionPerSecond": 0.15,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.6,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.7,
      "RotationRate": 0.3,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 13750,
      "MassOverride": 3300,
      "TankArmour": 3200,
      "MinTankArmourPercent": 0.1,
      "TankArmourMinPenetrationChance": 0.75,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9770887471004356536",
        "topLeft": "12848087416257825074",
        "bottomRight": "13889312908948019216"
      },
      "crated": {
        "topLeft": "12848087416257825074",
        "full": "9734876283351306168",
        "bottomRight": "15409201090108850320"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Halftrack/BPHalfTrackDefensiveC",
    "CodeName": "HalfTrackDefensiveC",
    "ChassisName": "Half-Track",
    "DisplayName": "HH-b “Hoplite”",
    "Description": "With reinforced armour at the expense of speed, the Hoplite is a formidable force in the heat of combat.",
    "TechID": "ETechID::UnlockHalfTrackDefensive",
    "Icon": "War/Content/Textures/UI/VehicleIcons/HalfTrackColHeavyArmorVehicleIcon.0",
    "FactionVariant": "EFactionId::Colonials",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Halftrack",
    "ArmourType": "EArmourType::Tier1Tank",
    "ShippableInfo": "EShippableType::Large",
    "FuelTank": 150,
    "DepthCuttoffForSwimDamage": 260,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 70
        }
      ],
      "MaxHealth": 1500,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 110,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 8,
      "FuelCapacity": 150,
      "FuelConsumptionPerSecond": 0.15,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.55,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.7,
      "RotationRate": 0.3,
      "RotationSpeedCuttoff": 15,
      "SpeedSqrThreshold": 400,
      "EngineForce": 11550,
      "MassOverride": 3465,
      "TankArmour": 4600,
      "MinTankArmourPercent": 0.1,
      "TankArmourMinPenetrationChance": 0.65,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14382591098772495292",
        "topLeft": "13287760901004553363",
        "bottomRight": "13889312908948017168"
      },
      "crated": {
        "topLeft": "13287760901004553363",
        "full": "9590761095258672060",
        "bottomRight": "15409200815230943376"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Halftrack/BPHalfTrackOffensiveWarden",
    "CodeName": "HalfTrackOffensiveW",
    "ChassisName": "Half-Track",
    "DisplayName": "Niska Mk. II Blinder",
    "Description": "Fitted with a heavy-duty anti-tank gun, the Blinder is capable of punching through all but the most tempered of alloys.",
    "TechID": "ETechID::UnlockHalfTrackOffensive",
    "Icon": "War/Content/Textures/UI/VehicleIcons/HalfTrackOffensiveWarVehicleIcon.0",
    "FactionVariant": "EFactionId::Wardens",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Halftrack",
    "ArmourType": "EArmourType::Tier1Tank",
    "ShippableInfo": "EShippableType::Large",
    "FuelTank": 150,
    "DepthCuttoffForSwimDamage": 260,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 85
        }
      ],
      "MaxHealth": 1500,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 130,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 150,
      "FuelConsumptionPerSecond": 0.25,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.55,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.25,
      "RotationSpeedCuttoff": 15,
      "SpeedSqrThreshold": 400,
      "EngineForce": 11000,
      "MassOverride": 3850,
      "TankArmour": 4600,
      "MinTankArmourPercent": 0.1,
      "TankArmourMinPenetrationChance": 0.65,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "13914217285958497433",
        "topLeft": "12846966178027311462",
        "bottomRight": "13889330570121449472"
      },
      "crated": {
        "topLeft": "12846966178027311462",
        "full": "10743687535070277017",
        "bottomRight": "15334891767393681408"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Halftrack/BPHalfTrackW",
    "CodeName": "HalfTrackW",
    "ChassisName": "Half-Track",
    "DisplayName": "Niska Mk. I Gun Motor Carriage",
    "Description": "Designed for escort missions and to support infantry operations, the Niska Gun Motor Carriage Half-Track is an armoured, versatile all-terrain vehicle that can be equipped with a variety of mounted weapons.",
    "FactionVariant": "EFactionId::Wardens",
    "Icon": "War/Content/Textures/UI/VehicleIcons/HalfTrackWarVehicleIcon.0",
    "TechID": "ETechID::UnlockHalfTrack",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Halftrack",
    "ArmourType": "EArmourType::Tier1Tank",
    "ShippableInfo": "EShippableType::Large",
    "FuelTank": 150,
    "DepthCuttoffForSwimDamage": 260,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 60
        }
      ],
      "MaxHealth": 1500,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 110,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 8,
      "FuelCapacity": 150,
      "FuelConsumptionPerSecond": 0.2,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.55,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.7,
      "RotationRate": 0.3,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 12650,
      "MassOverride": 3465,
      "TankArmour": 4600,
      "MinTankArmourPercent": 0.1,
      "TankArmourMinPenetrationChance": 0.65,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14202447094887194265",
        "topLeft": "12848086041867225426",
        "bottomRight": "13889313252821700608"
      },
      "crated": {
        "topLeft": "12848086041867225426",
        "full": "9590761644210245272",
        "bottomRight": "14177466595244245120"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LandingCraft/BPLandingCraftC",
    "CodeName": "LandingCraftC",
    "ChassisName": "Landing APC",
    "DisplayName": "AB-8 “Acheron”",
    "Description": "The Acheron is an armoured amphibious vehicle designed for carrying troops across large bodies of water to aid in coordinated beach landings and flanking assaults. ",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockLandingCraft",
    "Icon": "War/Content/Textures/UI/VehicleIcons/LandingCraftVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Fulltrack",
    "ArmourType": "EArmourType::Tier1Tank",
    "ShippableInfo": "EShippableType::Large",
    "FuelTank": 150,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 20
        }
      ],
      "MaxHealth": 2000,
      "MinorDamagePercent": 0.5,
      "MajorDamagePercent": 0.7,
      "RepairCost": 140,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 6,
      "FuelCapacity": 150,
      "FuelConsumptionPerSecond": 0.15,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.85,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.75,
      "RotationRate": 0.165,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 500,
      "EngineForce": 13500,
      "MassOverride": 7500,
      "TankArmour": 5450,
      "MinTankArmourPercent": 0.1,
      "TankArmourMinPenetrationChance": 0.55,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10498575035217320470",
        "topLeft": "9331036762527983703",
        "bottomRight": "13889312907068448768"
      },
      "crated": {
        "topLeft": "9331036762527983703",
        "full": "10764304656901441942",
        "bottomRight": "15337125631154454528"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LandingCraft/BPLandingCraftOffensiveC",
    "CodeName": "LandingCraftOffensiveC",
    "ChassisName": "Landing APC",
    "DisplayName": "AB-11 “Doru”",
    "Description": "With its mounted machinegun, the Doru is the perfect addition to any shoreline assault. ",
    "TechID": "ETechID::UnlockLandingCraftOffensive",
    "Icon": "War/Content/Textures/UI/VehicleIcons/LandingCraftOffensiveVehicleIcon.0",
    "FactionVariant": "EFactionId::Colonials",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Fulltrack",
    "ArmourType": "EArmourType::Tier1Tank",
    "ShippableInfo": "EShippableType::Large",
    "FuelTank": 150,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 45
        }
      ],
      "MaxHealth": 1650,
      "MinorDamagePercent": 0.5,
      "MajorDamagePercent": 0.7,
      "RepairCost": 140,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 6,
      "FuelCapacity": 150,
      "FuelConsumptionPerSecond": 0.15,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.85,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.75,
      "RotationRate": 0.165,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 500,
      "EngineForce": 13500,
      "MassOverride": 7500,
      "TankArmour": 5450,
      "MinTankArmourPercent": 0.1,
      "TankArmourMinPenetrationChance": 0.55,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10494352910549883574",
        "topLeft": "9258979855952738455",
        "bottomRight": "15042234411675287552"
      },
      "crated": {
        "topLeft": "9258979855952738455",
        "full": "10764234288694135190",
        "bottomRight": "15337125631154454528"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LandingCraft/BPLandingCraftWarden",
    "CodeName": "LandingCraftW",
    "ChassisName": "Landing APC",
    "DisplayName": "Mulloy LPC",
    "Description": "The Mulloy Landing Personnel Carrier is an armoured amphibious vehicle designed for carrying troops across large bodies of water to aid in coordinated beach landings and flanking assaults.",
    "FactionVariant": "EFactionId::Wardens",
    "Icon": "War/Content/Textures/UI/VehicleIcons/LandingCraftWarVehicleIcon.0",
    "TechID": "ETechID::UnlockLandingCraft",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Fulltrack",
    "ArmourType": "EArmourType::Tier1Tank",
    "ShippableInfo": "EShippableType::Large",
    "FuelTank": 150,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 20
        }
      ],
      "MaxHealth": 2000,
      "MinorDamagePercent": 0.5,
      "MajorDamagePercent": 0.7,
      "RepairCost": 140,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 6,
      "FuelCapacity": 150,
      "FuelConsumptionPerSecond": 0.15,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.85,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.75,
      "RotationRate": 0.165,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 500,
      "EngineForce": 13500,
      "MassOverride": 7500,
      "TankArmour": 5450,
      "MinTankArmourPercent": 0.1,
      "TankArmourMinPenetrationChance": 0.55,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15038411198824284883",
        "topLeft": "9977062631445862423",
        "bottomRight": "14468025459187671040"
      },
      "crated": {
        "topLeft": "9977062631445862423",
        "full": "10757744142474594771",
        "bottomRight": "15409183223049109504"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LightTank/BPLightTankArtilleryW",
    "CodeName": "LightTankArtilleryW",
    "ChassisName": "Light Tank",
    "DisplayName": "Devitt-Caine Mk. IV MMR",
    "Description": "A modified Devitt fitted with a specialized Caine mortar turret at the expense of top speed.",
    "TechID": "ETechID::UnlockLightTankArtillery",
    "Icon": "War/Content/Textures/UI/VehicleIcons/LightTankArtilleryWar.0",
    "FactionVariant": "EFactionId::Wardens",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FulltrackLightTanks",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "FuelTank": 200,
    "DepthCuttoffForSwimDamage": 225,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 150
        }
      ],
      "MaxHealth": 1950,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 135,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 14,
      "FuelCapacity": 200,
      "FuelConsumptionPerSecond": 0.25,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.75,
      "RotationRate": 0.35,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 26000,
      "MassOverride": 0,
      "TankArmour": 10000,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0.3,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9542681967562051300",
        "topLeft": "13350526535362389067",
        "bottomRight": "13889312907068452896"
      },
      "crated": {
        "topLeft": "13350526535362389067",
        "full": "9532496096683020000",
        "bottomRight": "15409200817378426880"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LightTank/BPLightTankC",
    "CodeName": "LightTankC",
    "ChassisName": "Light Tank",
    "Description": "A highly maneuverable lightweight tank. Designed for urban environments, the “Hatchet” is fitted with a 40mm cannon.",
    "FuelTank": 225,
    "DisplayName": "H5 \"Hatchet\"",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockLightTank",
    "Icon": "War/Content/Textures/UI/VehicleIcons/LightTankColVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FulltrackLightTanks",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 225,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 135
        }
      ],
      "MaxHealth": 1950,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 135,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 225,
      "FuelConsumptionPerSecond": 0.2,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.75,
      "RotationRate": 0.35,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 26000,
      "MassOverride": 0,
      "TankArmour": 9100,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0.33,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "11248140165813591776",
        "topLeft": "12489244464144296538",
        "bottomRight": "14468034289773064192"
      },
      "crated": {
        "topLeft": "12489244464144296538",
        "full": "10685699020197677792",
        "bottomRight": "15409183223044898816"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LightTank/BPLightTankDefensiveW",
    "CodeName": "LightTankDefensiveW",
    "ChassisName": "Light Tank",
    "DisplayName": "Devitt Ironhide Mk. IV ",
    "Description": "The Ironhide Light Tank is similar to the Mk. III but reinforced with plates of heavy steel at the expense of speed and maneuverability.",
    "TechID": "ETechID::UnlockLightTankDefensive",
    "Icon": "War/Content/Textures/UI/VehicleIcons/LightTankWarDefensiveVehicleIcon.0",
    "FactionVariant": "EFactionId::Wardens",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FulltrackLightTanks",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "FuelTank": 200,
    "DepthCuttoffForSwimDamage": 225,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 150
        }
      ],
      "MaxHealth": 1950,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 135,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 200,
      "FuelConsumptionPerSecond": 0.3,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 0.1,
      "ReverseSpeedModifier": 0.6,
      "RotationRate": 0.3,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 23900,
      "MassOverride": 11500,
      "TankArmour": 14000,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0.3,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10706863815562993398",
        "topLeft": "13638758006774736345",
        "bottomRight": "16197407990704242688"
      },
      "crated": {
        "topLeft": "13638758006774736345",
        "full": "10685417807448362742",
        "bottomRight": "14260765592943329280"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LightTank/BPLightTankMobilityC",
    "CodeName": "LightTankMobilityC",
    "ChassisName": "Light Tank",
    "DisplayName": "H-8 “Kranesca”",
    "Description": "The “Kranesca” Light Tank is fitted with an overpowered engine and a reinforced chassis, capable of boosting its top speed at the expense of overall acceleration and maneuverability.",
    "TechID": "ETechID::UnlockLightTankMobility",
    "Icon": "War/Content/Textures/UI/VehicleIcons/LightTankColMobilityVehicleIcon.0",
    "FactionVariant": "EFactionId::Colonials",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FulltrackLightTanks",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "FuelTank": 200,
    "DepthCuttoffForSwimDamage": 225,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 160
        }
      ],
      "MaxHealth": 2250,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 160,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 200,
      "FuelConsumptionPerSecond": 0.3,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.6,
      "RotationRate": 0.3,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 23900,
      "MassOverride": 11500,
      "TankArmour": 9100,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0.33,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "11248140165813620448",
        "topLeft": "12491459971416172890",
        "bottomRight": "14468034289773064192"
      },
      "crated": {
        "topLeft": "12491459971416172890",
        "full": "10685681428816972512",
        "bottomRight": "15409183223044898816"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LightTank/BPLightTankW",
    "CodeName": "LightTankW",
    "ChassisName": "Light Tank",
    "DisplayName": "Devitt Mk. III",
    "Description": "A highly maneuverable lightweight tank. Designed for urban environments, the Devitt is fitted with a 40mm cannon.",
    "FactionVariant": "EFactionId::Wardens",
    "Icon": "War/Content/Textures/UI/VehicleIcons/LightTankWarVehicleIcon.0",
    "TechID": "ETechID::UnlockLightTank",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FulltrackLightTanks",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "FuelTank": 200,
    "DepthCuttoffForSwimDamage": 225,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 140
        }
      ],
      "MaxHealth": 1950,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 135,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 200,
      "FuelConsumptionPerSecond": 0.25,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.75,
      "RotationRate": 0.35,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 26000,
      "MassOverride": 0,
      "TankArmour": 10000,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0.3,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10679840980848205540",
        "topLeft": "13350527630623286619",
        "bottomRight": "14468025459051859968"
      },
      "crated": {
        "topLeft": "13350527630623286619",
        "full": "10757528178044292836",
        "bottomRight": "14251756194665332736"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LightTank/LightTankOffensiveC",
    "CodeName": "LightTankOffensiveC",
    "ChassisName": "Light Tank",
    "DisplayName": "H-10 “Pelekys”",
    "Description": "The “Pelekys” H-class light tank is heavily modified with an open top chassis and equipped with a devastating long-range anti-tank cannon.",
    "TechID": "ETechID::UnlockLightTankOffensive",
    "Icon": "War/Content/Textures/UI/VehicleIcons/LightTankOffensiveCVehicleIcon.0",
    "FuelTank": 225,
    "FactionVariant": "EFactionId::Colonials",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FulltrackLightTanks",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 225,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 145
        }
      ],
      "MaxHealth": 1750,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 135,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 225,
      "FuelConsumptionPerSecond": 0.2,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.65,
      "RotationRate": 0.35,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 25550,
      "MassOverride": 9000,
      "TankArmour": 7250,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0.35,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10679842046872556272",
        "topLeft": "11770306508297550019",
        "bottomRight": "13889312975790022752"
      },
      "crated": {
        "topLeft": "11770306508297550019",
        "full": "10689904949029427952",
        "bottomRight": "15337143221193015424"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LogisticsVehicles/BPAmbulanceColonial",
    "CodeName": "AmbulanceC",
    "ChassisName": "Ambulance",
    "DisplayName": "R-12 - “Salus” Ambulance",
    "Description": "The “Salus” Ambulance is efficient at transporting Critically Wounded Soldiers and carrying medical supplies.",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockAmbulance",
    "Icon": "War/Content/Textures/UI/VehicleIcons/Ambulance.0",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::LightTruck",
    "ArmourType": "EArmourType::LightVehicle",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 220,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 150
        }
      ],
      "MaxHealth": 750,
      "MinorDamagePercent": 0.1875,
      "MajorDamagePercent": 0.7,
      "RepairCost": 150,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 9,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.05,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.45,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.4,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 800,
      "EngineForce": 15176,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9625734374811227292",
        "topLeft": "11340800131950323277",
        "bottomRight": "13889312909251874944"
      },
      "crated": {
        "topLeft": "11340800131950323277",
        "full": "10743752982972844188",
        "bottomRight": "14254009920771883136"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LogisticsVehicles/BPAmbulanceWarden",
    "CodeName": "AmbulanceW",
    "ChassisName": "Ambulance",
    "DisplayName": "Dunne Responder 3e",
    "Description": "The Responder Ambulance is efficient at transporting Critically Wounded Soldiers and carrying medical supplies.",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockAmbulance",
    "Icon": "War/Content/Textures/UI/VehicleIcons/AmbulanceWar.0",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::LightTruck",
    "ArmourType": "EArmourType::LightVehicle",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 220,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 150
        }
      ],
      "MaxHealth": 750,
      "MinorDamagePercent": 0.1875,
      "MajorDamagePercent": 0.7,
      "RepairCost": 150,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 9,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.05,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.45,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.4,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 800,
      "EngineForce": 15176,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9627968549961063569",
        "topLeft": "11843260500768367963",
        "bottomRight": "15046755948997771264"
      },
      "crated": {
        "topLeft": "11843260500768367963",
        "full": "10743735357650947217",
        "bottomRight": "15406949362235867136"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LogisticsVehicles/BPBarge",
    "CodeName": "Barge",
    "DisplayName": "BMS - Aquatipper",
    "Description": "A large shipping vessel, the Aquatipper is used to transport vehicles, equipment, and personnel over large bodies of water.",
    "Icon": "War/Content/Textures/UI/VehicleIcons/BargeVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::Ship",
    "ArmourType": "EArmourType::Tier1Tank",
    "FuelTank": 200,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 150
        }
      ],
      "MaxHealth": 1440,
      "MinorDamagePercent": 0.5,
      "MajorDamagePercent": 0.9,
      "RepairCost": 150,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 15,
      "FuelCapacity": 200,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 1,
      "RotationRate": 0.25,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 500,
      "EngineForce": 0,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10749083854580716069",
        "topLeft": "12561012544335754570",
        "bottomRight": "13889341056286204422"
      },
      "crated": {
        "topLeft": "12561012544335754570",
        "full": "10766535238721402932",
        "bottomRight": "15337670986774347780"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LogisticsVehicles/BPBicycle",
    "CodeName": "Bicycle",
    "ChassisName": "Bicycle",
    "DisplayName": "Blumfield LK205",
    "Description": "A simple, old-style Blumfield bicycle. This is a smaller recreation model, designed for short-distance sprints.",
    "Icon": "War/Content/Textures/UI/VehicleIcons/RelicBicycleVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::Bicycle",
    "ArmourType": "EArmourType::LightVehicle",
    "DepthCuttoffForSwimDamage": 200,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 10
        }
      ],
      "MaxHealth": 200,
      "MinorDamagePercent": 1000,
      "MajorDamagePercent": 1000,
      "RepairCost": 0,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.45,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 1,
      "RotationSpeedCuttoff": 15,
      "SpeedSqrThreshold": 800,
      "EngineForce": 0,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10635088240230768029",
        "topLeft": "10622466930292593845",
        "bottomRight": "13905136748302090368"
      },
      "crated": {
        "topLeft": "10622466930292593845",
        "full": "10901856149404360085",
        "bottomRight": "15418208372582793216"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LogisticsVehicles/BPBus",
    "CodeName": "BusC",
    "ChassisName": "Transport Bus",
    "DisplayName": "R-15 - “Chariot”",
    "Description": "The “Chariot” is a transport vehicle used to shuttle personnel to the front line.",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockBus",
    "Icon": "War/Content/Textures/UI/VehicleIcons/BusIcon.0",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Truck",
    "ArmourType": "EArmourType::LightVehicle",
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 100
        }
      ],
      "MaxHealth": 600,
      "MinorDamagePercent": 0.333333,
      "MajorDamagePercent": 0.666667,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.05,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.3,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.225,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 800,
      "EngineForce": 15000,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9625734333868786588",
        "topLeft": "11053691292035429963",
        "bottomRight": "14757395258765524992"
      },
      "crated": {
        "topLeft": "11053691292035429963",
        "full": "9586895185937679260",
        "bottomRight": "9641198330604175360"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LogisticsVehicles/BPBusWarden",
    "CodeName": "BusW",
    "DisplayName": "Dunne Caravaner 2f",
    "Description": "The Caravaner is a transport vehicle used to shuttle personnel to the front line.",
    "FactionVariant": "EFactionId::Wardens",
    "Icon": "War/Content/Textures/UI/VehicleIcons/BusWarIcon.0",
    "ChassisName": "Transport Bus",
    "TechID": "ETechID::UnlockBus",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Truck",
    "ArmourType": "EArmourType::LightVehicle",
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 100
        }
      ],
      "MaxHealth": 600,
      "MinorDamagePercent": 0.333333,
      "MajorDamagePercent": 0.666667,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.05,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.3,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.225,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 800,
      "EngineForce": 15000,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9337508261028479127",
        "topLeft": "9474589821005412419",
        "bottomRight": "13889313183832735744"
      },
      "crated": {
        "topLeft": "9474589821005412419",
        "full": "9316045932596349079",
        "bottomRight": "14263034988164284416"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LogisticsVehicles/BPConstructionVehicle",
    "CodeName": "Construction",
    "ChassisName": "Construction Vehicle",
    "DisplayName": "BMS - Universal Assembly Rig",
    "Description": "A specialized vehicle designed by the Basset Motor Society used in the construction of large structures.",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ConstructionVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::Construction",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::ConstructionTracked",
    "ArmourType": "EArmourType::LightVehicle",
    "DepthCuttoffForSwimDamage": 265,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 100
        }
      ],
      "MaxHealth": 1000,
      "MinorDamagePercent": 0.25,
      "MajorDamagePercent": 0.7,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 12,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.75,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.4,
      "RotationSpeedCuttoff": 15,
      "SpeedSqrThreshold": 500,
      "EngineForce": 7600,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10764534104521260236",
        "topLeft": "10476864269681599828",
        "bottomRight": "15335918640669130768"
      },
      "crated": {
        "topLeft": "10476864269681599828",
        "full": "10764569563771533516",
        "bottomRight": "15407976236302991360"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LogisticsVehicles/BPCrane",
    "CodeName": "Crane",
    "ChassisName": "Crane",
    "DisplayName": "BMS - Class 2 Mobile Auto-Crane",
    "Description": "The Basset Motor Society’s Class 2 Mobile Auto-Crane is used to lift and reposition vehicles and very heavy equipment.",
    "Icon": "War/Content/Textures/UI/VehicleIcons/CraneVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::Construction",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::ConstructionTracked",
    "ArmourType": "EArmourType::LightVehicle",
    "DepthCuttoffForSwimDamage": 270,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 125
        }
      ],
      "MaxHealth": 1500,
      "MinorDamagePercent": 0.5,
      "MajorDamagePercent": 0.7,
      "RepairCost": 125,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 5,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.833333,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.165,
      "RotationSpeedCuttoff": 15,
      "SpeedSqrThreshold": 500,
      "EngineForce": 10000,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10404275704879385371",
        "topLeft": "9893461960177247152",
        "bottomRight": "15330334806815866880"
      },
      "crated": {
        "topLeft": "9893461960177247152",
        "full": "10403994504780581661",
        "bottomRight": "15404642551407312896"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LogisticsVehicles/BPFlatbedTruck",
    "CodeName": "FlatbedTruck",
    "ChassisName": "Flatbed Truck",
    "DisplayName": "BMS - Packmule Flatbed",
    "Description": "A heavy duty shipping transport truck designed by Bassett Motor Society. It’s built for hauling the heaviest of equipment over long distances with ease. ",
    "Icon": "War/Content/Textures/UI/VehicleIcons/FlatbedTruckVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Halftrack",
    "ArmourType": "EArmourType::LightVehicle",
    "FuelTank": 150,
    "DepthCuttoffForSwimDamage": 265,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 30
        }
      ],
      "MaxHealth": 1125,
      "MinorDamagePercent": 0.2,
      "MajorDamagePercent": 0.7,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 150,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.5,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.7,
      "RotationRate": 0.25,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 14000,
      "MassOverride": 6000,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14346281448074890812",
        "topLeft": "10981913786003842777",
        "bottomRight": "13893834305309786312"
      },
      "crated": {
        "topLeft": "10981913786003842777",
        "full": "14359792246961163324",
        "bottomRight": "14263032511041896576"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LogisticsVehicles/BPFreighter",
    "CodeName": "Freighter",
    "DisplayName": "BMS - Ironship",
    "Description": "The Basset Motor Society’s Ironship-class shipping vessel is used to freight shippable goods and heavy vehicles.",
    "Icon": "War/Content/Textures/UI/VehicleIcons/FreighterVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::Ship",
    "ArmourType": "EArmourType::Tier1Tank",
    "FuelTank": 300,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 100
        }
      ],
      "MaxHealth": 4000,
      "MinorDamagePercent": 0.5,
      "MajorDamagePercent": 0.9,
      "RepairCost": 150,
      "ResourcesPerBuildCycle": 5,
      "ItemHolderCapacity": 10,
      "FuelCapacity": 300,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.8,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.25,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 500,
      "EngineForce": 0,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10679842078081062502",
        "topLeft": "12273903644374837845",
        "bottomRight": "15336045359367471104"
      },
      "crated": {
        "topLeft": "12273903644374837845",
        "full": "10682093877890013878",
        "bottomRight": "15407984757522317312"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LogisticsVehicles/BPHarvester",
    "CodeName": "Harvester",
    "ChassisName": "Harvester",
    "DisplayName": "BMS - Scrap Hauler",
    "Description": "The Scrap Hauler, designed by the Bassett Motor Society is a heavy-duty piece of machinery designed to reduce scrap metal and other materials into usable, raw resources. Scrap Haulers are often used to extract battlefield resources following skirmishes.",
    "TechID": "ETechID::UnlockHarvester",
    "Icon": "War/Content/Textures/UI/VehicleIcons/Harvester.0",
    "VehicleProfileType": "EVehicleProfileType::TrackedTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Fulltrack",
    "ArmourType": "EArmourType::LightVehicle",
    "ShippableInfo": "EShippableType::Large",
    "FuelTank": 200,
    "DepthCuttoffForSwimDamage": 185,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 120
        }
      ],
      "MaxHealth": 1250,
      "MinorDamagePercent": 0.5,
      "MajorDamagePercent": 0.7,
      "RepairCost": 120,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 15,
      "FuelCapacity": 200,
      "FuelConsumptionPerSecond": 0.3,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.45,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.165,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 27500,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10203866361512840921",
        "topLeft": "12919870422636540493",
        "bottomRight": "15046755672208191536"
      },
      "crated": {
        "topLeft": "12919870422636540493",
        "full": "9604905203192548313",
        "bottomRight": "15408074915324104720"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LogisticsVehicles/BPMotorboat",
    "CodeName": "Motorboat",
    "ChassisName": "Motorboat",
    "DisplayName": "BMS - Grouper",
    "Description": "Powered by the Basset Motor Society’s lightweight Grouper engine, this simple wooden boat is ideal for ferrying small groups of infantry across rivers and between islands.",
    "Icon": "War/Content/Textures/UI/VehicleIcons/Motorboat.0",
    "VehicleProfileType": "EVehicleProfileType::BeachableShip",
    "ArmourType": "EArmourType::LightVehicle",
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 60
        }
      ],
      "MaxHealth": 200,
      "MinorDamagePercent": 0.5,
      "MajorDamagePercent": 0.7,
      "RepairCost": 60,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 2,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.15,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.25,
      "RotationRate": 0.25,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 500,
      "EngineForce": 0,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9601510305979942325",
        "topLeft": "0",
        "bottomRight": "15191433758495748144"
      },
      "crated": {
        "topLeft": "0",
        "full": "9601510306114652597",
        "bottomRight": "15334891423526813696"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LogisticsVehicles/BPOilTankerC",
    "CodeName": "OilTankerC",
    "ChassisName": "Fuel Tanker",
    "DisplayName": "RR-3 “Stolon” Tanker.",
    "Description": "The “Stolon” Tanker is a heavier R-series rig designed to transport and distribute large quantities of Fuel.",
    "FactionVariant": "EFactionId::Colonials",
    "Icon": "War/Content/Textures/UI/VehicleIcons/OilTankerIcon.0",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::LightTruck",
    "ArmourType": "EArmourType::LightVehicle",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 100
        }
      ],
      "MaxHealth": 1125,
      "MinorDamagePercent": 0.125,
      "MajorDamagePercent": 0.7,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 2,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.3,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.4,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 800,
      "EngineForce": 17000,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9627986142021260956",
        "topLeft": "12848122598422367635",
        "bottomRight": "14323367472636452928"
      },
      "crated": {
        "topLeft": "12848122598422367635",
        "full": "9608845844679214748",
        "bottomRight": "9642904720439787520"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LogisticsVehicles/BPOilTankerW",
    "CodeName": "OilTankerW",
    "DisplayName": "Dunne Fuelrunner 2d",
    "Description": "The Fuelrunner is a heavy Dunne rig designed to transport and distribute large quantities of Fuel.",
    "FactionVariant": "EFactionId::Wardens",
    "Icon": "War/Content/Textures/UI/VehicleIcons/OilTankerWarIcon.0",
    "ChassisName": "Fuel Tanker",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::LightTruck",
    "ArmourType": "EArmourType::LightVehicle",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 235,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 100
        }
      ],
      "MaxHealth": 1125,
      "MinorDamagePercent": 0.125,
      "MajorDamagePercent": 0.7,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 2,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.3,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.4,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 800,
      "EngineForce": 17000,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9553113824121242805",
        "topLeft": "10335918582406596966",
        "bottomRight": "15625477332888764416"
      },
      "crated": {
        "topLeft": "10335918582406596966",
        "full": "9537280857486050485",
        "bottomRight": "10437225009175904384"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/LogisticsVehicles/BPTroopShip",
    "CodeName": "TroopShip",
    "DisplayName": "BMS - White Whale",
    "Description": "A heavily armoured vessel, the Basset Motor Society’s White Whale-class troop transports can deploy on faraway beaches to function as a permanent forward operating base.",
    "TechID": "ETechID::UnlockTroopShip",
    "Icon": "War/Content/Textures/UI/VehicleIcons/TroopShipVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::Ship",
    "ArmourType": "EArmourType::Tier1Tank",
    "FuelTank": 200,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 100
        }
      ],
      "MaxHealth": 4000,
      "MinorDamagePercent": 0.5,
      "MajorDamagePercent": 0.9,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 12,
      "FuelCapacity": 200,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.8,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.25,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 500,
      "EngineForce": 0,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14210104502439107378",
        "topLeft": "11699703453752070765",
        "bottomRight": "16195155916014229520"
      },
      "crated": {
        "topLeft": "11699703453752070765",
        "full": "9618051364317780786",
        "bottomRight": "14261891492850171904"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Mech/BPMechW",
    "CodeName": "MechW",
    "ChassisName": "Mech",
    "DisplayName": "Herne QMW 1a Scourge Hunter",
    "Description": "Built in response to the ongoing use of the Cursed in military skirmishes, the Scourge Hunter class Quadruped Mechanized Walker is equipped with a quad-barrelled rocket launcher, accompanied by a specially designed quad-barrel machine gun. ",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockMech",
    "Icon": "War/Content/Textures/Event/MechWardenVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Mech",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "FuelTank": 250,
    "DepthCuttoffForSwimDamage": 240,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 185
        }
      ],
      "MaxHealth": 6850,
      "MinorDamagePercent": 0.5,
      "MajorDamagePercent": 0.7,
      "RepairCost": 200,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 3,
      "FuelCapacity": 250,
      "FuelConsumptionPerSecond": 0.75,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 1,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.7,
      "RotationRate": 0.35,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 200,
      "EngineForce": 23500,
      "MassOverride": 8500,
      "TankArmour": 4750,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9623412179498873276",
        "topLeft": "12498010553570403786",
        "bottomRight": "15191445341959389200"
      },
      "crated": {
        "topLeft": "12498010553570403786",
        "full": "9605397776694702268",
        "bottomRight": "15130540592582361088"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/MediumTank/BPMediumTank2C",
    "CodeName": "MediumTank2C",
    "ChassisName": "Assault Tank",
    "DisplayName": "86K-a “Bardiche”",
    "Description": "Unlike the 85-series, the Bardiche sports a heavier, more durable build and is fitted with a coaxial heavy machinegun along with a powerful, short-barrelled 68mm turret. Modern Kraunian engineering allows for a fast reload, making it an ideal tool to combat enemy armour.",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockMediumTank2",
    "Icon": "War/Content/Textures/UI/VehicleIcons/MediumTank2CIcon.0",
    "FuelTank": 275,
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Fulltrack",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 225,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 175
        }
      ],
      "MaxHealth": 4000,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 170,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 3,
      "FuelCapacity": 275,
      "FuelConsumptionPerSecond": 0.35,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.45,
      "RotationRate": 0.145,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 19500,
      "MassOverride": 13500,
      "TankArmour": 15650,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0.23,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10452695171205143272",
        "topLeft": "12848095078487869555",
        "bottomRight": "15046755672210284640"
      },
      "crated": {
        "topLeft": "12848095078487869555",
        "full": "10757761270482947048",
        "bottomRight": "15336015124410409088"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/MediumTank/BPMediumTank2MultiW",
    "CodeName": "MediumTank2MultiW",
    "ChassisName": "Cruiser Tank",
    "DisplayName": "Gallagher Highwayman Mk. III",
    "Description": "Colm Gallagher’s engineers designed a variation of the Outlaw that features an independently rotating MG turret sitting atop the main armament of twin anti-tank cannons. What it lacks in raw firepower compared to its older sibling, the Highwayman more than makes up for it with versatility.",
    "TechID": "ETechID::UnlockMediumTank2Multi",
    "Icon": "War/Content/Textures/UI/VehicleIcons/MediumTank2MultiWIcon.0",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FulltrackLightTanks",
    "FactionVariant": "EFactionId::Wardens",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "FuelTank": 200,
    "DepthCuttoffForSwimDamage": 225,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 170
        }
      ],
      "MaxHealth": 2700,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 150,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 2,
      "FuelCapacity": 200,
      "FuelConsumptionPerSecond": 0.2,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.7,
      "RotationRate": 0.2,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 20000,
      "MassOverride": 7000,
      "TankArmour": 10000,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0.33,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10599622926734564067",
        "topLeft": "12273894813592081826",
        "bottomRight": "13889317322027483328"
      },
      "crated": {
        "topLeft": "12273894813592081826",
        "full": "10901856684051356402",
        "bottomRight": "14264140820910227584"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/MediumTank/BPMediumTank2RangeW",
    "CodeName": "MediumTank2RangeW",
    "ChassisName": "Cruiser Tank",
    "DisplayName": "Gallagher Outlaw Mk. II",
    "Description": "Originally designed in response to increasing swarms of Mesean armour, the Outlaw is an exceptionally capable medium tank armed with a long-range 40mm turret and includes a built-in storm rifle support position.",
    "TechID": "ETechID::UnlockMediumTank2Range",
    "Icon": "War/Content/Textures/UI/VehicleIcons/MediumTank2RangeWIcon.0",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FulltrackLightTanks",
    "FactionVariant": "EFactionId::Wardens",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "FuelTank": 200,
    "DepthCuttoffForSwimDamage": 225,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 165
        }
      ],
      "MaxHealth": 2700,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 150,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 2,
      "FuelCapacity": 200,
      "FuelConsumptionPerSecond": 0.2,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.7,
      "RotationRate": 0.2,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 20000,
      "MassOverride": 7000,
      "TankArmour": 10000,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0.33,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10459732118099335920",
        "topLeft": "12489236485232777780",
        "bottomRight": "15046738013180665920"
      },
      "crated": {
        "topLeft": "12489236485232777780",
        "full": "10757461949372320752",
        "bottomRight": "15343898897659510912"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/MediumTank/BPMediumTank2TwinC",
    "CodeName": "MediumTank2TwinC",
    "ChassisName": "Assault Tank",
    "DisplayName": "86K-c “Ranseur”",
    "Description": "This evolution of the “Bardiche” is fitted quad-mounted RPG launchers paired with a high-velocity 12.7mm cannon. The “Ranseur” indicates progress in Kraunian design as they continue to leverage outdated equipment to create deadly, modern armour.",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockMediumTank2Twin",
    "Icon": "War/Content/Textures/UI/VehicleIcons/MediumTank2TwinCVehicleIcon.0",
    "FuelTank": 275,
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Fulltrack",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 225,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 185
        }
      ],
      "MaxHealth": 4000,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 170,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 2,
      "FuelCapacity": 275,
      "FuelConsumptionPerSecond": 0.35,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.45,
      "RotationRate": 0.145,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 19500,
      "MassOverride": 13500,
      "TankArmour": 15650,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0.23,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14208640154277399153",
        "topLeft": "12848121318355650994",
        "bottomRight": "15625468224327393280"
      },
      "crated": {
        "topLeft": "12848121318355650994",
        "full": "9604835165429713905",
        "bottomRight": "15346148221424508928"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/MediumTank/BPMediumTankC",
    "CodeName": "MediumTankC",
    "DisplayName": "85K-b “Falchion”",
    "Description": "Designed for mass-production in Kraunia, this assault tank features a modular turret system for maximum versatility. The “Falchion” class features a powerful if understated, 40mm cannon.",
    "ChassisName": "Assault Tank",
    "FactionVariant": "EFactionId::Colonials",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ColonialMediumTankIcon.0",
    "FuelTank": 225,
    "VehiclesPerCrateBonusQuantity": 2,
    "TechID": "ETechID::UnlockMediumTank",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Fulltrack",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 225,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 165
        }
      ],
      "MaxHealth": 3000,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 170,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 3,
      "FuelCapacity": 225,
      "FuelConsumptionPerSecond": 0.3,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.45,
      "RotationRate": 0.145,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 23500,
      "MassOverride": 10500,
      "TankArmour": 9100,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0.33,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10678433575898815472",
        "topLeft": "12346820041422772821",
        "bottomRight": "16204163115403188240"
      },
      "crated": {
        "topLeft": "12346820041422772821",
        "full": "10690185148668824560",
        "bottomRight": "15418188498154307584"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/MediumTank/BPMediumTankOffensiveC",
    "CodeName": "MediumTankOffensiveC",
    "DisplayName": "85K-a “Spatha”",
    "Description": "The “Spatha” assault tank features a unique and destructive 40mm turret that fires high-velocity shells. This specialized turret is not as well suited to mass-production as its more refined counterpart, the “Falchion.”",
    "TechID": "ETechID::UnlockMediumTankOffensive",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ColonialMediumTankOffensive.0",
    "VehiclesPerCrateBonusQuantity": 0,
    "ChassisName": "Assault Tank",
    "FactionVariant": "EFactionId::Colonials",
    "FuelTank": 225,
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Fulltrack",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 225,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 165
        }
      ],
      "MaxHealth": 3000,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 165,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 3,
      "FuelCapacity": 225,
      "FuelConsumptionPerSecond": 0.3,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.45,
      "RotationRate": 0.145,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 23500,
      "MassOverride": 10500,
      "TankArmour": 11000,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0.33,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10705388826084085712",
        "topLeft": "12199850265741138218",
        "bottomRight": "16204163392293047304"
      },
      "crated": {
        "topLeft": "12199850265741138218",
        "full": "10690206734907445200",
        "bottomRight": "14261891493923930240"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/MediumTank/BPMediumTankW",
    "CodeName": "MediumTankW",
    "TechID": "ETechID::UnlockMediumTank",
    "ChassisName": "Assault Tank",
    "DisplayName": "Silverhand - Mk. IV",
    "Description": "The Silverhand assault tank is fitted with destructive dual-barrel armaments, and heavy frontal and rear armour. Its 68mm frontal cannon is paired with a lighter 40mm turret. ",
    "FactionVariant": "EFactionId::Wardens",
    "Icon": "War/Content/Textures/UI/VehicleIcons/WardenMediumTankIcon.0",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FulltrackMediumTanks",
    "FuelTank": 225,
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 225,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 170
        }
      ],
      "MaxHealth": 3100,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 170,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 3,
      "FuelCapacity": 225,
      "FuelConsumptionPerSecond": 0.3,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.12,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 24000,
      "MassOverride": 12000,
      "TankArmour": 13300,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0.27,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "15278297739795744918",
        "topLeft": "12197115196004329145",
        "bottomRight": "13889312908946444304"
      },
      "crated": {
        "topLeft": "12197115196004329145",
        "full": "10685681755202373782",
        "bottomRight": "15409183500070289536"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/MediumTank/MediumTankSiegeW",
    "CodeName": "MediumTankSiegeW",
    "DisplayName": "Silverhand Chieftain - Mk. VI",
    "Description": "The Chieftan assault tank is fitted with asymmetrical armaments, including a 250mm mortar cannon and a twin-barrelled 12.7mm turret.",
    "TechID": "ETechID::UnlockMediumTankSiege",
    "Icon": "War/Content/Textures/UI/VehicleIcons/MediumTankSiegeWVehicleIcon.0",
    "ChassisName": "Assault Tank",
    "FactionVariant": "EFactionId::Wardens",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FulltrackMediumTanks",
    "FuelTank": 225,
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 225,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 185
        }
      ],
      "MaxHealth": 3100,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 170,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 6,
      "FuelCapacity": 225,
      "FuelConsumptionPerSecond": 0.3,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.12,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 24000,
      "MassOverride": 14500,
      "TankArmour": 13300,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0.27,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10680686466149861809",
        "topLeft": "12269126356194986067",
        "bottomRight": "13889313183824347136"
      },
      "crated": {
        "topLeft": "12269126356194986067",
        "full": "10685682390296119729",
        "bottomRight": "14184204401425514496"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/MortarTank/BPLightTank2InfantryC",
    "CodeName": "LightTank2InfantryC",
    "ChassisName": "Light Infantry Tank",
    "DisplayName": "HC-2 “Scorpion”",
    "Description": "The “Scorpion” HC-class tank is a moderately armoured infantry support vehicle with twin, high-powered heavy machine guns and short-range radios for improved intelligence support. In addition, exterior seating is available for infantry. ",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockLightTank2Infantry",
    "Icon": "War/Content/Textures/UI/VehicleIcons/LightTank2InfantryCVehicleIcon.0",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::BattleTank",
    "FuelTank": 200,
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 205,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 140
        }
      ],
      "MaxHealth": 3300,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 160,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 8,
      "FuelCapacity": 200,
      "FuelConsumptionPerSecond": 0.3,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.45,
      "RotationRate": 0.25,
      "RotationSpeedCuttoff": 15,
      "SpeedSqrThreshold": 200,
      "EngineForce": 24000,
      "MassOverride": 10000,
      "TankArmour": 7500,
      "MinTankArmourPercent": 0.25,
      "TankArmourMinPenetrationChance": 0.4,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10682093845276954208",
        "topLeft": "11842697121250235977",
        "bottomRight": "15046755122991357952"
      },
      "crated": {
        "topLeft": "11842697121250235977",
        "full": "10685405729984007776",
        "bottomRight": "15334889222356099072"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/MortarTank/BPMortarTankC",
    "CodeName": "MortarTankC",
    "DisplayName": "HC-7 \"Ballista\"",
    "Description": "The HC-Class “Ballista” is a heavy tank designed to obliterate opposition defenses with its 250mm Hades Mortar Cannon.",
    "FactionVariant": "EFactionId::Colonials",
    "Icon": "War/Content/Textures/UI/VehicleIcons/MortarTankVehicleIcon.0",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::BattleTank",
    "FuelTank": 200,
    "ChassisName": "Siege Tank",
    "TechID": "ETechID::UnlockMortarTank",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 205,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 155
        }
      ],
      "MaxHealth": 3300,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 160,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 10,
      "FuelCapacity": 200,
      "FuelConsumptionPerSecond": 0.3,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.45,
      "RotationRate": 0.25,
      "RotationSpeedCuttoff": 15,
      "SpeedSqrThreshold": 200,
      "EngineForce": 24000,
      "MassOverride": 11000,
      "TankArmour": 7500,
      "MinTankArmourPercent": 0.25,
      "TankArmourMinPenetrationChance": 0.4,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10669637612532113140",
        "topLeft": "12848087104880024649",
        "bottomRight": "15046755603490807808"
      },
      "crated": {
        "topLeft": "12848087104880024649",
        "full": "10685422222943178482",
        "bottomRight": "15406949015417266176"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Motorcycle/BPMotorcycleC",
    "CodeName": "MotorcycleC",
    "DisplayName": "03MM “Caster”",
    "TechID": "ETechID::UnlockMotorcycle",
    "Description": "A motorcycle and sidecar used to patrol large areas. Speed can be boosted at the cost of additional fuel.",
    "FactionVariant": "EFactionId::Colonials",
    "Icon": "War/Content/Textures/UI/VehicleIcons/MotorcycleVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::OpenRoofWheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Motorcycle",
    "ArmourType": "EArmourType::LightVehicle",
    "ShippableInfo": "EShippableType::Normal",
    "DepthCuttoffForSwimDamage": 205,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 85
        }
      ],
      "MaxHealth": 300,
      "MinorDamagePercent": 0.5,
      "MajorDamagePercent": 0.7,
      "RepairCost": 85,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 2,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.45,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.5,
      "RotationSpeedCuttoff": 15,
      "SpeedSqrThreshold": 500,
      "EngineForce": 6500,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14094078976085707422",
        "topLeft": "11269024558500898716",
        "bottomRight": "14757395240635142449"
      },
      "crated": {
        "topLeft": "11269024558500898716",
        "full": "9752613334152333982",
        "bottomRight": "14252882130139875601"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Motorcycle/BPMotorcycleOffensiveC",
    "CodeName": "MotorcycleOffensiveC",
    "DisplayName": "00MS “Stinger”",
    "Description": "The cab of this Motorcycle is fitted with an LMG for fast-response hit and run assaults.",
    "TechID": "ETechID::UnlockMotorcycleOffensive",
    "Icon": "War/Content/Textures/UI/VehicleIcons/MotorcycleOffensiveVehicleIcon.0",
    "FactionVariant": "EFactionId::Colonials",
    "VehicleProfileType": "EVehicleProfileType::OpenRoofWheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Motorcycle",
    "ArmourType": "EArmourType::LightVehicle",
    "ShippableInfo": "EShippableType::Normal",
    "DepthCuttoffForSwimDamage": 205,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 110
        }
      ],
      "MaxHealth": 300,
      "MinorDamagePercent": 0.5,
      "MajorDamagePercent": 0.7,
      "RepairCost": 110,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.45,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.5,
      "RotationSpeedCuttoff": 15,
      "SpeedSqrThreshold": 500,
      "EngineForce": 6000,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9770975482205067932",
        "topLeft": "11197809200127371924",
        "bottomRight": "14540374428116792115"
      },
      "crated": {
        "topLeft": "11197809200127371924",
        "full": "9752960799150070428",
        "bottomRight": "14256561064773759794"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Motorcycle/BPMotorcycleW",
    "CodeName": "MotorcycleW",
    "DisplayName": "Kivela Power Wheel 80-1",
    "Description": "A Warden motorcycle used in patrols and fitted with a sidecar. The Kivela Power Wheel can also gain a momentary speed boost by burning additional fuel.",
    "TechID": "ETechID::UnlockMotorcycle",
    "FactionVariant": "EFactionId::Wardens",
    "Icon": "War/Content/Textures/UI/VehicleIcons/MotorcycleWIcon.0",
    "VehicleProfileType": "EVehicleProfileType::OpenRoofWheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Motorcycle",
    "ArmourType": "EArmourType::LightVehicle",
    "ShippableInfo": "EShippableType::Normal",
    "DepthCuttoffForSwimDamage": 205,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 85
        }
      ],
      "MaxHealth": 300,
      "MinorDamagePercent": 0.5,
      "MajorDamagePercent": 0.7,
      "RepairCost": 85,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 2,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.15,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.45,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.5,
      "RotationSpeedCuttoff": 15,
      "SpeedSqrThreshold": 500,
      "EngineForce": 6500,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14094081208898210712",
        "topLeft": "10116093489471384682",
        "bottomRight": "14757390809175162880"
      },
      "crated": {
        "topLeft": "10116093489471384682",
        "full": "9752611134822861721",
        "bottomRight": "14252884296816656384"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/ScoutTank/BPScoutTankOffensiveW",
    "CodeName": "ScoutTankOffensiveW",
    "DisplayName": "King Gallant Mk. II",
    "Description": "A heavily armoured variant of the King Spire, the Gallant Mk. II boasts a weighty 30mm cannon at the cost of top speed.",
    "TechID": "ETechID::UnlockScoutTankOffensive",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ScouTankOffensiveWIcon.0",
    "ChassisName": "Scout Tank",
    "FactionVariant": "EFactionId::Wardens",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FulltrackLightTanks",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "FuelTank": 250,
    "DepthCuttoffForSwimDamage": 225,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 90
        }
      ],
      "MaxHealth": 1350,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 135,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 250,
      "FuelConsumptionPerSecond": 0.25,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 0.1,
      "ReverseSpeedModifier": 0.75,
      "RotationRate": 0.45,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 19500,
      "MassOverride": 10000,
      "TankArmour": 7500,
      "MinTankArmourPercent": 0.1,
      "TankArmourMinPenetrationChance": 0.5,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "11037811353214355816",
        "topLeft": "12273912524963407322",
        "bottomRight": "17361798776117282816"
      },
      "crated": {
        "topLeft": "12273912524963407322",
        "full": "10469231831539501552",
        "bottomRight": "15415936423466893312"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/ScoutTank/BPScoutTankW",
    "CodeName": "ScoutTankW",
    "DisplayName": "King Spire Mk. I",
    "TechID": "ETechID::UnlockScoutTank",
    "ChassisName": "Scout Tank",
    "Description": "This small tank has been recently recommissioned to the Warden arsenal. It boasts high maneuverability and an antenna that allows for long-range communications during high-stakes recon operations.",
    "FactionVariant": "EFactionId::Wardens",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ScoutVehicleWar.0",
    "VehicleProfileType": "EVehicleProfileType::Tank",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FulltrackLightTanks",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Large",
    "FuelTank": 250,
    "DepthCuttoffForSwimDamage": 225,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 80
        }
      ],
      "MaxHealth": 1350,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.85,
      "RepairCost": 135,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 2,
      "FuelCapacity": 250,
      "FuelConsumptionPerSecond": 0.2,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 0.1,
      "ReverseSpeedModifier": 0.75,
      "RotationRate": 0.5,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 22000,
      "MassOverride": 8000,
      "TankArmour": 6000,
      "MinTankArmourPercent": 0.1,
      "TankArmourMinPenetrationChance": 0.5,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14140805720531979384",
        "topLeft": "11843242908447257930",
        "bottomRight": "15119023892930756624"
      },
      "crated": {
        "topLeft": "11843242908447257930",
        "full": "9532497402898860280",
        "bottomRight": "15415866058476617728"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/ScoutVehicle/BPScoutVehicleMobilityC",
    "CodeName": "ScoutVehicleMobilityC",
    "DisplayName": "UV-05a “Argonaut”",
    "Description": "This stripped down Light Utility Vehicle provides extra seating for a small crew to engage in hit and run tactics.",
    "TechID": "ETechID::UnlockScoutVehicleMobility",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ScoutVehicleMobilityVehicleIcon.0",
    "ArmourType": "EArmourType::LightVehicle",
    "FactionVariant": "EFactionId::Colonials",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::ScoutVehicle",
    "ShippableInfo": "EShippableType::Normal",
    "DepthCuttoffForSwimDamage": 205,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 10
        }
      ],
      "MaxHealth": 900,
      "MinorDamagePercent": 0.6,
      "MajorDamagePercent": 0.8,
      "RepairCost": 120,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 7,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.65,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.4,
      "RotationSpeedCuttoff": 15,
      "SpeedSqrThreshold": 500,
      "EngineForce": 8000,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14138904699269517268",
        "topLeft": "13135191026965328229",
        "bottomRight": "15046755880311983116"
      },
      "crated": {
        "topLeft": "13135191026965328229",
        "full": "9537281373419556820",
        "bottomRight": "15408356667326201856"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/ScoutVehicle/BPScoutVehicleOffensiveC",
    "CodeName": "ScoutVehicleOffensiveC",
    "DisplayName": "UV-24 “Icarus”",
    "Description": "This RPG-mounted Light Utility Vehicle provides a heavy-duty weapons platform with superior speed. Perfectly suited for assaulting enemy structures and vehicles, or supporting an armoured assault.",
    "TechID": "ETechID::UnlockScoutVehicleOffensive",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ScoutVehicleOffensiveVehicleIcon.0",
    "ArmourType": "EArmourType::LightVehicle",
    "FactionVariant": "EFactionId::Colonials",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::ScoutVehicle",
    "ShippableInfo": "EShippableType::Normal",
    "DepthCuttoffForSwimDamage": 205,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 25
        }
      ],
      "MaxHealth": 1300,
      "MinorDamagePercent": 0.6,
      "MajorDamagePercent": 0.8,
      "RepairCost": 120,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 8,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.4,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.4,
      "RotationSpeedCuttoff": 15,
      "SpeedSqrThreshold": 500,
      "EngineForce": 7450,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9527218676547175922",
        "topLeft": "13135226206877816236",
        "bottomRight": "15046738285911343122"
      },
      "crated": {
        "topLeft": "13135226206877816236",
        "full": "9535099941543693302",
        "bottomRight": "15406947093419393152"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/ScoutVehicle/BPScoutVehicleOffensiveW",
    "CodeName": "ScoutVehicleOffensiveW",
    "DisplayName": "Drummond Spitfire 100d",
    "Description": "This LMG-mounted Light Utility Vehicle provides a heavy-duty weapons platform with superior speed. Perfectly suited for supporting flanking infantry or an armoured assault.",
    "TechID": "ETechID::UnlockScoutVehicleOffensive",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ScoutVehicleOffensiveWarVehicleIcon.0",
    "ArmourType": "EArmourType::LightVehicle",
    "FactionVariant": "EFactionId::Wardens",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::ScoutVehicle",
    "ShippableInfo": "EShippableType::Normal",
    "DepthCuttoffForSwimDamage": 205,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 15
        }
      ],
      "MaxHealth": 1150,
      "MinorDamagePercent": 0.45,
      "MajorDamagePercent": 0.8,
      "RepairCost": 120,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 3,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.45,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.4,
      "RotationSpeedCuttoff": 15,
      "SpeedSqrThreshold": 500,
      "EngineForce": 7450,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9598150370677673404",
        "topLeft": "13063415457802263890",
        "bottomRight": "15046755674363792384"
      },
      "crated": {
        "topLeft": "13063415457802263890",
        "full": "9591394972318715324",
        "bottomRight": "10795261143979917312"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/ScoutVehicle/BPScoutVehicleUtilityC",
    "CodeName": "ScoutVehicleUtilityC",
    "DisplayName": "UV-5c “Odyssey”",
    "Description": "This simple, modified Utility Vehicle is fitted with a reinforced hatch to provide one crew member with increased visibility for intense recon operations.",
    "TechID": "ETechID::UnlockScoutVehicleUtility",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ScoutVehicleUtilityCVehicleIcon.0",
    "ArmourType": "EArmourType::LightVehicle",
    "FactionVariant": "EFactionId::Colonials",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::ScoutVehicle",
    "ShippableInfo": "EShippableType::Normal",
    "DepthCuttoffForSwimDamage": 205,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 10
        }
      ],
      "MaxHealth": 1150,
      "MinorDamagePercent": 0.6,
      "MajorDamagePercent": 0.8,
      "RepairCost": 120,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 7,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.5,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.35,
      "RotationSpeedCuttoff": 15,
      "SpeedSqrThreshold": 500,
      "EngineForce": 7450,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10678994457330487562",
        "topLeft": "11915016398988726890",
        "bottomRight": "15047307162920960096"
      },
      "crated": {
        "topLeft": "11915016398988726890",
        "full": "10699260656862679478",
        "bottomRight": "15336562679053549568"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/ScoutVehicle/BPScoutVehicleUtilityW",
    "CodeName": "ScoutVehicleUtilityW",
    "ChassisName": "Light Utility Vehicle",
    "DisplayName": "Drummond Loscann 55c",
    "Description": "This amphibious Light Utility Vehicle has been heavily modified to cross rivers and lakes with ease. Venturing out into the open sea is ill-advised, however.",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockScoutVehicleUtility",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ScoutVehicleAmphibiousWarVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::ScoutVehicle",
    "ArmourType": "EArmourType::LightVehicle",
    "ShippableInfo": "EShippableType::Normal",
    "DepthCuttoffForSwimDamage": 205,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 10
        }
      ],
      "MaxHealth": 900,
      "MinorDamagePercent": 0.6,
      "MajorDamagePercent": 0.8,
      "RepairCost": 120,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 7,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.2,
      "SwimmingFuelConsumptionModifier": 3.5,
      "DefaultSurfaceMovementRate": 0.45,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.4,
      "RotationSpeedCuttoff": 15,
      "SpeedSqrThreshold": 500,
      "EngineForce": 7450,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9526092793854725267",
        "topLeft": "12489214204016167766",
        "bottomRight": "10435069862903824384"
      },
      "crated": {
        "topLeft": "12489214204016167766",
        "full": "10690274397854780563",
        "bottomRight": "10795263343812706432"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/ScoutVehicle/BPScoutVehicleW",
    "CodeName": "ScoutVehicleW",
    "DisplayName": "Drummond 100a",
    "TechID": "ETechID::UnlockScoutVehicle",
    "ArmourType": "EArmourType::LightVehicle",
    "Description": "A multipurpose off-road Warden vehicle that can scout nearby targets.",
    "FactionVariant": "EFactionId::Wardens",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ScoutVehicleWarVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::ScoutVehicle",
    "ShippableInfo": "EShippableType::Normal",
    "DepthCuttoffForSwimDamage": 205,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 10
        }
      ],
      "MaxHealth": 1150,
      "MinorDamagePercent": 0.45,
      "MajorDamagePercent": 0.8,
      "RepairCost": 120,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 9,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.5,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.4,
      "RotationSpeedCuttoff": 15,
      "SpeedSqrThreshold": 500,
      "EngineForce": 7450,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9598132746049206684",
        "topLeft": "12491495155855370834",
        "bottomRight": "15046761118024335378"
      },
      "crated": {
        "topLeft": "12491495155855370834",
        "full": "10672241257181272476",
        "bottomRight": "15408072718448328832"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Tankette/TanketteOffensiveC",
    "CodeName": "TanketteOffensiveC",
    "ChassisName": "Tankette",
    "DisplayName": "T20 “Ixion” Tankette",
    "Description": "A bombastic variant of the T12 Tankette, the “Ixion” provides its crew with more support and a mounted Infantry Support Gun. Added weight from the armour results in reduced overall speed.",
    "TechID": "ETechID::UnlockTanketteOffensive",
    "Icon": "War/Content/Textures/UI/VehicleIcons/TanketteOffensiveCVehicleIcon.0",
    "FactionVariant": "EFactionId::Colonials",
    "VehicleProfileType": "EVehicleProfileType::WheeledArmoured",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::FulltrackLight",
    "ArmourType": "EArmourType::Tier2Tank",
    "ShippableInfo": "EShippableType::Normal",
    "FuelTank": 150,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Wood",
          "DisplayName": "Refined Materials",
          "Quantity": 60
        }
      ],
      "MaxHealth": 1350,
      "MinorDamagePercent": 0.7,
      "MajorDamagePercent": 0.9,
      "RepairCost": 145,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 1,
      "FuelCapacity": 150,
      "FuelConsumptionPerSecond": 0.2,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.7,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.2,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 400,
      "EngineForce": 7500,
      "MassOverride": 3350,
      "TankArmour": 7200,
      "MinTankArmourPercent": 0.2,
      "TankArmourMinPenetrationChance": 0.55,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10709115032133607104",
        "topLeft": "12489207639179703595",
        "bottomRight": "15046755672210300928"
      },
      "crated": {
        "topLeft": "12489207639179703595",
        "full": "10689904364913860306",
        "bottomRight": "15336017321286180864"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Truck/BPTruckC",
    "CodeName": "TruckC",
    "DisplayName": "R-1 Hauler",
    "Description": "A heavy-duty Colonial truck used to mobilize troops and supplies.",
    "FactionVariant": "EFactionId::Colonials",
    "Icon": "War/Content/Textures/UI/VehicleIcons/TruckVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Truck",
    "ArmourType": "EArmourType::LightVehicle",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 255,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 100
        }
      ],
      "MaxHealth": 900,
      "MinorDamagePercent": 0.1875,
      "MajorDamagePercent": 0.7,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 15,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.05,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.2,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.4,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 800,
      "EngineForce": 17980,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9627986132486835865",
        "topLeft": "12776319773085672858",
        "bottomRight": "14179256668091580416"
      },
      "crated": {
        "topLeft": "12776319773085672858",
        "full": "9626864630500937369",
        "bottomRight": "9571973095023968256"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Truck/BPTruckDefensiveW",
    "CodeName": "TruckDefensiveW",
    "DisplayName": "Dunne Leatherback 2a",
    "Description": "A heavy, reinforced Dunne transport. Fitted with a heavier frame, the Leatherback is capable of enduring more punishment at the cost of initial acceleration. ",
    "TechID": "ETechID::UnlockTruckDefensive",
    "Icon": "War/Content/Textures/UI/VehicleIcons/TruckDefensiveWIcon.0",
    "FactionVariant": "EFactionId::Wardens",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Truck",
    "ArmourType": "EArmourType::LightVehicle",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 255,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 145
        }
      ],
      "MaxHealth": 1000,
      "MinorDamagePercent": 0.35,
      "MajorDamagePercent": 0.7,
      "RepairCost": 120,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 14,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.05,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.2,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.3,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 800,
      "EngineForce": 17980,
      "MassOverride": 8000,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10707143601018604957",
        "topLeft": "12846962304485853538",
        "bottomRight": "15625477228454748192"
      },
      "crated": {
        "topLeft": "12846962304485853538",
        "full": "10673313827120434589",
        "bottomRight": "15409764042209755264"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Truck/BPTruckMobilityC",
    "CodeName": "TruckMobilityC",
    "DisplayName": "R-5b “Sisyphus” Hauler",
    "Description": "This variation of the standard R-5 Hauler is fitted with an improved suspension and axle system resulting in better overall handling. However, these improvements may not hold up under severe weather conditions.",
    "TechID": "ETechID::UnlockTruckMobility",
    "Icon": "War/Content/Textures/UI/VehicleIcons/TruckMobilityCVehicleIcon.0",
    "FactionVariant": "EFactionId::Colonials",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Truck",
    "ArmourType": "EArmourType::LightVehicle",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 255,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 100
        }
      ],
      "MaxHealth": 900,
      "MinorDamagePercent": 0.1875,
      "MajorDamagePercent": 0.7,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 14,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.2,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.9,
      "RotationSpeedCuttoff": 0.4,
      "SpeedSqrThreshold": 800,
      "EngineForce": 17980,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9626578788859741853",
        "topLeft": "13062579347676427630",
        "bottomRight": "10706345573035829320"
      },
      "crated": {
        "topLeft": "13062579347676427630",
        "full": "9590549990502289053",
        "bottomRight": "9625453064647360640"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Truck/BPTruckMobilityW",
    "CodeName": "TruckMobilityW",
    "DisplayName": "Dunne Landrunner 12c",
    "Description": "This standard Truck is fitted with rugged off-road treads, allowing for more efficient movement on rough terrain and conditions at the expense of maximum speed.",
    "TechID": "ETechID::UnlockTruckMobility",
    "Icon": "War/Content/Textures/UI/VehicleIcons/TruckMobilityWarVehicleIcon.0",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Halftrack",
    "FactionVariant": "EFactionId::Wardens",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "ArmourType": "EArmourType::LightVehicle",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 255,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 120
        }
      ],
      "MaxHealth": 900,
      "MinorDamagePercent": 0.1875,
      "MajorDamagePercent": 0.7,
      "RepairCost": 120,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 14,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.075,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.4,
      "OffroadSnowPenalty": 0.1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.56,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 800,
      "EngineForce": 17000,
      "MassOverride": 7500,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9625668362361360142",
        "topLeft": "13144209828978202152",
        "bottomRight": "15480725782588089349"
      },
      "crated": {
        "topLeft": "13144209828978202152",
        "full": "10780841666255768334",
        "bottomRight": "15408637865282003968"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Truck/BPTruckOffensiveC",
    "CodeName": "TruckOffensiveC",
    "DisplayName": "R-9 “Speartip” Escort",
    "Description": "This standard Truck is fitted with Light Machinegun in place of the passenger seat. It’s well suited as an escort for convoys or lightly armoured operations.",
    "TechID": "ETechID::UnlockTruckOffensive",
    "Icon": "War/Content/Textures/UI/VehicleIcons/TruckOffensiveVehicleIcon.0",
    "FactionVariant": "EFactionId::Colonials",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Truck",
    "ArmourType": "EArmourType::LightVehicle",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 255,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 145
        }
      ],
      "MaxHealth": 900,
      "MinorDamagePercent": 0.1875,
      "MajorDamagePercent": 0.7,
      "RepairCost": 120,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 15,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.05,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.2,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.4,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 800,
      "EngineForce": 17980,
      "MassOverride": 7750,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9627986141076770457",
        "topLeft": "12197607255458623908",
        "bottomRight": "14179256668091580416"
      },
      "crated": {
        "topLeft": "12197607255458623908",
        "full": "9626864639082482841",
        "bottomRight": "9571973095023968256"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Truck/BPTruckUtilityC",
    "CodeName": "TruckDumpC",
    "DisplayName": "R-5 “Atlas” Hauler",
    "Description": "This standard Truck is fitted with a resource hopper in place of the standard cargo hold. This allows for a much greater capacity for resources at the expense of space for cargo.",
    "TechID": "ETechID::UnlockTruckDump",
    "Icon": "War/Content/Textures/UI/VehicleIcons/TruckUtilityVehicleIcon.0",
    "FuelTank": 120,
    "FactionVariant": "EFactionId::Colonials",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Truck",
    "ArmourType": "EArmourType::LightVehicle",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 255,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 120
        }
      ],
      "MaxHealth": 1000,
      "MinorDamagePercent": 0.1875,
      "MajorDamagePercent": 0.7,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 20,
      "FuelCapacity": 120,
      "FuelConsumptionPerSecond": 0.075,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.2,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.4,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 800,
      "EngineForce": 17980,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14238194425661738654",
        "topLeft": "10695936648679208365",
        "bottomRight": "14323353946252612530"
      },
      "crated": {
        "topLeft": "10695936648679208365",
        "full": "9591324033803341470",
        "bottomRight": "9639513576495813266"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Truck/BPTruckUtilityW",
    "CodeName": "TruckDumpW",
    "DisplayName": "Dunne Loadlugger 3c",
    "Description": "This standard Truck is fitted with a resource hopper in place of the standard cargo hold. This allows for a much greater capacity for resources at the expense of space for cargo. ",
    "TechID": "ETechID::UnlockTruckDump",
    "Icon": "War/Content/Textures/UI/VehicleIcons/TruckUtilityWarVehicleIcon.0",
    "FuelTank": 120,
    "FactionVariant": "EFactionId::Wardens",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Truck",
    "ArmourType": "EArmourType::LightVehicle",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 255,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 120
        }
      ],
      "MaxHealth": 1000,
      "MinorDamagePercent": 0.1875,
      "MajorDamagePercent": 0.7,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 20,
      "FuelCapacity": 120,
      "FuelConsumptionPerSecond": 0.075,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.2,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.4,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 800,
      "EngineForce": 17980,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "14236224143774638493",
        "topLeft": "10623009787585852047",
        "bottomRight": "15625477333022965760"
      },
      "crated": {
        "topLeft": "10623009787585852047",
        "full": "9590761127087104413",
        "bottomRight": "10797512979365494784"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Vehicles/Truck/BPTruckW",
    "CodeName": "TruckW",
    "DisplayName": "Dunne Transport",
    "Description": "A heavy-duty Warden truck used to mobilize troops and supplies.",
    "FactionVariant": "EFactionId::Wardens",
    "Icon": "War/Content/Textures/UI/VehicleIcons/TruckWarVehicleIcon.0",
    "VehicleProfileType": "EVehicleProfileType::WheeledTransport",
    "VehicleMovementProfileType": "EVehicleMovementProfileType::Truck",
    "ArmourType": "EArmourType::LightVehicle",
    "ShippableInfo": "EShippableType::Large",
    "DepthCuttoffForSwimDamage": 255,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 100
        }
      ],
      "MaxHealth": 900,
      "MinorDamagePercent": 0.1875,
      "MajorDamagePercent": 0.7,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 15,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.05,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.2,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.4,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 800,
      "EngineForce": 17980,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9625734333209955231",
        "topLeft": "13144209828909004426",
        "bottomRight": "15625477228454739968"
      },
      "crated": {
        "topLeft": "13144209828909004426",
        "full": "9626794262025128863",
        "bottomRight": "15409200886097903744"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPATPillbox",
    "CodeName": "ATPillbox",
    "DisplayName": "Anti-Tank Pillbox",
    "Description": "This heavily reinforced pillbox allows the garrisoned infantry with anti-tank rifles to fire on approaching enemy armour from a safe position.",
    "TechID": "ETechID::UnlockATPillbox",
    "Icon": "War/Content/Textures/UI/StructureIcons/ATPillboxIcon.0",
    "ArmourType": "EArmourType::Tier2Structure",
    "BuildLocationType": "EBuildLocationType::Anywhere",
    "MaxHealth": 950,
    "IconHashes": {
      "individual": {
        "full": "10910652420557020257",
        "topLeft": "13062890059789126070",
        "bottomRight": "15191433346717630592"
      },
      "crated": {
        "topLeft": "13062890059789126070",
        "full": "10757477325388826673",
        "bottomRight": "15336580271239610496"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPBarbedWirePlatform",
    "CodeName": "BarbedWirePlatform",
    "DisplayName": "Barbed Wire Pallet",
    "Description": "A pallet of Barbed Wire that's used for the construction of frontline defenses.",
    "Icon": "War/Content/Textures/UI/ItemIcons/BarbedWirePlatformItemIcon.0",
    "ArmourType": "EArmourType::Tier1Structure",
    "BuildLocationType": "EBuildLocationType::ConstructionYard",
    "MaxHealth": 500,
    "IconHashes": {
      "individual": {
        "full": "14128701226787706807",
        "topLeft": "10981919631699903338",
        "bottomRight": "15336328573618500704"
      },
      "crated": {
        "topLeft": "10981919631699903338",
        "full": "9604558052503505843",
        "bottomRight": "15408283822533390384"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPBarbedWireSpline",
    "CodeName": "BarbedWireSpline",
    "DisplayName": "Barbed Wire",
    "Description": "Used to slow down enemy infantry movement. Can be dismantled with a Wrench.",
    "Icon": "War/Content/Textures/UI/StructureIcons/BarbedWireCornerStructureIcon.0",
    "ArmourType": "EArmourType::Tier2BStructure",
    "BuildLocationType": "EBuildLocationType::Anywhere",
    "MaxHealth": 600,
    "IconHashes": {
      "individual": {
        "full": "16172496146428104035",
        "topLeft": "14139111021408745790",
        "bottomRight": "10778857871468814848"
      },
      "crated": {
        "topLeft": "14139111021408745790",
        "full": "16170244346748390755",
        "bottomRight": "10805888128407450112"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPConcreteMixer",
    "CodeName": "ConcreteMixer",
    "DisplayName": "Concrete Mixer",
    "Description": "A portable device that mixes various materials to form Concrete, which are used to build heavily fortified structures.",
    "TechID": "ETechID::UnlockConcreteMixer",
    "Icon": "War/Content/Textures/UI/StructureIcons/ConcreteMixerIcon.0",
    "ArmourType": "EArmourType::Tier2Structure",
    "ShippableInfo": "EShippableType::Normal",
    "BuildLocationType": "EBuildLocationType::ConstructionYard",
    "MaxHealth": 1200,
    "IconHashes": {
      "individual": {
        "full": "10381689825954471227",
        "topLeft": "12846999834945166180",
        "bottomRight": "15553040576176717840"
      },
      "crated": {
        "topLeft": "12846999834945166180",
        "full": "10383946058177977651",
        "bottomRight": "15411153547881873408"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPConstructionVehicleProxy",
    "CodeName": "Construction",
    "DisplayName": "Construction Vehicle",
    "Description": "A vehicle used to build large structures.",
    "Icon": "War/Content/Textures/UI/VehicleIcons/ConstructionVehicleIcon.0",
    "BuildLocationType": "EBuildLocationType::Anywhere",
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 100
        }
      ],
      "MaxHealth": 1000,
      "MinorDamagePercent": 0.25,
      "MajorDamagePercent": 0.7,
      "RepairCost": 100,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 12,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.75,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.4,
      "RotationSpeedCuttoff": 15,
      "SpeedSqrThreshold": 500,
      "EngineForce": 7600,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10764534104521260236",
        "topLeft": "10476864269681599828",
        "bottomRight": "15335918640669130768"
      },
      "crated": {
        "topLeft": "10476864269681599828",
        "full": "10764569563771533516",
        "bottomRight": "15407976236302991360"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPConstructionYard",
    "CodeName": "ConstructionYard",
    "DisplayName": "Construction Yard",
    "Description": "An area where certain structures can be built and prepared for shipping.",
    "Icon": "War/Content/Textures/UI/MapIcons/MapIconConstructionYard.0",
    "MaxHealth": 2000,
    "IconHashes": {
      "individual": {
        "full": "10767663268630641364",
        "topLeft": "13156784079507968619",
        "bottomRight": "15551537268496842752"
      },
      "crated": {
        "topLeft": "13156784079507968619",
        "full": "10911778456572279508",
        "bottomRight": "15553824252556787712"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPCraneVehicleProxy",
    "CodeName": "Crane",
    "DisplayName": "Crane",
    "Description": "A heavy mobile Crane used to lift vehicles and very heavy equipment.",
    "Icon": "War/Content/Textures/UI/VehicleIcons/CraneVehicleIcon.0",
    "BuildLocationType": "EBuildLocationType::Anywhere",
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 125
        }
      ],
      "MaxHealth": 1500,
      "MinorDamagePercent": 0.5,
      "MajorDamagePercent": 0.7,
      "RepairCost": 125,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 5,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.1,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0.833333,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.5,
      "RotationRate": 0.165,
      "RotationSpeedCuttoff": 15,
      "SpeedSqrThreshold": 500,
      "EngineForce": 10000,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "10404275704879385371",
        "topLeft": "9893461960177247152",
        "bottomRight": "15330334806815866880"
      },
      "crated": {
        "topLeft": "9893461960177247152",
        "full": "10403994504780581661",
        "bottomRight": "15404642551407312896"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPDeployedListeningKit",
    "CodeName": "DeployedListeningKit",
    "DisplayName": "Listening Kit",
    "Description": "A device used to intercept enemy radio broadcasts transmitted from nearby sources.",
    "Icon": "War/Content/Textures/UI/ItemIcons/ListeningKitIcon.0",
    "ArmourType": "EArmourType::Tier1Tank",
    "MaxHealth": 400,
    "IconHashes": {
      "individual": {
        "full": "10551209978858738029",
        "topLeft": "11983456647066200490",
        "bottomRight": "14757390055151550656"
      },
      "crated": {
        "topLeft": "11983456647066200490",
        "full": "10756970379980720550",
        "bottomRight": "15419313573431631872"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPEmplacedAT",
    "CodeName": "EmplacedAT",
    "DisplayName": "68mm Anti-Tank Cannon",
    "Description": "A defensive emplacement against heavily armoured vehicles.",
    "TechID": "ETechID::UnlockEmplacedATGun",
    "Icon": "War/Content/Textures/UI/StructureIcons/EmplacedATIcon.0",
    "ShippableInfo": "EShippableType::Normal",
    "BuildLocationType": "EBuildLocationType::ConstructionYard",
    "MaxHealth": 1500,
    "IconHashes": {
      "individual": {
        "full": "10687722708430800402",
        "topLeft": "12273862776154581636",
        "bottomRight": "15049423885081518080"
      },
      "crated": {
        "topLeft": "12273862776154581636",
        "full": "10689974508240293522",
        "bottomRight": "15337125941600059392"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPEmplacedHeavyArtilleryC",
    "CodeName": "EmplacedHeavyArtilleryC",
    "DisplayName": "50-500 “Thunderbolt” Cannon",
    "Description": "This heavy artillery cannon is designed to cripple enemy fortifications from an entrenched position. Its long heavy barrel gives the \"Thunderbolt\" outstanding range.",
    "FactionVariant": "EFactionId::Colonials",
    "TechID": "ETechID::UnlockEmplacedHeavyArtillery",
    "Icon": "War/Content/Textures/UI/StructureIcons/HeavyArtilleryCIcon.0",
    "ShippableInfo": "EShippableType::Normal",
    "BuildLocationType": "EBuildLocationType::ConstructionYard",
    "MaxHealth": 750,
    "IconHashes": {
      "individual": {
        "full": "10469295411894504454",
        "topLeft": "9277529844110829555",
        "bottomRight": "15390245589598526096"
      },
      "crated": {
        "topLeft": "9277529844110829555",
        "full": "10469299808867273863",
        "bottomRight": "15390210147401915008"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPEmplacedHeavyArtilleryW",
    "CodeName": "EmplacedHeavyArtilleryW",
    "DisplayName": "Huber Exalt 150mm",
    "Description": "A heavy cannon designed to shatter the garrisons and fortifications of advancing forces. The Exalt is best utilized when emplaced into a defensive position to take advantage of its impressive range.",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockEmplacedHeavyArtillery",
    "Icon": "War/Content/Textures/UI/StructureIcons/HeavyArtilleryW.0",
    "ShippableInfo": "EShippableType::Normal",
    "BuildLocationType": "EBuildLocationType::ConstructionYard",
    "MaxHealth": 1250,
    "IconHashes": {
      "individual": {
        "full": "11271209781758480327",
        "topLeft": "9241714774069604952",
        "bottomRight": "14467854212413833216"
      },
      "crated": {
        "topLeft": "9241714774069604952",
        "full": "11268676678229905287",
        "bottomRight": "15404607333740888064"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPEmplacedLightArtilleryW",
    "CodeName": "EmplacedLightArtilleryW",
    "DisplayName": "Huber Lariat 120mm",
    "Description": "A light artillery cannon designed to be a fixture in defensive fortifications. The Lariat sports a formidable long-range 120mm cannon designed to put immense pressure on enemy infantry.",
    "FactionVariant": "EFactionId::Wardens",
    "TechID": "ETechID::UnlockEmplacedLightArtillery",
    "Icon": "War/Content/Textures/UI/StructureIcons/EmplacedHowitzerIcon.0",
    "ShippableInfo": "EShippableType::Normal",
    "BuildLocationType": "EBuildLocationType::ConstructionYard",
    "MaxHealth": 750,
    "IconHashes": {
      "individual": {
        "full": "11124283133776383623",
        "topLeft": "10324337997877126342",
        "bottomRight": "14763963690753650944"
      },
      "crated": {
        "topLeft": "10324337997877126342",
        "full": "11268399431010766471",
        "bottomRight": "15411356132903542784"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPEmplacedMachineGun",
    "CodeName": "EmplacedMachineGun",
    "DisplayName": "12.7 Anti Infantry Flak Gun",
    "Description": "An anti-aircraft flak cannon repurposed as a defensive emplacement against infantry.",
    "TechID": "ETechID::UnlockEmplacedFieldMG",
    "Icon": "War/Content/Textures/UI/StructureIcons/EmplacedMGIcon.0",
    "ShippableInfo": "EShippableType::Normal",
    "BuildLocationType": "EBuildLocationType::ConstructionYard",
    "MaxHealth": 1500,
    "IconHashes": {
      "individual": {
        "full": "10843088477756419026",
        "topLeft": "9976997738400746101",
        "bottomRight": "15042067752785414276"
      },
      "crated": {
        "topLeft": "9976997738400746101",
        "full": "10843092910158474192",
        "bottomRight": "15333746026137780224"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPFactory",
    "CodeName": "Factory",
    "DisplayName": "Factory",
    "Description": "A manufacturing plant for producing military equipment.",
    "Icon": "War/Content/Textures/UI/MapIcons/MapIconFactory.0",
    "MaxHealth": 2000,
    "IconHashes": {
      "individual": {
        "full": "10680971037086415655",
        "topLeft": "9761709918770130067",
        "bottomRight": "15407131537560354944"
      },
      "crated": {
        "topLeft": "9761709918770130067",
        "full": "10700111266783001399",
        "bottomRight": "15408547708545319040"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPFieldBridge",
    "CodeName": "FieldBridge",
    "DisplayName": "Field Bridge",
    "Description": "A makeshift bridge for transporting light equipment over a short distance. Will take damage when vehicles drive across.",
    "TechID": "ETechID::UnlockFieldBridge",
    "Icon": "War/Content/Textures/UI/StructureIcons/FieldBridgeItemIcon.0",
    "ArmourType": "EArmourType::Tier2BStructure",
    "BuildLocationType": "EBuildLocationType::Anywhere",
    "MaxHealth": 1500,
    "IconHashes": {
      "individual": {
        "full": "13879600790812725744",
        "topLeft": "12273898099757978987",
        "bottomRight": "17361641481138401520"
      },
      "crated": {
        "topLeft": "12273898099757978987",
        "full": "10401695978575862256",
        "bottomRight": "9651349105705773296"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPFieldHospital",
    "CodeName": "FieldHospital",
    "DisplayName": "Field Hospital",
    "Description": "A field medical facility used to treat critically wounded soldiers at the front line. ",
    "Icon": "War/Content/Textures/UI/StructureIcons/FieldHospitalIcon.0",
    "ArmourType": "EArmourType::Tier1Structure",
    "BuildLocationType": "EBuildLocationType::Anywhere",
    "MaxHealth": 500,
    "IconHashes": {
      "individual": {
        "full": "9553959353185586834",
        "topLeft": "13359533721530756697",
        "bottomRight": "15047863913087500320"
      },
      "crated": {
        "topLeft": "13359533721530756697",
        "full": "10689920891412074130",
        "bottomRight": "15338269398125248512"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPFirePit",
    "CodeName": "FirePit",
    "DisplayName": "Fire Pit",
    "Description": "A pit of fire used to keep soldiers warm during Snow Storms. Requires Diesel to fuel.",
    "Icon": "War/Content/Textures/UI/StructureIcons/FirePitIcon.0",
    "BuildLocationType": "EBuildLocationType::Anywhere",
    "MaxHealth": 400,
    "IconHashes": {
      "individual": {
        "full": "11054409394024381389",
        "topLeft": "12345680867225938258",
        "bottomRight": "16208508763190067200"
      },
      "crated": {
        "topLeft": "12345680867225938258",
        "full": "11058912718172285387",
        "bottomRight": "15343879310465302528"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPGarrisonHouseFishHut2",
    "CodeName": "GarrisonFishHut2",
    "DisplayName": "Garrisoned House",
    "Description": "An abandoned building in the world that has been fortified and garrisoned.",
    "Icon": "War/Content/Textures/UI/StructureIcons/GarrisonStructureIcon.0",
    "MaxHealth": 800,
    "IconHashes": {
      "individual": {
        "full": "15046310164345813720",
        "topLeft": "9259242780252617904",
        "bottomRight": "14178493708084708352"
      },
      "crated": {
        "topLeft": "9259242780252617904",
        "full": "13891141258240227992",
        "bottomRight": "15331494394305970176"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPHospital",
    "CodeName": "Hospital",
    "DisplayName": "Hospital",
    "Description": "A large medical facility for treating critically wounded soldiers returning from the battlefield.",
    "Icon": "War/Content/Textures/UI/StructureIcons/HospitalIcon.0",
    "MaxHealth": 2000,
    "IconHashes": {
      "individual": {
        "full": "9625663800351580301",
        "topLeft": "9331142357348829100",
        "bottomRight": "15553041676762120192"
      },
      "crated": {
        "topLeft": "9331142357348829100",
        "full": "9637771902649550980",
        "bottomRight": "15420090380544114688"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPIntelCenter",
    "CodeName": "IntelCenter",
    "DisplayName": "Intelligence Center",
    "Description": "A high-tech listening post designed to intercept and decode enemy transmissions. The intelligence Center can target distant locations and will continue to decipher sensitive transmissions over a sustained period.",
    "Icon": "War/Content/Textures/UI/StructureIcons/IntelligenceCenterIcon.0",
    "ArmourType": "EArmourType::Tier3Structure",
    "MaxHealth": 2550,
    "IconHashes": {
      "individual": {
        "full": "10478309002597680506",
        "topLeft": "9259324442668580254",
        "bottomRight": "15046570509066048560"
      },
      "crated": {
        "topLeft": "9259324442668580254",
        "full": "10478256243220988210",
        "bottomRight": "15419243206298042368"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPLongRangeArtillery",
    "CodeName": "LRArtillery",
    "DisplayName": "Storm Cannon",
    "Description": "A heavy fixed position artillery that can release devastating firepower on distant enemy targets.",
    "Icon": "War/Content/Textures/UI/StructureIcons/LongRangedArtilleryIcon.0",
    "ArmourType": "EArmourType::Tier3Structure",
    "MaxHealth": 2550,
    "IconHashes": {
      "individual": {
        "full": "14726895679902291809",
        "topLeft": "9748944204901835713",
        "bottomRight": "15908974686817616389"
      },
      "crated": {
        "topLeft": "9748944204901835713",
        "full": "10115701161454863153",
        "bottomRight": "15419243205219713024"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPMagicStorageBox",
    "CodeName": "MagicBox",
    "DisplayName": "Magic Box",
    "Description": "A magical box that duplicates the item in its first inventory slot.",
    "Icon": "War/Content/Textures/UI/StructureIcons/StorageItemIcon.0",
    "BuildLocationType": "EBuildLocationType::TestShard",
    "MaxHealth": 400,
    "IconHashes": {
      "individual": {
        "full": "13852068877588484277",
        "topLeft": "9259331287611639610",
        "bottomRight": "15047881572117143616"
      },
      "crated": {
        "topLeft": "9259331287611639610",
        "full": "9527434557837002935",
        "bottomRight": "15336015124410400768"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPMassProductionFactory",
    "CodeName": "MassProduction",
    "DisplayName": "Mass Production Factory",
    "Description": "A manufacturing plant for producing military equipment.",
    "Icon": "War/Content/Textures/UI/MapIcons/MapIconFactory.0",
    "MaxHealth": 6500,
    "IconHashes": {
      "individual": {
        "full": "10680971037086415655",
        "topLeft": "9761709918770130067",
        "bottomRight": "15407131537560354944"
      },
      "crated": {
        "topLeft": "9761709918770130067",
        "full": "10700111266783001399",
        "bottomRight": "15408547708545319040"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPMetalBeamPlatform",
    "CodeName": "MetalBeamPlatform",
    "DisplayName": "Metal Beam Pallet",
    "Description": "A pallet of Metal Beams that's used for the construction of frontline defenses.",
    "Icon": "War/Content/Textures/UI/ItemIcons/MetalBeamPlatformItemIcon.0",
    "ArmourType": "EArmourType::Tier1Structure",
    "BuildLocationType": "EBuildLocationType::ConstructionYard",
    "MaxHealth": 500,
    "IconHashes": {
      "individual": {
        "full": "9237849051193362992",
        "topLeft": "11412577072856604002",
        "bottomRight": "15046738011033182304"
      },
      "crated": {
        "topLeft": "11412577072856604002",
        "full": "10766768074057468850",
        "bottomRight": "15417079917703077888"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPMGPillbox",
    "CodeName": "MGPillbox",
    "DisplayName": "Machine Gun Pillbox",
    "Description": "A well-fortified bunker position fitted with a mounted machinegun. Garrisoned infantry will lay down heavy suppressive fire upon approaching enemies from a fixed angle.",
    "TechID": "ETechID::UnlockMGPillbox",
    "Icon": "War/Content/Textures/UI/StructureIcons/MGPillboxIcon.0",
    "ArmourType": "EArmourType::Tier2Structure",
    "BuildLocationType": "EBuildLocationType::Anywhere",
    "MaxHealth": 650,
    "IconHashes": {
      "individual": {
        "full": "10478590542364151611",
        "topLeft": "11412559549102114489",
        "bottomRight": "15046755603758194880"
      },
      "crated": {
        "topLeft": "11412559549102114489",
        "full": "10469512979739463487",
        "bottomRight": "15334891698404737216"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPMotorboatVehicleProxy",
    "CodeName": "Motorboat",
    "DisplayName": "Motorboat",
    "Description": "A motorized boat for moving small groups of infantry across rivers and between islands.",
    "Icon": "War/Content/Textures/UI/VehicleIcons/Motorboat.0",
    "BuildLocationType": "EBuildLocationType::Anywhere",
    "MaxHealth": 20,
    "VehicleDynamicData": {
      "ResourceRequirements": [
        {
          "ItemCodeName": "Cloth",
          "DisplayName": "Basic Materials",
          "Quantity": 60
        }
      ],
      "MaxHealth": 200,
      "MinorDamagePercent": 0.5,
      "MajorDamagePercent": 0.7,
      "RepairCost": 60,
      "ResourcesPerBuildCycle": 1,
      "ItemHolderCapacity": 2,
      "FuelCapacity": 100,
      "FuelConsumptionPerSecond": 0.15,
      "SwimmingFuelConsumptionModifier": 1,
      "DefaultSurfaceMovementRate": 0,
      "OffroadSnowPenalty": 1,
      "ReverseSpeedModifier": 0.25,
      "RotationRate": 0.25,
      "RotationSpeedCuttoff": 0,
      "SpeedSqrThreshold": 500,
      "EngineForce": 0,
      "MassOverride": 0,
      "TankArmour": 0,
      "MinTankArmourPercent": 0.33,
      "TankArmourMinPenetrationChance": 0,
      "VehicleSubsystemDisableChances": 0,
      "ObjectPath": "War/Content/Blueprints/Data/BPVehicleDynamicData"
    },
    "IconHashes": {
      "individual": {
        "full": "9601510305979942325",
        "topLeft": "0",
        "bottomRight": "15191433758495748144"
      },
      "crated": {
        "topLeft": "0",
        "full": "9601510306114652597",
        "bottomRight": "15334891423526813696"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPResourceBox",
    "CodeName": "ResourceBox",
    "DisplayName": "Resource Box",
    "Description": "A mysterious box with a never ending supply of resources",
    "Icon": "War/Content/Textures/UI/StructureIcons/StorageItemIcon.0",
    "MaxHealth": 400,
    "IconHashes": {
      "individual": {
        "full": "13852068877588484277",
        "topLeft": "9259331287611639610",
        "bottomRight": "15047881572117143616"
      },
      "crated": {
        "topLeft": "9259331287611639610",
        "full": "9527434557837002935",
        "bottomRight": "15336015124410400768"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPResourceContainer",
    "CodeName": "ResourceContainer",
    "DisplayName": "Resource Container",
    "Description": "A container that can carry large quantities of resources and can be transported by certain vehicles.",
    "Icon": "War/Content/Textures/UI/StructureIcons/ResourceContainerIcon.0",
    "ShippableInfo": "EShippableType::Small",
    "BuildLocationType": "EBuildLocationType::ConstructionYard",
    "MaxHealth": 600,
    "IconHashes": {
      "individual": {
        "full": "14138276745508638608",
        "topLeft": "9259260370201039051",
        "bottomRight": "13889313183832735744"
      },
      "crated": {
        "topLeft": "9259260370201039051",
        "full": "10689645313409765264",
        "bottomRight": "14254590738862964736"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPRiflePillbox",
    "CodeName": "RiflePillbox",
    "DisplayName": "Rifle Pillbox",
    "Description": "A reinforced dugout that gives the garrisoned rifle infantry a fortified defensive position to fire on approaching enemies from relative safety.",
    "Icon": "War/Content/Textures/UI/StructureIcons/RiflePillboxIcon.0",
    "ArmourType": "EArmourType::Tier1Structure",
    "BuildLocationType": "EBuildLocationType::Anywhere",
    "MaxHealth": 400,
    "IconHashes": {
      "individual": {
        "full": "9568877281864043361",
        "topLeft": "11197245413636785817",
        "bottomRight": "14612723465767228932"
      },
      "crated": {
        "topLeft": "11197245413636785817",
        "full": "10685699638622145377",
        "bottomRight": "15409763773765910534"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPRocketFacility",
    "CodeName": "RocketSite",
    "DisplayName": "Rocket Launch Site",
    "Description": "An abandoned launch site from the Great Wars for firing long range ballistic rockets.",
    "Icon": "War/Content/Textures/UI/MapIcons/MapIconRocketFacility.0",
    "FuelTank": 720,
    "MaxHealth": 2000,
    "IconHashes": {
      "individual": {
        "full": "14802262919765767107",
        "topLeft": "12274092004459850325",
        "bottomRight": "17363662310983335936"
      },
      "crated": {
        "topLeft": "12274092004459850325",
        "full": "10180448218679571395",
        "bottomRight": "17651905949759184896"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPSandbagPlatform",
    "CodeName": "SandbagPlatform",
    "DisplayName": "Sandbag Pallet",
    "Description": "A pallet of Sandbags that's used for the construction of frontline defenses.",
    "Icon": "War/Content/Textures/UI/ItemIcons/SandbagPlatformItemIcon.0",
    "ArmourType": "EArmourType::Tier1Structure",
    "BuildLocationType": "EBuildLocationType::ConstructionYard",
    "MaxHealth": 500,
    "IconHashes": {
      "individual": {
        "full": "14993098803421305528",
        "topLeft": "13287756775973678289",
        "bottomRight": "13893816508575916128"
      },
      "crated": {
        "topLeft": "13287756775973678289",
        "full": "10685423081382890424",
        "bottomRight": "15415954017796251840"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPSeaport",
    "CodeName": "Seaport",
    "DisplayName": "Seaport",
    "Description": "A large building used to store crates of weapons and equipment.",
    "Icon": "War/Content/Textures/UI/MapIcons/MapIconSeaport.0",
    "MaxHealth": 2000,
    "IconHashes": {
      "individual": {
        "full": "13929139504274833088",
        "topLeft": "11055869591390675102",
        "bottomRight": "10862762291909370916"
      },
      "crated": {
        "topLeft": "11055869591390675102",
        "full": "13929420979252067008",
        "bottomRight": "15330368306498510848"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPShippingContainer",
    "CodeName": "ShippingContainer",
    "DisplayName": "Shipping Container",
    "Description": "A container for shipping very large quantities of Crates using Crane loaded vehicles. This type of container can only be unloaded at Storage Depots and Seaports.",
    "Icon": "War/Content/Textures/UI/StructureIcons/ShippingContainerStructureIcon.0",
    "ShippableInfo": "EShippableType::Normal",
    "BuildLocationType": "EBuildLocationType::ConstructionYard",
    "MaxHealth": 1000,
    "IconHashes": {
      "individual": {
        "full": "14174300595001541525",
        "topLeft": "9474592526716713545",
        "bottomRight": "15046755605366706208"
      },
      "crated": {
        "topLeft": "9474592526716713545",
        "full": "9536723430979979669",
        "bottomRight": "15410326717285269504"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPSignPost",
    "CodeName": "SignPost",
    "DisplayName": "Signpost",
    "Description": "A sign used to relay information to other soldiers.",
    "Icon": "War/Content/Textures/UI/StructureIcons/BuildableSignpostIcon.0",
    "ArmourType": "EArmourType::Tier1Structure",
    "BuildLocationType": "EBuildLocationType::Anywhere",
    "MaxHealth": 1000,
    "IconHashes": {
      "individual": {
        "full": "14685732825075901489",
        "topLeft": "13135128036848609974",
        "bottomRight": "17937841649908506940"
      },
      "crated": {
        "topLeft": "13135128036848609974",
        "full": "10362277201049644081",
        "bottomRight": "15339307593315149855"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPSmallShippingContainer",
    "CodeName": "SmallShippingContainer",
    "DisplayName": "Small Shipping Container",
    "Description": "A container for shipping large quantities of Crates using Crane loaded vehicles. This type of container can be unloaded from any location.",
    "Icon": "War/Content/Textures/UI/StructureIcons/ShippingContainerShortIcon.0",
    "ShippableInfo": "EShippableType::Normal",
    "BuildLocationType": "EBuildLocationType::ConstructionYard",
    "MaxHealth": 1000,
    "IconHashes": {
      "individual": {
        "full": "10606655301142287160",
        "topLeft": "11053691021687484052",
        "bottomRight": "14468024909973078016"
      },
      "crated": {
        "topLeft": "11053691021687484052",
        "full": "10915103226438535474",
        "bottomRight": "14261889020026970112"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPStorageBox",
    "CodeName": "StorageBox",
    "DisplayName": "Storage Box",
    "Description": "A shared storage container that can be used to stash item.",
    "Icon": "War/Content/Textures/UI/StructureIcons/StorageItemIcon.0",
    "BuildLocationType": "EBuildLocationType::Anywhere",
    "MaxHealth": 400,
    "IconHashes": {
      "individual": {
        "full": "13852068877588484277",
        "topLeft": "9259331287611639610",
        "bottomRight": "15047881572117143616"
      },
      "crated": {
        "topLeft": "9259331287611639610",
        "full": "9527434557837002935",
        "bottomRight": "15336015124410400768"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPStorageFacility",
    "CodeName": "StorageFacility",
    "DisplayName": "Storage Depot",
    "Description": "A large building used to store crates, vehicles, and shippable structures.",
    "Icon": "War/Content/Textures/UI/MapIcons/MapIconStorageFacility.0",
    "MaxHealth": 2000,
    "IconHashes": {
      "individual": {
        "full": "9325334308711529100",
        "topLeft": "10264212235628229995",
        "bottomRight": "15751951927673410064"
      },
      "crated": {
        "topLeft": "10264212235628229995",
        "full": "9330946199232084684",
        "bottomRight": "15549252594877659648"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPStructureCrate",
    "CodeName": "StructureCrate",
    "DisplayName": "Structure Crate",
    "Description": "A crate of packed structures.",
    "Icon": "War/Content/Textures/UI/StructureIcons/ProductionPartsStructureIcon.0",
    "ShippableInfo": "EShippableType::Normal",
    "MaxHealth": 800,
    "IconHashes": {
      "individual": {
        "full": "13886055924388708533",
        "topLeft": "9402814763224120426",
        "bottomRight": "15046755672208187488"
      },
      "crated": {
        "topLeft": "9402814763224120426",
        "full": "10761701275628521909",
        "bottomRight": "15336017323433656320"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPTankStop",
    "CodeName": "TankStop",
    "DisplayName": "Tank Trap",
    "Description": "An anti-tank obstacle that prevents vehicle access to an area. Can be dismantled with a Wrench.",
    "TechID": "ETechID::UnlockTankStop",
    "Icon": "War/Content/Textures/UI/StructureIcons/TankStopIcon.0",
    "ArmourType": "EArmourType::Tier2Structure",
    "BuildLocationType": "EBuildLocationType::Anywhere",
    "MaxHealth": 2000,
    "IconHashes": {
      "individual": {
        "full": "13915121825318635489",
        "topLeft": "9963427590510434589",
        "bottomRight": "13889330621870145664"
      },
      "crated": {
        "topLeft": "9963427590510434589",
        "full": "14220170468797138912",
        "bottomRight": "14183093705702932608"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPVehicleCrate",
    "CodeName": "VehicleCrate",
    "DisplayName": "Vehicle Crate",
    "Description": "A crate of packed vehicles.",
    "Icon": "War/Content/Textures/UI/StructureIcons/ProductionPartsStructureIcon.0",
    "ShippableInfo": "EShippableType::Normal",
    "MaxHealth": 800,
    "IconHashes": {
      "individual": {
        "full": "13886055924388708533",
        "topLeft": "9402814763224120426",
        "bottomRight": "15046755672208187488"
      },
      "crated": {
        "topLeft": "9402814763224120426",
        "full": "10761701275628521909",
        "bottomRight": "15336017323433656320"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPWatchTower",
    "CodeName": "WatchTower",
    "DisplayName": "Watch Tower",
    "Description": "Reports nearby enemy movements to players with Radios equipped",
    "Icon": "War/Content/Textures/UI/StructureIcons/WatchTowerStructureIcon.0",
    "BuildLocationType": "EBuildLocationType::Anywhere",
    "MaxHealth": 350,
    "IconHashes": {
      "individual": {
        "full": "14658144971098831251",
        "topLeft": "11843160407827695908",
        "bottomRight": "17361408190582685891"
      },
      "crated": {
        "topLeft": "11843160407827695908",
        "full": "10325119196862052547",
        "bottomRight": "15411435299339829472"
      }
    }
  },
  {
    "ObjectPath": "War/Content/Blueprints/Structures/BPWeaponRack",
    "CodeName": "WeaponRack",
    "DisplayName": "Weapon Rack",
    "Description": "A rack used to mount multiple firearms.",
    "Icon": "War/Content/Textures/UI/StructureIcons/StorageItemIcon.0",
    "MaxHealth": 400,
    "IconHashes": {
      "individual": {
        "full": "13852068877588484277",
        "topLeft": "9259331287611639610",
        "bottomRight": "15047881572117143616"
      },
      "crated": {
        "topLeft": "9259331287611639610",
        "full": "9527434557837002935",
        "bottomRight": "15336015124410400768"
      }
    }
  }
]