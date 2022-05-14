import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataSharingService } from 'src/app/core/services/data_sharing.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartProducts;
  subTotalPrice;
  totalPrice;

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    town: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    paymentMethod: new FormControl('', [Validators.required]),
    termsAndConditions: new FormControl(false, [Validators.requiredTrue]),
  });

  constructor(
    public productService: ProductService,
    public toastr: ToastrService,
    public router: Router,
    private dataSharingService: DataSharingService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.handleCartData();
    this.dataSharingService.isDataChanged.subscribe((isChanged) => {
      if (isChanged) {
        this.handleCartData();
      }
    });
  }

  handleCartData() {
    this.cartProducts = JSON.parse(this.productService.getCartData()?.items);
    this.cartProducts = Object.keys(this.cartProducts).map(
      (key) => this.cartProducts[key]
    );
    this.subTotalPrice = this.cartProducts.reduce(
      (acc, curr) => acc + curr.price,
      0
    );
    this.totalPrice = this.subTotalPrice + 6;
  }

  adjustQuantity(product, sign) {
    // if(product.qty < 1){
    //   return;
    // }
    const signHandler = {
      '-': () => {
        this.productService.addToCart(product.item._id, -1);
        product.qty--;
        this.toastr.success('Product removed successfully!', 'Success!');
      },
      '+': () => {
        this.productService.addToCart(product.item._id, 1);
        product.qty++;
        this.toastr.success('Product added successfully!', 'Success!');
      },
    };
    signHandler[sign]();
  }

  checkout() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const order = {
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        phone: this.form.value.phone,
        country: this.form.value.country,
        town: this.form.value.town,
        address: this.form.value.address,
        paymentMethod: this.form.value.paymentMethod,
        termsAndConditions: this.form.value.termsAndConditions,
      };

      this.productService.createOrder(order).subscribe((data) => {
        this.dataSharingService.isDataChanged.next(true);
        this.productService.clearCartData();
        this.toastr.success(data['message'], 'Success!');
        this.router.navigateByUrl(`/checkout/order/${data['order']['_id']}`);
      });
    }
  }
}
