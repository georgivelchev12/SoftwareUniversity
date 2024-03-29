import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../../Context";
import authService from "../../../core/services/auth.service";
import { getCategories } from "../../../core/services/category.service";
import "./Footer.scss";

function Footer() {
  const context = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then(data => {
      setCategories(data.categories)
    });
  }, [context])

  return (
    <footer id="footer">
      <div className="row">
        <div className="col small_6 large_4 footer_col_1">
          <a rel="home" href="/" className="logo" title="Logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              width="242.104px"
              height="230px"
              viewBox="0 0 242.104 230"
              enableBackground="new 0 0 242.104 230"
              xmlSpace="preserve"
            >
              <g>
                <defs>
                  <polyline
                    id="SVGID_1_"
                    points="242.104,0.009 242.104,230 0,230 3,0   "
                  ></polyline>
                </defs>
                <clipPath id="SVGID_2_">
                  <use xlinkHref="#SVGID_1_" overflow="visible"></use>
                </clipPath>
                <g clipPath="url(#SVGID_2_)">
                  <path
                    fill="#FF4A4E"
                    d="M230.055,106.303l-33.344,33.154c-0.292,0.291-0.765,0.289-1.056-0.004l-1.58-1.59    c-0.291-0.291-0.765-0.293-1.057-0.002l-51.92,51.623c-0.292,0.291-0.765,0.289-1.056-0.002l-1.58-1.59    c-0.291-0.293-0.764-0.295-1.057-0.004l-37.442,37.23c-0.429,0.426-0.201,1.166,0.395,1.27c8.987,1.566,18.123,2.027,27.202,1.385    c1.065-0.074,2.065-0.541,2.822-1.293l22.826-22.699c0.293-0.291,0.294-0.762,0.003-1.055l-1.58-1.59    c-0.291-0.293-0.289-0.766,0.003-1.057l51.92-51.623c0.292-0.291,0.293-0.764,0.002-1.057l-1.58-1.59    c-0.291-0.293-0.29-0.766,0.003-1.057l29.501-29.333c0.144-0.144,0.225-0.339,0.222-0.542c-0.029-2.707-0.148-5.414-0.373-8.113    C231.276,106.135,230.503,105.855,230.055,106.303"
                  ></path>
                </g>
                <g clipPath="url(#SVGID_2_)">
                  <path
                    fill="#FF4A4E"
                    d="M219.059,166.195l-49.775,49.492c-0.3,0.297,0.049,0.789,0.427,0.602    c10.435-5.215,20.228-12.152,28.953-20.828c8.726-8.676,15.72-18.43,20.994-28.836    C219.849,166.25,219.357,165.896,219.059,166.195"
                  ></path>
                </g>
                <g clipPath="url(#SVGID_2_)">
                  <path
                    fill="#FF4A4E"
                    d="M20.766,66.317l49.775-49.491c0.3-0.298-0.049-0.79-0.427-0.601C59.679,21.44,49.886,28.377,41.161,37.053    c-8.726,8.677-15.72,18.429-20.994,28.834C19.976,66.264,20.467,66.616,20.766,66.317"
                  ></path>
                </g>
                <g clipPath="url(#SVGID_2_)">
                  <path
                    fill="#FF4A4E"
                    d="M126.873,176.236l-1.58-1.59c-0.291-0.291-0.29-0.766,0.003-1.057l51.919-51.623    c0.293-0.291,0.294-0.764,0.003-1.057l-1.58-1.588c-0.291-0.293-0.29-0.766,0.003-1.057l46.57-46.306    c0.219-0.219,0.284-0.55,0.161-0.832c-0.847-1.949-1.753-3.875-2.72-5.779c-0.23-0.452-0.838-0.547-1.197-0.189l-48.082,47.808    c-0.292,0.29-0.766,0.289-1.057-0.004l-1.58-1.589c-0.291-0.293-0.764-0.294-1.056-0.003l-51.92,51.625    c-0.292,0.289-0.765,0.289-1.056-0.004l-1.581-1.59c-0.291-0.293-0.764-0.293-1.056-0.002l-49.593,49.311    c-0.345,0.342-0.277,0.922,0.138,1.174c5.741,3.482,11.727,6.4,17.881,8.758c1.656,0.635,3.53,0.248,4.788-1.002l42.589-42.348    C127.163,177.002,127.164,176.529,126.873,176.236"
                  ></path>
                </g>
                <g clipPath="url(#SVGID_2_)">
                  <path
                    fill="#FF4A4E"
                    d="M100.534,149.748l-1.581-1.59c-0.291-0.293-0.289-0.766,0.003-1.057l51.92-51.624    c0.293-0.291,0.294-0.765,0.003-1.057l-1.58-1.59c-0.291-0.292-0.29-0.766,0.003-1.057l51.919-51.623    c0.292-0.29,0.294-0.764,0.003-1.057l-4.214-4.238c-0.291-0.293-0.764-0.293-1.057-0.004l-51.919,51.625    c-0.292,0.291-0.766,0.289-1.057-0.004l-1.58-1.588c-0.291-0.293-0.764-0.295-1.056-0.004l-51.92,51.624    c-0.292,0.291-0.765,0.289-1.056-0.004l-1.581-1.588c-0.291-0.293-0.764-0.295-1.056-0.004l-51.39,51.098    c-0.585,0.58-0.588,1.527-0.006,2.111l13.696,13.775c0.582,0.586,1.528,0.588,2.113,0.006l51.39-51.096    C100.824,150.514,100.825,150.039,100.534,149.748"
                  ></path>
                </g>
                <g clipPath="url(#SVGID_2_)">
                  <path
                    fill="#FF4A4E"
                    d="M74.196,123.258l-1.581-1.59c-0.291-0.293-0.289-0.766,0.003-1.057l51.92-51.624    c0.292-0.291,0.294-0.764,0.003-1.056l-1.58-1.59c-0.291-0.292-0.29-0.765,0.003-1.056l48.06-47.786    c0.365-0.364,0.261-0.979-0.203-1.203l-5.715-2.747c-0.285-0.137-0.626-0.08-0.85,0.145l-46.56,46.293    c-0.293,0.291-0.766,0.291-1.057-0.002l-1.58-1.59c-0.291-0.293-0.764-0.294-1.056-0.004l-51.92,51.624    c-0.292,0.291-0.765,0.289-1.056-0.003l-1.581-1.589c-0.291-0.293-0.764-0.294-1.056-0.003L15.8,150.768    c-1.257,1.25-1.655,3.123-1.03,4.781c2.212,5.875,4.933,11.6,8.167,17.107c0.493,0.84,1.652,0.979,2.342,0.293l48.914-48.635    C74.486,124.023,74.487,123.551,74.196,123.258"
                  ></path>
                </g>
                <g clipPath="url(#SVGID_2_)">
                  <path
                    fill="#FF4A4E"
                    d="M47.857,96.769l-1.58-1.59c-0.291-0.293-0.29-0.766,0.003-1.057l51.919-51.624    c0.293-0.291,0.294-0.763,0.003-1.056l-1.58-1.59c-0.291-0.293-0.29-0.766,0.003-1.057l33.343-33.152    c0.45-0.447,0.175-1.222-0.456-1.277c-2.697-0.24-5.404-0.375-8.111-0.42c-0.203-0.003-0.398,0.076-0.543,0.219L91.357,33.498    c-0.292,0.291-0.765,0.29-1.056-0.003l-1.581-1.589c-0.291-0.293-0.763-0.294-1.056-0.003L35.745,83.526    c-0.293,0.291-0.766,0.289-1.057-0.004l-1.581-1.588c-0.291-0.293-0.763-0.295-1.056-0.004L9.224,104.627    c-0.757,0.753-1.229,1.75-1.311,2.813c-0.657,8.587-0.325,17.229,0.995,25.753c0.187,1.209,1.668,1.697,2.535,0.834l36.411-36.202    C48.147,97.534,48.148,97.06,47.857,96.769"
                  ></path>
                </g>
              </g>
            </svg>
            <span className="logo_inner">
              <strong className="default_block">PhotoShoot</strong>
              <span className="default_block">Create a beautiful story</span>
            </span>
          </a>
          <div className="textwidget">
            <ul className="footer_contact">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                bul. Bulgaria №65, Asenovgrad, Bulgaria
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <a title="Phone" href="tel:0884166172">
                  088 41 66 172
                </a>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <a title="Email" href="mailto:offite@photoshoot.bg">
                  office@photoshoot.bg
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="col default_6 small_3 large_2 footer_col_2">
          <span className="footer_title">Links</span>
          <div>
            <ul className="menu">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/photo/list">Photos</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="col default_6 small_3 large_3 footer_col_3">
          <span className="footer_title">Categories</span>
          <div>
            <ul>
            {
              categories.slice(0,5).map(category => 
                <li key={category._id}><Link to={'/categories/' + category._id}>{category.title}</Link></li>
              )
            }
            </ul>
          </div>
        </div>

        <div className="col large_3 footer_col_5">
          <span className="footer_title">Account</span>
          <div>
            <ul>
              {
                context.isAuthenticated 
                ?
                <>
                  <li><Link to="/user/profile">My profile</Link></li>
                  <li><Link to="/user/profile">My photos</Link></li>
                </>
                :
                <>
                  <li><Link to="/user/login" className="login">Login</Link></li>
                  <li><Link to="/user/register" className="login">Register</Link></li>
                </>
              }
            </ul>
          </div>

          <ul className="footer_socials">
            <li>
              <a
                className="fab fa-facebook-f"
                title="Facebook | Photoshoot"
                target="_blank"
                href="#"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                className="fab fa-instagram"
                title="Instagram | Photoshoot"
                target="_blank"
                href="#"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                className="fab fa-linkedin-in"
                title="LinkedIn | Photoshoot"
                target="_blank"
                href="#"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
