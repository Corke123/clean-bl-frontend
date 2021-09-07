import { TestBed } from '@angular/core/testing';

import { ReportLocationsService } from './report-locations.service';

describe('ReportLocationsService', () => {
  let service: ReportLocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportLocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
