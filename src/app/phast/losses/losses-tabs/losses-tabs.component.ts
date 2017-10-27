import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Losses } from '../../../shared/models/phast/phast';
import { Settings } from '../../../shared/models/settings';
import { PhastService } from '../../phast.service';
import { LossesService } from '../losses.service';
@Component({
  selector: 'app-losses-tabs',
  templateUrl: './losses-tabs.component.html',
  styleUrls: ['./losses-tabs.component.css']
})
export class LossesTabsComponent implements OnInit {
  lossesTab: string;
  // @Input()
  // losses: Losses;
  @Input()
  settings: Settings;

  showSlag: boolean = false;
  showAuxPower: boolean = false;
  showSystemEff: boolean = false;
  showFlueGas: boolean = false;
  showEnInput1: boolean = false;
  showEnInput2: boolean = false;
  showExGas: boolean = false;
  constructor(private lossesService: LossesService ) { }

  ngOnInit() {
    this.lossesService.lossesTab.subscribe(val => {
      this.lossesTab = val;
    })

    this.setTabs()

    this.lossesService.baseline.subscribe(val => {
      console.log('change')
      console.log(val);
    })
  }

  tabChange(str: string) {
    this.lossesService.lossesTab.next(str);
  }

  setTabs() {
    if (this.settings.energySourceType == 'Electricity') {
      if (this.settings.furnaceType == 'Electric Arc Furnace (EAF)') {
        this.showSlag = true;
        this.showExGas = true;
        this.showEnInput1 = true;
      } else if (this.settings.furnaceType != 'Custom Electrotechnology') {
        this.showAuxPower = true;
        this.showEnInput2 = true;
      } else if (this.settings.furnaceType == 'Custom Electrotechnology') {
        this.showSystemEff = true;
      }
    } else if (this.settings.energySourceType == 'Steam') {
      this.showSystemEff = true;
    } else if (this.settings.energySourceType == 'Fuel') {
      this.showFlueGas = true;
    }
  }
}
