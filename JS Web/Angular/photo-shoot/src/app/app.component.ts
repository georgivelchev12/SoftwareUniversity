import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPhotos } from './+store/actions';
import { selectGlobalPhotos } from './+store/selectors';
import { AuthService } from './core/services/auth.service';
import { ProductService } from './core/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'photo-shoot';
  constructor(
    private authService: AuthService, 
    private productService: ProductService, 
  ) {}
  ngOnInit() {
    this.authService.autoAuthUser();
    this.productService.autoCheckCart();
  }
}
