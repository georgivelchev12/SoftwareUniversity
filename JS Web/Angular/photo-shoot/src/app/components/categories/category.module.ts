import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SlickCarouselModule,
  ],
  declarations: [
    CategoryCreateComponent,
    CategoryDetailsComponent,
    CategoryListComponent,
  ],
  exports: [
    CategoryCreateComponent,
    CategoryDetailsComponent,
    CategoryListComponent,
  ],
})
export class CategoryModule {}
