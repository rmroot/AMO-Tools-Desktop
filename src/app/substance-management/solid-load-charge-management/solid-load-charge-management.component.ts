import { Component, OnInit, ViewChild } from '@angular/core';
import { SuiteDbService } from '../../suiteDb/suite-db.service';
import { SolidLoadChargeMaterial } from '../../shared/models/materials';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-solid-load-charge-management',
  templateUrl: './solid-load-charge-management.component.html',
  styleUrls: ['./solid-load-charge-management.component.css']
})
export class SolidLoadChargeManagementComponent implements OnInit {
  @ViewChild('materialModal') public materialModal: ModalDirective;



  showList: boolean = false;

  materials: Array<SolidLoadChargeMaterial>;

  selectedMaterial: SolidLoadChargeMaterial;

  constructor(private suiteDbService: SuiteDbService) { }

  ngOnInit() {
    this.getMaterials();
  }

  getMaterials() {
    this.materials = this.suiteDbService.selectSolidLoadChargeMaterials();
  }

  toggleOpen() {
    this.showList = !this.showList;
  }

  selectMaterial(material: SolidLoadChargeMaterial) {
    console.log(material);
    this.selectedMaterial = material;
  }

  showMaterialModal() {
    this.materialModal.show();
  }

  hideMaterialModal(event?: SolidLoadChargeMaterial) {
    if (event) {
      this.selectedMaterial = event;
    }
    this.getMaterials();
    this.materialModal.hide();
  }

}
