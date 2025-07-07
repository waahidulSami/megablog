
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login , logout } from "./store/authSlice"
import {Header , Footer} from "./components"
import { Outlet, useLocation } from "react-router-dom"

function App() {
const[ Loading , setLoading] =  useState(true)
const dispatch = useDispatch()

useEffect(() =>{
  authService.getCurrentUser()
  .then((userData) => {
    if (userData){
      dispatch(login({userData}))
    } else {
      dispatch(logout())
    }
  }).catch((error) => {
    console.error("Error fetching user data:", error)
    // dispatch(logout())
  })

  .finally(() => setLoading(false))
},[]) 
  const location = useLocation();
  const hideHeaderFooter = ['/login', '/signup'].includes(location.pathname);
  return !Loading ? (
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>

       
         {!hideHeaderFooter && <Header />}
      <main>
        <Outlet />
      </main>
      {!hideHeaderFooter && <Footer />}
      </div>
      </div>
  ) : (null)
    
  }

export default App
