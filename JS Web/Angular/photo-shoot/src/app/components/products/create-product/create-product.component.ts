import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FuncsService } from 'src/app/core/services/funcs.service';
import { ProductService } from 'src/app/core/services/product.service';
import { CategoryValidator } from '../../photos/create-photo/category.validator';
import { mimeType } from '../../photos/create-photo/myme-type.validator';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  
  form = new FormGroup({
    title: new FormControl('', [ Validators.required, Validators.maxLength(100) ]),
    shortDescription: new FormControl('', [ Validators.required, Validators.maxLength(1500) ]),
    description: new FormControl('', [ Validators.required, Validators.maxLength(5000) ]),
    oldPrice: new FormControl('', [ Validators.pattern(/^[\d\.,]+$/) ]),
    price: new FormControl('', [ Validators.pattern(/^[\d\.,]+$/) ]),
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

  constructor(
    public productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private funcsService: FuncsService
  ) {}

  ngOnInit() {
    this.getAllCategories();
  }

  create() {
    const product = {
      title: this.form.value.title,
      shortDescription: this.form.value.shortDescription,
      description: this.form.value.description,
      oldPrice: this.form.value.oldPrice,
      price: this.form.value.price,
      imgUrl: this.form.value.image,
      categories: this.selectedCategories,
    };

    this.productService.createProduct(product).subscribe(({ message, product }) => {
      this.toastr.success(message, 'Success!');
      this.router.navigateByUrl('/product/' + product._id);
    });
  }

  getAllCategories() {
    this.productService.getProductsAndCategories('', '').subscribe((data) => {
      this.allCategories = data.descendants;

      // Check if current category has child and add space tab for better looking
      // Example: 
      // cat1
      //   childCat1
      //   childCat2
      // cat2
      // cat3
      
      this.allCategories.reduce((c, acc) => {
        if(c.lvl <= acc.lvl){
          acc.addSpaceTab = true;
          return acc;
        }
        return c;
      })

      // let test  = this.list_to_tree(this.allCategories);
      // console.log(test);

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



  // list_to_tree(dataset) {
  //   const hashTable = Object.create(null);
  //   dataset.forEach(aData => hashTable[aData._id] = {...aData, childNodes: []});
  //   const dataTree = [];
  //   dataset.forEach(aData => {
  //     if(aData.parentId && aData.lvl > 1) {
  //       hashTable[aData.parentId].childNodes.push(hashTable[aData._id])
  //     }
  //     else {
  //       dataTree.push(hashTable[aData._id])
  //     }
  //   });
  //   return dataTree;
  // }
  
}
