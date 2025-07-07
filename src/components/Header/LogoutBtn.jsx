import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";

import { logout } from "../../store/authSlice";

function LogoutBtn() {
    const dispatch = useDispatch();
    const LogutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        })
    }
    return(
           <button
                  className="bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                
                onClick={LogutHandler}
              
              >
                <span className="truncate">Log out</span>
              </button>
    )
}



export default LogoutBtn;