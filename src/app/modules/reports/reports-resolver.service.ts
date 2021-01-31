import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Report } from './report.model';

@Injectable({ providedIn: 'root' })
export class ReportResolverService implements Resolve<Report[]> {
  constructor(private dataStorageService: DataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.dataStorageService.getReports();
  }
}
