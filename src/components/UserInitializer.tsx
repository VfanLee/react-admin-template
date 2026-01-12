import React, { useEffect } from 'react'
import { useUserStore } from '@/store/userStore'

interface UserInitializerProps {
  children: React.ReactNode
}

// 用户状态初始化组件
const UserInitializer: React.FC<UserInitializerProps> = ({ children }) => {
  const initializeUser = useUserStore((state) => state.initializeUser)

  useEffect(() => {
    // 初始化用户状态
    initializeUser()
  }, [initializeUser])

  return <>{children}</>
}

export default UserInitializer
