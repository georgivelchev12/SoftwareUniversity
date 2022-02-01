import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss']
})
export class DetailsProductComponent implements OnInit {
  
  slideConfig = {
    slidesToShow: 2,
    swipeToSlide: true,
    arrows: true,
    dots: true,
    mobileFirst: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
        },
      },
    ],
  };

  product;
  similarProducts;
  disableClickEvent = false;

  constructor(
    public productService: ProductService,
     public route: ActivatedRoute,
     public router: Router
     ) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     }

  ngOnInit() {
    this.productService.getProduct(this.route.snapshot.params.id).subscribe(({message, product}) => {
      this.product = product;
     
      console.log(this.product);
      this.product.oldPrice = Number(this.product.oldPrice);
      this.product.price = Number(this.product.price);
      
      this.similarProducts = []
      .concat
      .apply([], this.product.categories.map(category => category.products))
      .map(p => {
        p.oldPrice = Number(p.oldPrice);
        p.price = Number(p.price);
        return p;
      })
      .filter(p => this.product._id != p._id)
     // Merge all products from categories & remove current product
    })
  }


  
  onClick(event, product) {
    if (!this.disableClickEvent) {
      this.router.navigateByUrl('/product/' + product._id);
    }
  }
  beforeChange(event) {
    this.disableClickEvent = true;
  }
  afterChange(event) {
    this.disableClickEvent = false;
  }
}
