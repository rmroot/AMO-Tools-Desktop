import { Injectable } from '@angular/core';
import { IndexedDbService } from '../indexedDb/indexed-db.service';
import { MockDirectory } from '../shared/mocks/mock-directory';
import { ApplicationData } from '../shared/models/applicationData';

declare const packageJson;
@Injectable()
export class ExampleService {
  applicationData: ApplicationData;
  constructor(private indexedDbService: IndexedDbService) { }

  initApplicationData() {
    let tmpApplicationData: ApplicationData = {
      currentVersion: packageJson.version,
      createdDate: new Date(),
      modifiedDate: new Date()
    }
    this.indexedDbService.addApplicationData(tmpApplicationData).then(result => {
      console.log('init ' + result);
    })
  }

  checkNeedsUpdate(currentVersion: string) {
    if (packageJson.version != currentVersion) {
      return true;
    } else {
      return false;
    }
  }

  updateExamples() {
    this.indexedDbService.getAssessment(1).then(result => {
      console.log('1 ' + result);
      result.psat = MockDirectory.assessments[0].psat;
      this.indexedDbService.putAssessment(result).then(result => {
        console.log('PSAT EXAMPLE UPDATED');
      })
    })

    this.indexedDbService.getAssessment(2).then(result => {
      console.log('2 ' + result);
      result.phast = MockDirectory.assessments[1].phast;
      this.indexedDbService.putAssessment(result).then(result => {
        console.log('PHAST EXAMPLE UPDATED');
      })
    })
  }

}
