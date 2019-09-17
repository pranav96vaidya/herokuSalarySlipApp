import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.BASE_URL;
  monthObj = environment.MONTH_OBJ;

  constructor(private readonly http: HttpClient) { }

  public removeRecord(empList): Observable<any> {
    const monthObj = empList[0]['month'];
    const yearObj = empList[0]['year'];
    const empEmails = [];
    if (empList.length) {
      for (let i = 0; i < empList.length; i++) {
        empEmails.push(empList[i]['employeeEmail']);
      }
      const url = `${this.baseUrl}/rest/admin/remove_salary_slip?month=${monthObj}&year=${yearObj}&empEmails=${empEmails}`;
      return this.http.delete(url);
    } else {
      return throwError('employee list is null');
    }
  }

  public fetchSalary(empId: string, month: string, year: string) {
    const url1 = `${this.baseUrl}/rest/admin/company_detail`;
    const url = `${this.baseUrl}/rest/employee/salary_slips?empID=${empId}&month=${month}&year=${year}`;
    const companyResponse = this.http.get(url1);
    const salaryResponse = this.http.get(url);
    return forkJoin([companyResponse, salaryResponse]);
  }

  public sendFile(formData): Observable<any> {
    const url = `${this.baseUrl}/rest/admin/upload`;
    return this.http.post(url, formData);
  }

  public sendMailToEmployees(empList, month, year) {
    const empData = { month, year, empEmails: empList.toString()};
    if (empList.length) {
      const url = `${this.baseUrl}/rest/admin/send_email`;
      return this.http.post(url, empData);
    } else {
      return throwError('employee list is null');
    }
  }

  public getDetail(): Observable<any> {
    const url = `${this.baseUrl}/rest/employee/detail`;
    return this.http.get(url);
  }

  public getEmployeeList(): Observable<any> {
    const url = `${this.baseUrl}/rest/admin/employees`;
    return this.http.get(url);
  }

  public getEmpSalarydetail(id: any, year: any): Observable<any> {
    let url = `${this.baseUrl}/rest/employee/salary_slips?empID=${id}`;
    if (year) {
      url += `&year=${year}`;
    }
    return this.http.get(url);
  }

  public getEmployeeData(id: any) {
    const url = `${this.baseUrl}/rest/employee/detail/${id}`;
    return this.http.get(url);
  }

  public getEmpdetail(id: any, year?: any) {
    const url1 = `${this.baseUrl}/rest/employee/detail/${id}`;
    let url = `${this.baseUrl}/rest/employee/salary_slips?empID=${id}`;
    if (year) {
      url += `&year=${year}`;
    }
    const EmployeeDetailResp = this.http.get(url1);
    const EmployeeDataResp = this.http.get(url);
    return forkJoin([EmployeeDetailResp, EmployeeDataResp]);
  }

}
