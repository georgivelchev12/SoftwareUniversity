import { environment } from "../../environment";
import fetcher from "../auth.interceptor";

const BACKEND_URL = environment.apiUrl + "/categories";

export async function getCategories() {
  return (await fetcher(`${BACKEND_URL}`)).json();
}

export async function getCategory(id) {
  return (await fetcher(`${BACKEND_URL}/${id}`)).json();
}

export async function createCategory(body) {
  let catData = new FormData();
  catData.append('title', body.title);
  catData.append('description', body.description);
  catData.append('image', body.imgUrl, body.title);
  return (await fetcher(`${BACKEND_URL}/`, {
    method: "POST",
    body: catData,
  })).json();
}

export async function editCategory(category) {
  let postData;
  let hasImage = typeof category.imgUrl === 'object'
  if (hasImage) {
    postData = new FormData();
    postData.append('_id', category._id);
    postData.append('title', category.title);
    postData.append('description', category.description);
    postData.append('image', category.imgUrl, `${category.title}`);
  } else {
    postData = JSON.stringify({ ...category });
  }
  console.log(postData);

  return (await fetcher(`${BACKEND_URL}/edit`, {
    method: "PUT",
    headers: hasImage ? {} : { "content-type": "application/json" },
    body: postData,
  })).json()
}
