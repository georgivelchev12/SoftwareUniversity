import { environment } from "../../environment";
import fetcher from "../auth.interceptor";

const BACKEND_URL = environment.apiUrl + '/photo';

export async function getPhotos(userPhotos = '', myPhotos = '', itemsPerPage, currentPage, category = ''){
  const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}${myPhotos}${category}${userPhotos}`;
  return (await fetcher(`${BACKEND_URL}/list${queryParams}`)).json();
}

export async function getPhoto(id){
  return (await fetcher(`${BACKEND_URL}/${id}`)).json();
}

export async function deletePhoto(id){
  return (await fetcher(`${BACKEND_URL}/delete/${id}`)).json()
}

export async function createPhoto(body) {
  let photoData = new FormData();
  photoData.append('title', body.title);
  photoData.append('description', body.description);
  photoData.append('image', body.imgUrl, body.title);
  photoData.append('date', body.date);
  photoData.append('author', body.author);
  photoData.append('categories', JSON.stringify(body.categories));

  return (await fetcher(`${BACKEND_URL}/`, {
    method: 'POST',
    body: photoData
  })).json();
}

export async function editPhoto(photo){
  let photoData;
  let hasImage = typeof photo.imgUrl === 'object';
  if (hasImage) {
    photoData = new FormData();
    photoData.append('_id', photo._id);
    photoData.append('title', photo.title);
    photoData.append('description', photo.description);
    photoData.append('image', photo.imgUrl, photo.title);
    photoData.append('categories', JSON.stringify(photo.categories));
  } else {
    photoData = JSON.stringify({
      ...photo,
    })
  }

  return (await fetcher(`${BACKEND_URL}/edit`, {
    method: "PUT",
    headers: hasImage ? {} : { "content-type": "application/json" },
    body: photoData,
  })).json()
}