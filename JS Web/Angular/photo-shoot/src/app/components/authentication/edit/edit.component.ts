import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataSharingService } from 'src/app/core/services/data_sharing.service';
import { mimeType } from '../../photos/create-photo/myme-type.validator';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditUserComponent implements OnInit {
  imagePreview;
  coverImagePreview;
  profile;

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    info: new FormControl(''),
    phone: new FormControl(''),
    image: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [mimeType],
    }),
    coverImage: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [mimeType],
    }),
  });

  constructor(
    public authService: AuthService,
    public router: Router,
    private dataSharingService: DataSharingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authService.getMyProfile().subscribe((data) => {
      this.profile = data['user'];
      this.imagePreview = this.profile.imgUrl;
      this.coverImagePreview = this.profile.coverImgUrl;
      // fill form with fetched data
      this.form.patchValue({
        ...this.profile,
      });
      console.log(this.profile);
    });
  }

  edit() {
    this.profile = {
      email: this.form.value.email,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      info: this.form.value.info,
      phone: this.form.value.phone,
      imgUrl:
        this.form.value.image != ''
          ? this.form.value.image
          : this.profile.imgUrl,
      coverImgUrl:
        this.form.value.coverImage != ''
          ? this.form.value.coverImage
          : this.profile.coverImgUrl,
    };

    this.authService.editUser(this.profile).subscribe((data) => {
      console.log('Data from: ', data);
      this.dataSharingService.isDataChanged.next(true);
    });
  }

  onImagePicked(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.edit();
  }

  onCoverImagePicked(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ coverImage: file });
    this.form.get('coverImage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.coverImagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.edit();
  }
}
