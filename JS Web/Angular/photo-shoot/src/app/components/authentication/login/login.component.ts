import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user;

  // To do... add validators
  form = new FormGroup({
    email: new FormControl('', []),
    password: new FormControl('', []),
  });

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {}

  login() {
    this.user = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.authService.login(this.user);
  }
}
