import "./CategoryDetails.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ListPhotos from "../../photos/list-photos/ListPhotos";
import { getCategory } from "../../../core/services/category.service";

function CategoryDetails() {
  const { id } = useParams();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategory(id).then((data) => {
      setCategory(data.category)
    });
  }, [])

  return (
    <>
    {
      category ? 
        <>
          <section className="opening" style={{ backgroundImage: "url(" + category.imgUrl + ")" }}>
            <div className="opening_inner">
              <h2 className="title text_center">{category.title}</h2>
              <h4 className="sub_title">{category.description}</h4>
              {localStorage.getItem('role') == 'admin' ? <Link className="btn" to={'/categories/edit/'+ category._id || ''}>Edit category</Link> : (<></>)}
            </div>
          </section>

          <section className="category_details" key={category._id || ''}> 
            <ListPhotos category={'&category=' + category._id || ''}/>
          </section>
        </>
      : (<></>)
    }
    </>

  );
}

export default CategoryDetails;
