import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { Department } from 'src/app/shared/model/department.model';
import { PartOfTheCity } from 'src/app/shared/model/part-of-the-city.model';
import { ReportPayload } from 'src/app/shared/model/report-payload.model';
import { ReportService } from 'src/app/shared/services/reports.service';
import { Router } from '@angular/router';
import { PartOfTheCityService } from 'src/app/shared/services/part-of-the-city.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css'],
})
export class AddReportComponent implements OnInit {
  departments: Department[];

  locations: PartOfTheCity[];

  imageUrl: any;
  imagePath: string;
  wrongFormat: string;
  base64Image: string;
  isLoading = false;

  constructor(
    private partOfTheCityService: PartOfTheCityService,
    private departmentService: DepartmentService,
    private reportService: ReportService,
    private router: Router
  ) {}

  ngOnInit() {
    this.partOfTheCityService
      .getPartsOfTheCity()
      .subscribe((loc: PartOfTheCity[]) => {
        this.locations = loc;
      });
    this.departmentService
      .getDepartments()
      .subscribe((departments: Department[]) => {
        this.departments = departments;
      });
  }

  onFileSelected(files) {
    this.wrongFormat = null;

    if (files.length === 0) {
      this.wrongFormat = 'Only images are supported!';
      return;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.wrongFormat = 'Only images are supported!';
      this.imageUrl = '';
      return;
    }

    if (typeof FileReader !== 'undefined') {
      this.imagePath = files[0].name;
      const reader = new FileReader();

      reader.readAsDataURL(files[0]);

      reader.onload = (e: any) => {
        this.imageUrl = reader.result;
        this.base64Image = this.imageUrl.substring(23);
      };
    }
  }

  onSubmit(reportForm: NgForm) {
    if (!reportForm.valid) {
      return;
    }

    const departmentName = reportForm.value.category;
    const description = reportForm.value.description;
    const street = reportForm.value.location.split('#')[1];
    const partOfTheCity = reportForm.value.location.split('#')[0];

    this.isLoading = true;

    const reportPayload: ReportPayload = {
      departmentName: departmentName,
      description: description,
      street: street,
      partOfTheCity: partOfTheCity,
      base64Image: this.base64Image,
    };

    this.reportService.storeReport(reportPayload).subscribe(() => {
      this.router.navigateByUrl('/reports');
    });
  }
}
