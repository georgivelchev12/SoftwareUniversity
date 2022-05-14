import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FuncsService } from 'src/app/core/services/funcs.service';
import { ProductService } from 'src/app/core/services/product.service';
import { CategoryValidator } from '../../photos/create-photo/category.validator';
import { mimeType } from '../../photos/create-photo/myme-type.validator';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  
  form = new FormGroup({
    title: new FormControl('', [ Validators.required, Validators.maxLength(100) ]),
    shortDescription: new FormControl('', [ Validators.required, Validators.maxLength(1500) ]),
    description: new FormControl('', [ Validators.required, Validators.maxLength(5000) ]),
    oldPrice: new FormControl('', [ Validators.pattern(/^[\d\.,]+$/) ]),
    price: new FormControl('', [ Validators.required, Validators.pattern(/^[\d\.,]+$/) ]),
    image: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType],
    }),
    categories: new FormArray([], [ CategoryValidator.minLengthCategories(1) ]),
  });

  allCategories;
  selectedCategories;
  onDragover;
  
  imagePreview: string;
  currentProduct;

  constructor(
    public productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private funcsService: FuncsService
  ) {}

  ngOnInit() {
    this.productService
    .getProduct(this.route.snapshot.params.id)
    .subscribe((data) => {
      this.currentProduct = data.product;
      this.imagePreview = this.currentProduct.imgUrl;
      this.form.controls.image.setValue(this.currentProduct.imgUrl);
      this.form.patchValue({
        ...this.currentProduct,
      });
      this.getAllCategories();
    });
  }

  edit() {
    const product = {
      _id: this.currentProduct._id,
      title: this.form.value.title,
      shortDescription: this.form.value.shortDescription,
      description: this.form.value.description,
      oldPrice: this.form.value.oldPrice,
      price: this.form.value.price,
      imgUrl: this.form.value.image != '' ? this.form.value.image : this.currentProduct.imgUrl,
      categories: this.selectedCategories,
    };

    this.productService.editProduct(product).subscribe((data) => {
      this.toastr.success(data['message'], 'Success!');
      this.router.navigateByUrl('/product/' + this.currentProduct._id);
    });
  }

  getAllCategories() {

    this.productService.getProductsAndCategories('', '').subscribe((data) => {
      this.allCategories = data.descendants;

      this.allCategories.reduce((c, acc) => {
        if(c.lvl <= acc.lvl){
          acc.addSpaceTab = true;
          return acc;
        }
        return c;
      })

      this.allCategories.forEach((c) => {
        // Select form checkboxes which current photo has. (Init form checkboxes)
        if(this.currentProduct.categories){
          const containsCategory = this.currentProduct.categories.find((catInProduct) => catInProduct._id == c._id) || false;
          (this.form.get('categories') as FormArray).push(new FormControl(containsCategory));
        } else {
          (this.form.get('categories') as FormArray).push(new FormControl(false));
        }
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



  deleteProduct(){
    
  }
}
