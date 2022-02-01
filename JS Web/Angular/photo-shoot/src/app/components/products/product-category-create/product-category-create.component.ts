import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FuncsService } from 'src/app/core/services/funcs.service';
import { ProductService } from 'src/app/core/services/product.service';
import { mimeType } from '../../photos/create-photo/myme-type.validator';

@Component({
  selector: 'app-product-category-create',
  templateUrl: './product-category-create.component.html',
  styleUrls: ['./product-category-create.component.scss']
})
export class ProductCategoryCreateComponent implements OnInit {
  imagePreview: string;

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    parentId: new FormControl(''),
    image: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType],
    }),
  });

  categories;

  constructor(
    public productService: ProductService,
    public router: Router,
    public toastr: ToastrService,
    private funcsService: FuncsService
  ) {}

  ngOnInit() {
    this.productService.getProductsAndCategories('', '').subscribe((data) => {
      this.categories = data.descendants;
    });
  }

  create() {
    const category = {
      title: this.form.value.title,
      description: this.form.value.description,
      imgUrl: this.form.value.image,
      parentId: this.form.value.parentId
    };
    this.productService.createProductCategory(category).subscribe((data) => {
      this.toastr.success(data['message'], 'Success!');
      this.router.navigateByUrl('/product-categories');
    });
  }

  onImagePicked(event: Event) {
    this.funcsService.onImagePickedAction(event, this, 'image');
  }
}
