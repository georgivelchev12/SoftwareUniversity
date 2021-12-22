import "./CategoryList.scss";
import Slider from "react-slick";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../../../core/services/category.service";

function CategoryList({ isSlider }) {
  const [categories, setCategories] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data.categories)
    });
  }, [])


  const settings = {
    slidesToShow: 6,
    swipeToSlide: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      }
    ],
  };


  return (
    <>
    {
      isSlider 
      ? <section className="category_slider">
          <Slider {...settings}>
              {
                categories.map(category => 
                  <div key={category._id}>
                    {redirect && <Navigate to={'/categories/' + category._id || ""} />}
                    <label onClick={() => setRedirect(true)} key={category._id || ""}>
                      <img src={category.imgUrl} alt={category.title} />
                      <span>{category.title}</span>
                    </label>
                  </div>
                )
              }
            </Slider>
        </section>
      : <section className="category_list" > {/***ngIf="!isSlider" */}
          <div className="row">
            <div className="col">
              <h2 className="section_title text_center">
                Categories
              </h2>
            </div>
            {
              categories.map(category => 
                  <div className="col medium_3" key={category._id}> {/** *ngFor="let category of categories" */}
                    <Link to={'/categories/' + category._id}>
                      <img src={ category.imgUrl } alt={category.title} />
                      <span>{category.title}</span>
                    </Link>
                  </div>
                )
            }
          </div>
        </section>
    }
    </>
  );
}

export default CategoryList;
