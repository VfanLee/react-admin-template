// routes.ts
import React from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { HomeOutlined, InfoCircleOutlined, UserOutlined, SettingOutlined, ExperimentOutlined } from '@ant-design/icons'

import Layout from '@/layout'
import lazyLoad from '@/components/lazyLoad'

import Login from '@/pages/login'
import NotFound from '@/pages/NotFound'
const Home = React.lazy(() => import('@/pages/Home.js'))
const About = React.lazy(() => import('@/pages/About.js'))
const UserManagement = React.lazy(() => import('@/pages/UserManagement.tsx'))
const Settings = React.lazy(() => import('@/pages/Settings.tsx'))
const ZustandTest = React.lazy(() => import('@/pages/ZustandTest.tsx'))

// 定义用户角色类型
export type UserRole = 'admin' | 'user' | 'guest' | 'manager'

// 扩展路由配置类型，添加菜单元数据和权限控制
export interface ExtendedRouteObject extends Omit<RouteObject, 'children'> {
  children?: ExtendedRouteObject[]
  meta?: {
    title?: string // 菜单显示名称
    icon?: React.ReactNode // 菜单图标
    hideInMenu?: boolean // 是否在菜单中隐藏
    order?: number // 排序
    roles?: UserRole[] // 允许访问的角色列表，为空表示所有角色都可访问
    requireAuth?: boolean // 是否需要登录
  }
}

export const routes: ExtendedRouteObject[] = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      hideInMenu: true, // 登录页不显示在菜单中
    },
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="home" />,
        meta: {
          hideInMenu: true, // 重定向路由不显示在菜单中
        },
      },
      {
        path: 'home',
        element: lazyLoad(Home),
        meta: {
          title: '首页',
          icon: <HomeOutlined />,
          order: 1,
          roles: ['admin', 'user', 'manager'], // 所有登录用户都可访问
          requireAuth: true,
        },
      },
      {
        path: 'about',
        element: lazyLoad(About),
        meta: {
          title: '关于',
          icon: <InfoCircleOutlined />,
          order: 2,
          roles: ['admin'], // 只有管理员可以访问
          requireAuth: true,
        },
      },
      {
        path: 'user-management',
        element: lazyLoad(UserManagement),
        meta: {
          title: '用户管理',
          icon: <UserOutlined />,
          order: 3,
          roles: ['admin'], // 只有管理员可以访问
          requireAuth: true,
        },
      },
      {
        path: 'settings',
        element: lazyLoad(Settings),
        meta: {
          title: '系统设置',
          icon: <SettingOutlined />,
          order: 4,
          roles: ['admin', 'manager'], // 管理员和经理可以访问
          requireAuth: true,
        },
      },
      {
        path: 'zustand-test',
        element: lazyLoad(ZustandTest),
        meta: {
          title: 'Zustand 测试',
          icon: <ExperimentOutlined />,
          order: 5,
          roles: ['admin'], // 只有管理员可以访问
          requireAuth: true,
        },
      },
      {
        path: '*',
        element: <NotFound />,
        meta: {
          hideInMenu: true, // 404页面不显示在菜单中
        },
      },
    ],
  },
]

export default routes
