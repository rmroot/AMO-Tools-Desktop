import { Injectable } from '@angular/core';
//declare var standaloneAddon: any;
import { CombinedHeatPower, CombinedHeatPowerOutput } from '../shared/models/combinedHeatPower';
var standaloneAddon = require('amo-tools-suite/build/Release/standalone.node');

@Injectable()
export class StandaloneService {

  constructor() { }
  test(){
    console.log(standaloneAddon)
  }


  CHPcalculator(inputs: CombinedHeatPower): CombinedHeatPowerOutput{
    return standaloneAddon.CHPcalculator(inputs);
  }
}
