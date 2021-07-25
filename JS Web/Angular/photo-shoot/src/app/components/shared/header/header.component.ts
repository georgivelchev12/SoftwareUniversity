import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { DataSharingService } from 'src/app/core/services/data_sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  profile;
  location;
  categories;

  constructor(
    public authService: AuthService,
    public categoriesService: CategoryService,
    public router: Router,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit() {
    this.getMyProfile();
    this.getCategories();
    this.dataSharingService.isDataChanged.subscribe((isChanged) => {
      if (isChanged) {
        this.getMyProfile();
        this.getCategories();
      }
    });
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((data) => {
      this.categories = data.categories;
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
