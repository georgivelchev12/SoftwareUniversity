import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/core/services/category.service';
import { FuncsService } from 'src/app/core/services/funcs.service';
import { mimeType } from '../../photos/create-photo/myme-type.validator';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
})
export class CategoryEditComponent implements OnInit {
  imagePreview;
  category;
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.maxLength(300)]),
    image: new FormControl('', {
      asyncValidators: [mimeType],
    }),
  });
  constructor(
    public categoryService: CategoryService,
    public router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private funcsService: FuncsService
  ) {}

  ngOnInit() {
    this.categoryService
      .getCategory(this.route.snapshot.params.id)
      .subscribe(({ message, category }) => {
        this.category = category;
        this.imagePreview = this.category.imgUrl;
        this.form.patchValue({
          ...this.category,
          image: '',
        });
      });
  }

  edit() {
    this.category = {
      _id: this.category._id,
      title: this.form.value.title,
      description: this.form.value.description,
      imgUrl: this.form.value.image != '' ? this.form.value.image : this.category.imgUrl,
    };

    this.categoryService.editCategory(this.category).subscribe((data) => {
      this.toastr.success(data['message'], 'Success!');
      this.router.navigateByUrl(`/categories/${this.category._id}`);
    });
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.category._id).subscribe((data) => {
      this.toastr.success('Category deleted!', 'Success!');
      this.router.navigateByUrl(`/categories`);
    });
  }

  onImagePicked(event) {
    this.funcsService.onImagePickedAction(event, this, 'image');
  }
}
