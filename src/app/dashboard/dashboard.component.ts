import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  empName: string;
  getState: Observable<any>;
  fetchDone = false;
  users: {};
  month = new Date().getMonth();
  months = environment.MONTHS;
  currentMonth = this.months[this.month];
  currentYear = new Date().getFullYear();
  years: number[] = [];
  employeeForm: FormGroup;
  errorMsg: string;
  pageHeading = 'Dashboard';

  constructor(private readonly apiService: ApiService, private readonly router: Router, private readonly title: Title) {
    // this.getState = this.store.select(selectAuthenticationState);
  }

  ngOnInit(): void {
    this.title.setTitle('Home Page');
    for (let i = 2017; i <= this.currentYear; i++) {
      this.years.push(i);
    }
    this.apiService.getEmployeeList().subscribe(responseList => {
      this.users = responseList['data'];
      this.fetchDone = true;
    }, err =>  {
      if (err.error) {
        this.errorMsg = err.error.customMsg;
        this.fetchDone = true;
      } else {
        this.errorMsg = 'Something went wrong!';
        this.fetchDone = true;
      }
    });
    this.employeeForm = new FormGroup({
      emp: new FormControl('', Validators.required),
      yearVal: new FormControl(this.currentYear),
      monthVal: new FormControl(this.currentMonth)
    });
  }

  public onSubmit(): void {
    if (this.employeeForm.value.monthVal === 'All') {
      this.router.navigate([`/employee/${this.employeeForm.value.emp.id}/salarySlips`],
      { queryParams: { year: this.employeeForm.value.yearVal}});
    } else {
      this.router.navigate([`/employee/${this.employeeForm.value.emp.id}/salarySlip/view`],
      { queryParams: { month: this.employeeForm.value.monthVal.toLowerCase(), year: this.employeeForm.value.yearVal}});
    }
  }

  public fetchSalarySlip(emp: {}): void {
    this.router.navigate([`/employee/${emp['id']}/salarySlips`]);
  }

  public uploadSalary(): void {
    this.router.navigate(['/uploadSalarySlip']);
  }
}
