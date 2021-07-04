import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  isEndUser = false;
  isDepartmentOfficer = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.isEndUser = user.isEndUser();
        this.isDepartmentOfficer = user.isDepartmentOfficer();
      }
    });
  }

  backToReports(): void {
    if (!this.isAuthenticated || this.isEndUser) {
      this.router.navigateByUrl('/reports');
    } else {
      this.router.navigateByUrl('/management');
    }
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
