import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../../../Context";
import { register } from "../../../core/services/auth.service";

function Register() {

  const [redirect, setRedirect] = useState(false);
  const context = useContext(UserContext);

  const registerHandler = async (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let email = formData.get("email");
    let password = formData.get("password");
    let rePassword = formData.get("rePassword");
    if(password == rePassword){
      try {
        let {data, authService} = await register({ email, password, rePassword });
        if(data.ok){
          console.log('in register authService', authService);
          context.logIn(authService);
          setRedirect(true);
        } else {
          throw new Error(data.statusText);
        }
      } catch (err) {
        console.log(err, err.message);
      }
    } 
  };


  return (
    <>
      {redirect && <Navigate to="/" />}
      <form  onSubmit={registerHandler}>
      <h1>Create Account</h1>
      {/* <div className="errors" *ngIf="!form.get('email').valid && form.get('email').touched">
        <span *ngIf="form.get('email').hasError('required')">Email is required</span>
        <span *ngIf="form.get('email').hasError('email')">Email is invalid</span>
      </div> */}
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <input type="password" name="rePassword" placeholder="Repeat password" />
      <button type="submit" disabled={false}>Sign Up</button>
      <div className="social-container">
        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
      </div>
      </form>
    </>
  );
}

export default Register;
