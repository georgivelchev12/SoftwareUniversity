import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit, OnChanges {
  @Input() isHome: boolean;
  @Output() categories = new EventEmitter<Object>();
  @Input() categoryId: string;
  @Input() sort: string;
  products = [];
  currentPage = 1;
  itemsPerPage = 8;
  totalItems;
  isListLayout: boolean = false;
  constructor(
    public productService: ProductService,
    private toastr: ToastrService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  ngOnChanges() {
    this.getProducts();
  }

  getPage(event) {
    this.currentPage = event;
    this.getProducts();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  getProducts() {
    setTimeout(() => {
      this.productService
        .getProductsAndCategories(
          this.itemsPerPage,
          this.currentPage,
          this.categoryId,
          this.sort
        )
        .subscribe(
          ({
            message,
            currentCategory,
            childCategories,
            productsOfCurrentCategories: products,
            count,
          }) => {
            this.categories.emit({ currentCategory, childCategories });
            this.products = products;
            this.products = this.products.map((product) => {
              product.oldPrice = Number(product.oldPrice);
              product.price = Number(product.price);
              return product;
            });
            this.totalItems = count;
          }
        );
    }, 100);
  }

  addToCart(productId, quantity) {
    if (quantity <= 0) {
      this.toastr.error('Quantity must be positive number!', 'Error!');
      return;
    }
    this.productService.addToCart(productId, quantity);
    this.toastr.success('You added the product successfully!', 'Success!');
  }
}
