import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AuthComponent, RegisterComponent],
  exports: [RegisterComponent],
})
export class AuthModule {}
