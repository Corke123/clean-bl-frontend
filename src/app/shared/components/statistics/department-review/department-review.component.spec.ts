import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentReviewComponent } from './department-review.component';

describe('DepartmentReviewComponent', () => {
  let component: DepartmentReviewComponent;
  let fixture: ComponentFixture<DepartmentReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
