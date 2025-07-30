// routes.ts
import React from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import Layout from '@/layout'
import lazyLoad from '@/components/lazyLoad'

import Login from '@/views/login'
import NotFound from '@/views/NotFound'
const Home = React.lazy(() => import('@/views/Home.jsx'))
const About = React.lazy(() => import('@/views/About.jsx'))

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="home" />,
      },
      {
        path: 'home',
        element: lazyLoad(Home),
      },
      {
        path: 'about',
        element: lazyLoad(About),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]

export default routes
