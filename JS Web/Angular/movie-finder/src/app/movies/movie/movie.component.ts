import { Component, OnInit, Input } from "@angular/core";
import { Movie } from "src/app/models/movie";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css", "../movies.component.css"],
})
export class MovieComponent implements OnInit {
  @Input("movieElm") movie: Movie;

  constructor() {}

  ngOnInit() {
    this.movie.release_date = this.movie.release_date
      .split("-")
      .reverse()
      .join("/");
  }
}
