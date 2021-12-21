import "./CategoryEdit.scss";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ListPhotos from "../../photos/list-photos/ListPhotos";
import { createCategory, editCategory, getCategory } from "../../../core/services/category.service";
import { toast } from 'react-toastify';
import { onImagePickedAction } from "../../../core/services/helper.service";

function CategoryEdit() {
  const { id } = useParams()
  const [redirect, setRedirect] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [category, setCategory] = useState({});

  useEffect(() => {
    getCategory(id)
      .then(({ message, category }) => {
        console.log(category);
        setCategory(category);
        setImagePreview(category.imgUrl)
      });
  }, [])


  function onImagePicked(event) {
    onImagePickedAction(event, setImagePreview);
    setCategory((prevState) => {
      return {
        ...prevState,
        imgUrl: event.target.files[0],
      }
    });
  }

  function onInputChange(event){
    event.preventDefault();
    setCategory((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      }
    });
  }

  function editHandler(event) {
    event.preventDefault();
    editCategory(category).then((data) => {
      toast.success(data.message, { theme: "colored" });
      setRedirect(true);
    });
  }


  function deleteCategory() {}
  return (
    <>
      {redirect && <Navigate to="/categories" />}
      <form class="categoryEdit" onSubmit={editHandler}>
        <div class="row default_center">
          <div class="col medium_8">
            <div class="row default_center">

              <div class="col profile_img">
                <input id="profile_pic" type="file" name="image" onChange={onImagePicked} />
                  <div className="image-preview">
                    <div class="img_wrap">
                      <img src={imagePreview || 'https://i2.wp.com/upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'} />
                    </div> 
                  <label for="profile_pic" class="btn">Choose new category image</label>
                </div> 

              </div>

              <div class="col">
                <div class="input_wrapper required">
                  <label class="small_title">
                    Title {/**<span class="fas fa-exclamation-circle color_accent" *ngIf="!form.get('title').valid && form.get('title').touched"></span> */}
                  </label>
                  <input type="text" name="title" placeholder="Title" value={category.title || ''} onChange={onInputChange} />
                  {/* <div class="errors" *ngIf="!form.get('title').valid && form.get('title').touched">
                    <span *ngIf="form.get('title').hasError('required')">Title is required</span>
                    <span *ngIf="form.get('title').hasError('title')">Title is invalid</span>
                  </div> */}
                </div>

              </div>
              <div class="col">
                <div class="input_wrapper required">
                  <label class="small_title">
                    Description {/**<span class="fas fa-exclamation-circle color_accent" *ngIf="!form.get('description').valid && form.get('description').touched"></span> */}
                  </label>
                  <textarea name="description" placeholder="Description" rows="5" value={category.description || ''} onChange={onInputChange}></textarea>
                  {/* <div class="errors" *ngIf="!form.get('description').valid && form.get('description').touched">
                    <span *ngIf="form.get('description').hasError('maxlength')">Description is too long</span>
                  </div> */}
                </div>
              </div>

              <div class="col small_6">
                <button type="submit" class="btn wide" disabled={false}>Edit</button>
              </div>
              <div class="col small_6">
                <button type="button" onClick={deleteCategory} class="btn btn_danger wide">Delete category</button>
              </div>

            </div>
          </div>
        </div>

      </form>
    </>
  );
}

export default CategoryEdit;
