import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApplicationSettingsComponent } from './application-settings/application-settings.component';
import { PsatSettingsComponent } from './psat-settings/psat-settings.component';
import { PhastSettingsComponent } from './phast-settings/phast-settings.component';
import { SettingsService } from './settings.service';

@NgModule({
    declarations: [
        ApplicationSettingsComponent,
        PsatSettingsComponent,
        PhastSettingsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        SettingsService
    ],
    exports: [
        PsatSettingsComponent,
        ApplicationSettingsComponent,
        PhastSettingsComponent
    ]
})

export class SettingsModule { };