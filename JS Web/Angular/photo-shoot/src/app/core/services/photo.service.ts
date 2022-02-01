import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/photo';

@Injectable({ providedIn: 'root' })
export class PhotoService {

  constructor(private http: HttpClient) {}

  createPhoto(body) {
    console.log(JSON.stringify(body.categories));
    let photoData = new FormData();
    photoData.append('title', body.title);
    photoData.append('description', body.description);
    photoData.append('image', body.imgUrl, body.title);
    photoData.append('date', body.date);
    photoData.append('author', body.author);
    photoData.append('categories', JSON.stringify(body.categories));
    return this.http.post<{message: string}>(`${BACKEND_URL}/`, photoData)
  }

  getPhoto(id){
    return this.http.get<{ message: string, photo: Object }>(`${BACKEND_URL}/${id}`)
  }

  getPhotos(userPhotos = '', myPhotos = '', itemsPerPage, currentPage, category = ''){
    const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}${myPhotos}${category}${userPhotos}`;
    return this.http.get<{message: string, photos: [] , count: number}>(`${BACKEND_URL}/list${queryParams}`)
  }

  editPhoto(photo){
    let photoData;
    if (typeof photo.imgUrl === 'object') {
      photoData = new FormData();
      photoData.append('_id', photo._id);
      photoData.append('title', photo.title);
      photoData.append('description', photo.description);
      photoData.append('image', photo.imgUrl, photo.title);
      photoData.append('categories', JSON.stringify(photo.categories));
    } else {
      photoData = {
        ...photo,
      };
    }
    return this.http.put(`${BACKEND_URL}/edit`, photoData);
  }

  deletePhoto(id){
    return this.http.get<{message: string}>(`${BACKEND_URL}/delete/${id}`)
  }
}
