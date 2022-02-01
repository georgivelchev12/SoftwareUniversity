import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit {
  currentCategory: any;
  childCategories;
  paramCategoryID
  constructor(private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if(params.categoryId){
        this.paramCategoryID = params.categoryId
      }
    })
  }

  onUpdate(event){
    // Fetching data from child component
    this.currentCategory = event.currentCategory
    this.childCategories = event.childCategories
    // console.log(this.currentCategory)
    // console.log('this.childCategories', this.childCategories)
  }
  
}
