import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-list-authors',
  templateUrl: './list-authors.component.html',
  styleUrls: ['./list-authors.component.scss'],
})
export class ListAuthorsComponent implements OnInit {
  users = [];
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

  deleteProfile(id) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(id).subscribe(
        (data) => {
          this.toastr.success(data.message, 'Success!');
          this.getUsers();
        },
        (err) => {
          this.toastr.error(err.error.message, 'Error!');
        }
      );
    }
  }

  disableProfile(id) {
    this.authService.disableUser(id).subscribe(
      (data) => {
        this.toastr.success(data.message, 'Success!');
        this.getUsers();
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error!');
      }
    );
  }

  restoreProfile(id) {
    this.authService.restoreUser(id).subscribe(
      (data) => {
        this.toastr.success(data.message, 'Success!');
        this.getUsers();
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error!');
      }
    );
  }
}
