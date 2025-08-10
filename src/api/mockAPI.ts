import type { UserRole } from '@/router/routes'

// 模拟网络延迟
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// 用户信息接口
export interface UserInfo {
  id: string
  username: string
  role: UserRole
  permissions?: string[]
  avatar?: string
  email?: string
  name?: string
}

// 内部用户接口（包含密码）
interface UserWithPassword extends UserInfo {
  password: string
}

// 登录请求参数
export interface LoginRequest {
  username: string
  password: string
}

// 登录响应
export interface LoginResponse {
  success: boolean
  message: string
  data?: {
    user: UserInfo
    token: string
  }
}

// 菜单项接口
export interface MenuItemData {
  id: string
  path: string
  title: string
  icon: string
  order: number
  roles: UserRole[]
  requireAuth: boolean
  parentId: string | null
}

// Mock API 类
class MockAPI {
  private users: UserWithPassword[] = []
  private menus: MenuItemData[] = []
  private initialized = false
  private initPromise: Promise<void> | null = null

  constructor() {
    this.initPromise = this.initMockData()
  }

  // 确保数据已初始化
  private async ensureInitialized() {
    if (!this.initialized && this.initPromise) {
      await this.initPromise
    }
  }

  // 初始化 Mock 数据
  private async initMockData() {
    try {
      // 动态导入 JSON 数据
      const [usersModule, menusModule] = await Promise.all([import('@/mock/users.json'), import('@/mock/menus.json')])

      this.users = usersModule.default.users as UserWithPassword[]
      this.menus = menusModule.default.menus as MenuItemData[]
      this.initialized = true
    } catch (error) {
      console.error('Failed to load mock data:', error)
      // 使用默认数据
      this.users = [
        {
          id: '1',
          username: 'admin',
          password: 'admin123',
          role: 'admin',
          permissions: ['read', 'write', 'delete', 'manage'],
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
          email: 'admin@example.com',
          name: '系统管理员',
        },
      ]
      this.menus = [
        {
          id: '1',
          path: '/home',
          title: '首页',
          icon: 'HomeOutlined',
          order: 1,
          roles: ['admin', 'user', 'manager'],
          requireAuth: true,
          parentId: null,
        },
      ]
      this.initialized = true
    }
  }

  // 模拟登录接口
  async login(loginData: LoginRequest): Promise<LoginResponse> {
    await this.ensureInitialized()
    await delay(800) // 模拟网络延迟

    const user = this.users.find((u) => u.username === loginData.username && u.password === loginData.password)

    if (user) {
      // 移除密码字段
      const { password: _, ...userInfo } = user
      return {
        success: true,
        message: '登录成功',
        data: {
          user: userInfo,
          token: `mock_token_${user.id}_${Date.now()}`,
        },
      }
    }

    return {
      success: false,
      message: '用户名或密码错误',
    }
  }

  // 获取用户信息
  async getUserInfo(token: string): Promise<UserInfo | null> {
    await this.ensureInitialized()
    await delay(300)

    // 从 token 中解析用户 ID
    const tokenParts = token.split('_')
    const userId = tokenParts.length >= 3 ? tokenParts[2] : null

    if (!userId) {
      return null
    }

    const user = this.users.find((u) => u.id === userId)

    if (user) {
      const { password: _, ...userInfo } = user
      return userInfo
    }

    return null
  }

  // 获取菜单数据（根据用户角色过滤）
  async getMenus(userRole?: UserRole): Promise<MenuItemData[]> {
    await this.ensureInitialized()
    await delay(200)

    if (!userRole) {
      return []
    }

    return this.menus.filter((menu) => !menu.roles.length || menu.roles.includes(userRole))
  }

  // 模拟登出接口
  async logout(): Promise<{ success: boolean; message: string }> {
    await delay(300)
    return {
      success: true,
      message: '登出成功',
    }
  }

  // 获取所有角色列表（用于演示）
  async getRoles(): Promise<{ role: UserRole; label: string }[]> {
    await this.ensureInitialized()
    await delay(100)
    return [
      { role: 'admin', label: '管理员' },
      { role: 'manager', label: '经理' },
      { role: 'user', label: '用户' },
      { role: 'guest', label: '访客' },
    ]
  }
}

// 导出单例实例
export const mockAPI = new MockAPI()

// 导出具体的 API 方法
export const authAPI = {
  login: (data: LoginRequest) => mockAPI.login(data),
  getUserInfo: (token: string) => mockAPI.getUserInfo(token),
  logout: () => mockAPI.logout(),
}

export const menuAPI = {
  getMenus: (userRole?: UserRole) => mockAPI.getMenus(userRole),
}

export const userAPI = {
  getRoles: () => mockAPI.getRoles(),
}
