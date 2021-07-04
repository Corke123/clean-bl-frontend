import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
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
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.commonService.showSnackBar('Uspješno ste registrovani!');
        this.registerSuccessMessage =
          'Provjerite Vaše poštansko sanduče kako bi ste aktivirali Vaš nalog!';
      }
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    this.isLoading = true;
    this.authService.login(username, password).subscribe(
      (resData) => {
        this.isLoading = false;
        this.router.navigate([this.findRedirectURL([...resData.roles])]);
        this.commonService.showSnackBar('Uspješno ste prijavljeni!');
      },
      (errorMessage) => {
        this.loginInvalid = true;
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

  findRedirectURL(roles: string[]): string {
    if (roles.some((r) => r === 'ROLE_User')) {
      return 'reports';
    } else if (roles.some((r) => r === 'ROLE_Admin')) {
      return 'admin';
    } else {
      return 'management';
    }
  }
}
