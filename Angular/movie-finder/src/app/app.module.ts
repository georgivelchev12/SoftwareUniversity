import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { MoviesComponent } from "./movies/movies.component";
import { NavigationComponent } from "./navigation/navigation.component";

import { MoviesService } from "./services/movies.service";
import { MovieComponent } from './movies/movie/movie.component';

@NgModule({
  declarations: [AppComponent, MoviesComponent, NavigationComponent, MovieComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [MoviesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
