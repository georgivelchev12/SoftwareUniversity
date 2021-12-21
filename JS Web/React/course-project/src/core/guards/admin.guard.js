import { Navigate } from "react-router-dom";
import { getUserRole } from "../services/auth.service";
import { toast } from "react-toastify";

export function AdminRoute({ children }) {
  let isAdmin = getUserRole() == 'admin';
  if(isAdmin){
    return children;
  } else {
    toast.error('You have\'t permissions to access this page!', { theme: "colored", toastId: 'customId' })
    return <Navigate to="/" />;
  }
  
}