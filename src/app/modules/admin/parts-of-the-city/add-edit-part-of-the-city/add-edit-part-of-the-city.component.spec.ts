import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPartOfTheCityComponent } from './add-edit-part-of-the-city.component';

describe('AddEditPartOfTheCityComponent', () => {
  let component: AddEditPartOfTheCityComponent;
  let fixture: ComponentFixture<AddEditPartOfTheCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPartOfTheCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPartOfTheCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
