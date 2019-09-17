import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private readonly auth: AuthenticationService, private readonly router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.auth.readCookie('token');
    if (token) {
      authReq = req.clone({ headers: req.headers.set('token', token)});
    }

    return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400 || err.status === 401 || err.status === 402) {
            this.auth.token = null;
            location.href = 'http://newput.timetracker.s3-website-us-west-1.amazonaws.com/login';
          } else if (err.status === 504) {
            location.href = 'http://newput.timetracker.s3-website-us-west-1.amazonaws.com/login';
          }
        }
      }
    ));
  }
}
