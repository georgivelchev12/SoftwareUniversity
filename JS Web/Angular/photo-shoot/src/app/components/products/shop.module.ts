import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { ListProductComponent } from './list-product/list-product.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductCategoryCreateComponent } from './product-category-create/product-category-create.component';
import { ProductCategoryEditComponent } from './product-category-edit/product-category-edit.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { QuillModule } from 'ngx-quill';
import { StriphtmlPipe } from 'src/app/pipes/striphtml.pipe';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutOrderDetailsComponent } from './checkout-order-details/checkout-order-details.component';
import { CheckoutListOrderComponent } from './checkout-list-order/checkout-list-order.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    NgxPaginationModule,
    QuillModule.forRoot(),
  ],
  declarations: [
    CreateProductComponent,
    EditProductComponent,
    DetailsProductComponent,
    ProductCategoryListComponent,
    ListProductComponent,
    ProductCategoryCreateComponent,
    ProductCategoryEditComponent,
    CheckoutComponent,
    CheckoutOrderDetailsComponent,
    CheckoutListOrderComponent,
    StriphtmlPipe
  ],
  exports: [
    CreateProductComponent,
    EditProductComponent,
    DetailsProductComponent,
    ProductCategoryListComponent,
    ListProductComponent,
    ProductCategoryCreateComponent,
    ProductCategoryEditComponent,
    CheckoutComponent,
    CheckoutOrderDetailsComponent,
    CheckoutListOrderComponent
  ],
  providers: [
    StriphtmlPipe
  ],
})
export class ShopModule {}
