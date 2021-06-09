import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStreetDialogComponent } from './add-edit-street-dialog.component';

describe('AddEditStreetDialogComponent', () => {
  let component: AddEditStreetDialogComponent;
  let fixture: ComponentFixture<AddEditStreetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditStreetDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditStreetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
