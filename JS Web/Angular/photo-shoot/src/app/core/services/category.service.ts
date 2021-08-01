import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/categories';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(
    private http: HttpClient,
    //  private toastr: ToastrService,
    private router: Router
  ) {}

  createCategory(body) {
    console.log(body);
    let photoData = new FormData();
    photoData.append('title', body.title);
    photoData.append('description', body.description);
    photoData.append('image', body.imgUrl, body.title);
    return this.http.post(`${BACKEND_URL}/`, photoData);
  }
  getCategory(id) {
    return this.http.get<{ message: string; category: Object }>(
      `${BACKEND_URL}/${id}`
    );
  }
  getCategories() {
    return this.http.get<{ message: string; categories: [] }>(`${BACKEND_URL}`);
  }

  editCategory(category) {
    let postData;
    if (typeof category.imgUrl === 'object') {
      postData = new FormData();
      postData.append('_id', category._id);
      postData.append('title', category.title);
      postData.append('description', category.description);
      postData.append('image', category.imgUrl, `${category.title}`);
    } else {
      postData = {
        ...category,
      };
    }
    return this.http.put(`${BACKEND_URL}/edit`, postData);
  }

  deleteCategory(id) {
    return this.http.get(`${BACKEND_URL}/delete/${id}`);
  }


}
