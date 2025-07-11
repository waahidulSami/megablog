
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login , logout } from "./store/authSlice"
import {Header , Footer} from "./components"
import { Outlet, useLocation } from "react-router-dom"


function App() {
const[ Loading , setLoading] =  useState(true)
const dispatch = useDispatch()
const location = useLocation()
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
  
  const hideHeaderFooter = ['/login', '/signup', '/recover', '/reset-password']
    .some(path => location.pathname.toLowerCase().startsWith(path))

  return Loading ? (
    <div className="w-full h-screen flex justify-center items-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  ) : (
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        {!hideHeaderFooter && <Header />}
        <main >
          <Outlet />
        </main>
        {!hideHeaderFooter && <Footer />}
      </div>
    </div>
  )
}
  

export default App
