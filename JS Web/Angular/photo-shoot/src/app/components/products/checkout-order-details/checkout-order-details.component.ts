import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-checkout-order-details',
  templateUrl: './checkout-order-details.component.html',
  styleUrls: ['./checkout-order-details.component.scss'],
})
export class CheckoutOrderDetailsComponent implements OnInit {
  showThankYou;
  order;
  cartProducts;
  constructor(
    public route: ActivatedRoute,
    public productService: ProductService
  ) {}

  ngOnInit() {
    this.showThankYou =  this.route.snapshot.queryParams.showThankYou;
    this.productService
      .getOrder(this.route.snapshot.params.id)
      .subscribe(({ message, order }) => {
        this.order = order;
        this.cartProducts = Object.keys(this.order.cart.items).map(
          (key) => this.order.cart.items[key]
        );
      });
  }
}
