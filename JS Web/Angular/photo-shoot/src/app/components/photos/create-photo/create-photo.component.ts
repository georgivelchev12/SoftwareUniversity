import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from 'src/app/core/services/photo.service';
import { mimeType } from './myme-type.validator';

@Component({
  selector: 'app-create-photo',
  templateUrl: './create-photo.component.html',
  styleUrls: ['./create-photo.component.scss'],
})
export class CreatePhotoComponent implements OnInit {
  imagePreview: string;

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    image: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType],
    }),
    categories: new FormArray([], []),
  });

  // currentPhoto;
  allCategories;
  selectedCategories;

  constructor(public photoService: PhotoService) {}

  ngOnInit() {
    this.getAllCategories();
  }

  create() {
    const course = {
      title: this.form.value.title,
      description: this.form.value.description,
      imgUrl: this.form.value.image,
      date: new Date().toLocaleDateString().split(' ')[0],
      author: null,
      categories: this.selectedCategories,
    };

    this.photoService.createPhoto(course).subscribe((data) => {
      console.log(data);
    });
  }

  getAllCategories() {
    this.photoService.getCategories().subscribe(({ categories }) => {
      this.allCategories = categories;

      this.allCategories.forEach((c) => {
        // Select form checkboxes which current course has. (Init form checkboxes)
        // let containsCategory = this.currentPhoto.categories.find((catInCourse) => catInCourse._id == c._id) || false;
        (this.form.get('categories') as FormArray).push(new FormControl(false));
      });
      this.getSelectedCategories();
    });
  }

  getSelectedCategories() {
    this.selectedCategories = this.form.controls.categories['controls'].map(
      (el, i) => {
        return (
          el.value && {
            _id: this.allCategories[i]._id,
            title: this.allCategories[i].title,
          }
        );
      }
    );

    // Get selected categories NAMES
    this.selectedCategories = this.selectedCategories.filter((category) => category !== false);
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
