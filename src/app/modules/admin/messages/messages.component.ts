import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { ContactUsMessage } from 'src/app/shared/model/contact-us-message.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { ContactUsService } from 'src/app/shared/services/contact-us.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'email', 'content', 'createdAt'];
  dataSource: Observable<ContactUsMessage[]>;

  totalElements = 0;
  page: any;
  selectedMessage: ContactUsMessage;
  searchString = new BehaviorSubject<string>('');
  allMessages = new BehaviorSubject<boolean>(false);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private contactUsService: ContactUsService,
    private commonService: CommonService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.dataSource = merge(
      this.sort.sortChange,
      this.paginator.page,
      this.searchString,
      this.allMessages
    ).pipe(
      startWith({}),
      distinctUntilChanged(),
      debounceTime(300),
      switchMap(() => {
        return this.contactUsService.getCotactUsMessagesPageable(
          this.paginator.pageIndex,
          this.paginator.pageSize,
          this.sort.active,
          this.sort.direction,
          this.searchString.getValue(),
          this.allMessages.value
        );
      }),
      map((page) => {
        this.setPage(page);
        return page.content;
      }),
      catchError(() => {
        this.handleError();
        return of([]);
      })
    );
    this.changeDetection.detectChanges();
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }

  setPage(page: any): void {
    this.page = page;
    this.totalElements = page.totalElements;
  }

  displayMessage(message: ContactUsMessage): void {
    this.selectedMessage = message;
  }

  searchByTitle(searchString: string): void {
    this.resetPaging();
    this.searchString.next(searchString);
  }

  searchAll(all: boolean) {
    this.resetPaging();
    this.allMessages.next(all);
  }

  handleError(): void {
    this.commonService.showSnackBar('Greška, nije moguće dobiti poruke!');
  }

  onSubmit(form: NgForm): void {
    if (!form.value) {
      return;
    }

    const replyMessage = {
      replyMessage: form.value.reply,
    };

    this.contactUsService
      .sendReply(this.selectedMessage.id, replyMessage)
      .subscribe(
        (savedMessage) => {
          this.selectedMessage = savedMessage;
          this.commonService.showSnackBar('Uspješno ste poslali odgovor!');
        },
        (err) => {
          this.commonService.showSnackBar(
            'Došlo je do problema. Pukušajte ponovo.'
          );
        }
      );

    form.reset();
  }
}
