import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap';

import { AssessmentDashboardComponent } from './assessment-dashboard/assessment-dashboard.component';
import { AssessmentBannerComponent } from './assessment-banner/assessment-banner.component';
import { AssessmentMenuComponent } from './assessment-menu/assessment-menu.component';
import { AssessmentGridViewComponent } from './assessment-grid-view/assessment-grid-view.component';
import { AssessmentListViewComponent } from './assessment-list-view/assessment-list-view.component';
import { AssessmentCardComponent } from './assessment-grid-view/assessment-card/assessment-card.component';
import { DirectoryCardComponent } from './assessment-grid-view/directory-card/directory-card.component';
import { DirectoryListItemComponent } from './assessment-list-view/directory-list-item/directory-list-item.component';
import { AssessmentListItemComponent } from './assessment-list-view/assessment-list-item/assessment-list-item.component';
import { CreateFolderComponent } from './assessment-menu/create-folder/create-folder.component';
import { AssessmentCreateComponent } from './assessment-create/assessment-create.component';
import { AssessmentSettingsComponent } from './assessment-settings/assessment-settings.component';
import { IndexedDbModule } from '../indexedDb/indexedDb.module';
import { SettingsModule } from '../settings/settings.module';
import { ToastyModule } from 'ng2-toasty';

import { ImportExportModule } from '../shared/import-export/import-export.module';
import { DragulaModule } from 'ng2-dragula';
@NgModule({
  declarations: [
    AssessmentDashboardComponent,
    AssessmentBannerComponent,
    AssessmentMenuComponent,
    AssessmentGridViewComponent,
    AssessmentListViewComponent,
    AssessmentCardComponent,
    DirectoryCardComponent,
    DirectoryListItemComponent,
    AssessmentListItemComponent,
    CreateFolderComponent,
    AssessmentCreateComponent,
    AssessmentSettingsComponent
  ],
  exports: [
    AssessmentDashboardComponent,
    AssessmentCreateComponent,
    AssessmentSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    IndexedDbModule,
    SettingsModule,
    ToastyModule,
    ImportExportModule,
    DragulaModule
  ],
  providers: []
})

export class AssessmentModule { }
