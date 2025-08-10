import React, { useState } from 'react'
import { Card, Button, Select, Space, Typography, Tabs, Form, Input, Spin } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/stores/userStore'
import { mockUsers } from '@/types/user'
import type { UserRole } from '@/router/routes'
import type { LoginRequest } from '@/api'

const { Title, Text } = Typography

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login, quickLogin, loading } = useUser()
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin')
  const [loginForm] = Form.useForm()

  // 真实登录（使用表单）
  const handleRealLogin = async (values: LoginRequest) => {
    const success = await login(values)
    if (success) {
      navigate('/')
    }
  }

  // 快速登录（演示用）
  const handleQuickLogin = () => {
    const selectedUser = mockUsers.find((user) => user.role === selectedRole)
    if (selectedUser) {
      quickLogin(selectedUser)
      navigate('/')
    }
  }

  // Tabs 配置项
  const tabItems = [
    {
      key: 'real',
      label: '真实登录',
      children: (
        <>
          <Form form={loginForm} onFinish={handleRealLogin} layout="vertical" style={{ textAlign: 'left' }}>
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input prefix={<UserOutlined />} placeholder="用户名" size="large" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="密码" size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>

          <div style={{ fontSize: '12px', color: '#666', textAlign: 'left' }}>
            <Title level={5}>测试账号：</Title>
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              <li>admin / admin123</li>
              <li>manager / manager123</li>
              <li>user / user123</li>
              <li>guest / guest123</li>
            </ul>
          </div>
        </>
      ),
    },
    {
      key: 'quick',
      label: '快速登录',
      children: (
        <>
          <div style={{ margin: '24px 0' }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Text strong>选择角色：</Text>
                <Select
                  value={selectedRole}
                  onChange={setSelectedRole}
                  style={{ width: '100%', marginTop: 8 }}
                  size="large"
                  options={mockUsers.map((user) => ({
                    label: `${user.username} (${user.role})`,
                    value: user.role,
                  }))}
                />
              </div>

              <Button type="primary" size="large" block onClick={handleQuickLogin} loading={loading}>
                快速登录
              </Button>
            </Space>
          </div>

          <div style={{ fontSize: '12px', color: '#666', textAlign: 'left' }}>
            <Title level={5}>角色权限说明：</Title>
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              <li>
                <strong>admin</strong>: 可访问所有菜单
              </li>
              <li>
                <strong>manager</strong>: 可访问首页、系统设置
              </li>
              <li>
                <strong>user</strong>: 可访问首页
              </li>
              <li>
                <strong>guest</strong>: 无法访问任何菜单
              </li>
            </ul>
          </div>
        </>
      ),
    },
  ]

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f2f5',
      }}
    >
      <Card style={{ width: 450, textAlign: 'center' }}>
        <Title level={3}>权限演示登录</Title>
        <Text type="secondary">体验基于角色的菜单权限控制</Text>

        <Spin spinning={loading}>
          <Tabs defaultActiveKey="real" style={{ marginTop: 24 }} items={tabItems} />
        </Spin>
      </Card>
    </div>
  )
}

export default Login
