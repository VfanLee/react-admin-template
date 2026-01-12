import React from 'react'
import { Card, Button, Typography, Tabs, Form, Input, Spin } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/store/userStore'
import type { LoginRequest } from '@/api'

const { Title, Text } = Typography

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login, loading } = useUser()
  const [loginForm] = Form.useForm()

  // 真实登录（使用表单）
  const handleLogin = async (values: LoginRequest) => {
    const success = await login(values)
    if (success) {
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
          <Form form={loginForm} onFinish={handleLogin} layout="vertical" style={{ textAlign: 'left' }}>
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]} initialValue="admin">
              <Input prefix={<UserOutlined />} placeholder="用户名" size="large" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]} initialValue="admin123">
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
        <Title level={3}>登录</Title>
        <Text type="secondary">登录</Text>

        <Spin spinning={loading}>
          <Tabs defaultActiveKey="real" style={{ marginTop: 24 }} items={tabItems} />
        </Spin>
      </Card>
    </div>
  )
}

export default Login
