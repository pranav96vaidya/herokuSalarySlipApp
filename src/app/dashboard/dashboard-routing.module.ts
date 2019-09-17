import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthenticationGuardService } from '../services/authentication-guard.service';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthenticationGuardService], data: {roles: ['admin']}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
