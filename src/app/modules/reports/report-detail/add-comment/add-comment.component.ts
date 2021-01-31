import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Report } from '../../report.model';
import { ReportService } from '../../report.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
})
export class AddCommentComponent implements OnInit, OnDestroy {
  showButtons = false;
  selectedReport: Report;
  reportSubscription = new Subscription();

  constructor(
    private dataStorageService: DataStorageService,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const comment = form.value.comment;
    form.resetForm();
    this.dataStorageService.storeComment(comment).subscribe();
  }

  onCancel(form: NgForm) {
    form.resetForm();
    this.showButtons = false;
  }

  touch(evt: any) {
    this.showButtons = true;
  }

  ngOnDestroy() {
    this.reportSubscription.unsubscribe();
  }
}
