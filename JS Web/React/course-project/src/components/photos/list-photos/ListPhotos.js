import { useContext, useEffect, useState } from "react";
import "./ListPhotos.scss";
import * as photoService from "../../../core/services/photo.service";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../../../Context";

function ListPhotos({ myPhotos, userPhotos, category }) {
  const location = useLocation();
  const [photos, setPhotos] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    console.log(userPhotos);
    photoService.getPhotos(userPhotos, myPhotos, 12, 1, category).then((result) => {
      console.log('result photos0', result);
      setPhotos(result.photos);
      setTotalItems(result.count)
    });
  }, []);

  function deletePhoto() {}
  return (
    <>
    {
      photos.length ? (
        <>{
          location.pathname == '/' ? (
            <section className="photo_list in_home">
              <div className="row default_center">

                <div className="col">
                  <h3 className="section_title text_center">
                    Recent photos
                  </h3>
                </div>

                <div className="col medium_5 large_6">
                  <div className="photo">

                    <span className="owner">
                    {
                      photos[0].author.firstName && photos[0].author.lastName ? 
                      (`© ${photos[0].author.firstName} ${photos[0].author.lastName}`) :
                      (`© ${photos[0].author.email}`)
                    }
                    </span>

                    <Link to={'/photo/details/' + photos[0]._id}>
                      <figure className="image_wrap">
                        <img src={photos[0].imgUrl} alt={photos[0].title} />
                      </figure>
                    </Link>

                  </div>

                </div>

                <div className="col medium_7 large_6">
                  <div className="row">
                    {
                      photos.slice(1, 5).map(photo => 
                        <div className="col tiny_6" key={photo._id}>
                          <div className="photo">
                            <span className="owner">
                            {
                              photo.author.firstName && photo.author.lastName ? 
                              (`© ${photo.author.firstName} ${photo.author.lastName}`) :
                              (`© ${photo.author.email}`)
                            }
                            </span>
                            <Link to={'/photo/details/' + photo._id}>
                              <figure className="image_wrap">
                                <img src={photo.imgUrl} alt={photo.title} />
                              </figure>
                            </Link>

                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>

                <div className="col default_flex default_center">
                  <Link to="/photo/list" className="btn">View all</Link>
                </div>
              </div>
            </section>
          ) : (
            <section className="photo_list">
              <div className="row">

                {
                  location.pathname == '/user/profile' 
                  ? 
                    <div className="col small_6 medium_4 large_3" >
                      <div className="photo create_photo">
                        <Link to="/photo/create">
                          <i className="far fa-plus-square"></i>
                          <span>Add image</span>
                        </Link>
                      </div>
                    </div>
                  :
                  (<></>)
                }
                {
                  photos.map(photo => 
                    <div className="col small_6 medium_4 large_3" key={photo._id}> {/**ngFor="let photo of photos | paginate: { itemsPerPage: itemsPerPage, currentPage: currentPage, totalItems: totalItems }" */}
                      <div className="photo">
                        {
                          photo.author._id == localStorage.getItem('id') ? (
                            <div className="buttons">
                              <Link to={'/photo/edit/' + photo._id} className="far fa-edit"></Link>
                              <a onClick={deletePhoto(photo._id)} className="far fa-trash-alt"></a>
                              {/* <!-- <a (click)="likePhoto(photo._id)" className="far fa-heart"></a> --> */}
                            </div>
                          ) : (
                            <></>
                          )
                        }
                        
                        <span className="owner">
                          {
                            photo.author.firstName && photo.author.lastName ? 
                            (`© ${photo.author.firstName} ${photo.author.lastName}`) :
                            (`© ${photo.author.email}`)
                          }
                        </span>

                        <Link to={'/photo/details/' + photo._id}>
                          <figure className="image_wrap">
                            <img src={photo.imgUrl} alt={photo.title} />
                          </figure>
                        </Link>

                      </div>

                    </div>
                  )
                }
                <div className="col">
                  {
                    !photos?.length ? (
                      <div className="row">
                        <div className="col">
                          <h2 style={{margin: "200px 0"}}>
                            There is no photos yet
                          </h2>
                        </div>
                      </div>
                    ) : (<></>)
                  }
                  {/* <pagination-controls (pageChange)="getPage($event)" previousLabel="" nextLabel=""></pagination-controls> */}
                </div>
              </div>
            </section>
          )
        }</>
      ) : 
      ( <></> )
    }
    </>
  );
}

export default ListPhotos;
