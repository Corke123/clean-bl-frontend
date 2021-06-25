import { TestBed } from '@angular/core/testing';

import { DepartmentOfficerService } from './department-officer.service';

describe('DepartmentOfficerService', () => {
  let service: DepartmentOfficerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentOfficerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
