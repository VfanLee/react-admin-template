import { createHashRouter } from 'react-router-dom'
import React, { Suspense } from 'react'

import Home from '@/views/Home.jsx'
import NotFound from '@/views/NotFound'
const About = React.lazy(() => import('@/views/About.jsx'))

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <About />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

const router = createHashRouter(routes)

export default router
