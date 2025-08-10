import React, { useEffect } from 'react'
import { Layout } from 'antd'
import { useLocation } from 'react-router-dom'
import { useUser } from '@/stores/userStore'
import { useMenu } from '@/stores/menuStore'
import { LayoutSider, LayoutHeader, LayoutContent } from './components'

const BaseLayout: React.FC = () => {
  const location = useLocation()
  const { user, isAuthenticated } = useUser()
  const { generateMenus, updateSelectedKeys } = useMenu()

  // 当用户状态或位置改变时重新生成菜单
  useEffect(() => {
    generateMenus(user?.role, isAuthenticated)
  }, [user?.role, isAuthenticated, generateMenus])

  // 当路径改变时更新选中状态
  useEffect(() => {
    updateSelectedKeys(location.pathname)
  }, [location.pathname, updateSelectedKeys])

  return (
    <Layout style={{ height: '100%' }}>
      <LayoutSider />

      <Layout>
        <LayoutHeader />
        <LayoutContent />
      </Layout>
    </Layout>
  )
}

export default BaseLayout
