import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  isEndUser = false;
  isDepartmentOfficer = false;
  isAdmin = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.isEndUser = user.isEndUser();
        this.isDepartmentOfficer = user.isDepartmentOfficer();
        this.isAdmin = user.isAdmin();
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
