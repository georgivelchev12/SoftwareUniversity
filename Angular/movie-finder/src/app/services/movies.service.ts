import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Movies } from '../models/movies';


const apiKey = "f32c30605ea13b6a5e04ba21f4567e26";
@Injectable()
export class MoviesService {
  path: string = "https://api.themoviedb.org/3/";
  popular: string = "discover/movie?sort_by=popularity.desc";
  _theaters: string =
    "discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22";
  auth: string = "&api_key=";
  constructor(private httpClient: HttpClient) {}

  getPopular(): Observable<Movies> {
    return this.httpClient.get<Movies>(
      `${this.path}${this.popular}${this.auth}${apiKey}`
    );
  }
  //another way to doing it
  get theaters(): Observable<Movies> {
    return this.httpClient.get<Movies>(
      `${this.path}${this._theaters}${this.auth}${apiKey}`
    );
  }
}
