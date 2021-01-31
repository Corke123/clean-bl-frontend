import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  isLoading = false;
  error: string = null;
  registerSuccessMessage = null;

  loginInvalid = false;
  formSubmitAttempt: boolean;
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.snackBar.open('Signup Successful!', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.registerSuccessMessage =
          'Please check your inbox for activation email and activate your account before you Login!';
      }
    });
  }

  onSubmit(form: NgForm) {
    if (!form.value) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    this.isLoading = true;
    this.authService.login(username, password).subscribe(
      (resData) => {
        this.isLoading = false;
        this.router.navigate(['/reports']);
        this.snackBar.open('Login Successful!', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'top',
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
