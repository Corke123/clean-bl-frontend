import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsMapComponent } from './reports-map.component';

describe('ReportsMapComponent', () => {
  let component: ReportsMapComponent;
  let fixture: ComponentFixture<ReportsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
