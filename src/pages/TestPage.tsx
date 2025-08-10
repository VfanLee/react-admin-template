import React from 'react'
import { Button } from 'antd'

const TestPage: React.FC = () => {
  return (
    <div style={{ padding: '50px' }}>
      <h1>测试页面</h1>
      <p>如果你看到这个页面，说明基本的 React 渲染是正常的。</p>
      <Button type="primary">测试按钮</Button>
    </div>
  )
}

export default TestPage
