import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DepartmentServiceModel } from 'src/app/shared/model/department-service.model';
import { Department } from 'src/app/shared/model/department.model';
import { Report } from 'src/app/shared/model/report.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { DepartmentServiceService } from 'src/app/shared/services/department-service.service';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { ReportService } from 'src/app/shared/services/reports.service';

@Component({
  selector: 'app-process-report',
  templateUrl: './process-report.component.html',
  styleUrls: ['./process-report.component.css'],
})
export class ProcessReportComponent implements OnInit {
  report: Report;
  departments: Department[];
  departmentServices: DepartmentServiceModel[];
  step1: boolean;
  step2: boolean;
  step3: boolean;
  modify: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private commonService: CommonService,
    private reportService: ReportService,
    private departmentService: DepartmentService,
    private departmentServiceService: DepartmentServiceService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => this.reportService.getReportById(params['id']))
      )
      .subscribe(
        (report) => {
          this.report = report;
          this.step1 = this.isNew();
          this.step2 = this.isInProcess();
          this.step3 = this.isCompleted();
          this.modify = false;
        },
        () => {
          this.commonService.showSnackBar('Nije moguće pronaći prijavu!');
          this.router.navigate(['/404'], {
            relativeTo: this.route.parent,
          });
        }
      );
  }

  transform() {
    if (this.report) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        'data:image/png;base64, ' + this.report.base64Image
      );
    }
  }

  isNew(): boolean {
    return this.report?.status === 'poslan';
  }

  isInProcess(): boolean {
    return this.report?.status === 'u procesu';
  }

  isCompleted(): boolean {
    return this.report?.status === 'završen';
  }

  setModify(): void {
    this.modify = true;
    this.getDepartments();
  }

  unsetModify(): void {
    this.modify = false;
  }

  getDepartments(): void {
    this.departmentService
      .getDepartments()
      .subscribe(
        (departments: Department[]) => (this.departments = departments)
      );
  }

  onModifySubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    this.reportService
      .modifyDepartmentForReport(this.report.id, form.value)
      .subscribe(
        (report) => {
          this.router.navigate(['/management/manage-reports']);
          this.commonService.showSnackBar(
            'Uspješno izmijenili nadležno odjeljenje!'
          );
        },
        (err) => {
          this.commonService.showSnackBar(
            'Došlo je do greške! Nije moguće izmijeniti nadležno odjeljenje!'
          );
        }
      );

    form.reset();
  }

  setStep2(): void {
    this.step1 = false;
    this.step2 = true;
    this.departmentServiceService
      .getDepartmentServices()
      .subscribe(
        (departmentServices: DepartmentServiceModel[]) =>
          (this.departmentServices = departmentServices)
      );
  }

  onSetDepartmentService(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    this.reportService
      .addDepartmentServiceToReport(this.report.id, form.value)
      .subscribe(
        (report) => {
          this.router.navigate(['/management/manage-reports']);
          this.commonService.showSnackBar(
            'Uspješno dodijelili prijavu službi ' +
              form.value.departmentService +
              '!'
          );
        },
        (err) => {
          this.commonService.showSnackBar(
            'Došlo je do greške! Nije moguće dodijeliti prijavu službi ' +
              form.value.departmentService
          );
        }
      );

    form.reset();
  }

  approveReport(): void {
    this.reportService.approveReport(this.report.id).subscribe(
      (report) => {
        this.router.navigate(['/management/manage-reports']);
        this.commonService.showSnackBar('Prijava je završena!');
      },
      (err) => {
        this.commonService.showSnackBar(
          'Došlo je do greške! Nije moguće označiti prijavu kao završenu!'
        );
      }
    );
  }

  rejectReport(): void {
    this.reportService.rejectReport(this.report.id).subscribe(
      (report) => {
        this.router.navigate(['/management/manage-reports']);
        this.commonService.showSnackBar('Prijava je odbijena!');
      },
      (err) => {
        this.commonService.showSnackBar(
          'Došlo je do greške! Nije moguće odbiti prijavu!'
        );
      }
    );
  }
}
