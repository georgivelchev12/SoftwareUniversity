import "./Auth.scss";
import { useEffect, useState } from "react";

import Login from "./login/Login";
import Register from "./register/Register";

function Auth({ toggleSlide }) {

  const [toggleSlideForm, setToggleSlideForm] = useState(toggleSlide);

  useEffect(() => {
    setToggleSlideForm(toggleSlide)
  }, [toggleSlide])

  return (
    <div className="slide_form_wrapper">
      <div id="slide_form" className={toggleSlideForm ? 'slide_form active' : 'slide_form'}>
        <div className="form-container sign-up-container">
          <Register></Register>
        </div>
        <div className="form-container sign-in-container">
          <Login></Login>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={() => { setToggleSlideForm(false); }}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={() => { setToggleSlideForm(true); }}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
