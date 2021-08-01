import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataSharingService } from 'src/app/core/services/data_sharing.service';
import { mimeType } from '../../photos/create-photo/myme-type.validator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  imagePreview;
  coverImagePreview;
  profile;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.pattern(/[A-Z][a-z]+/)]),
    lastName: new FormControl('', [Validators.pattern(/[A-Z][a-z]+/)]),
    info: new FormControl('', [Validators.maxLength(100)]),
    phone: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),
    image: new FormControl('', {
      asyncValidators: [mimeType],
    }),
    coverImage: new FormControl('', {
      asyncValidators: [mimeType],
    }),
  });

  constructor(
    public authService: AuthService,
    public router: Router,
    private dataSharingService: DataSharingService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if(this.router.url == '/user/profile'){

      this.authService.getMyProfile().subscribe((data) => {
        this.profile = data['user'];
        this.imagePreview = this.profile.imgUrl;
        this.coverImagePreview = this.profile.coverImgUrl;
        // fill form with fetched data
        this.form.patchValue({
          ...this.profile,
          image: '',
          coverImage: '',
        });
      });

    } else {
        this.authService.getUser(this.route.snapshot.params.id).subscribe((data) => {
        this.profile = data['user'];
        this.imagePreview = this.profile.imgUrl;
        this.coverImagePreview = this.profile.coverImgUrl;
      });
    }
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
      this.dataSharingService.isDataChanged.next(true);
      this.toastr.success('You edited your profile successfully', 'Success!')
    });
  }

  onImagePicked(event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        if ((reader.result as string) == 'data:') {
          this.toastr.error('Invalid image type!', 'Error');
          return;
        }
        this.imagePreview = reader.result as string;
        this.edit();
      };
      reader.readAsDataURL(file);
    } else {
      this.toastr.error('You should select image', 'Error');
    }
  }

  onCoverImagePicked(event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.form.patchValue({ coverImage: file });
      this.form.get('coverImage').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        if ((reader.result as string) == 'data:') {
          this.toastr.error('Invalid image type!', 'Error');
          return;
        }
        this.coverImagePreview = reader.result as string;
        this.edit();
      };
      reader.readAsDataURL(file);
    } else {
      this.toastr.error('You should select image', 'Error');
    }
  }

  deleteProfile() {
    let currentUserEmail = this.authService.getUserEmail();
    let doubleCheckText =
      this.profile.email == currentUserEmail
        ? 'Are you sure you want to delete your profile? You can\'t undo this action!'
        : `Are you sure you want to delete ${this.profile.firstName} ${this.profile.lastName}'s profile?`;

    if (confirm(doubleCheckText)) {
      this.authService.deleteUser(this.profile._id).subscribe(
        (data) => {
          this.toastr.success(data.message, 'Success!');
          if (this.profile.email == currentUserEmail) {
            this.authService.logout();
            return;
          }
        },
        (err) => {
          this.toastr.error(err.error.message, 'Error!');
        }
      );
    }
  }
}
