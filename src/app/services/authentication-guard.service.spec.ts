import { TestBed } from '@angular/core/testing';

import { AuthenticationGuardService } from './authentication-guard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthenticationGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule, HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: AuthenticationGuardService = TestBed.get(AuthenticationGuardService);
    expect(service).toBeTruthy();
  });
});
