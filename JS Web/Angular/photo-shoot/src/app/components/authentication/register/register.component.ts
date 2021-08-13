import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { RegisterModel } from '../models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: RegisterModel;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      // Validators.pattern('(?=.*[A-Z])(?=.*[0-9]).*'), // at least one capital letter and one number
    ]),
    rePassword: new FormControl('', [Validators.required]),
  });

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {}

  register() {
    this.user = {
      email: this.form.value.email,
      password: this.form.value.password,
      rePassword: this.form.value.rePassword,
    };
    this.authService.register(this.user);
  }
}
