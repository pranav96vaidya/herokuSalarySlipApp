import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { StartupService } from './startup.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {
  response: any;
  data: any;

  constructor(public readonly router: Router, private readonly authenticationService: AuthenticationService,
    private startupService: StartupService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.authenticationService.isLoggedIn();
    if (!isLoggedIn) {
      location.href = 'http://newput.timetracker.s3-website-us-west-1.amazonaws.com/login';
      return false;
    }
    const roles = route['data']['roles'];
    this.data = this.startupService.startupData();
    if (roles.includes(this.data['status'])) {
      return true;
    } else {
      return false;
    }
  }
}
