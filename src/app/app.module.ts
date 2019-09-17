import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavComponent } from './nav/nav.component';
import { StartupService } from './services/startup.service';
import { Routes, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./dashboard/dashboard.module').then(n => n.DashboardModule) },
  { path: 'employee/:empId/salarySlips',
   loadChildren: () => import('./monthly-salary-list/monthly-salary-list.module').then(n => n.MonthlySalaryListModule)},
  { path: 'employee/:empId/salarySlip/view',
   loadChildren: () => import('./salary-slip/salary-slip.module').then(n => n.SalarySlipModule)},
  { path: 'uploadSalarySlip', loadChildren: () => import('./file-upload/file-upload.module').then(n => n.FileUploadModule)},
  { path: '**', component: PageNotFoundComponent}
];

export function startupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PageNotFoundComponent,
    NavComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService],
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
