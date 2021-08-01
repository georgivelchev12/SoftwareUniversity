import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit {
  category;
  constructor(
    public categoryService: CategoryService,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.route.url.subscribe((url) => {
      this.categoryService
        .getCategory(this.route.snapshot.params.id)
        .subscribe((data) => {
          this.category = data.category;
          // console.log(this.category);
        });
    });
  }

}
