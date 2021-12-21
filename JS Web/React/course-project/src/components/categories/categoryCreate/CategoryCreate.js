import "./CategoryCreate.scss";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ListPhotos from "../../photos/list-photos/ListPhotos";
import { createCategory, getCategory } from "../../../core/services/category.service";
import { toast } from 'react-toastify';
import { onImagePickedAction } from "../../../core/services/helper.service";

function CategoryCreate() {
  const [redirect, setRedirect] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [category, setCategory] = useState({});

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

  function createHandler(event) {
    event.preventDefault();
    console.log(category);
    createCategory(category).then((data) => {
      toast.success(data.message, { theme: "colored" });
      setRedirect(true);
    });
  }

  return (
    <>
      {redirect && <Navigate to="/categories" />}
      <form class="categoryCreate" onSubmit={createHandler}>
        <div className="row default_center default_bottom">
          <div className="col">
            <h1 className="section_title text_center">Create photo category</h1>
          </div>
          <div className="col medium_4">
            <div className="input_wrapper">
              <label>Title:</label>
              <input type="text" placeholder="Enter Title" name="title" onInput={onInputChange}/>
            </div>
          </div>
          <div className="col medium_4">
            <div className="input_wrapper">
              <label>Description:</label>
              <input type="text" placeholder="Enter Description" name="description" onInput={onInputChange}/>
            </div>
          </div>

          <div className="col medium_4">
            <div className="input_wrapper">
              {
                imagePreview ? 
                  <div className="image-preview">
                    <img src={imagePreview} />
                  </div> 
                : (<></>)
              }
              <label htmlFor="categoryImage" className="btn">
                <i className="fas fa-cloud-upload-alt"></i>
                <span className="btn-text">
                  <span className="text">Upload category image</span>
                </span>
              </label>
              <input id="categoryImage" type="file" name="image" onChange={onImagePicked} />
            </div>
          </div>
          <div className="col">
            <button type="submit" className="btn" disabled={false}>
              Create new category
            </button>
          </div>

        </div>


      </form>
    </>
  );
}

export default CategoryCreate;
