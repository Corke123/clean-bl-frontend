import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { ReportService } from 'src/app/shared/services/reports.service';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  starCount = 5;
  @Input('reportId') reportId: number;
  @Input('rating') rating = 0;
  @Input('userRated') userRated = false;
  ratingArr = [];

  constructor(
    private reportService: ReportService,
    private commonService: CommonService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(rating: number) {
    this.rating = rating;
    this.userRated = true;
    this.reportService.rateReport(this.reportId, rating).subscribe(
      (averageGrade: number) => {
        this.commonService.showSnackBar(
          'Uspješno ste dali ocjenu ' + rating + '!'
        );
        this.rating = averageGrade;
      },
      () => {
        this.commonService.showSnackBar('Nije moguće ocjeniti prijavu!');
      }
    );
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  canRate(): boolean {
    return this.isAuthenticated && !this.userRated;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
