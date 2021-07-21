import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthModel } from 'src/app/components/authentication/auth.model';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  token: string;
  isAuthenticated: boolean;
  tokenTimer: NodeJS.Timer;
  userRole: string;
  userEmail: string;

  constructor(
    private http: HttpClient,
    //  private toastr: ToastrService,
    private router: Router
  ) {}

  // Auth functions / Start
  register(user: AuthModel) {
    return this.http.post(`${BACKEND_URL}/register`, user).subscribe(
      (data) => {
        this.loginAction(data);
      },
      (err) => {}
    );
  }

  login(user: AuthModel) {
    return this.http
      .post<{
        token: string;
        expiresIn: number;
        currentUserRole: string;
        userEmail: string;
      }>(`${BACKEND_URL}/login`, user)
      .subscribe(
        (data) => {
          this.loginAction(data);
        },
        (err) => {}
      );
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
    //  this.toastr.success('You logout successfully!', 'Success!');
  }

  loginAction(data) {
    if (data.token) {
      this.token = data.token;
      const expiresInDuration = data.expiresIn;
      this.userRole = 'admin';
      this.userEmail = data.userEmail;

      this.tokenTimer = setTimeout(() => {
        this.logout();
      }, expiresInDuration * 1000);

      this.isAuthenticated = true;

      const now = new Date();
      const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

      this.saveAuthData(
        this.token,
        expirationDate,
        this.userRole,
        this.userEmail
      );
    }
  }
  // Auth functions / End

  
  editUser(user) {
    console.log('inAUthservice editUser: ', user);
    return this.http.post(`${BACKEND_URL}/edit/${user._id}`, user);
  }
  getMyProfile(){
    return this.http.get(`${BACKEND_URL}/myprofile`);
  }

  // Login / Logout functions
  getUserRole() {
    return this.userRole;
  }
  getUserEmail() {
    return this.userEmail;
  }
  getToken() {
    console.log('getToken() => ', this.token);
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.userRole = authInfo.userRole;
      this.userEmail = authInfo.userEmail;
      this.isAuthenticated = true;
      this.tokenTimer = setTimeout(() => {
        this.logout();
      }, expiresIn);
    }
  }

  // localStorage functions
  private saveAuthData(
    token: string,
    expirationDate: Date,
    userRole: string,
    userEmail: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('role', userRole);
    localStorage.setItem('email', userEmail);
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userRole = localStorage.getItem('role');
    const userEmail = localStorage.getItem('email');

    if (!token || !expirationDate || !userRole || !userEmail) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userRole,
      userEmail,
    };
  }

  // Login / Logout functions / END

  myProfile() {
    return this.http
      .get<{ message: string; users: Array<Object> }>(
        `${BACKEND_URL}/my-profile`
      )
      .pipe(map((userData) => this.mapId(userData)));
  }

  getUsers() {
    return this.http
      .get<{ message: string; users: Array<Object> }>(`${BACKEND_URL}/list`)
      .pipe(map((userData) => this.mapId(userData)));
  }

  disableUser(userId, body) {
    return this.http
      .put<{ message: string }>(`${BACKEND_URL}/${userId}`, body)
      .pipe((err) => err);
  }

  restoreUser(userId, body) {
    return this.http
      .put<{ message: string }>(`${BACKEND_URL}/restore-user/${userId}`, body)
      .pipe((err) => err);
  }

  deleteUser(userId) {
    return this.http
      .delete<{ message: string }>(`${BACKEND_URL}/${userId}`)
      .pipe((err) => err);
  }

  changeNames(model) {
    // Send only form model, because we store current user id in our req as userId - see ./backend/middleware/check-auth.js
    return this.http.put<{ message: string }>(
      `${BACKEND_URL}/my-profile/change-names`,
      model
    );
  }

  mapId(userData) {
    return userData.users.map((user) => {
      return {
        // Spread operator to make copy of user key:value instead of typing it all
        ...user,
        // Modify _id to be id in our local object
        id: user['_id'],
      };
    });
  }
}
