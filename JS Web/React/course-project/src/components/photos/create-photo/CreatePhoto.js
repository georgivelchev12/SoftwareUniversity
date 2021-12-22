import { useEffect, useState } from "react";
import "./CreatePhoto.scss";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { createPhoto, deletePhoto, getPhoto } from "../../../core/services/photo.service";
import { toast } from 'react-toastify';
import { getCategories } from "../../../core/services/category.service";
import { onImagePickedAction } from "../../../core/services/helper.service";

function CreatePhoto() {
  const { id } = useParams();
  const [photo, setPhoto] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [categories, setCategories] = useState([]);
  const [photoCategories, setPhotoCategories] = useState([]);
  const [onDragOver, setOnDragOver] = useState(false);
  
  useEffect(() => {
    getCategories().then(({ categories }) => {
      if(categories.length == 0){
        toast.warn('You need to create categories first!');
        return;
      }
      console.log(categories);
      setCategories(categories);
    });
  }, []);

  function onRemoveImage() {
    setPhoto((prevState) => {
      delete prevState.imgUrl;
      return {
        ...prevState,
      }
    });
    setImagePreview('')
    setOnDragOver(false)
  }
  function getSelectedCategories(event) {

    const target = event.target;
    const value = target.value;
    
    if(target.checked){
      setPhoto((prevState) => {
        let setNewCategories = () => {
          let newCategories = [...prevState.categories]
          newCategories.push({_id: value});
          return newCategories
        }
        let newState = {
          ...prevState,
          categories: prevState.categories ? setNewCategories() : [{_id: value}]
        }
        console.log('addNewState',newState);
        return newState;
      })
    } else {
      setPhoto((prevState) => {
        let removeOldCategories = () => {
          let newCategories = [...prevState.categories]
          newCategories = newCategories.filter(category => category._id !== value);
          return newCategories;
        }
        let newState = {
          ...prevState,
          categories: removeOldCategories()
        }
        console.log('removeOldState',newState);
        return newState;
      })
    }
  }




  function dragOver(event) {
    setOnDragOver(true)
  }
  function dragLeave(event) {
    setOnDragOver(false)
  }


  function onImagePicked(event) {
    onImagePickedAction(event, setImagePreview);
    setPhoto((prevState) => {
      return {
        ...prevState,
        imgUrl: event.target.files[0],
      }
    });
  }

  function onInputChange(event){
    event.preventDefault();
    setPhoto((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      }
    });
  }


  function createHandler(event){
    event.preventDefault();

    const photoData = {
      ...photo, 
      date: new Date().toLocaleDateString().split(' ')[0],
      author: null
    }

    console.log(photoData);
    if(!photoData.title || !photoData.categories || photoData.categories?.length == 0){
      toast.error('Please fill required fields!', { theme: "colored" });
      return;
    }

    createPhoto(photoData).then(data => {
      setRedirect(true)
      toast.success(data.message, { theme: "colored" });
    }).catch(err =>{
      if(err.stack.includes('TypeError')){
        toast.error('Image is required!', { theme: "colored" });
      } else{
        toast.error(err.message, { theme: "colored" });
      }
    })

  }

  return (
    <>
    {redirect && <Navigate to="/user/profile" />}

    <form className="createPhoto" onSubmit={createHandler}>
      <div className="row default_center">
        <div className="col medium_8">
          <div className="row default_center">
            <div className="col">
              
              <h1 className="section_title text_center">Create new photo</h1>
        
      
              <div className="dropbox_outer input_wrapper">
              {
                !imagePreview ? <>
                  <div className={onDragOver ? 'dropbox active' : 'dropbox'}>
                    <span>Drag and drop an image or select "Add image"</span>
                    <input type="file" id="filePicker" name="image" onChange={onImagePicked} onDragOver={dragOver} onDragLeave={dragLeave} />
                  </div>
                  <label className="btn" htmlFor="filePicker">Add image</label>
                </> : <>
                  <div className="image-preview">
                    <img src={imagePreview} />
                  </div>
                  <button className="btn btn_danger" onClick={onRemoveImage}>Remove image</button>
                </>
              }
                

                {/* <div className="errors" *ngIf="!form.get('image').valid">
                  <span *ngIf="form.get('image').errors?.invalidMimeType">Image must be with format png, jpg or jpeg</span>
                </div> */}
              </div>
            </div>
            <div className="col">
              <div className="input_wrapper required ">
                <label>Title: {/*<span className="fas fa-exclamation-circle color_accent" *ngIf="!form.get('title').valid && form.get('title').touched"></span> */}</label>
                <input type="text" placeholder="Enter Title" name="title" required onInput={onInputChange} />

                {/**
                   <div className="errors" *ngIf="!form.get('title').valid && form.get('title').touched">
                    <span *ngIf="form.get('title').hasError('required')">Title is required</span>
                    <span *ngIf="form.get('title').hasError('maxlength')">Title is too long</span>
                  </div>
                */}
              </div>
            </div>
            <div className="col">
              <div className="input_wrapper">
                <label>Description:</label>
                <textarea placeholder="Enter Description" name="description" rows="5" onInput={onInputChange}></textarea>
                {/* <div className="errors" *ngIf="!form.get('description').valid && form.get('description').touched">
                  <span *ngIf="form.get('description').hasError('required')">Description is required</span>
                  <span *ngIf="form.get('description').hasError('maxlength')">Description is too long</span>
                </div> */}
              </div>
            </div>
        
            <div className="col">
                
                <div className="category_checkboxes row">
                  <div className="col">
                    <h3 className="section_title">Choose categories</h3>
                    {/* <div className="errors" *ngIf="!form.get('categories').valid && form.get('categories').touched">
                      <span *ngIf="form.get('categories').errors?.minLengthCategories">You must select at least one category</span>
                    </div> */}
                  </div>
                  {
                    categories.map((category, i) => 
                      <div className="col large_4" key={category._id}>
                        <input 
                          name="categories"
                          type="checkbox" 
                          className="category_input" 
                          id={category._id}
                          value={category._id}
                          onChange={(event) => getSelectedCategories(event, i)} 
                        /> 
                        <label className="category_label" htmlFor={category._id}>
                          <img src={category.imgUrl} />
                          <div className="category_wrap">
                            <span className="custom_checkbox">
                              <span className="icon fas fa-check"></span>
                            </span>
                            <span className="category_title">{category.title}</span>
                          </div>
                        </label>
                      </div>
                    )
                  }
                </div>
        
            </div>
            <div className="col medium_6 large_4">
              <button type="submit" className="btn wide" disabled={false}>
                Create photo
              </button>
            </div>
        
          </div>
        </div>
      </div>
    </form>
    </>
  );
}

export default CreatePhoto;
