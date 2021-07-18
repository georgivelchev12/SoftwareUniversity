import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthModel } from '../auth.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: AuthModel;

  // To do... add validators
  form = new FormGroup({
    email: new FormControl('', []),
    password: new FormControl('', []),
    rePassword: new FormControl('', []),
  });

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {}

  register() {
    this.user = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.authService.register(this.user);
  }
}
