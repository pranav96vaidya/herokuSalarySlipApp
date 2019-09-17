import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { StartupService } from '../services/startup.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  navigateUrl = environment.NAVIGATE_URL;
  file: File;
  fileToUpload: any;
  errorMsg: string;
  month = new Date().getMonth();
  months = environment.MONTHS;
  currentMonth = this.months[this.month];
  currentYear = new Date().getFullYear();
  years: number[] = [];
  users: string;
  employeeForm: FormGroup;
  fetchDone = false;
  processing = false;
  upload = false;
  allSelected: boolean;
  checkedList: any;
  list: any;
  salaryItemsInfo = ['Name', 'Gross Salary', 'Total Deductions', 'Net Salary Payable', 'Action'];
  fileErrorMsg: string;
  invalidMail: [];
  monthValue: any;
  yearValue: any;
  @ViewChild('content', {static: true}) content;
  modalResponse: any;
  modalContent: any;
  noData: boolean;
  empRoleData: any;
  fileDropped: boolean = false;
  backBtn = true;
  heading = 'List of Uploaded Salaries';
  deleteBtnObj = {
    showBtn: true,
    disable: false
  };
  sendMailBtnObj = {
    showBtn: true,
    disable: false
  };
  shouldBeLeft = true;
  pageHeading = 'List of Uploaded Salaries';

  constructor(private readonly title: Title, private readonly router: Router,
    private readonly apiService: ApiService, private modalService: NgbModal,
    private readonly startupService: StartupService
    ) {
      this.allSelected = true;
    }

  ngOnInit(): void {
    this.noData = false;
    this.title.setTitle('Upload Salary Slip');
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
    });
    for (let i = 2017; i <= this.currentYear; i++) {
      this.years.push(i);
    }
    this.apiService.getEmployeeList().subscribe(responseList => {
      this.users = responseList['data'];
      this.fetchDone = true;
      this.upload = true;
    }, err =>  {
        this.errorMsg = err.error.customMsg;
        this.fetchDone = true;
        this.upload = true;
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

  public uploadFile(files: FileList): void {
    this.fileDropped = true;
    const selectedFile = files[0];
    const dot = selectedFile.name.lastIndexOf('.');
    if (dot === -1) {
      this.fileErrorMsg = 'Select a valid csv file.';
    } else {
      this.fileErrorMsg = null;
      const extension = selectedFile.name.substr(dot, selectedFile.name.length);
      if (extension === '.csv') {
        this.file = selectedFile;
      } else {
        this.fileErrorMsg = 'Only csv file is allowed.';
      }
    }
  }

  public uploadFileData(): void {
    this.upload = false;
    this.fetchDone = false;
    window.scrollTo(0, 0);
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);
    this.apiService.sendFile(formData)
    .subscribe((val) => {
      this.invalidMail = [];
      this.title.setTitle('Employee salary List');
      if (val['data'] && val['data']['invalidEmails'] && val['data']['invalidEmails'].length) {
        this.invalidMail = val['data']['invalidEmails'].join(', ');
      }
      if (val['data'] && val['data']['employeeData'] && val['data']['employeeData'].length) {
        this.list = val['data']['employeeData'];
        this.monthValue = this.list[0]['month'];
        this.yearValue = this.list[0]['year'];
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].isSelected = true;
        }
        this.getCheckedItemList();
        this.processing = true;
        this.upload = true;
        this.fetchDone = true;
      } else {
        this.processing = true;
        this.upload = true;
        this.fetchDone = true;
      }
    }, err => {
      if (err.status === 500) {
        this.errorMsg = 'Some Internal server error occured! please try again later.';
      } else if (err.status === 422) {
        this.errorMsg = 'Uploaded csv file does not contain required fields.';
      }
      this.processing = true;
      this.upload = true;
      this.fetchDone = true;
    });
  }

  public checkUncheckAll(): void {
    for (let i = 0; i < this.list.length; i++) {
      this.list[i].isSelected = this.allSelected;
    }
    this.getCheckedItemList();
  }

  public isAllSelected(): void {
    this.allSelected = this.list.every((item: any) => {
      return item.isSelected === true;
    });
    this.getCheckedItemList();
  }

  private getCheckedItemList(): void {
    this.checkedList = [];
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].isSelected) {
        this.checkedList.push(this.list[i]);
      }
    }
    if (this.checkedList.length) {
      this.sendMailBtnObj.disable = false;
      this.deleteBtnObj.disable = false;
    } else {
      this.sendMailBtnObj.disable = true;
      this.deleteBtnObj.disable = true;
    }
  }

  public deleteItem(): void {
    blur();
    const listToRemove = [];
    if (confirm('Are you sure, you want to delete?')) {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].isSelected) {
          listToRemove.push(this.list[i]);
          this.list.splice(i, 1);
          i--;
        }
      }
      this.apiService.removeRecord(listToRemove)
      .subscribe(res => {
      });
    }
    this.getCheckedItemList();
    if (!this.list.length) {
      this.noData = true;
      this.deleteBtnObj.showBtn = false;
      this.sendMailBtnObj.showBtn = false;
    }
  }

  public DeleteRecord(emp): void {
    blur();
    const listToRemove = [];
    if (confirm('Are you sure, you want to delete?')) {
      for (let i = 0; i < this.list.length; i++) {
        if (emp === this.list[i]) {
          listToRemove.push(this.list[i]);
          this.list.splice(i, 1);
        }
      }
      this.apiService.removeRecord(listToRemove)
      .subscribe(res => {
      });
    }
    this.getCheckedItemList();
    if (!this.list.length) {
      this.noData = true;
      this.deleteBtnObj.showBtn = false;
      this.sendMailBtnObj.showBtn = false;
    }
  }

  public sendMail(): void {
    this.sendMailBtnObj.disable = true;
    const empEmails = [];
    if (this.checkedList.length) {
      for (let i = 0; i < this.checkedList.length; i++) {
        empEmails.push(this.checkedList[i].employeeEmail);
      }
      this.apiService.sendMailToEmployees(empEmails, this.monthValue, this.yearValue)
      .subscribe(res => {
        if (empEmails.length === 1) {
          this.modalContent = empEmails[0];
        } else {
          this.modalContent = 'employees';
        }
        this.modalResponse = res['data']['message'];
        this.modalService.open(this.content, { windowClass: 'dark-modal' });
        this.sendMailBtnObj.disable = false;
      });
    }
  }

  public viewSalarySlip(emp: {}): void {
    const monthVal = this.months[+emp['month'] - 1].toLowerCase();
    window.open(`${this.navigateUrl}/employee/${
      emp['empID']}/salarySlip/view?month=${monthVal}&year=${emp['year']}`);
  }

  public previousPage(): void {
    this.router.navigate(['/home']);
  }

  public navigateToTimeSheet() {
    window.open(`http://newput.timetracker.s3-website-us-west-1.amazonaws.com`);
  }

  public reloadPage(): void {
    this.fetchDone = true;
    this.processing = false;
    this.errorMsg = null;
    this.noData = false;
    this.file = null;
    this.fileErrorMsg = null;
    this.fileDropped = false;
    this.deleteBtnObj.showBtn = false;
    this.sendMailBtnObj.showBtn = false;
    this.file = null;
    window.scrollTo(0, 0);
  }

}
