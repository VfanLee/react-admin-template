import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Spin } from 'antd'
import { useUser } from '@/store/userStore'

interface AuthGuardProps {
  children: React.ReactNode
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, loading } = useUser()
  const location = useLocation()

  // 如果正在加载，显示加载状态
  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin size="large">
          <div
            style={{
              minHeight: '200px',
              minWidth: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              color: '#666',
            }}
          >
            加载中...
          </div>
        </Spin>
      </div>
    )
  }

  // 定义不需要认证的页面白名单
  const publicPaths = ['/login', '/test']

  // 如果未认证且不在白名单页面，重定向到登录页
  if (!isAuthenticated && !publicPaths.includes(location.pathname)) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // 如果已认证且在登录页面，重定向到首页
  if (isAuthenticated && location.pathname === '/login') {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default AuthGuard
