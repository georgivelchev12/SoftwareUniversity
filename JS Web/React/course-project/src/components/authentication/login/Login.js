import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../../../Context";
import { login } from "../../../core/services/auth.service";

function Login() {
  const [redirect, setRedirect] = useState(false);
  const context = useContext(UserContext);

  const loginHanlder = async (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let email = formData.get("email");
    let password = formData.get("password");

    try {
      let {data, authService} = await login({ email, password });
      if(data.ok){
        console.log('in login authService', authService);
        context.logIn(authService);
        setRedirect(true);
      } else {
        throw new Error(data.statusText);
      }
    } catch (err) {
      console.log(err, err.message);
    }
  };

  return (
    <>
      {redirect && <Navigate to="/" />}
      <form onSubmit={loginHanlder}>
        <h1>Sign In</h1>
        {/* <div className="errors" *ngIf="!form.get('email').valid && form.get('email').touched">
        <span *ngIf="form.get('email').hasError('required')">Email is required</span>
        <span *ngIf="form.get('email').hasError('email')">Email is invalid</span>
      </div> */}
        <input type="email" name="email" placeholder="Email" />
        {/* <div className="errors" *ngIf="!form.get('password').valid && form.get('password').touched">
        <span *ngIf="form.get('password').hasError('required')">Password is required</span>
        <span *ngIf="form.get('password').hasError('minlength')">Password must be at least 3 symbols</span>
      </div> */}
        <input type="password" name="password" placeholder="Password" />
        <button type="submit" disabled={false}>
          Sign In
        </button>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g"></i>
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </form>
    </>
  );
}

export default Login;
