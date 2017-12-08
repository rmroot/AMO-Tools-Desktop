import { Injectable } from '@angular/core';
import { FlueGasMaterial, GasLoadChargeMaterial, LiquidLoadChargeMaterial, SolidLiquidFlueGasMaterial, SolidLoadChargeMaterial, AtmosphereSpecificHeat, WallLossesSurface } from '../shared/models/materials';

// declare var db: any;


@Injectable()
export class SuiteDbService {
  // db: any = db;
  hasStarted: boolean = false;
  constructor() { }

  startup() {
    this.hasStarted = true;
    // return db.startup();
  }
  preUpdate() {
    // return db.preUpdate();
  }

  postUpdate() {
    // return db.postUpdate();
  }

  test() {
    // console.log(db);
  }

  //volume
  selectGasFlueGasMaterials() {
    // return db.selectGasFlueGasMaterials()
    return [
      {
        C2H6: 15,
        C3H8: 15,
        C4H10_CnH2n: 15,
        CH4: 15,
        CO: 15,
        CO2: 15,
        H2: 15,
        H2O: 15,
        N2: 15,
        O2: 15,
        SO2: 15,
        heatingValue: 15,
        id: 1,
        specificGravity: 15,
        substance: 'some gas flue gas material'
      },
      {
        C2H6: 15,
        C3H8: 15,
        C4H10_CnH2n: 15,
        CH4: 15,
        CO: 15,
        CO2: 15,
        H2: 15,
        H2O: 15,
        N2: 15,
        O2: 15,
        SO2: 15,
        heatingValue: 15,
        id: 2,
        specificGravity: 15,
        substance: 'another gas flue gas material'
      }
    ];
  }

  selectGasFlueGasMaterialById(id: number) {
    return {
      C2H6: 15,
      C3H8: 15,
      C4H10_CnH2n: 15,
      CH4: 15,
      CO: 15,
      CO2: 15,
      H2: 15,
      H2O: 15,
      N2: 15,
      O2: 15,
      SO2: 15,
      heatingValue: 15,
      id: 1,
      specificGravity: 15,
      substance: 'some gas flue gas material'
    };
  }
  //mass
  selectSolidLiquidFlueGasMaterials() {
    // return db.selectSolidLiquidFlueGasMaterials()
    return [
      {
        carbon: 13,
        hydrogen: 13,
        id: 1,
        inertAsh: 13,
        moisture: 13,
        nitrogen: 13,
        o2: 13,
        substance: 'some solid liquid flue gas material',
        sulphur: 13,
        heatingValue: 13
      },
      {
        carbon: 13,
        hydrogen: 13,
        id: 2,
        inertAsh: 13,
        moisture: 13,
        nitrogen: 13,
        o2: 13,
        substance: 'another solid liquid flue gas material',
        sulphur: 13,
        heatingValue: 13
      },
    ];
  }

  selectSolidLiquidFlueGasMaterialById(id: number) {
    // return db.selectSolidLiquidFlueGasMaterialById(id)
    return {
      carbon: 13,
      hydrogen: 13,
      id: 1,
      inertAsh: 13,
      moisture: 13,
      nitrogen: 13,
      o2: 13,
      substance: 'some solid liquid flue gas material',
      sulphur: 13,
      heatingValue: 13
    };
  }

  selectGasLoadChargeMaterials() {
    // return db.selectGasLoadChargeMaterials()
    return [
      {
        id: 1,
        specificHeatVapor: 1,
        substance: 'gas load charge material'
      },
      {
        id: 2,
        specificHeatVapor: 109,
        substance: 'another gas load charge material'
      }
    ];
  }

  selectGasLoadChargeMaterialById(id: number) {
    // return db.selectGasLoadChargeMaterialById(id)
    return {
      id: 1,
      specificHeatVapor: 1,
      substance: 'gas load charge material'
    };
  }

