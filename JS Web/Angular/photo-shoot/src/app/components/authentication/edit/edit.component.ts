import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  imagePreview;

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    image: new FormControl(null, {
      validators: [Validators.required],
      // asyncValidators: [mimeType],
    }),
    categories: new FormArray([], []),
  });


  constructor(public authService: AuthService) {}

  ngOnInit() {}

  edit(){
    
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
