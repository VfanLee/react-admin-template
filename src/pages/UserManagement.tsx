import React from 'react'
import { Card, Typography } from 'antd'

const { Title, Paragraph } = Typography

const UserManagement: React.FC = () => {
  return (
    <Card>
      <Title level={2}>用户管理</Title>
      <Paragraph>这是用户管理页面，只有管理员(admin)才能访问。</Paragraph>
      <Paragraph>在实际项目中，这里可以展示用户列表、添加用户、编辑用户信息等功能。</Paragraph>
    </Card>
  )
}

export default UserManagement
