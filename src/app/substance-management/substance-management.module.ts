import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubstanceManagementComponent } from './substance-management.component';
import { SuiteDbModule } from '../suiteDb/suiteDb.module';
import { SolidLoadChargeManagementComponent } from './solid-load-charge-management/solid-load-charge-management.component';
import { ModalModule } from 'ngx-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    SuiteDbModule,
    ModalModule
  ],
  declarations: [SubstanceManagementComponent, SolidLoadChargeManagementComponent],
  exports: [SubstanceManagementComponent]

})
export class SubstanceManagementModule { }
