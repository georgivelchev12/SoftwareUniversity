import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PhotosModule } from '../photos/photos.module';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SlickCarouselModule,
    PhotosModule
  ],
  declarations: [
    CategoryCreateComponent,
    CategoryDetailsComponent,
    CategoryListComponent,
    CategoryEditComponent
  ],
  exports: [
    CategoryCreateComponent,
    CategoryDetailsComponent,
    CategoryListComponent,
    CategoryEditComponent
  ],
})
export class CategoryModule {}
