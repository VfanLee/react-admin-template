import React from 'react'
import { Card, Typography } from 'antd'

const { Title, Paragraph } = Typography

const Settings: React.FC = () => {
  return (
    <Card>
      <Title level={2}>系统设置</Title>
      <Paragraph>这是系统设置页面，管理员(admin)和经理(manager)都可以访问。</Paragraph>
      <Paragraph>在实际项目中，这里可以配置系统参数、权限设置、功能开关等。</Paragraph>
    </Card>
  )
}

export default Settings
