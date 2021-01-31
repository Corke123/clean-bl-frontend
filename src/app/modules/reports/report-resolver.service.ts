import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { Report } from "./report.model";
import { ReportService } from "./report.service";

@Injectable({ providedIn: 'root' })
export class ReportsResolverService implements Resolve<Report[]> {

    constructor(private dataStorageService: DataStorageService, private reportService: ReportService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const reports = this.reportService.getReports();
        if (reports.length === 0) {
            return this.dataStorageService.getReports();
        } else {
            return reports;
        }
    }
}