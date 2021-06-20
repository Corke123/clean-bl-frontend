import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactUsMessage } from 'src/app/shared/model/contact-us-message.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { ContactUsService } from 'src/app/shared/services/contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  isLoading = false;

  constructor(
    private contactUsService: ContactUsService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (!form.value) {
      return;
    }

    const contactUsMessgae: ContactUsMessage = {
      title: form.value.title,
      email: form.value.email,
      content: form.value.content,
    };

    this.isLoading = true;

    this.contactUsService.addMessage(contactUsMessgae).subscribe(
      (result) => {
        this.isLoading = false;
        this.commonService.showSnackBar('Uspješno ste poslali poruku!');
      },
      (err) => {
        this.isLoading = false;
        this.commonService.showSnackBar(
          'Došlo je do problema. Pukušajte ponovo.'
        );
      }
    );

    form.reset();
  }
}
