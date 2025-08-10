import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthGuard from '@/components/AuthGuard'
import Login from '@/pages/login'
import Layout from '@/layout'
import NotFound from '@/pages/NotFound'
import lazyLoad from '@/components/lazyLoad'

const Home = React.lazy(() => import('@/pages/Home.js'))
const About = React.lazy(() => import('@/pages/About.js'))
const UserManagement = React.lazy(() => import('@/pages/UserManagement.tsx'))
const Settings = React.lazy(() => import('@/pages/Settings.tsx'))
const ZustandTest = React.lazy(() => import('@/pages/ZustandTest.tsx'))

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <AuthGuard>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={lazyLoad(Home)} />
            <Route path="home" element={lazyLoad(Home)} />
            <Route path="about" element={lazyLoad(About)} />
            <Route path="user-management" element={lazyLoad(UserManagement)} />
            <Route path="settings" element={lazyLoad(Settings)} />
            <Route path="zustand-test" element={lazyLoad(ZustandTest)} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  )
}

export default AppRouter
