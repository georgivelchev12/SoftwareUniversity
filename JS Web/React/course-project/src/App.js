import "./App.scss";
import ListPhotos from "./components/photos/list-photos/ListPhotos";
import Footer from "./components/shared/footer/Footer";
import Header from "./components/shared/header/Header";
import {
  getPhotos,
  getPhoto,
  deletePhoto,
} from "./core/services/photo.service";

import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, BrowserRouter } from "react-router-dom";
import Auth from "./components/authentication/Auth";
import authService, {
  autoAuthUser,
  getIsAuth,
  logout,
} from "./core/services/auth.service";
import { AuthenticatedRoute, NonAuthenticatedRoute } from "./core/guards/auth.guard";
import UserContext from "./Context";
import UserProfile from "./components/authentication/userProfile/UserProfile";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListAuthors from "./components/authentication/listAuthors/ListAuthors";
import { AdminRoute } from "./core/guards/admin.guard";
import CategoryList from "./components/categories/categoryList/CategoryList";
import Home from "./components/landing/home/Home";
import CategoryDetails from "./components/categories/categoryDetails/CategoryDetails";
import CategoryCreate from "./components/categories/categoryCreate/CategoryCreate";
import CategoryEdit from "./components/categories/categoryEdit/CategoryEdit";
import NotFound from "./components/landing/notFound/NotFound";
import DetailsPhotos from "./components/photos/details-photo/DetailsPhotos";
import CreatePhoto from "./components/photos/create-photo/CreatePhoto";
import EditPhoto from "./components/photos/edit-photo/EditPhoto";

function photoService() {
  // getPhotos("", "", 12, 1, "").then((res) => {
  //   console.log("getPhotos ->", res);
  // });

  // getPhoto("6118ff3a57ea442dd07fb3a7").then((res) => {
  //   console.log("getPhoto ->", res);
  // });

  // deletePhoto("6118ff3a57ea442dd07fb3a7").then((res) => {
  //   console.log("deletePhoto ->", res);
  // });
}
photoService();

function App() {
  autoAuthUser();
  const [user, setUser] = useState(authService.isAuthenticated ? {...authService} : {})

  const logIn = (userObject) => {
    setUser({
      ...userObject
    })
  } 

  const logOut = () => {   
    setUser({
      token: '',
      isAuthenticated: false,
      tokenTimer: null,
      userRole: '',
      userEmail: '',
    });
  }

  // Scrolls to top of page when components changes
  function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }

  return (
    <UserContext.Provider value={{...user, logIn, logOut}}>
    <ToastContainer />
    <main role="main">
    <Router basename="/photo-shoot">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home /> }/>
        <Route path="/user/login" element={<NonAuthenticatedRoute><Auth toggleSlide={false} /></NonAuthenticatedRoute>} />
        <Route path="/user/register" element={<NonAuthenticatedRoute><Auth toggleSlide={true} /></NonAuthenticatedRoute>} />
        <Route path="/user/profile" element={<AuthenticatedRoute><UserProfile /></AuthenticatedRoute>} />
        <Route path="/user/details/:id" element={<UserProfile />} />
        <Route path="/user/profiles" element={<AdminRoute><ListAuthors /></AdminRoute>} />

        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/:id" element={<CategoryDetails />} />
        <Route path="/categories/create" element={<AdminRoute><CategoryCreate /></AdminRoute>} />
        <Route path="/categories/edit/:id" element={<AdminRoute><CategoryEdit /></AdminRoute>} />

        <Route path="/photo/list" element={<ListPhotos />} />
        <Route path="/photo/details/:id" element={<DetailsPhotos />} />
        <Route path="/photo/edit/:id" element={<EditPhoto />} />
        <Route path="/photo/create" element={<CreatePhoto />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
      <Footer />
    </Router>

    </main>
    </UserContext.Provider>
  );
}

export default App;