  selectLiquidLoadChargeMaterials() {
    // return db.selectLiquidLoadChargeMaterials()
    return [
      {
        id: 1,
        latentHeat: 1,
        specificHeatLiquid: 1,
        specificHeatVapor: 1,
        substance: 'liquid load charge material',
        vaporizationTemperature: 1
      },
      {
        id: 2,
        latentHeat: 1,
        specificHeatLiquid: 1,
        specificHeatVapor: 1,
        substance: 'another liquid load charge material',
        vaporizationTemperature: 1
      },
    ];
  }

  selectLiquidLoadChargeMaterialById(id: number) {
    // return db.selectLiquidLoadChargeMaterialById(id)
    return {
      id: 1,
      latentHeat: 1,
      specificHeatLiquid: 1,
      specificHeatVapor: 1,
      substance: 'some liquid load charge material',
      vaporizationTemperature: 1
    };
  }

  selectSolidLoadChargeMaterials() {
    // return db.selectSolidLoadChargeMaterials()
    return [
      {
        id: 1,
        latentHeat: 1,
        meltingPoint: 1,
        specificHeatLiquid: 1,
        specificHeatSolid: 1,
        substance: 'solid load charge material'
      },
      {
        id: 2,
        latentHeat: 1,
        meltingPoint: 1,
        specificHeatLiquid: 1,
        specificHeatSolid: 1,
        substance: 'another solid load charge material'
      }
    ];
  }

  selectSolidLoadChargeMaterialById(id: number) {
    // return db.selectSolidLoadChargeMaterialById(id)
    return {
      id: 1,
      latentHeat: 1,
      meltingPoint: 1,
      specificHeatLiquid: 1,
      specificHeatSolid: 1,
      substance: 'solid load charge material'
    };
  }

  update() {
    // return db.update()
  }

  selectAtmosphereSpecificHeat() {
    // return db.selectAtmosphereSpecificHeat();
    return [
      {
        id: 1,
        substance: 'atmosphere specific heat substance',
        specificHeat: 0.5
      },
      {
        id: 2,
        substance: 'another atmosphere specific heat substance',
        specificHeat: 10.5
      }
    ];

  }
  selectAtmosphereSpecificHeatById(id: number) {
    // return db.selectAtmosphereSpecificHeatById(id);
    return {
      id: 1,
      substance: 'another atmosphere specific heat substance',
      specificHeat: 10.5
    };
  }

  insertAtmosphereSpecificHeat(material: AtmosphereSpecificHeat) {
    // return db.insertAtmosphereSpecificHeat(material)
    return true;
  }

  insertGasFlueGasMaterial(material: FlueGasMaterial) {
    // return db.insertGasFlueGasMaterial(material);
    return true;
  }

  insertGasLoadChargeMaterial(material: GasLoadChargeMaterial) {
    // return db.insertGasLoadChargeMaterial(material);
    return true;
  }

  insertLiquidLoadChargeMaterial(material: LiquidLoadChargeMaterial) {
    // return db.insertLiquidLoadChargeMaterial(material)
    return true;
  }

  insertSolidLiquidFlueGasMaterial(material: SolidLiquidFlueGasMaterial) {
    // return db.insertSolidLiquidFlueGasMaterial(material);
    return true;
  }

  insertSolidLoadChargeMaterial(material: SolidLoadChargeMaterial) {
    // return db.insertSolidLoadChargeMaterial(material);
    return true;
  }

  insertWallLossesSurface(material: WallLossesSurface) {
    // return db.insertWallLossesSurface(material);
    return true;
  }

  selectWallLossesSurface() {
    // return db.selectWallLossesSurface();
    return [
      {
        conditionFactor: 0.75,
        id: 1,
        surface: 'wall losses #1'
      },
      {
        conditionFactor: 0.75,
        id: 2,
        surface: 'wall losses #2'
      }
    ];
  }
  selectWallLossesSurfaceById(id: number) {
    // return db.selectWallLossesSurfaceById(id);
    return {
      conditionFactor: 0.95,
      id: 1,
      surface: 'wall losses #1'
    };
  }
}
