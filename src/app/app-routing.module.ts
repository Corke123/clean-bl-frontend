import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { PartsOfTheCityComponent } from './modules/admin/parts-of-the-city/parts-of-the-city.component';
import { StreetsComponent } from './modules/admin/streets/streets.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { ContactUsComponent } from './modules/user/contact-us/contact-us.component';
import { AddReportComponent } from './modules/user/reports/add-report/add-report.component';
import { ReportDetailComponent } from './modules/user/reports/report-detail/report-detail.component';
import { ReportListComponent } from './modules/user/reports/report-list/report-list.component';
import { ReportsComponent } from './modules/user/reports/reports.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      // reports routes
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
          },
        ],
      },
      {
        path: 'add-report',
        component: AddReportComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: 'ROLE_User',
        },
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
      },
      // auth routes
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },

      // admin routes
      {
        path: 'admin',
        redirectTo: '/admin/streets',
        pathMatch: 'full',
      },
      {
        path: 'admin/streets',
        component: StreetsComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: 'ROLE_Admin',
        },
      },
      {
        path: 'admin/parts-of-the-city',
        component: PartsOfTheCityComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: 'ROLE_Admin',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
