
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import UserContext from "../../../Context";
import { editUser, getMyProfile, getUser, logout } from "../../../core/services/auth.service";
import { onImagePickedAction } from "../../../core/services/helper.service";
import ListPhotos from "../../photos/list-photos/ListPhotos";
import "./UserProfile.scss";
import { toast } from 'react-toastify';

function UserProfile() {
  const { id } = useParams();

  const location = useLocation();
  const context = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [coverImagePreview, setCoverImagePreview] = useState('');

  useEffect(() => {
    if(location.pathname == '/user/profile'){
      getMyProfile().then(data => {
        const user= data['user'];
        setProfile(user);
        setImagePreview(user.imgUrl);
        setCoverImagePreview(user.coverImgUrl);
      });
    } else {
      getUser(id).then(data => {
        const user= data['user'];
        setProfile(user);
        setImagePreview(user.imgUrl);
        setCoverImagePreview(user.coverImgUrl);
      });
    }
  }, [context])


  function onImagePicked(event) {
    onImagePickedAction(event, setImagePreview, setCoverImagePreview);
    setProfile((prevState) => {
      let newStateProfile = {
        ...prevState,
        imgUrl: event.target.name == 'image' ? event.target.files[0] : prevState.imgUrl,
        coverImgUrl: event.target.name == 'coverImage' ? event.target.files[0] : prevState.coverImgUrl,
      };
      editProfile(event, newStateProfile)
      return newStateProfile;
    });
  }


  function onInputChange(event){
    event.preventDefault();
    setProfile((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      }
    });
  }

  async function editProfile(event, currProfile = undefined) {
    event.preventDefault()
    editUser(currProfile || profile).then(res => {
      toast.success(res.message, { theme: "colored" });
    }).catch(err => {
      console.error(err);
    })
  }

  function profileAction(query) {
    let currentUserEmail = localStorage.getItem('email');
    let doubleCheckText =
      profile.email == currentUserEmail
        ? "Are you sure you want to delete your profile? You can't undo this action!"
        : `Are you sure you want to delete ${profile.firstName} ${profile.lastName}'s profile?`;

    if (window.confirm(doubleCheckText)) {
      
      editUser({}, query)
        .then((data) => {
            toast.success(data.message, { theme: "colored" });
            if (profile.email == currentUserEmail) {
              logoutHandler()
              return;
            }
        })
        .catch((err) => {
          toast.error(err.error.message, { theme: "colored" });
        });
    }
  }
 
  function logoutHandler() {
    logout();
    setRedirect(true)
  };

  return (
    <>
      {redirect && <Navigate to="/user/login" />}
      <form id="profile_form" onSubmit={editProfile}>
        <div className="cover_img">
          <div className="image-preview">
            <img src={coverImagePreview || 'https://wallpaperaccess.com/full/2890220.jpg'} />
          </div>
          {
            location.pathname == '/user/profile' 
            ? <div className="row">
                <div className="col">
                  <label htmlFor="coverPick" className="btn">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <span className="btn-text">
                      <span className="text">Update cover photo</span>
                      <span className="sub-text">minimum size 1920x475</span>
                    </span>
                  </label>
                  <input id="coverPick" type="file" name="coverImage" onChange={onImagePicked} />
                </div>
              </div>
            : (<></>)
          }
        </div>

        <div className="profile_img">
          {
            location.pathname == '/user/profile' ?
            <input id="profile_pic" type="file" name="image" onChange={onImagePicked} /> :
            (<></>)
          }
          <div className="image-preview">
            <label htmlFor="profile_pic" className={location.pathname == '/user/profile' ? 'fas fa-camera': ''}>
              <div className="img_wrap">
                <img src={imagePreview || 'https://i2.wp.com/upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'} />
              </div>
            </label>
          </div>
          <h1>{profile.firstName} {profile.lastName}</h1>
        </div>

        {
          location.pathname == '/user/profile' ? (
            <section className="profile_information">
              <div className="row">
                <div className="col">

                  <div className="filter_tabs">
                    <ul className="tabs default_hide medium_flex">
                      <li className="tab active">
                        <a data-panel="#panel_1">My photos</a>
                      </li>
                      <li className="tab">
                        <a data-panel="#panel_2">Edit profile</a>
                      </li>
                      <li className="tab danger">
                        <a data-panel="#panel_3" onClick={(e) => {
                          e.preventDefault(); 
                          logoutHandler()
                        }}>Logout</a>
                      </li>
                    </ul>

                    <select className="tabs_filter filter_select medium_hide">
                      <option value="#panel_1">My Photos</option>
                      <option value="#panel_2">Edit profile</option>
                    </select>

                    <div className="wrap_box panels">
                      <div className="panel panel_1">
                        <ListPhotos myPhotos={'&myPhotos=true'}/>
                      </div>
                      <div className="panel panel_2" style={{display:'none'}}>
                        
                        <div className="row default_center">
                          <div className="col medium_8">
                            <div className="row default_center">

                              <div className="col">
                                <div className="input_wrapper required">
                                  <label className="small_title">
                                    Email <span className="fas fa-exclamation-circle color_accent"></span> {/***ngIf="!form.get('email').valid && form.get('email').touched" */}
                                  </label>
                                  <input type="text" name="email" placeholder="Email" value={profile.email || ''} onChange={onInputChange} />
                                  {/* <div className="errors" *ngIf="!form.get('email').valid && form.get('email').touched">
                                    <span *ngIf="form.get('email').hasError('required')">Email is required</span>
                                    <span *ngIf="form.get('email').hasError('email')">Email is invalid</span>
                                  </div> */}
                                </div>

                              </div>
                              <div className="col small_6 large_4">
                                <div className="input_wrapper">
                                  <label className="small_title">
                                    First name <span className="fas fa-exclamation-circle color_accent"></span> {/** *ngIf="!form.get('firstName').valid && form.get('firstName').touched" */}
                                  </label>
                                  <input type="text" name="firstName" placeholder="First Name" value={profile.firstName || ''} onChange={onInputChange} />
                                  {/* <div className="errors" *ngIf="!form.get('firstName').valid && form.get('firstName').touched">
                                    <span *ngIf="form.get('firstName').hasError('pattern')">First name must start with capital
                                      letter</span>
                                  </div> */}
                                </div>
                              </div>
                              <div className="col small_6 large_4">
                                <div className="input_wrapper">
                                  <label className="small_title">
                                    Last name <span className="fas fa-exclamation-circle color_accent"></span> {/***ngIf="!form.get('lastName').valid && form.get('lastName').touched" */}
                                  </label>
                                  <input type="text" name="lastName" placeholder="Last Name" value={profile.lastName || ''} onChange={onInputChange} />
                                  {/* <div className="errors" *ngIf="!form.get('lastName').valid && form.get('lastName').touched">
                                    <span *ngIf="form.get('lastName').hasError('pattern')">Last name must start with capital
                                      letter</span>
                                  </div> */}
                                </div>
                              </div>
                              <div className="col large_4">
                                <div className="input_wrapper">
                                  <label className="small_title">
                                    Phone number <span className="fas fa-exclamation-circle color_accent"></span> {/* *ngIf="!form.get('phone').valid && form.get('phone').touched" */}
                                  </label>
                                  <input type="number" name="phone" placeholder="Phone" value={profile.phone || ''} onChange={onInputChange} />
                                  {/* <div className="errors" *ngIf="!form.get('phone').valid && form.get('phone').touched">
                                    <span *ngIf="form.get('phone').hasError('pattern')">Phone number must be numbers only</span>
                                  </div> */}
                                </div>
                              </div>
                              <div className="col">
                                <div className="input_wrapper">
                                  <label className="small_title">
                                    Short information about you <span className="fas fa-exclamation-circle color_accent"></span> {/***ngIf="!form.get('info').valid && form.get('info').touched" */}
                                  </label>
                                  <textarea name="info" placeholder="Short info" rows="5" value={profile.info || ''} onChange={onInputChange}></textarea>
                                  {/* <div className="errors" *ngIf="!form.get('info').valid && form.get('info').touched">
                                    <span *ngIf="form.get('info').hasError('maxlength')">Information is too long</span>
                                  </div> */}
                                </div>
                              </div>
                              <div className="col small_4">
                                <button type="submit" className="btn wide">Edit</button>
                              </div>


                              <div className="col">
                                <div className="row default_center danger_zone">
                                  <div className="col giant_6">
                                    <button type="button" onClick={() => profileAction(`?delete=${profile._id}`)}>Delete my profile and all images in it</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section className="profile_information" > 
              <div className="row">
                <div className="col">

                  <div className="filter_tabs">
                    <ul className="tabs default_hide medium_flex">
                      <li className="tab active">
                        <a data-panel="#panel_1">Photos</a>
                      </li>
                      <li className="tab">
                        <a data-panel="#panel_2">Details</a>
                      </li>
                      {/* <!-- <li className="tab danger">
                        <a href="#" (click)="authService.logout()">Logout</a>
                      </li> --> */}
                    </ul>

                    <select className="tabs_filter filter_select medium_hide">
                      <option value="#panel_1">Photos</option>
                      <option value="#panel_2">Details</option>
                    </select>

                    <div className="wrap_box panels">
                      <div className="panel panel_1" key={profile?._id}>
                        <ListPhotos userPhotos={`&userPhotos=${profile._id || ''}`} />
                      </div>
                      <div className="panel panel_2" style={{display:'none'}}>
                        
                        <div className="row details">
                          <div className="col medium_6">
                            <h4 className="section_title">Author information:</h4>
                            <p>{profile.info}</p>
                          </div>
                          <div className="col medium_6">
                            <h4 className="section_title">Email:</h4>
                            <p>{profile.email}</p>
                            <h4 className="section_title">Phone number:</h4>
                            <p>{profile.phone}</p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        }
       

    </form>
    </>
  );
}

export default UserProfile;
