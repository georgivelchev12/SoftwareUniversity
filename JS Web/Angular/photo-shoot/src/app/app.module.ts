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
    
    // To do ... remove it from here and set it in shared module
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
