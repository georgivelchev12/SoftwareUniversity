import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from 'src/app/core/services/photo.service';
import { mimeType } from './myme-type.validator';

@Component({
  selector: 'app-create-photo',
  templateUrl: './create-photo.component.html',
  styleUrls: ['./create-photo.component.scss'],
})
export class CreatePhotoComponent implements OnInit {
  imagePreview: string;
  course;
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl(null, {
      validators: [Validators.required],
      // asyncValidators: [mimeType],
    }),
  });
  constructor(public photoService: PhotoService) {}

  ngOnInit() {}

  create() {
    this.course = {
      title: this.form.value.title,
      description: 'ttest',
      imgUrl: this.form.value.image,
      date: new Date().toLocaleDateString().split(' ')[0],
      author: 'Jo',
      categories: [],
    };

    this.photoService.createPhoto(this.course).subscribe((data) => {
      console.log(data);
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
