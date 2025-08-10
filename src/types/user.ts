import type { UserRole } from '@/router/routes'

// 重新导出 UserInfo 接口
export type { UserInfo } from '@/stores/userStore'

// 模拟用户数据（保留用于演示）
export const mockUsers = [
  {
    id: '1',
    username: 'admin',
    role: 'admin' as UserRole,
    permissions: ['read', 'write', 'delete', 'manage'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    email: 'admin@example.com',
    name: '系统管理员',
  },
  {
    id: '2',
    username: 'manager',
    role: 'manager' as UserRole,
    permissions: ['read', 'write', 'manage'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=manager',
    email: 'manager@example.com',
    name: '部门经理',
  },
  {
    id: '3',
    username: 'user',
    role: 'user' as UserRole,
    permissions: ['read'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    email: 'user@example.com',
    name: '普通用户',
  },
  {
    id: '4',
    username: 'guest',
    role: 'guest' as UserRole,
    permissions: [],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest',
    email: 'guest@example.com',
    name: '访客',
  },
]
