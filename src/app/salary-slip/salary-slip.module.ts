import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { SalarySlipRoutingModule } from './salary-slip-routing.module';
import { SalarySlipComponent } from './salary-slip.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    SalarySlipComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    SalarySlipRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class SalarySlipModule { }
