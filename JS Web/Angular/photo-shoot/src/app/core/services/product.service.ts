import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataSharingService } from './data_sharing.service';
import { ToastrService } from 'ngx-toastr';
import { LoginActionModel } from 'src/app/components/authentication/models/loginAction.model';
import { UserModel } from 'src/app/components/authentication/models/user.model';

const BACKEND_URL = environment.apiUrl + '/product';

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private dataSharingService: DataSharingService
  ) {}


  // Called on app edit
  autoAuthUser() {
    const authInfo = this.getCartData();
    if (!authInfo) {
      return;
    }

  }

  private saveCartData(
    token: string,
    expirationDate: Date,
    userRole: string,
    userEmail: string,
    userId: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('role', userRole);
    localStorage.setItem('email', userEmail);
    localStorage.setItem('id', userId);
  }
  private clearCartData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
  }
  private getCartData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userRole = localStorage.getItem('role');
    const userEmail = localStorage.getItem('email');
    const userId = localStorage.getItem('id');

    if (!token || !expirationDate || !userRole || !userEmail || !userId) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userRole,
      userEmail,
      userId,
    };
  }



  createProduct(body) {
    let productData = new FormData();
    productData.append('title', body.title);
    productData.append('description', body.description);
    productData.append('shortDescription', body.shortDescription);
    productData.append('image', body.imgUrl, body.title);
    productData.append('price', body.price);
    productData.append('oldPrice', body.oldPrice);
    productData.append('categories', JSON.stringify(body.categories));
    return this.http.post<{message: string, product}>(`${BACKEND_URL}/`, productData)
  }

  getProduct(id){
    return this.http.get<{ message: string, product: Object }>(`${BACKEND_URL}/${id}`)
  }

  getProducts(itemsPerPage, currentPage, category = '', sort = ''){
    const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}${category}${sort}`;
    return this.http.get<{message: string, products: [] , count: number}>(`${BACKEND_URL}/list${queryParams}`)
  }

  getProductsAndCategories(itemsPerPage, currentPage, category = '', sort = ''){
    const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}${category}${sort}`;
    return this.http.get<{message: string, currentCategory, childCategories, productsOfCurrentCategories: [] , count: number, descendants}>(`${BACKEND_URL}-categories/list${queryParams}`);  
  }


  editProduct(product){
    let productData;
    if (typeof product.imgUrl === 'object') {
      productData = new FormData();
      productData.append('_id', product._id);
      productData.append('title', product.title);
      productData.append('description', product.description);
      productData.append('shortDescription', product.shortDescription);
      productData.append('image', product.imgUrl, product.title);
      productData.append('price', product.price);
      productData.append('oldPrice', product.oldPrice);
      productData.append('categories', JSON.stringify(product.categories));
  } else {
      productData = {
        ...product,
      };
    }
    return this.http.put(`${BACKEND_URL}/edit`, productData);
  }

  deleteProduct(id){
    return this.http.get<{message: string}>(`${BACKEND_URL}/delete/${id}`)
  }


  createProductCategory(body){
    let productData = new FormData();
    productData.append('title', body.title);
    productData.append('description', body.description);
    productData.append('image', body.imgUrl, body.title);
    productData.append('parentId', body.parentId);
    return this.http.post(`${BACKEND_URL}-categories`, productData)
  }
}