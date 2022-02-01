import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CartInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken: string = this.authService.getToken();
    // console.log(' here object');
    let cart = {};
    req = req.clone({ headers: req.headers.set('Cart', JSON.stringify(cart)) });
    return next.handle(req);
  }
}
