import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  @Input() isSlider;
  slideConfig = {
    slidesToShow: 2,
    swipeToSlide: true,
    arrows: false,
    mobileFirst: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 6,
        },
      },
    ],
  };

  categories;
  disableClickEvent = false;
  constructor(public categoryService: CategoryService, public router: Router) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data.categories;
    });
  }


  
  onClick(event, category) {
    if (!this.disableClickEvent) {
      this.router.navigateByUrl('/categories/' + category._id);
    }
  }
  beforeChange(event) {
    this.disableClickEvent = true;
  }
  afterChange(event) {
    this.disableClickEvent = false;
  }
}
