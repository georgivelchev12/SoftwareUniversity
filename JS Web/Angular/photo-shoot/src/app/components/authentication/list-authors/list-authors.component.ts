import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-list-authors',
  templateUrl: './list-authors.component.html',
  styleUrls: ['./list-authors.component.scss'],
})
export class ListAuthorsComponent implements OnInit {
  users: Array<UserModel> = [];
  constructor(
    public authService: AuthService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getUsers();
  }
  
  getUsers() {
    this.authService.getUsers().subscribe((data) => {
      this.users = data.users;
      this.users = this.users.filter((u) => {
        if (this.router.url == '/') {
          // Showing only users with full information
          return (
            u.imgUrl !== '' &&
            u.firstName !== '' &&
            u.lastName !== '' &&
            u.email != this.authService.getUserEmail() &&
            u.isDisabled != true
          );
        }
        return u.email != this.authService.getUserEmail();
      });
    });
  }

  profileAction(query){
    if(query.includes('delete') && !confirm('Are you sure you want to delete this user?')){
      return;
    }
    this.authService.editUser({}, query).subscribe(
      data => {
        this.toastr.success(data.message, 'Success!');
        this.getUsers();
      },
      err => {
        this.toastr.error(err.error.message, 'Error!');
      }
    );
  }
  
}
