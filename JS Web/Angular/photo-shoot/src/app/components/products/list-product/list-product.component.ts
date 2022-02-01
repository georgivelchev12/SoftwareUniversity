import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit, OnChanges {
  @Output() categories = new EventEmitter<Object>();
  @Input() categoryId: string;
  @Input() sort: string;
  products = [];
  currentPage = 1;
  itemsPerPage = 8;
  loading: boolean;
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
    this.loading = true;
    this.getProducts();
  }
  getProducts() {
    this.productService
      .getProductsAndCategories(
        this.itemsPerPage,
        this.currentPage,
        this.categoryId,
        this.sort
      )
      .subscribe(({ message, currentCategory, childCategories, productsOfCurrentCategories: products, count }) => {
        this.categories.emit({currentCategory, childCategories})
        this.products = products;
        this.products = this.products.map((product) =>{
          product.oldPrice = Number(product.oldPrice);
          product.price = Number(product.price);
          return product;
        })
        this.totalItems = count;
        this.loading = false;
      });
  }
}
