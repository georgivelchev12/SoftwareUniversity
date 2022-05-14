import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-checkout-list-order',
  templateUrl: './checkout-list-order.component.html',
  styleUrls: ['./checkout-list-order.component.scss'],
})
export class CheckoutListOrderComponent implements OnInit {
  @Input() myOrders: string;
  orders;
  constructor(public productService: ProductService) {}

  ngOnInit() {
    this.productService.getOrders(this.myOrders || '').subscribe(({ message, orders }) => {
      this.orders = orders;
    });

  }
}
