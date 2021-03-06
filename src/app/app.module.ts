import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './modules/auth/auth-interceptor.service';
import { ReportService } from './shared/services/reports.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSerbianPaginatorIntl } from './shared/pagination/serbian-paginator-intl';

import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.API_KEY,
    }),
    DefaultModule,
    FormsModule,
  ],
  providers: [
    ReportService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    { provide: MatPaginatorIntl, useValue: getSerbianPaginatorIntl() },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
