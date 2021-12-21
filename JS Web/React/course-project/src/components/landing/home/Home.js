import { Link } from 'react-router-dom';
import ListAuthors from '../../authentication/listAuthors/ListAuthors';
import CategoryList from '../../categories/categoryList/CategoryList';
import ListPhotos from '../../photos/list-photos/ListPhotos';
import './Home.scss';

function Home() {

  return (
    <>
      <CategoryList isSlider={true} />
      <ListPhotos />
      
      <section className="show_your_photos">
          <div className="row full default_center">
              <div className="col medium_10">
                  <h1 className="title">Show <strong>photos</strong> and make new <strong>friends</strong></h1>
                  <Link className="btn" to="/photo/create">Upload new photos</Link>
              </div>
          </div>
      </section>
      
      <ListAuthors />
    </>
  );
}

export default Home;
