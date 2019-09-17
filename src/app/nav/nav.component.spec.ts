import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavComponent } from './nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../services/api.service';
import { from, of } from 'rxjs';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let apiService: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ NavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.get(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return loggedin employee data', () => {
    const resp = { data: {_id: '5a28fc1b81029331df445103',
      id: 'U0DDYUNSD',
      teamId: 'T0DDQKQNQ',
      channelId: 'D87N77P9T',
      firstName: 'Siya',
      lastName: '',
      fullName: 'Siya',
      email: 'siya@newput.com',
      password: '$2a$12$Wbzjv1jE4MwDjEtffksk1e5T8a1pbEdteL7CL0JWooQ3SArFZU8Bq',
      profileImgSmall: 'http://avatars.slack-edge.com/2016-02-01/19967907747_ab115c92505a34d0f2dc_48.png',
      profileImg: 'http://avatars.slack-edge.com/2016-02-01/19967907747_ab115c92505a34d0f2dc_192.png',
      status: 'admin',
      notificationStatus: true
    }};

    spyOn(apiService, 'getDetail').and.callFake(() => {
      return of(resp);
    });

    component.ngOnInit();
    expect(component.empResponse).toEqual(resp);

  });
});
