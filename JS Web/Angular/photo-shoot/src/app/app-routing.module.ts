import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/authentication/auth.component';
import { ListAuthorsComponent } from './components/authentication/list-authors/list-authors.component';
import { UserProfileComponent } from './components/authentication/user-profile/user-profile.component';
import { CategoryCreateComponent } from './components/categories/category-create/category-create.component';
import { CategoryDetailsComponent } from './components/categories/category-details/category-details.component';
import { CategoryEditComponent } from './components/categories/category-edit/category-edit.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { HomeComponent } from './components/landing/home/home.component';
import { NotFoundComponent } from './components/landing/not-found/not-found.component';
import { CreatePhotoComponent } from './components/photos/create-photo/create-photo.component';
import { DetailsPhotoComponent } from './components/photos/details-photo/details-photo.component';
import { EditPhotoComponent } from './components/photos/edit-photo/edit-photo.component';
import { ListPhotosComponent } from './components/photos/list-photos/list-photos.component';
import { CheckoutListOrderComponent } from './components/products/checkout-list-order/checkout-list-order.component';
import { CheckoutOrderDetailsComponent } from './components/products/checkout-order-details/checkout-order-details.component';
import { CheckoutComponent } from './components/products/checkout/checkout.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { DetailsProductComponent } from './components/products/details-product/details-product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { ProductCategoryCreateComponent } from './components/products/product-category-create/product-category-create.component';
import { ProductCategoryEditComponent } from './components/products/product-category-edit/product-category-edit.component';
import { ProductCategoryListComponent } from './components/products/product-category-list/product-category-list.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // Landing routes
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },

  // User routes
  { path: 'user/profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'user/register', component: AuthComponent},
  { path: 'user/login', component: AuthComponent},
  { path: 'user/details/:id', component: UserProfileComponent},
  { path: 'user/profiles', component: ListAuthorsComponent, canActivate: [AdminGuard]},

  // Photos routes
  { path: 'photo/create', component: CreatePhotoComponent, canActivate: [AuthGuard] },
  { path: 'photo/edit/:id', component: EditPhotoComponent, canActivate: [AuthGuard] },
  { path: 'photo/details/:id', component: DetailsPhotoComponent },
  { path: 'photo/list', component: ListPhotosComponent },
  
  // Photo Categories routes
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/create', component: CategoryCreateComponent, canActivate: [AdminGuard] },
  { path: 'categories/edit/:id', component: CategoryEditComponent, canActivate: [AdminGuard] },
  { path: 'categories/:id', component: CategoryDetailsComponent },
  
  // Product routes
  { path: 'product/create', component: CreateProductComponent, canActivate: [AdminGuard]  }, 
  { path: 'product/edit/:id', component: EditProductComponent, canActivate: [AdminGuard] },
  { path: 'product/:id', component: DetailsProductComponent },

  // Product Categories routes
  { path: 'product-categories', component: ProductCategoryListComponent }, // Lists categories, details for current category + products
  { path: 'product-categories/create', component: ProductCategoryCreateComponent, canActivate: [AdminGuard] },
  { path: 'product-categories/edit/:id', component: ProductCategoryEditComponent, canActivate: [AdminGuard] },

  // Product orders & checkout
  { path: 'checkout', component: CheckoutComponent },
  { path: 'checkout/order/:id', component: CheckoutOrderDetailsComponent },
  { path: 'checkout/orders', component: CheckoutListOrderComponent, canActivate: [AdminGuard] },

  // Not Found
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { scrollPositionRestoration: 'enabled' })], // scrolls back to top on route change
  exports: [RouterModule],
})
export class AppRoutingModule {}
