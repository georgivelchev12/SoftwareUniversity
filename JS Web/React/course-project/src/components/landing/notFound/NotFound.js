import { Link } from 'react-router-dom';
import './NotFound.scss';

function NotFound() {

  return (
    <section className="error_container">
      <div className="row default_middle">
        <div className="col large_6">
          <figure className="error_404_image">
            <img src="https://image.freepik.com/free-vector/error-404-concept-landing-page_52683-18367.jpg" alt="404" />
          </figure>
        </div>
        <div className="col large_6">
          <div className="description_404">
            <h1>Sorry, page you are looking for doesn't exists</h1>
            <Link to="/" className="btn" title="To home">To Home page</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
