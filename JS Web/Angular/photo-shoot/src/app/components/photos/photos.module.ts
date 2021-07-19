import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePhotoComponent } from './create-photo/create-photo.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [CreatePhotoComponent],
  exports: [CreatePhotoComponent],
  providers: [],
})
export class PhotosModule {}
