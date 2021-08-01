import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataSharingService } from 'src/app/core/services/data_sharing.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss', '../header/header.component.scss'],
})
export class FooterComponent implements OnInit {
  isUser;
  constructor(
    public router: Router,
    public authService: AuthService,
    public dataSharingService: DataSharingService
  ) {}

  ngOnInit() {
    this.isUser = this.authService.getIsAuth();

    this.dataSharingService.isDataChanged.subscribe((isChanged) => {
      if (isChanged) {
        this.isUser = this.authService.getIsAuth();
      }
    });
    
  }
}
