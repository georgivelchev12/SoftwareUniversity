import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-list-authors',
  templateUrl: './list-authors.component.html',
  styleUrls: ['./list-authors.component.scss']
})
export class ListAuthorsComponent implements OnInit {
  users;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.getUsers().subscribe(data => {
      this.users = data.users;
      this.users = this.users.filter(u => {
        return u.imgUrl !== '' && u.firstName !== '' && u.lastName !== ''
      })
      console.log(this.users);
    })
  }

}
