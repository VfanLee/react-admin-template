import React from 'react'
import { HomeOutlined, InfoCircleOutlined, UserOutlined, SettingOutlined, ExperimentOutlined } from '@ant-design/icons'
import type { UserRole } from '@/router/routes'
import type { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]

interface MenuConfig {
  key: string
  path: string
  label: string
  icon?: React.ReactNode
  roles?: UserRole[]
  requireAuth?: boolean
  order?: number
}

// 菜单配置
export const menuConfigs: MenuConfig[] = [
  {
    key: '/home',
    path: '/home',
    label: '首页',
    icon: React.createElement(HomeOutlined),
    roles: ['admin', 'user', 'manager'],
    requireAuth: true,
    order: 1,
  },
  {
    key: '/about',
    path: '/about',
    label: '关于',
    icon: React.createElement(InfoCircleOutlined),
    roles: ['admin'],
    requireAuth: true,
    order: 2,
  },
  {
    key: '/user-management',
    path: '/user-management',
    label: '用户管理',
    icon: React.createElement(UserOutlined),
    roles: ['admin'],
    requireAuth: true,
    order: 3,
  },
  {
    key: '/settings',
    path: '/settings',
    label: '系统设置',
    icon: React.createElement(SettingOutlined),
    roles: ['admin', 'manager'],
    requireAuth: true,
    order: 4,
  },
  {
    key: '/zustand-test',
    path: '/zustand-test',
    label: 'Zustand 测试',
    icon: React.createElement(ExperimentOutlined),
    roles: ['admin'],
    requireAuth: true,
    order: 5,
  },
]

/**
 * 检查用户是否有权限访问菜单项
 */
export function hasMenuPermission(menu: MenuConfig, userRole?: UserRole, isAuthenticated?: boolean): boolean {
  // 如果需要认证但用户未认证，则无权限
  if (menu.requireAuth && !isAuthenticated) {
    return false
  }

  // 如果没有指定角色要求，则所有人都可以访问
  if (!menu.roles || menu.roles.length === 0) {
    return true
  }

  // 如果用户未认证但需要特定角色，则无权限
  if (!userRole) {
    return false
  }

  // 检查用户角色是否在允许的角色列表中
  return menu.roles.includes(userRole)
}

/**
 * 根据用户角色和认证状态生成菜单项
 */
export function generateMenuFromConfig(userRole?: UserRole, isAuthenticated = false): MenuItem[] {
  return menuConfigs
    .filter((menu) => hasMenuPermission(menu, userRole, isAuthenticated))
    .sort((a, b) => (a.order || 999) - (b.order || 999))
    .map((menu) => ({
      key: menu.key,
      icon: menu.icon,
      label: menu.label,
    }))
}

/**
 * 根据当前路径获取选中的菜单项key
 */
export function getSelectedKeys(pathname: string): string[] {
  // 处理根路径
  if (pathname === '/') {
    return ['/home']
  }
  return [pathname]
}

/**
 * 根据当前路径获取展开的菜单项key（目前是扁平结构，暂时返回空数组）
 */
export function getOpenKeys(_pathname: string): string[] {
  // 当前是扁平菜单结构，没有子菜单需要展开
  return []
}
