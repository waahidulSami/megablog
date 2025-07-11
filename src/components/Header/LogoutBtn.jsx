import React ,{useState} from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";

import { logout } from "../../store/authSlice";


function LogoutBtn() {

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

    const dispatch = useDispatch();
    
    const LogutHandler = async () => {

        try {
       setIsLoading(true);
      setIsSuccess(false);

      await authService.logout()

      dispatch(logout())


        } catch (error) {
              console.error("Logout failed:", error);
      setIsLoading(false);
      setIsSuccess(false);
        }
    }
    return(
           <button
    className={`px-4 py-2 rounded transition-colors 
      ${
        isLoading 
          ? 'bg-red-500 hover:bg-red-700 text-white cursor-not-allowed' 
          : 'bg-indigo-600  text-white cursor-pointer'
      }`}
                  // className="bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                disabled={isLoading}
                onClick={LogutHandler}
              
              >
                {
                  isLoading ? (
                    <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Logging out...
        </div>
                  ) :isSuccess ? (
                     "Logged out!"
                  ) : ("Log out")
                }
               
              </button>
    )
}



export default LogoutBtn;