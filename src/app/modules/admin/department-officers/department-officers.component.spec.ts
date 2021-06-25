import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentOfficersComponent } from './department-officers.component';

describe('DepartmentOfficersComponent', () => {
  let component: DepartmentOfficersComponent;
  let fixture: ComponentFixture<DepartmentOfficersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentOfficersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
