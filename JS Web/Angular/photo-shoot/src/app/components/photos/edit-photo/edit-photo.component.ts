import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/core/services/category.service';
import { PhotoService } from 'src/app/core/services/photo.service';
import { CategoryValidator } from '../create-photo/category.validator';
import { mimeType } from '../create-photo/myme-type.validator';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: [
    './edit-photo.component.scss',
    '../create-photo/create-photo.component.scss',
  ],
})
export class EditPhotoComponent implements OnInit {
  imagePreview: string;

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(300),
    ]),
    image: new FormControl('', {
      asyncValidators: [mimeType],
    }),
    categories: new FormArray([], [CategoryValidator.minLengthCategories(1)]),
  });

  currentPhoto;
  allCategories;
  selectedCategories;
  onDragover;

  constructor(
    public photoService: PhotoService,
    public categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.photoService
      .getPhoto(this.route.snapshot.params.id)
      .subscribe((data) => {
        this.currentPhoto = data.photo;
        this.imagePreview = this.currentPhoto.imgUrl;
        this.form.controls.image.setValue(this.currentPhoto.imgUrl);
        this.form.patchValue({
          ...this.currentPhoto,
        });
        this.getAllCategories();
      });
  }

  edit() {
    const photo = {
      _id: this.currentPhoto._id,
      title: this.form.value.title,
      description: this.form.value.description,
      imgUrl: this.form.value.image != '' ? this.form.value.image : this.currentPhoto.imgUrl,
      categories: this.selectedCategories,
    };
    this.photoService.editPhoto(photo).subscribe((data) => {
      this.toastr.success(data['message'], 'Success!');
    });
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe(({ categories }) => {
      this.allCategories = categories;
      this.allCategories.forEach((c) => {
        // Select form checkboxes which current photo has. (Init form checkboxes)
        let containsCategory =
          this.currentPhoto.categories.find(
            (catInPhoto) => catInPhoto._id == c._id
          ) || false;
        (this.form.get('categories') as FormArray).push(
          new FormControl(containsCategory)
        );
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
    this.selectedCategories = this.selectedCategories.filter(
      (category) => category !== false
    );
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onRemoveImage() {
    this.imagePreview = '';
    this.form.patchValue({ image: '' });
    this.form.get('image').updateValueAndValidity();
    this.onDragover = false;
  }

  dragOver(event) {
    this.onDragover = true;
  }
  dragLeave(event) {
    this.onDragover = false;
  }
}
