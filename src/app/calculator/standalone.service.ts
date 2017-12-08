import { Injectable } from '@angular/core';
// declare var standaloneAddon: any;
import { CombinedHeatPower, CombinedHeatPowerOutput } from '../shared/models/combinedHeatPower';


@Injectable()
export class StandaloneService {

  constructor() { }
  test(){
    // console.log(standaloneAddon)
  }


  CHPcalculator(inputs: CombinedHeatPower): CombinedHeatPowerOutput{
    // return standaloneAddon.CHPcalculator(inputs);
    return {
      annualOperationSavings: 1200,
      totalInstalledCostsPayback: 1200,
      simplePayback: 10,
      fuelCosts: 120,
      thermalCredit: 1200,
      incrementalOandM: 1200,
      totalOperatingCosts: 1200
    }
  }
}
