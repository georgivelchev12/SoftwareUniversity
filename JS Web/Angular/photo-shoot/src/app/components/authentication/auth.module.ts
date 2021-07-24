import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';
import { EditUserComponent } from './edit/edit.component';
import { PhotosModule } from '../photos/photos.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PhotosModule],
  declarations: [AuthComponent, RegisterComponent, LoginComponent, EditUserComponent],
  exports: [AuthComponent, RegisterComponent, LoginComponent, EditUserComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AuthModule {}
