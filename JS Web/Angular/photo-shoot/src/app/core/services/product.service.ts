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
  items;
  totalQty;
  totalPrice;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private dataSharingService: DataSharingService
  ) {}


  // Called on app edit
  autoCheckCart() {
    const authInfo = this.getCartData();
    if (!authInfo) {
      return;
    }
    this.items = authInfo.items;
    this.totalQty = authInfo.totalQty;
    this.totalPrice = authInfo.totalPrice;
  }

  private saveCartData(
    items,
    totalQty,
    totalPrice,
  ) {
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('totalQty', totalQty);
    localStorage.setItem('totalPrice', totalPrice);
  }
  public clearCartData() {
    localStorage.removeItem('items');
    localStorage.removeItem('totalQty');
    localStorage.removeItem('totalPrice');
  }
  public getCartData() {
    const items = localStorage.getItem('items');
    const totalQty = localStorage.getItem('totalQty');
    const totalPrice = localStorage.getItem('totalPrice');

    if (!items || !totalQty || !totalPrice) {
      return;
    }
    return {
      items,
      totalQty,
      totalPrice,
    };
  }

  getCartItems(){
    return this.items;
  }
  getTotalQty(){
    return this.totalQty;
  }
  getTotalPrice(){
    return this.totalPrice;
  }

  addToCart(id, quantity = 1){
    this.http.post<{message, cart: { items, totalQty, totalPrice }}>(`${environment.apiUrl}/checkout/addToCart/${id}`, { quantity }).subscribe(({message, cart}) => {
      this.saveCartData(cart.items, cart.totalQty, cart.totalPrice)
      this.dataSharingService.isDataChanged.next(true);
    });  
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

  editProductCategory(body){
    let productData;
    if (typeof body.imgUrl === 'object') {
      productData = new FormData();
      productData.append('title', body.title);
      productData.append('description', body.description);
      productData.append('image', body.imgUrl, body.title);
      productData.append('parentId', body.parentId);
  } else {
      productData = {
        ...body,
      };
    }
    return this.http.put(`${BACKEND_URL}-categories/edit`, productData);
  }

  getProductCategory(id){
    return this.http.get<{ message: string, category: Object }>(`${BACKEND_URL}-categories/${id}`)
  }

  deleteProductCategory(id){
    return this.http.get<{message: string}>(`${BACKEND_URL}-categories/delete/${id}`)
  }

  // To do checkout 
  createOrder(body){
    return this.http.post<{}>(`${environment.apiUrl}/checkout/createOrder`, body);  
  }

  getOrder(id){
    return this.http.get<{ message: string, order: Object }>(`${environment.apiUrl}/checkout/order/${id}`);
  }

  getOrders(query){
    return this.http.get<{ message: string, orders: Object }>(`${environment.apiUrl}/checkout/orders/${query}`);
  }
}