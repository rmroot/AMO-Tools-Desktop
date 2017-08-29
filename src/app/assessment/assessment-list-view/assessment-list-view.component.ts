import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Directory } from '../../shared/models/directory';
import { Assessment } from '../../shared/models/assessment';
import { DragulaService } from 'ng2-dragula';
import { IndexedDbService } from '../../indexedDb/indexed-db.service';
import { AssessmentService } from '../assessment.service';
@Component({
  selector: 'app-assessment-list-view',
  templateUrl: './assessment-list-view.component.html',
  styleUrls: ['./assessment-list-view.component.css']
})
export class AssessmentListViewComponent implements OnInit {
  @Input()
  directory: Directory;
  @Output('directoryChange')
  directoryChange = new EventEmitter();
  @Input()
  isChecked: boolean;
  @Output('emitUpdateDirectory')
  emitUpdateDirectory = new EventEmitter<boolean>();
  
  folderOptions: any = {
    moves: () => { return false }
  };

  assessmentOptions: any = {
    accepts: () => { return false }
  }
  constructor(private dragulaService: DragulaService, private indexedDbService: IndexedDbService, private assessmentService: AssessmentService) {
    dragulaService.drag.subscribe((value) => {
      //  console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      //console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      // console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      //  console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
  changeDirectory($event) {
    this.directoryChange.emit($event);
  }

  onDrag(args) {
    let [e, el] = args;
  }

  onDrop(args) {
    let [item, target] = args;
    let itemTest = item.id.indexOf('assessment_');
    let targetTest = target.id.indexOf('directory_');
    if (itemTest !== -1 && targetTest !== -1) {
      let assId = item.id.replace('assessment_', '');
      let dirId = target.id.replace('directory_', '');
      this.updateAssessment(assId, dirId);
    }
    // else{
    //   itemTest = item.id.indexOf('directory_');
    //   if(itemTest !== -1 && targetTest !== -1){
    //     let itemDirId = item.id.replace('directory_', '');
    //     let perentDirId = target.id.replace('directory_', '');
    //     this.updateDirectory(perentDirId, itemDirId);
    //   }
    // }
  }

  onOver(args) {
    let [e, el, container] = args;
  }

  onOut(args) {
    let [e, el, container] = args;
  }


  updateDirectory(parentId: string, directoryId: string) {
    let pId: number = parseInt(parentId);
    let dId: number = parseInt(directoryId);
    this.indexedDbService.getDirectory(dId).then((resultDir: Directory) => {
      resultDir.parentDirectoryId = pId;
      this.indexedDbService.putDirectory(resultDir).then(results => {})
    })
  }

  updateAssessment(assessmentId: string, directoryId: string) {
    let assId: number = parseInt(assessmentId);
    let dirId: number = parseInt(directoryId);
    this.indexedDbService.getAssessment(assId).then((assessment: Assessment) => {
      if (assessment) {
        assessment.directoryId = dirId;
        this.indexedDbService.putAssessment(assessment).then(results => {
          this.emitUpdateDirectory.emit(true);
        });
      }
    })
  }


}
