import React from 'react'

interface LogoProps {
  collapsed: boolean
}

const Logo: React.FC<LogoProps> = ({ collapsed }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        padding: '16px',
        color: 'white',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        background: '#041528',
      }}
    >
      <img
        src="/vite.svg"
        alt="Logo"
        style={{
          width: '32px',
          height: '32px',
          marginRight: collapsed ? '0' : '12px',
        }}
      />
      {!collapsed && (
        <span
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#fff',
          }}
        >
          Vfan Admin
        </span>
      )}
    </div>
  )
}

export default Logo
