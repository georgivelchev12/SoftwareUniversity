import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PhotoService } from 'src/app/core/services/photo.service';

@Component({
  selector: 'app-details-photo',
  templateUrl: './details-photo.component.html',
  styleUrls: ['./details-photo.component.scss'],
})
export class DetailsPhotoComponent implements OnInit {
  photo;
  currUserId;
  constructor(
    public photoService: PhotoService,
    private route: ActivatedRoute,
    public router: Router,
    public toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.currUserId = localStorage.getItem('id');
    this.photoService
      .getPhoto(this.route.snapshot.params.id)
      .subscribe((data) => {
        this.photo = data.photo;
      });
  }

  deletePhoto(id) {
    this.photoService.deletePhoto(id).subscribe(
      ({ message }) => {
        this.toastr.success(message, 'Success!');
        this.router.navigateByUrl('/')
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error!');
      }
    );
  }
}
