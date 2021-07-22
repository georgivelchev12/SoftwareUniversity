import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataSharingService } from 'src/app/core/services/data_sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  profile;

  constructor(
    public authService: AuthService,
    public router: Router,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit() {
    this.getMyProfile();
    this.dataSharingService.isDataChanged.subscribe((isChanged) => {
      if (isChanged) {
        this.getMyProfile()
      }
    });
  }

  getMyProfile() {
    this.authService.getMyProfile().subscribe((data) => {
      this.profile = data['user'];
    });
  }

  logout() {
    this.authService.logout();
  }
}
