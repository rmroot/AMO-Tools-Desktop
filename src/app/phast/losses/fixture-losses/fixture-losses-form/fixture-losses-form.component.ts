import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fixture-losses-form',
  templateUrl: './fixture-losses-form.component.html',
  styleUrls: ['./fixture-losses-form.component.css']
})
export class FixtureLossesFormComponent implements OnInit {
  @Input()
  lossesForm: any;
  @Output('calculate')
  calculate = new EventEmitter<boolean>();
  @Input()
  lossState: any;
  constructor() { }

  ngOnInit() {
  }

  checkForm() {
    this.lossState.saved = false;
    if (this.lossesForm.status == 'VALID') {
      this.calculate.emit(true);
    }
  }
}
