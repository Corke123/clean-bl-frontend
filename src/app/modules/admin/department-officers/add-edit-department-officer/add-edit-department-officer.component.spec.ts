import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDepartmentOfficerComponent } from './add-edit-department-officer.component';

describe('AddEditDepartmentOfficerComponent', () => {
  let component: AddEditDepartmentOfficerComponent;
  let fixture: ComponentFixture<AddEditDepartmentOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDepartmentOfficerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDepartmentOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
