import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditUserComponent implements OnInit {
  imagePreview;
  profile;

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    info: new FormControl(''),
    phone: new FormControl(''),
    image: new FormControl(null, {
      validators: [Validators.required],
      // To do ....
      // asyncValidators: [mimeType],
    }),
  });


  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.getMyProfile().subscribe(data => {
      this.profile = data['user'];
      console.log(this.profile);
    })
  }

  edit(){
    console.log(this.form.value);
    this.profile = this.form.value;
    console.log(this.profile);
    this.authService.editUser(this.profile).subscribe(data => {
      console.log('Data from: ', data);
    })
  }

  onImagePicked(event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
