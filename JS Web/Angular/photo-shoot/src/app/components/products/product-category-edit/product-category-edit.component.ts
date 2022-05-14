import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FuncsService } from 'src/app/core/services/funcs.service';
import { ProductService } from 'src/app/core/services/product.service';
import { mimeType } from '../../photos/create-photo/myme-type.validator';

@Component({
  selector: 'app-product-category-edit',
  templateUrl: './product-category-edit.component.html',
  styleUrls: ['./product-category-edit.component.scss']
})
export class ProductCategoryEditComponent implements OnInit {
  imagePreview: string;

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    parentId: new FormControl(''),
    image: new FormControl('', {
      asyncValidators: [mimeType],
    }),
  });

  categories;
  currentCategory;

  constructor(
    public productService: ProductService,
    public router: Router,
    public route: ActivatedRoute,
    public toastr: ToastrService,
    private funcsService: FuncsService
  ) {}

  ngOnInit() {
    this.productService.getProductsAndCategories('', '').subscribe((data) => {
      this.categories = data.descendants;
      this.productService
        .getProductCategory(this.route.snapshot.params.id)
        .subscribe(({ message, category }) => {
          this.currentCategory = category;
          this.imagePreview = this.currentCategory.imgUrl;
          this.form.patchValue({
            title: this.currentCategory.title,
            description: this.currentCategory.description,
            image: '',
          });
        });
    });
  }

  edit() {
    const category = {
      _id: this.currentCategory._id,
      title: this.form.value.title,
      description: this.form.value.description,
      imgUrl: this.form.value.image != '' ? this.form.value.image : this.currentCategory.imgUrl,
      parentId: this.form.value.parentId
    };
    this.productService.editProductCategory(category).subscribe((data) => {
      this.toastr.success(data['message'], 'Success!');
      this.router.navigateByUrl('/product-categories?categoryId=' + this.currentCategory._id);
    });
  }

  deleteCategory(){
    this.productService.deleteProductCategory(this.currentCategory._id).subscribe((data) => {
      this.toastr.success('Product category deleted!', 'Success!');
      this.router.navigateByUrl(`/product-categories`);
    });
  }

  onImagePicked(event: Event) {
    this.funcsService.onImagePickedAction(event, this, 'image');
  }
}
