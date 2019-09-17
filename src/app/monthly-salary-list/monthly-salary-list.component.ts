import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { StartupService } from '../services/startup.service';

@Component({
  selector: 'app-monthly-salary-list',
  templateUrl: './monthly-salary-list.component.html',
  styleUrls: ['./monthly-salary-list.component.scss']
})

export class MonthlySalaryListComponent implements OnInit {
  navigateUrl = environment.NAVIGATE_URL;
  currentMonthIndex = new Date().getMonth();
  months = environment.MONTHS;
  monthObj = environment.MONTH_OBJ;
  currentMonth = this.months[this.currentMonthIndex];
  currentYear = new Date().getFullYear();
  years: number[] = [];
  empId: string;
  empName: string;
  employeeForm: FormGroup;
  fetchDone: boolean;
  searchDone = true;
  errorMsg: string;
  noData: boolean;
  empData: any;
  year: any;
  noDataForYear = true;
  empRoleData: any;
  yearData: any;
  backBtn: boolean;
  pageHeading = 'All Salary Slips';

  constructor(private readonly router: Router, private readonly route: ActivatedRoute, private readonly title: Title, private readonly apiService: ApiService,
    private startupService: StartupService) { }

  BackBtnClickHandler($event: any) {
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.fetchDone = false;
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
    });
    for (let i = 2017; i <= this.currentYear; i++) {
      this.years.push(i);
    }
    this.title.setTitle('Salary Slip records');
    this.route.params.subscribe(data => {
      this.empId = data['empId'];
    });
    this.route.queryParams.subscribe(queryData => {
      this.year = queryData['year'];
    });

    this.empRoleData = this.startupService.startupData();
    this.getData(this.empId, this.year);
    const year = this.year ? this.year : this.currentYear;
    this.employeeForm = new FormGroup({
      yearVal: new FormControl(year)
    });
  }

  public getData(empId, year) {
    this.yearData = year;
    if (this.empRoleData['status'] === 'admin') {
      this.backBtn = true;
      this.apiService.getEmpdetail(empId, year)
      .subscribe(res => {
        if (res[0]['data']) {
          this.empName = res[0]['data']['fullName'] || this.empName;
        } else {
          this.errorMsg = 'Employee not exist';
          this.fetchDone = true;
          this.noDataForYear = true;
          this.searchDone = false;
        }
        if (res[1]['data'].length === 0) {
          this.noDataForYearFound();
        } else {
          this.empData = res[1]['data'];
          this.yearData = this.empData[0]['year'];
          this.dataFoundForYear();
        }
      }, err =>  {
          this.errorHandler(err);
      });
    } else {
      this.backBtn = false;
      this.empName = this.empRoleData['fullName'];
      this.apiService.getEmpSalarydetail(empId, year)
      .subscribe(resp => {
        if (resp['data'].length === 0) {
          this.noDataForYearFound();
        } else {
          this.empData = resp['data'];
          this.yearData = this.empData[0]['year'];
          this.dataFoundForYear();
        }
      }, err =>  {
        this.errorHandler(err);
      });
    }
  }

  public errorHandler(err) {
    if (err.error) {
      this.errorMsg = err.error.customMsg;
      this.fetchDone = true;
      this.searchDone = true;
    } else {
      this.errorMsg = 'Something went wrong!';
      this.fetchDone = true;
      this.searchDone = true;
    }
  }

  public noDataForYearFound() {
    this.fetchDone = true;
    this.noDataForYear = true;
    this.searchDone = true;
  }

  public dataFoundForYear() {
    this.fetchDone = true;
    this.noDataForYear = false;
    this.searchDone = true;
  }

  public onSubmit(): void {
    this.searchDone = false;
    this.router.navigate([`/employee/${this.empId}/salarySlips`],
      { queryParams: { year: this.employeeForm.value.yearVal}});
    this.getData(this.empId, this.employeeForm.value.yearVal);
  }

  public getSalary(year: number, month): void {
    const monthVal = this.months[month - 1];
    window.open(`${this.navigateUrl}/employee/${
    this.empId}/salarySlip/view?month=${monthVal.toLowerCase()}&year=${year}` , '_blank');
  }

  public previousPage(): void {
    this.router.navigate(['/home']);
  }
}
