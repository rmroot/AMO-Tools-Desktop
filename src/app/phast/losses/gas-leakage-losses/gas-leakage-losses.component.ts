import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { PhastService } from '../../phast.service';
import { Losses } from '../../../shared/models/phast/phast';
import { LeakageLoss } from '../../../shared/models/phast/losses/leakageLoss';
import { GasLeakageLossesService } from './gas-leakage-losses.service';
import { GasLeakageCompareService } from './gas-leakage-compare.service';
import { Settings } from '../../../shared/models/settings';

@Component({
  selector: 'app-gas-leakage-losses',
  templateUrl: './gas-leakage-losses.component.html',
  styleUrls: ['./gas-leakage-losses.component.css']
})
export class GasLeakageLossesComponent implements OnInit {
  @Input()
  losses: Losses;
  @Input()
  saveClicked: boolean;
  @Input()
  addLossToggle: boolean;
  @Output('savedLoss')
  savedLoss = new EventEmitter<boolean>();
  @Input()
  baselineSelected: boolean;
  @Output('fieldChange')
  fieldChange = new EventEmitter<string>();
  @Input()
  isBaseline: boolean;
  @Input()
  settings: Settings;
  @Input()
  isLossesSetup: boolean;

  _leakageLosses: Array<any>;
  firstChange: boolean = true;
  resultsUnit: string;
  constructor(private gasLeakageLossesService: GasLeakageLossesService, private phastService: PhastService, private gasLeakageCompareService: GasLeakageCompareService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.firstChange) {
      if (changes.saveClicked) {
        this.saveLosses();
      }
      if (changes.addLossToggle) {
        this.addLoss();
      }
    }
    else {
      this.firstChange = false;
    }
  }
  ngOnInit() {
    if (this.settings.energyResultUnit != 'kWh') {
      this.resultsUnit = this.settings.energyResultUnit + '/hr';
    } else {
      this.resultsUnit = 'kW';
    }
    if (!this._leakageLosses) {
      this._leakageLosses = new Array<any>();
    }
    if (this.losses.leakageLosses) {
      this.setCompareVals();
      this.gasLeakageCompareService.initCompareObjects();
      this.losses.leakageLosses.forEach(loss => {
        let tmpLoss = {
          form: this.gasLeakageLossesService.initFormFromLoss(loss),
          name: 'Loss #' + (this._leakageLosses.length + 1),
          heatLoss: loss.heatLoss || 0.0
        };
        this.calculate(tmpLoss);
        this._leakageLosses.push(tmpLoss);
      })
    }

    this.gasLeakageLossesService.deleteLossIndex.subscribe((lossIndex) => {
      if (lossIndex != undefined) {
        if (this.losses.leakageLosses) {
          this._leakageLosses.splice(lossIndex, 1);
          if (this.gasLeakageCompareService.differentArray && !this.isBaseline) {
            this.gasLeakageCompareService.differentArray.splice(lossIndex, 1);
          }
        }
      }
    })
    if (this.isBaseline) {
      this.gasLeakageLossesService.addLossBaselineMonitor.subscribe((val) => {
        if (val == true) {
          this._leakageLosses.push({
            form: this.gasLeakageLossesService.initForm(),
            name: 'Loss #' + (this._leakageLosses.length + 1),
            heatLoss: 0.0
          })
        }
      })
    } else {
      this.gasLeakageLossesService.addLossModificationMonitor.subscribe((val) => {
        if (val == true) {
          this._leakageLosses.push({
            form: this.gasLeakageLossesService.initForm(),
            name: 'Loss #' + (this._leakageLosses.length + 1),
            heatLoss: 0.0
          })
        }
      })
    }
  }

  ngOnDestroy() {
    if (this.isBaseline) {
      this.gasLeakageLossesService.addLossBaselineMonitor.next(false);
      this.gasLeakageCompareService.baselineLeakageLoss = null;
    } else {
      this.gasLeakageCompareService.modifiedLeakageLoss = null;
      this.gasLeakageLossesService.addLossModificationMonitor.next(false);
    }
    this.gasLeakageLossesService.deleteLossIndex.next(null);
  }

  addLoss() {
    if (this.isLossesSetup) {
      this.gasLeakageLossesService.addLoss(this.isBaseline);
    }
    if (this.gasLeakageCompareService.differentArray) {
      this.gasLeakageCompareService.addObject(this.gasLeakageCompareService.differentArray.length - 1);
    }
    this._leakageLosses.push({
      form: this.gasLeakageLossesService.initForm(),
      name: 'Loss #' + (this._leakageLosses.length + 1),
      heatLoss: 0.0
    });
  }


  removeLoss(lossIndex: number) {
    this.gasLeakageLossesService.setDelete(lossIndex);
  }

  renameLossess() {
    let index = 1;
    this._leakageLosses.forEach(loss => {
      loss.name = 'Loss #' + index;
      index++;
    })
  }

  calculate(loss: any) {
    if (loss.form.status == 'VALID') {
      let tmpLeakageLoss = this.gasLeakageLossesService.initLossFromForm(loss.form);
      loss.heatLoss = this.phastService.leakageLosses(tmpLeakageLoss, this.settings);
    }
    else {
      loss.heatLoss = null;
    }
  }

  saveLosses() {
    let tmpLeakageLosses = new Array<LeakageLoss>();
    this._leakageLosses.forEach(loss => {
      let tmpLeakageLoss = this.gasLeakageLossesService.initLossFromForm(loss.form);
      tmpLeakageLoss.heatLoss = loss.heatLoss;
      tmpLeakageLosses.push(tmpLeakageLoss);
    })
    this.losses.leakageLosses = tmpLeakageLosses;
    this.setCompareVals();
    this.savedLoss.emit(true);
  }
  changeField(str: string) {
    this.fieldChange.emit(str);
  }

  setCompareVals() {
    if (this.isBaseline) {
      this.gasLeakageCompareService.baselineLeakageLoss = this.losses.leakageLosses;
    } else {
      this.gasLeakageCompareService.modifiedLeakageLoss = this.losses.leakageLosses;
    }
    if (this.gasLeakageCompareService.differentArray && !this.isBaseline) {
      if (this.gasLeakageCompareService.differentArray.length != 0) {
        this.gasLeakageCompareService.checkLeakageLosses();
      }
    }
  }
}
