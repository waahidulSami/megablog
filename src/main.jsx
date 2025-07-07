import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import "./index.css"; 

import App from './App.jsx'
import store from './store/store.js'
import AuthLayout from './components/AuthLayout.jsx'
import { RouterProvider , createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import AllPost from './pages/Allpost.jsx'
import EditePost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import AddPost from './pages/AddPost.jsx'
import React from 'react'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
     
      
      {
        path: "/login",
        element:(
        <AuthLayout authentication={false}>
        <LoginPage />
        </AuthLayout>
          
         )
      },
      {
        path: "/signup",
        element:(
        <AuthLayout authentication={false}>
        <Signup />
        </AuthLayout>
          
         )
      },
      {
          path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPost />
                </AuthLayout>
            ),
      },
       {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:postId",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditePost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:postId",
            element: <Post />,
        },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  </React.StrictMode>

)