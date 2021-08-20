import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyReviewComponent } from './monthly-review.component';

describe('MonthlyReviewComponent', () => {
  let component: MonthlyReviewComponent;
  let fixture: ComponentFixture<MonthlyReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
