import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { MonthlySalaryListRoutingModule } from './monthly-salary-list-routing.module';
import { MonthlySalaryListComponent } from './monthly-salary-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MonthlySalaryListComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule,
    MonthlySalaryListRoutingModule,
    HttpClientModule,
    SharedModule
  ]
})
export class MonthlySalaryListModule { }
