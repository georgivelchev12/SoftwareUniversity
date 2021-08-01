import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthModel } from 'src/app/components/authentication/auth.model';
import { DataSharingService } from './data_sharing.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
    private router: Router,
    private dataSharingService: DataSharingService
  ) {}

  // Auth functions / Start
  register(user: AuthModel) {
    return this.http.post(`${BACKEND_URL}/register`, user).subscribe(
      (data) => {
        this.loginAction(data);
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error!')
      }
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
        (err) => {
          this.toastr.error(err.error.message, 'Error!')
        }
      );
  }

  loginAction(data) {
    if (data.token) {
      this.token = data.token;
      const expiresInDuration = data.expiresIn;
      this.userRole = data.role;
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
        this.userEmail,
        data.userId
      );
    }

    this.dataSharingService.isDataChanged.next(true);
    this.router.navigateByUrl('/');
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.router.navigateByUrl('/');
    this.toastr.info('Logged out!', 'Info');
  }

  getUserRole() {
    return this.userRole;
  }
  getUserEmail() {
    return this.userEmail;
  }
  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }

  // Called on app edit
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
  // Auth functions / End


  // Local storage / Start
  private saveAuthData(
    token: string,
    expirationDate: Date,
    userRole: string,
    userEmail: string,
    userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('role', userRole);
    localStorage.setItem('email', userEmail);
    localStorage.setItem('id', userId);
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userRole = localStorage.getItem('role');
    const userEmail = localStorage.getItem('email');
    const userId = localStorage.getItem('id');

    if (!token || !expirationDate || !userRole || !userEmail || !userId) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userRole,
      userEmail,
      userId,
    };
  }
  // Local storage / End




  getUsers() {
    return this.http.get<{ message: string; users: Array<Object> }>(`${BACKEND_URL}/list`);
  }

  getUser(id) {
    return this.http.get<{ message: string; user: Object }>(`${BACKEND_URL}/details/${id}`);
  }

  disableUser(userId) {
    return this.http.put<{ message: string }>(`${BACKEND_URL}/disable/${userId}`, {});
  }

  restoreUser(userId) {
    return this.http.put<{ message: string }>(`${BACKEND_URL}/restore/${userId}`, {});
  }

  deleteUser(userId) {
    return this.http.delete<{ message: string }>(`${BACKEND_URL}/delete/${userId}`);
  }


  editUser(user) {
    let postData;
    if (
      typeof user.imgUrl === 'object' ||
      typeof user.coverImgUrl === 'object'
    ) {
      postData = new FormData();
      postData.append('email', user.email);
      postData.append('firstName', user.firstName);
      postData.append('lastName', user.lastName);
      postData.append('info', user.info);
      postData.append('phone', user.phone);

      if (typeof user.imgUrl === 'object') {
        postData.append(
          'image',
          user.imgUrl,
          `profileImage-${user.email.split('@')[0]}`
        );
      } else {
        postData.append('image', user.imgUrl);
      }

      if (typeof user.coverImgUrl === 'object') {
        postData.append(
          'coverImage',
          user.coverImgUrl,
          `coverImage-${user.email.split('@')[0]}`
        );
      } else {
        postData.append('coverImage', user.coverImgUrl);
      }
    } else {
      postData = {
        ...user,
      };
    }
    return this.http.put(`${BACKEND_URL}/edit`, postData);
  }
  getMyProfile() {
    return this.http.get(`${BACKEND_URL}/myprofile`);
  }
}