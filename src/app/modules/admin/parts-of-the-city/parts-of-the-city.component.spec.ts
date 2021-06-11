import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsOfTheCityComponent } from './parts-of-the-city.component';

describe('PartsOfTheCityComponent', () => {
  let component: PartsOfTheCityComponent;
  let fixture: ComponentFixture<PartsOfTheCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartsOfTheCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsOfTheCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
