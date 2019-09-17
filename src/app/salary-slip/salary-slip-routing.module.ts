import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalarySlipComponent } from './salary-slip.component';
import { AuthenticationGuardService } from '../services/authentication-guard.service';

const routes: Routes = [
  {path: '', component: SalarySlipComponent, canActivate: [AuthenticationGuardService], data: {roles: ['admin', 'employee']}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalarySlipRoutingModule { }
