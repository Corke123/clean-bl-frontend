import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSideBar = new EventEmitter<void>();
  private userSub: Subscription;
  isAuthenticated = false;
  username: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (!!user) {
        this.username = user.username;
      }
    });
  }

  onToggleSideBar() {
    this.toggleSideBar.emit();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
