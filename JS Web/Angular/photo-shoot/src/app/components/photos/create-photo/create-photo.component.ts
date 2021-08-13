import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/core/services/category.service';
import { FuncsService } from 'src/app/core/services/funcs.service';
import { PhotoService } from 'src/app/core/services/photo.service';
import { CategoryValidator } from './category.validator';
import { mimeType } from './myme-type.validator';

@Component({
  selector: 'app-create-photo',
  templateUrl: './create-photo.component.html',
  styleUrls: ['./create-photo.component.scss'],
})
export class CreatePhotoComponent implements OnInit {
  imagePreview: string;

  form = new FormGroup({
    title: new FormControl('', [ Validators.required, Validators.maxLength(50) ]),
    description: new FormControl('', [ Validators.required, Validators.maxLength(300) ]),
    image: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType],
    }),
    categories: new FormArray([], [ CategoryValidator.minLengthCategories(1) ]),
  });

  // currentPhoto;
  allCategories;
  selectedCategories;
  onDragover;

  constructor(
    public photoService: PhotoService,
    public categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router,
    private funcsService: FuncsService
  ) {}

  ngOnInit() {
    this.getAllCategories();
  }

  create() {
    const photo = {
      title: this.form.value.title,
      description: this.form.value.description,
      imgUrl: this.form.value.image,
      date: new Date().toLocaleDateString().split(' ')[0],
      author: null,
      categories: this.selectedCategories,
    };

    this.photoService.createPhoto(photo).subscribe(({ message }) => {
      this.toastr.success(message, 'Success!');
      this.router.navigateByUrl('/user/profile');
    });
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe(({ categories }) => {
      if(categories.length == 0){
        this.router.navigateByUrl('/categories/create');
        this.toastr.warning('You need to create categories first!');
        return;
      }
      this.allCategories = categories;

      this.allCategories.forEach((c) => {
        // Select form checkboxes which current Photo has. (Init form checkboxes)
        // let containsCategory = this.currentPhoto.categories.find((catInPhoto) => catInPhoto._id == c._id) || false;
        (this.form.get('categories') as FormArray).push(new FormControl(false));
      });
      // this.getSelectedCategories();
    });
  }

  getSelectedCategories() {
    this.form.get('categories').markAsTouched();

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
    this.funcsService.onImagePickedAction(event, this, 'image');
  }

  onRemoveImage() {
    this.imagePreview = '';
    this.form.patchValue({ image: null });
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
