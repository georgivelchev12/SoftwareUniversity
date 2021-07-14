import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AuthComponent, RegisterComponent, LoginComponent],
  exports: [AuthComponent, RegisterComponent, LoginComponent],
})
export class AuthModule {}
