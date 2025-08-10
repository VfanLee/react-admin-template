import request from '@/utils/request'
import { authAPI as mockAuthAPI, menuAPI as mockMenuAPI, userAPI as mockUserAPI } from './mockAPI'
import type { LoginRequest, LoginResponse, UserInfo, MenuItemData } from './mockAPI'
import type { UserRole } from '@/router/routes'

// 配置是否使用 Mock 数据
const USE_MOCK = true // 设置为 false 时使用真实 API

// 认证相关 API
export const authAPI = {
  // 登录
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    if (USE_MOCK) {
      return mockAuthAPI.login(data)
    }
    return request.post('/auth/login', data)
  },

  // 获取用户信息
  getUserInfo: async (token?: string): Promise<UserInfo | null> => {
    if (USE_MOCK) {
      const currentToken = token || localStorage.getItem('token') || ''
      return mockAuthAPI.getUserInfo(currentToken)
    }
    return request.get('/auth/user')
  },

  // 登出
  logout: async (): Promise<{ success: boolean; message: string }> => {
    if (USE_MOCK) {
      return mockAuthAPI.logout()
    }
    return request.post('/auth/logout')
  },
}

// 菜单相关 API
export const menuAPI = {
  // 获取菜单列表
  getMenus: async (userRole?: UserRole): Promise<MenuItemData[]> => {
    if (USE_MOCK) {
      return mockMenuAPI.getMenus(userRole)
    }
    return request.get('/menus', { params: { role: userRole } })
  },
}

// 用户相关 API
export const userAPI = {
  // 获取角色列表
  getRoles: async (): Promise<{ role: UserRole; label: string }[]> => {
    if (USE_MOCK) {
      return mockUserAPI.getRoles()
    }
    return request.get('/users/roles')
  },

  // 获取用户列表
  getUserList: async (): Promise<UserInfo[]> => {
    if (USE_MOCK) {
      // Mock 实现
      await new Promise((resolve) => setTimeout(resolve, 500))
      return []
    }
    return request.get('/users')
  },
}

// 导出配置
export { USE_MOCK }
export type { LoginRequest, LoginResponse, UserInfo, MenuItemData }
