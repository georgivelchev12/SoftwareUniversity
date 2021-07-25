import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePhotoComponent } from './create-photo/create-photo.component';
import { ListPhotosComponent } from './list-photos/list-photos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { DetailsPhotoComponent } from './details-photo/details-photo.component';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';

@NgModule({
  imports: [CommonModule,  RouterModule, FormsModule, ReactiveFormsModule, NgxPaginationModule],
  declarations: [CreatePhotoComponent, ListPhotosComponent, DetailsPhotoComponent, EditPhotoComponent],
  exports: [CreatePhotoComponent, ListPhotosComponent, DetailsPhotoComponent, EditPhotoComponent],
  providers: [],
})
export class PhotosModule {}
