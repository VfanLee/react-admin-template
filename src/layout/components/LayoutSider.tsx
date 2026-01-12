import React from 'react'
import { Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useMenu } from '@/store/menuStore'
import Logo from './Logo'

const { Sider } = Layout

const LayoutSider: React.FC = () => {
  const navigate = useNavigate()
  const { menuItems, selectedKeys, openKeys, collapsed } = useMenu()

  // 处理菜单点击
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#041528' }}>
      <Logo collapsed={collapsed} />

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={collapsed ? [] : openKeys}
        onClick={handleMenuClick}
        items={menuItems}
        style={{ background: '#041528' }}
      />
    </Sider>
  )
}

export default LayoutSider
