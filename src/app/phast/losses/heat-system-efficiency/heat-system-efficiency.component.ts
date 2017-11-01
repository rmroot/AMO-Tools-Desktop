import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PhastService } from '../../phast.service';
import { Losses, PHAST } from '../../../shared/models/phast/phast';
import { Settings } from '../../../shared/models/settings';
import { HeatSystemEfficiencyCompareService } from './heat-system-efficiency-compare.service';
import { WindowRefService } from '../../../indexedDb/window-ref.service';
@Component({
  selector: 'app-heat-system-efficiency',
  templateUrl: './heat-system-efficiency.component.html',
  styleUrls: ['./heat-system-efficiency.component.css']
})
export class HeatSystemEfficiencyComponent implements OnInit {
  @Input()
  phast: PHAST;
  @Input()
  losses: Losses;
  @Input()
  saveClicked: boolean;
  @Input()
  isBaseline: boolean;
  @Output('fieldChange')
  fieldChange = new EventEmitter<string>();
  @Input()
  baselineSelected: boolean;
  @Input()
  settings: Settings;

  @Output('savedLoss')
  savedLoss = new EventEmitter<boolean>();
  @ViewChild('lossForm') lossForm: ElementRef;
  form: any;
  elements: any;


  firstChange: boolean = true;

  efficiencyForm: FormGroup;
  counter: any;

  systemLosses: number = 0;
  grossHeat: number = 0;
  constructor(private formBuilder: FormBuilder, private phastService: PhastService, private heatSystemEfficiencyCompareService: HeatSystemEfficiencyCompareService, private windowRefService: WindowRefService) { }

  ngOnInit() {
    this.initForm(this.phast.systemEfficiency);

    if (!this.baselineSelected) {
      this.disableForm();
    } else {
      this.enableForm();
    }
    this.calculate(true);
    this.setCompareVals();
    this.heatSystemEfficiencyCompareService.initCompareObjects();
    this.initDifferenceMonitor();
  }

  ngOnDestory(){
    if(this.isBaseline){
      this.heatSystemEfficiencyCompareService.baseline = null;
    }else{
      this.heatSystemEfficiencyCompareService.modification = null;
    }
  }

  initForm(val?: number) {
    if (val) {
      this.efficiencyForm = this.formBuilder.group({
        efficiency: [val, Validators.required]
      })
    } else {
      this.efficiencyForm = this.formBuilder.group({
        efficiency: [90, Validators.required]
      })
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    if (!this.firstChange) {
      if (changes.saveClicked) {
        this.saveLosses();
      }
      if (!this.baselineSelected) {
        this.disableForm();
      } else {
        this.enableForm();
      }
    }
    else {
      this.firstChange = false;
    }
  }

  disableForm() {
    this.elements = this.lossForm.nativeElement.elements;
    for (var i = 0, len = this.elements.length; i < len; ++i) {
      this.elements[i].disabled = true;
    }
  }

  enableForm() {
    this.elements = this.lossForm.nativeElement.elements;
    for (var i = 0, len = this.elements.length; i < len; ++i) {
      this.elements[i].disabled = false;
    }
  }

  saveLosses() {
    if (this.efficiencyForm.status == 'VALID') {
      this.phast.systemEfficiency = this.efficiencyForm.value.efficiency;
      this.savedLoss.emit(true);
      this.setCompareVals();
    }
  }

  focusField(str: string) {
    this.fieldChange.emit(str);
  }

  startSavePolling() {
    if (this.counter) {
      clearTimeout(this.counter);
    }
    this.counter = setTimeout(() => {
      this.saveLosses();
    }, 3000)
  }

  calculate(bool?: boolean) {
    if (!bool) {
      this.startSavePolling();
    }
    let additionalHeat = this.phastService.sumChargeMaterialExothermic(this.losses.chargeMaterials);
    this.grossHeat = (this.phastService.sumHeatInput(this.losses, this.settings) / this.efficiencyForm.value.efficiency) - additionalHeat;
    this.systemLosses = this.grossHeat * (1 - (this.efficiencyForm.value.efficiency / 100));
  }

  setCompareVals() {
    if (this.isBaseline) {
      this.heatSystemEfficiencyCompareService.baseline = this.phast;
    } else {
      this.heatSystemEfficiencyCompareService.modification = this.phast;
    }
    if (this.heatSystemEfficiencyCompareService.differentObject && !this.isBaseline) {
      this.heatSystemEfficiencyCompareService.checkDifferent();
    }
  }

  initDifferenceMonitor() {
    if (this.heatSystemEfficiencyCompareService.baseline && this.heatSystemEfficiencyCompareService.modification) {
      if (this.heatSystemEfficiencyCompareService.differentObject) {
        let doc = this.windowRefService.getDoc();
        this.heatSystemEfficiencyCompareService.differentObject.efficiency.subscribe(val => {
          let efficiencyElements = doc.getElementsByName('efficiency');
          efficiencyElements.forEach(element => {
            element.classList.toggle('indicate-different', val);
          });
        })
      }
    }
  }

}
