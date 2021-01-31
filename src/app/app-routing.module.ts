import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { AddReportComponent } from './modules/reports/add-report/add-report.component';
import { ReportDetailComponent } from './modules/reports/report-detail/report-detail.component';
import { ReportListComponent } from './modules/reports/report-list/report-list.component';
import { ReportsResolverService } from './modules/reports/report-resolver.service';
import { ReportsComponent } from './modules/reports/reports.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        redirectTo: '/reports',
        pathMatch: 'full',
      },
      {
        path: 'reports',
        component: ReportsComponent,
        children: [
          {
            path: '',
            component: ReportListComponent,
          },
          {
            path: ':id',
            component: ReportDetailComponent,
            resolve: [ReportsResolverService],
          },
        ],
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'add-report',
        component: AddReportComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
