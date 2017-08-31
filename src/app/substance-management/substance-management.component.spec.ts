import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstanceManagementComponent } from './substance-management.component';

describe('SubstanceManagementComponent', () => {
  let component: SubstanceManagementComponent;
  let fixture: ComponentFixture<SubstanceManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubstanceManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubstanceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
