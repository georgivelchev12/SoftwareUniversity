import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';

@Injectable()
export class CartInterceptor implements HttpInterceptor {
  constructor(private productService: ProductService, private router: Router, public toastr: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cartData = this.productService.getCartData();
    if(cartData){
      req = req.clone({ headers: req.headers.set('Cart', JSON.stringify(cartData)) });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.productService.clearCartData();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.toastr.error(error.message + '\nSite will reload in 2 seconds.', 'Error!');
        this.router.navigate(['/'])
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('this is client side error');
          errorMsg = `Error: ${error.message}`;
        }
        else {
          console.log('this is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        console.log(errorMsg);
        return throwError(errorMsg);
      })
    );
  }
}
