import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadComponent } from './file-upload.component';
import { AuthenticationGuardService } from '../services/authentication-guard.service';

const routes: Routes = [
  {path: '', component: FileUploadComponent, canActivate: [AuthenticationGuardService], data: {roles: ['admin']} }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FileUploadRoutingModule { }
