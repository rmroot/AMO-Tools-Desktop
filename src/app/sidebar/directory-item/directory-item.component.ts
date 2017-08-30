import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Directory, DirectoryDbRef } from '../../shared/models/directory';
import { IndexedDbService } from '../../indexedDb/indexed-db.service';
import { DragulaService } from 'ng2-dragula';
import { Assessment } from '../../shared/models/assessment';
@Component({
  selector: 'app-directory-item',
  templateUrl: './directory-item.component.html',
  styleUrls: ['./directory-item.component.css']
})
export class DirectoryItemComponent implements OnInit {
  @Input()
  directory: Directory;
  @Input()
  selectedDirectoryId: number;
  @Output('selectSignal')
  selectSignal = new EventEmitter<Directory>();
  @Output('collapseSignal')
  collapseSignal = new EventEmitter<Directory>();
  @Input()
  newDirEventToggle: boolean;
  @Input()
  dashboardView: string;

  isFirstChange: boolean = true;
  childDirectories: Directory;
  validDirectory: boolean = false;

  folderOptions: any = {
    moves: () => { return false },
    accepts: () => { return true },
    isContainer: () => { return true }
  };

  assessmentOptions: any = {
    accepts: () => { return false },
    moves: () => { return true }
  }


  constructor(private indexedDbService: IndexedDbService, private dragulaService: DragulaService) {
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.directory && !this.isFirstChange) {
      this.populateDirectories(this.directory, false);
    } else if (changes.newDirEventToggle && !this.isFirstChange) {
      this.populateDirectories(this.directory, false);
    }
    else {
      this.isFirstChange = false;
    }
  }

  ngOnInit() {
    if (this.directory.id != undefined) {
      this.validDirectory = true;
      if (this.directory.id == 1) {
        this.populateDirectories(this.directory, false);
      } else if (this.directory.id == this.selectedDirectoryId) {
        this.populateDirectories(this.directory, false);
      }
      else {
        this.populateDirectories(this.directory, true);
      }
    }
  }

  toggleSelected(directory: Directory) {
    this.selectSignal.emit(directory);
  }

  toggleDirectoryCollapse(directory: Directory) {
    this.collapseSignal.emit(directory);
  }

  populateDirectories(directoryRef: DirectoryDbRef, collapse?: boolean) {
    this.indexedDbService.getDirectoryAssessments(directoryRef.id).then(
      results => {
        this.directory.assessments = results;
      }
    );

    this.indexedDbService.getChildrenDirectories(directoryRef.id).then(
      results => {
        this.directory.subDirectory = results;
        this.directory.collapsed = collapse;
      }
    )
  }

  onDrag(args) {
    let [e, el] = args;
  }

  onDrop(args) {
    let [item, target] = args;
    let itemTest = item.id.indexOf('assessment_');
    let targetTest = target.id.indexOf('directory_');
    debugger
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
      this.indexedDbService.putDirectory(resultDir).then(results => { })
    })
  }

  updateAssessment(assessmentId: string, directoryId: string) {
    let assId: number = parseInt(assessmentId);
    let dirId: number = parseInt(directoryId);
    this.indexedDbService.getAssessment(assId).then((assessment: Assessment) => {
      if (assessment) {
        assessment.directoryId = dirId;
        this.indexedDbService.putAssessment(assessment).then(results => {
          //this.emitUpdateDirectory.emit(true);
          this.populateDirectories(this.directory);
        });
      }
    })
  }
}
