import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { PhotoService } from 'src/app/core/services/photo.service';

@Component({
  selector: 'app-list-photos',
  templateUrl: './list-photos.component.html',
  styleUrls: ['./list-photos.component.scss'],
})
export class ListPhotosComponent implements OnInit, OnChanges {
  @Input() myPhotos: string;
  @Input() userPhotos: string;
  @Input() category: string;
  photos;
  currentPage = 1;
  itemsPerPage = 12;
  totalItems;
  currUserId;

  constructor(
    public photoService: PhotoService,
    private toastr: ToastrService,
    // public activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    if (this.router.url == '/user/profile') {
      this.itemsPerPage = 7;
    }
    this.currUserId = localStorage.getItem('id');
    this.getPhotos();
  }
  ngOnChanges() {
    this.getPhotos();
  }

  getPage(event) {
    this.currentPage = event;
    this.getPhotos();
  }

  deletePhoto(id) {
    this.photoService.deletePhoto(id).subscribe(
      ({ message }) => {
        this.toastr.success(message, 'Success!');
        this.getPhotos();
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error!');
      }
    );
  }
  likePhoto(id) {}

  getPhotos() {
    this.photoService
      .getPhotos(
        this.userPhotos,
        this.myPhotos,
        this.itemsPerPage,
        this.currentPage,
        this.category
      )
      .subscribe(({ message, photos, count }) => {
        this.photos = photos;
        this.totalItems = count;
      });
  }
}
