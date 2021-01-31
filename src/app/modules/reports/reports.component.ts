import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ReportService } from './report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.dataStorageService.getReports().subscribe();
  }

}
