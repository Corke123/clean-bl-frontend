import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DepartmentOfficersComponent } from './modules/admin/department-officers/department-officers.component';
import { MessagesComponent } from './modules/admin/messages/messages.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { ManageReportsComponent } from './modules/department-officer/manage-reports/manage-reports.component';
import { ManagementComponent } from './modules/department-officer/management/management.component';
import { ProcessReportComponent } from './modules/department-officer/process-report/process-report.component';
import { ContactUsComponent } from './modules/user/contact-us/contact-us.component';
import { AddReportComponent } from './modules/user/reports/add-report/add-report.component';
import { ReportDetailComponent } from './modules/user/reports/report-detail/report-detail.component';
import { ReportListComponent } from './modules/user/reports/report-list/report-list.component';
import { ReportsComponent } from './modules/user/reports/reports.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { StatisticsComponent } from './shared/components/statistics/statistics.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '404',
        component: PageNotFoundComponent,
      },
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

      // department-officer routes
      {
        path: 'management',
        canActivate: [AuthGuard],
        data: {
          expectedRole: 'ROLE_DepartmentOfficer',
        },
        children: [
          {
            path: '',
            redirectTo: 'manage-reports',
            pathMatch: 'full',
          },
          {
            path: 'manage-reports',
            component: ManagementComponent,
            children: [
              {
                path: '',
                component: ManageReportsComponent,
              },
              {
                path: ':id',
                component: ProcessReportComponent,
              },
            ],
          },
        ],
      },

      // admin routes
      {
        path: 'admin',
        canActivate: [AuthGuard],
        data: {
          expectedRole: 'ROLE_Admin',
        },
        children: [
          {
            path: '',
            redirectTo: 'department-officers',
            pathMatch: 'full',
          },
          {
            path: 'department-officers',
            component: DepartmentOfficersComponent,
          },
          {
            path: 'messages',
            component: MessagesComponent,
          },
        ],
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
