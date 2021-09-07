import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-department-review',
  templateUrl: './department-review.component.html',
  styleUrls: ['./department-review.component.css'],
})
export class DepartmentReviewComponent implements OnInit {
  @Input() year: number;

  constructor() {}

  ngOnInit(): void {}
}
