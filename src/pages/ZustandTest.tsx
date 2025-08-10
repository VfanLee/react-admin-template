import React from 'react'
import { Card, Button, Space, Typography, Tag } from 'antd'
import { useUser } from '@/stores/userStore'
import { useMenu } from '@/stores/menuStore'

const { Title, Text } = Typography

const ZustandTest: React.FC = () => {
  const { user, isAuthenticated, switchRole } = useUser()
  const { menuItems, collapsed, setCollapsed } = useMenu()

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Zustand 状态管理测试</Title>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 用户状态测试 */}
        <Card title="用户状态" style={{ width: '100%' }}>
          <Space direction="vertical">
            <Text>
              认证状态: <Tag color={isAuthenticated ? 'green' : 'red'}>{isAuthenticated ? '已登录' : '未登录'}</Tag>
            </Text>
            {user && (
              <>
                <Text>
                  用户名: <strong>{user.username}</strong>
                </Text>
                <Text>
                  角色: <Tag color="blue">{user.role}</Tag>
                </Text>
                <Text>用户ID: {user.id}</Text>
              </>
            )}
            <Space>
              <Button onClick={() => switchRole('admin')}>切换到 Admin</Button>
              <Button onClick={() => switchRole('manager')}>切换到 Manager</Button>
              <Button onClick={() => switchRole('user')}>切换到 User</Button>
              <Button onClick={() => switchRole('guest')}>切换到 Guest</Button>
            </Space>
          </Space>
        </Card>

        {/* 菜单状态测试 */}
        <Card title="菜单状态" style={{ width: '100%' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text>
              侧边栏收缩状态: <Tag color={collapsed ? 'orange' : 'green'}>{collapsed ? '已收缩' : '已展开'}</Tag>
            </Text>
            <Button onClick={() => setCollapsed(!collapsed)}>{collapsed ? '展开' : '收缩'}侧边栏</Button>
            <Text>
              当前菜单项数量: <strong>{menuItems.length}</strong>
            </Text>
            <div>
              <Text>菜单项:</Text>
              <ul>
                {menuItems.map((item: any) => (
                  <li key={item.key}>
                    {item.label} ({item.key})
                  </li>
                ))}
              </ul>
            </div>
          </Space>
        </Card>
      </Space>
    </div>
  )
}

export default ZustandTest
