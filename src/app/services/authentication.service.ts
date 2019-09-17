import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  baseUrl = environment.BASE_URL;
  constructor(private readonly http: HttpClient) { }
  token: any;

  readCookie(name): string {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    this.token = null;
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        this.token = c.substring(nameEQ.length, c.length);
        break;
      } 
    }
    return this.token;
  }

  public isLoggedIn(): boolean {
    return this.token != null;
  }
}
