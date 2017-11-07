import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CashFlowForm, CashFlowResults } from './cash-flow';
@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent implements OnInit {
  @Input()
  currentField: string  = 'lifeYears';
  cashFlowForm: CashFlowForm;
  cashFlowResults: CashFlowResults = {
    benefits: 0,
    cost: 0,
    results: 0,
    payback: 0
  };

  toggleCalculate = false;

  tabSelect: string = 'results';
   constructor() { }

  ngOnInit() {
    this.cashFlowForm = {
      lifeYears: 10,
      energySavings: 1000,
      salvageInput: 3000,
      installationCost: 10000,
      operationCost: 500,
      fuelCost: 500,
      disposal: 500
    };
    this.calculate();
  }

  setTab(str: string) {
    this.tabSelect = str;
  }

  setField(str: string) {
    this.currentField = str;
  }

  calculate() {
    this.toggleCalculate = !this.toggleCalculate;

    // Benefits/Cost Ratio
    this.cashFlowResults.results = (this.cashFlowForm.energySavings * this.cashFlowForm.lifeYears + this.cashFlowForm.salvageInput) /
    ((this.cashFlowForm.installationCost + this.cashFlowForm.disposal + this.cashFlowForm.operationCost + this.cashFlowForm.fuelCost)
      * this.cashFlowForm.lifeYears);

    // Payback
    this.cashFlowResults.payback = (this.cashFlowForm.installationCost * 12) / this.cashFlowForm.energySavings;
  }


}
