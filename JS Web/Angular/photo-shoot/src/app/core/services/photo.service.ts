import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/photo';

@Injectable({ providedIn: 'root' })
export class PhotoService {
  token: string;
  isAuthenticated: boolean;
  tokenTimer: NodeJS.Timer;
  userRole: string;
  userEmail: string;

  constructor(
    private http: HttpClient,
    //  private toastr: ToastrService,
    private router: Router
  ) {}

  createPhoto(body) {
    console.log(body);
    let photoData = new FormData();
    photoData.append('title', body.title);
    photoData.append('description', body.description);
    photoData.append('image', body.imgUrl, body.title);
    photoData.append('date', body.date);
    photoData.append('author', body.author);
    photoData.append('categories', JSON.stringify(body.categories));

    // formData.append
    return this.http.post(`${BACKEND_URL}/`, photoData)
  }

  getPhotos(myPhotos = '', itemsPerPage, currentPage){
    const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}&${myPhotos}`;
    return this.http.get<{message: string, photos: [] , count: number}>(`${BACKEND_URL}/list${queryParams}`)
  }

  deletePhoto(id){
    return this.http.get<{message: string}>(`${BACKEND_URL}/delete/${id}`)
  }
}
