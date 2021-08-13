import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/core/services/category.service';
import { FuncsService } from 'src/app/core/services/funcs.service';
import { mimeType } from '../../photos/create-photo/myme-type.validator';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss'],
})
export class CategoryCreateComponent implements OnInit {
  imagePreview: string;

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    image: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType],
    }),
  });

  constructor(
    public categoryService: CategoryService,
    public router: Router,
    public toastr: ToastrService,
    private funcsService: FuncsService
  ) {}

  ngOnInit() {}

  create() {
    const category = {
      title: this.form.value.title,
      description: this.form.value.description,
      imgUrl: this.form.value.image,
    };
    this.categoryService.createCategory(category).subscribe((data) => {
      this.toastr.success(data['message'], 'Success!');
      this.router.navigateByUrl('/categories');
    });
  }

  onImagePicked(event: Event) {
    this.funcsService.onImagePickedAction(event, this, 'image');
  }
}
