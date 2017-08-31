import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolidLoadChargeManagementComponent } from './solid-load-charge-management.component';

describe('SolidLoadChargeManagementComponent', () => {
  let component: SolidLoadChargeManagementComponent;
  let fixture: ComponentFixture<SolidLoadChargeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolidLoadChargeManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolidLoadChargeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
