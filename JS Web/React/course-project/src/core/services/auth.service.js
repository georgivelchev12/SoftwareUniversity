import { environment } from "../../environment";
import fetcher from "../auth.interceptor";

const BACKEND_URL = environment.apiUrl + "/user";

const authService = {
  token: '',
  isAuthenticated: false,
  tokenTimer: null,
  userRole: '',
  userEmail: '',
}

export async function register(user) {
  let data = (
    await fetcher(`${BACKEND_URL}/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
  );

  const authService = loginAction(await data.json());
  return { data, authService };
}

export async function login(user) {
  let data = (
    await fetcher(`${BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
  );

  const authService = loginAction(await data.json());
  return { data, authService };
}

function loginAction(data) {
  console.log('loginAction', data);
  if (data.token) {
    authService.token = data.token;
    const expiresInDuration = data.expiresIn;
    authService.userRole = data.role;
    authService.userEmail = data.userEmail;

    authService.tokenTimer = setTimeout(() => {
      logout();
    }, expiresInDuration * 1000);

    authService.isAuthenticated = true;

    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

    saveAuthData(authService.token, expirationDate, authService.userRole, authService.userEmail, data.userId);
    return authService;
  }

  // dataSharingService.isDataChanged.next(true);
  // router.navigateByUrl("/");
  // toastr.success(data.message, "Success!");
}

export function logout() {
  authService.token = null;
  authService.isAuthenticated = false;
  clearAuthData();
  clearTimeout(authService.tokenTimer);
  // window.location = "/user/login";
  // Logout

  // router.navigateByUrl("/");
  // toastr.info("Logged out!", "Info");
}

// Called on app edit
export function autoAuthUser() {
  const authInfo = getAuthData();
  if (!authInfo) {
    return;
  }
  const now = new Date();
  const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
  if (expiresIn > 0) {
    authService.token = authInfo.token;
    authService.userRole = authInfo.userRole;
    authService.userEmail = authInfo.userEmail;
    authService.isAuthenticated = true;
    
    authService.tokenTimer = setTimeout(() => {
      logout();
    }, expiresIn);
  }
}

// Local storage / Start
export function saveAuthData(token, expirationDate, userRole, userEmail, userId) {
  localStorage.setItem("token", token);
  localStorage.setItem("expiration", expirationDate.toISOString());
  localStorage.setItem("role", userRole);
  localStorage.setItem("email", userEmail);
  localStorage.setItem("id", userId);
}
export function clearAuthData() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  localStorage.removeItem("role");
  localStorage.removeItem("email");
  localStorage.removeItem("id");
}
export function getAuthData() {
  const token = localStorage.getItem("token");
  const expirationDate = localStorage.getItem("expiration");
  const userRole = localStorage.getItem("role");
  const userEmail = localStorage.getItem("email");
  const userId = localStorage.getItem("id");

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


 // Get variables values
export function getUserRole() {
  return authService.userRole;
}
export function getUserEmail() {
  return authService.userEmail;
}
export function getToken() {
  return authService.token;
}
export function getIsAuth() {
  console.log('err>', authService.isAuthenticated);
  return authService.isAuthenticated;
}

export async function getMyProfile() {
  return (await fetcher(`${BACKEND_URL}/myprofile`)).json();
}

export async function getUsers() {
  return (await fetcher(`${BACKEND_URL}/list`)).json();
}

export async function getUser(id) {
  return (await fetcher(`${BACKEND_URL}/details/${id}`)).json();
}

export async function editUser(user, queryParams = ''){
  let postData;
  let hasImage = typeof user.imgUrl === 'object' || typeof user.coverImgUrl === 'object' ;
  if (hasImage) {
    postData = new FormData();
    postData.append('email', user.email);
    postData.append('firstName', user.firstName);
    postData.append('lastName', user.lastName);
    postData.append('info', user.info);
    postData.append('phone', user.phone);

    if (typeof user.imgUrl === 'object') {
      postData.append( 'image', user.imgUrl, `profileImage-${user.email.split('@')[0]}` );
    } else {
      postData.append('image', user.imgUrl);
    }

    if (typeof user.coverImgUrl === 'object') {
      postData.append( 'coverImage', user.coverImgUrl, `coverImage-${user.email.split('@')[0]}` );
    } else {
      postData.append('coverImage', user.coverImgUrl);
    }

  } else {
    postData = JSON.stringify({ ...user });
  }
  console.log('postData', hasImage);
  return (await fetcher(`${BACKEND_URL}/edit${queryParams}`, {
    method: "PUT",
    headers: hasImage ? {} : { "content-type": "application/json" },
    body: postData,
  })).json()
}


export default authService;
