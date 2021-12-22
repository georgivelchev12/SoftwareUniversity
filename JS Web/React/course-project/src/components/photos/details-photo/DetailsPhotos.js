import { useEffect, useState } from "react";
import "./DetailsPhotos.scss";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { deletePhoto, getPhoto } from "../../../core/services/photo.service";
import { toast } from 'react-toastify';

function DetailsPhotos() {
  const { id } = useParams();
  const [photo, setPhoto] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    
    console.log(id);
    getPhoto(id).then((data) => {
      setPhoto(data.photo)
    });

  }, []);

  
  function deletePhotoHandler(id) {
    deletePhoto(id).then(data => {
      toast.success(data.message, { theme: "colored" });
      setRedirect(true);
    })
  }

  return (
    <>
    {redirect && <Navigate to="/" />}
    {
      photo ? 
        <div>

          <section className="opening_photo">
            <div className="row">
              <div className="col">
                <figure>
                  <img src={photo.imgUrl} />
                </figure>
              </div>
            </div>
          </section>

          <section className="photo_info">
            <div className="row">
              <div className="col medium_6 photo_info_inner">
                <h1 className="section_title">{photo.title}</h1>
                <p>{photo.description}</p>
                <ul>
                  <li><i className="fas fa-calendar-day"></i>Published day: <strong>{photo.date}</strong> </li>
                  <li><i className="fas fa-th"></i>
                    Categories:&nbsp;
                    {
                      photo.categories?.map(category => <Link to={"/categories/" + category?._id} key={category?._id}>{category.title}</Link> )
                    }
                  </li>
                </ul>
                {
                  photo.author?._id == localStorage.getItem('id') ?
                    <div className="row" > 
                      <div className="col default_6 large_5"><Link className="btn wide" to={"/photo/edit/" + photo?._id}>Edit</Link></div>
                      <div className="col default_6 large_5"><button className="btn btn_danger wide" onClick={() => deletePhotoHandler(photo?._id)}>Delete</button></div>
                    </div>
                  : (<></>)
                }
              </div>
              <div className="col medium_6">
                <div className="author">
                  <Link className="author_img" to={"/user/details/" + photo.author?._id}>
                    <img src={photo.author?.imgUrl} />
                  </Link>
                  <Link to={"/user/details/" + photo.author?._id}>
                    <span className="names">{photo.author?.firstName} {photo.author?.lastName}</span>
                    <span className="email">{photo.author?.email}</span>
                  </Link>
                </div>
                <div className="info">
                  <h4 className="section_title">Author information:</h4>
                  <p>{photo.author?.info}</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      : (<></>)
    }
    </>
  );
}

export default DetailsPhotos;
