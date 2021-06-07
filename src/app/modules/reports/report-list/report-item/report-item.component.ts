import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Report } from '../../../../shared/model/report.model';

@Component({
  selector: 'app-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.css'],
})
export class ReportItemComponent implements OnInit {
  @Input('report') report: Report;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/png;base64, ' + this.report.base64Image
    );
  }
}
