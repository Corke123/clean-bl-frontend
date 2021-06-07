import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SignupRequestPayload } from '../../../shared/model/signup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  hide = true;
  isLoading = false;
  error: string = null;

  loginInvalid = false;
  formSubmitAttempt: boolean;
  returnUrl: string;

  signupRequestPayload: SignupRequestPayload;

  constructor(private authService: AuthService, private router: Router) {
    this.signupRequestPayload = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    }
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.value) {
      return;
    }

    this.signupRequestPayload.firstName = form.value.firstname;
    this.signupRequestPayload.lastName = form.value.lastname;
    this.signupRequestPayload.username = form.value.username;
    this.signupRequestPayload.email = form.value.email;
    this.signupRequestPayload.password = form.value.password;

    this.isLoading = true;
    this.authService.signup(this.signupRequestPayload).subscribe(
      (resData) => {
        this.isLoading = false;
        this.router.navigate(['/login'], {
          queryParams: { registered: 'true' },
        });
      },
      (errorMessage) => {
        this.loginInvalid = true;
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
