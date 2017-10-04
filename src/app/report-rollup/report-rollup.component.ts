import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild, TemplateRef } from '@angular/core';
import { Assessment } from '../shared/models/assessment';
import { ReportRollupService } from './report-rollup.service';
import { WindowRefService } from '../indexedDb/window-ref.service';
@Component({
  selector: 'app-report-rollup',
  templateUrl: './report-rollup.component.html',
  styleUrls: ['./report-rollup.component.css']
})
export class ReportRollupComponent implements OnInit {

  @Output('emitCloseReport')
  emitCloseReport = new EventEmitter<boolean>();

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    // this.checkVisibleSummary();
    this.checkActiveAssessment();
  }
  @ViewChild('reportTemplate') reportTemplate: TemplateRef<any>;

  _reportAssessments: Array<Assessment>;
  focusedAssessment: Assessment;

  assessmentsGathered: boolean = false;
  isSummaryVisible: boolean = true;
  constructor(private reportRollupService: ReportRollupService,
    private windowRefService: WindowRefService) { }

  ngOnInit() {
    this.reportRollupService.reportAssessments.subscribe(assesments => {
      this._reportAssessments = assesments;
      console.log(this._reportAssessments);
      this.focusedAssessment = this._reportAssessments[0];
    })
    setTimeout(() => {
      this.assessmentsGathered = true;
    }, 2000)
  }

  exportToCsv() {
    // let tmpDataArr = new Array();
    // this.exportReports.forEach(report => {
    //   let tmpData = this.jsonToCsvService.getPsatCsvData(report.assessment, report.settings, report.assessment.psat);
    //   tmpDataArr.push(tmpData);
    //   if (report.assessment.psat.modifications) {
    //     report.assessment.psat.modifications.forEach(mod => {
    //       tmpData = this.jsonToCsvService.getPsatCsvData(report.assessment, report.settings, mod.psat);
    //       tmpDataArr.push(tmpData);
    //     })
    //   }
    // })
    // this.jsonToCsvService.downloadData(tmpDataArr, 'psatRollup');
  }

  print() {
    let win = this.windowRefService.nativeWindow;
    let doc = this.windowRefService.getDoc();
    win.print();
  }

  closeReport() {
    this.emitCloseReport.emit(true);
  }

  checkActiveAssessment() {
    let doc = this.windowRefService.getDoc();
    let window = this.windowRefService.nativeWindow;
    let container = doc.getElementById('reportHeader');
    let scrollAmount = (window.pageYOffset !== undefined) ? window.pageYOffset : (doc.documentElement || doc.body.parentNode || doc.body).scrollTop;
    this._reportAssessments.forEach(assessment => {
      let element = doc.getElementById('assessment_' + assessment.id);
      let diff = Math.abs(Math.abs(container.clientHeight - element.offsetTop) - scrollAmount);
      if (diff > 0 && diff < 50) {
        this.focusedAssessment = assessment;
      }
    })
  }

  selectAssessment(assessment: Assessment) {
    let doc = this.windowRefService.getDoc();
    let element = doc.getElementById('assessment_' + assessment.id);
    let container = doc.getElementById('reportHeader');
    this.focusedAssessment = assessment;
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
