import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  toggleSlideForm: boolean = false;
  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {
    if(this.router.url == '/user/register'){
      this.toggleSlideForm = true
    }
  }
}
