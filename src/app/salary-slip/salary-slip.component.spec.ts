import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material';
import { SalarySlipComponent } from './salary-slip.component';
import { INRCurrencyPipe } from '../shared/inrcurrency.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataNotFoundComponent } from '../shared/data-not-found/data-not-found.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SalarySlipComponent', () => {
  let component: SalarySlipComponent;
  let fixture: ComponentFixture<SalarySlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatProgressSpinnerModule, HttpClientTestingModule, RouterTestingModule ],
      declarations: [ SalarySlipComponent, INRCurrencyPipe, DataNotFoundComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarySlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
