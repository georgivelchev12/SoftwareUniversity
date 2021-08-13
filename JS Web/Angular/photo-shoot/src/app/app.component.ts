import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPhotos } from './+store/actions';
import { selectGlobalPhotos } from './+store/selectors';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'photo-shoot';

  // photos$ = this.store.select(selectGlobalPhotos)

  constructor(
    public authService: AuthService, 
    // private store: Store<any>
  ) {}
  ngOnInit() {
    this.authService.autoAuthUser();
    // this.store.dispatch(loadPhotos())
    
  }
}
