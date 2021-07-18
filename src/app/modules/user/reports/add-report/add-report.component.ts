import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { Department } from 'src/app/shared/model/department.model';
import { ReportPayload } from 'src/app/shared/model/report-payload.model';
import { ReportService } from 'src/app/shared/services/reports.service';
import { Router } from '@angular/router';
import { MouseEvent } from '@agm/core';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css'],
})
export class AddReportComponent implements OnInit {
  departments: Department[];

  imageUrl: any;
  imagePath: string;
  wrongFormat: string;
  base64Image: string;
  isLoading = false;
  longitude = 17.189477703187666;
  latitude = 44.77066191443469;
  selectedLongitude: number;
  selectedLatitude: number;

  constructor(
    private departmentService: DepartmentService,
    private reportService: ReportService,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.departmentService
      .getDepartments()
      .subscribe((departments: Department[]) => {
        this.departments = departments;
      });
    navigator.geolocation.getCurrentPosition(
      (resp) => {
        this.longitude = resp.coords.longitude;
        this.latitude = resp.coords.latitude;
        this.selectedLongitude = this.longitude;
        this.selectedLatitude = this.latitude;
      },
      () => {
        alert(
          'Lokacija nije podržana. Lokaciju morate odabrati ručno klikom na mapu!'
        );
      },
      { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
    );
  }

  onFileSelected(files) {
    this.wrongFormat = null;

    if (files.length === 0) {
      this.wrongFormat = 'Samo slike su podržane!';
      return;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.wrongFormat = 'Samo slike su podržane!';
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

  onChooseLocation(event): void {
    this.selectedLongitude = event.coords.lng;
    this.selectedLatitude = event.coords.lat;
  }

  onMarkerDragEnd(event: MouseEvent): void {
    this.selectedLongitude = event.coords.lng;
    this.selectedLatitude = event.coords.lat;
  }

  isLocationSelected(): boolean {
    return !this.selectedLatitude || !this.selectedLongitude;
  }

  onSubmit(reportForm: NgForm) {
    if (!reportForm.valid) {
      return;
    }

    const title = reportForm.value.title;
    const description = reportForm.value.description;
    const departmentName = reportForm.value.category;

    this.isLoading = true;

    const reportPayload: ReportPayload = {
      title: title,
      departmentName: departmentName,
      description: description,
      base64Image: this.base64Image,
      longitude: +this.selectedLongitude.toFixed(6),
      latitude: +this.selectedLatitude.toFixed(6),
    };

    this.reportService.storeReport(reportPayload).subscribe(() => {
      this.commonService.showSnackBar('Uspješno ste dodali prijavu');
      this.router.navigateByUrl('/reports');
    });
  }
}
