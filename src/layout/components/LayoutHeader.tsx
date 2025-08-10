import React from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { Button, Layout, Dropdown, Avatar, Space, Select } from 'antd'
import type { MenuProps as AntdMenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/stores/userStore'
import { useMenu } from '@/stores/menuStore'
import { mockUsers } from '@/types/user'
import type { UserRole } from '@/router/routes'

const { Header } = Layout

const LayoutHeader: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout, switchRole } = useUser()
  const { collapsed, setCollapsed } = useMenu()

  // 处理用户操作菜单
  const handleUserMenuClick: AntdMenuProps['onClick'] = async ({ key }) => {
    if (key === 'logout') {
      await logout()
      navigate('/login')
    }
  }

  // 处理角色切换（用于演示）
  const handleRoleChange = (role: UserRole) => {
    switchRole(role)
  }

  // 用户下拉菜单
  const userMenuItems: AntdMenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ]

  return (
    <Header
      style={{
        padding: '0 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#041528',
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
          color: '#fff',
        }}
      />

      <Space>
        {/* 角色切换选择器（演示用） */}
        {user && (
          <Select
            value={user.role}
            onChange={handleRoleChange}
            style={{ width: 120 }}
            options={mockUsers.map((u) => ({
              label: u.role,
              value: u.role,
            }))}
          />
        )}

        {/* 用户信息下拉菜单 */}
        {user && (
          <Dropdown menu={{ items: userMenuItems, onClick: handleUserMenuClick }} placement="bottomRight">
            <Space style={{ cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} />
              <span style={{ color: '#fff' }}>{user.username}</span>
            </Space>
          </Dropdown>
        )}
      </Space>
    </Header>
  )
}

export default LayoutHeader
