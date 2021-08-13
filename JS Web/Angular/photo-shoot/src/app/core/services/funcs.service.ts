import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class FuncsService {
  constructor(private toastr: ToastrService) {}

  onImagePickedAction(event, $this, formControlName: string) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      $this.form.patchValue({ [formControlName]: file });
      $this.form.get(formControlName).updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        if ((reader.result as string) == 'data:') {
          this.toastr.error('Invalid image type!', 'Error');
          return;
        }
        let imgType = {
          image: () => ($this.imagePreview = reader.result as string),
          coverImage: () => ($this.coverImagePreview = reader.result as string),
        };
        imgType[formControlName]();
        // Edit user profile and cover image on image picked
        if ($this.editProfile) {
          $this.editProfile();
        }
      };
      reader.readAsDataURL(file);
    } else {
      this.toastr.error('You should select image', 'Error');
    }
  }
}
