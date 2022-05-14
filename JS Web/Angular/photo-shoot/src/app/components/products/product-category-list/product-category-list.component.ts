import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss'],
})
export class ProductCategoryListComponent implements OnInit {
  currentCategory: any;
  childCategories;
  paramCategoryID;
  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    public toastr: ToastrService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.paramCategoryID = this.route.snapshot.queryParams.categoryId;
  }
  isLoading: boolean = true;

  ngOnInit() {}

  onUpdate(event) {
    // Fetching data from child component
    this.currentCategory = event.currentCategory;
    this.childCategories = event.childCategories;
    // console.log(this.currentCategory)
    // console.log('this.childCategories', this.childCategories)
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  deleteCategory() {
    this.productService
      .deleteProductCategory(this.currentCategory._id)
      .subscribe((data) => {
        this.toastr.success('Product category deleted!', 'Success!');
        this.router.navigateByUrl(`/product-categories`);
      });
  }
}
