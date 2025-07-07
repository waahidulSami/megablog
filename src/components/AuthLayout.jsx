import React , {useState , useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



export default function AuthLayout({ children , authentication  = true }) {

    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const [loader , setLoader] = useState(true);

useEffect(() => {
  if (authentication && !authStatus) {
    navigate('/login');
  } else if (!authentication && authStatus) {
    navigate('/');
  }
  setLoader(false);
}, [authStatus, authentication, navigate]);

    return loader ?  <h1>Loading......</h1> : <>{children}</>
}
