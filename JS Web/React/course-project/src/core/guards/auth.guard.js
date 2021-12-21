import { Navigate } from "react-router-dom";
import { getIsAuth } from "../services/auth.service";

export function AuthenticatedRoute({ children }) {
  let isAuth = getIsAuth();
  return isAuth ? children : <Navigate to="/user/login" />;
}

// used for prevent logged users access /user/login or /user/register url
export function NonAuthenticatedRoute({ children }) {
  let isAuth = !getIsAuth();
  return isAuth ? children : <Navigate to="/" />;
}
