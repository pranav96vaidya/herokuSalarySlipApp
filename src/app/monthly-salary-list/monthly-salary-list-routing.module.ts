import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthlySalaryListComponent } from './monthly-salary-list.component';
import { AuthenticationGuardService } from '../services/authentication-guard.service';

const routes: Routes = [
  {path: '', component: MonthlySalaryListComponent, canActivate: [AuthenticationGuardService], data: {roles: ['admin', 'employee']}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthlySalaryListRoutingModule { }
