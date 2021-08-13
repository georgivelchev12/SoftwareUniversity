import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './components/authentication/auth.module';
import { CategoryModule } from './components/categories/category.module';
import { LandingModule } from './components/landing/landing.module';
import { PhotosModule } from './components/photos/photos.module';
import { SharedModule } from './components/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './+store';
import { EffectsModule } from '@ngrx/effects';
import { GlobalEffects } from './+store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PhotosModule,
    SharedModule,
    LandingModule,
    CategoryModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module for toastr
    ToastrModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      GlobalEffects
    ]),
    StoreDevtoolsModule.instrument({})
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
