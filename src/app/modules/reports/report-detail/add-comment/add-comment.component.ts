import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.service';
import { ReportService } from 'src/app/shared/services/reports.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
})
export class AddCommentComponent implements OnInit {
  showButtons = false;
  @Output() addedComment = new EventEmitter();
  @Input('selectedReport') selectedReportId: number;

  constructor(
    private reportService: ReportService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const comment = form.value.comment;
    form.resetForm();
    this.reportService
      .storeComment(this.selectedReportId, comment)
      .subscribe((response) => {
        this.commonService.showSnackBar('Uspješno ste dodali komentar!');
        this.addedComment.emit(response);
      });
  }

  onCancel(form: NgForm) {
    form.resetForm();
    this.showButtons = false;
  }

  touch(evt: any) {
    this.showButtons = true;
  }
}
