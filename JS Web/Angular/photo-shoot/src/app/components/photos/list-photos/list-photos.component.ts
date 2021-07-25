import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { PhotoService } from 'src/app/core/services/photo.service';

@Component({
  selector: 'app-list-photos',
  templateUrl: './list-photos.component.html',
  styleUrls: ['./list-photos.component.scss'],
})
export class ListPhotosComponent implements OnInit {
  @Input() myPhotos: string;
  photos;
  currentPage = 1;
  itemsPerPage = 7;
  totalItems;

  constructor(
    public photoService: PhotoService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getPhotos();
  }

  getPage(event) {
    this.currentPage = event;
    this.getPhotos();
  }

  deletePhoto(id) {
    this.photoService.deletePhoto(id).subscribe(({ message }) => {
      this.toastr.success(message, 'Success!');
      this.getPhotos();
    });
  }
  likePhoto(id) {}

  getPhotos() {
    this.photoService
      .getPhotos(this.myPhotos, this.itemsPerPage, this.currentPage)
      .subscribe(({ message, photos, count }) => {
        this.photos = photos;
        this.totalItems = count;
        console.log(photos, count);
      });
  }
}
