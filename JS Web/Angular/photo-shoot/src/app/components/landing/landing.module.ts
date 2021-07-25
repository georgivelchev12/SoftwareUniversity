import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryModule } from '../categories/category.module';
import { PhotosModule } from '../photos/photos.module';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [CommonModule, RouterModule, PhotosModule, CategoryModule],
  declarations: [HomeComponent, NotFoundComponent],
  exports: [HomeComponent, NotFoundComponent],
})
export class LandingModule {}
