import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material';
import { FileUploadComponent } from './file-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataNotFoundComponent } from '../shared/data-not-found/data-not-found.component';
import { INRCurrencyPipe } from '../shared/inrcurrency.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatProgressSpinnerModule, FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule ],
      declarations: [ FileUploadComponent, DataNotFoundComponent, INRCurrencyPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
