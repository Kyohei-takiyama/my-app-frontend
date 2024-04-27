import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import App from './App.tsx'
import Login from './component/pages/Login/Login.tsx'
import Signup from './component/pages/Signup/Signup.tsx'

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: App,
    children: [],
  },
  {
    id: 'login',
    path: '/login',
    Component: Login,
    children: [],
  },
  {
    id: 'signup',
    path: '/signup',
    Component: Signup,
    children: [],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider
        router={router}
        fallbackElement={<div>Loading...</div>}
      ></RouterProvider>
    </RecoilRoot>
  </React.StrictMode>,
)
