import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { message } from 'antd'
import type { UserRole } from '@/router/routes'
import type { LoginRequest } from '@/api'
import { authAPI } from '@/api'

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

// 用户状态接口
interface UserState {
  // 状态
  user: UserInfo | null
  isAuthenticated: boolean
  loading: boolean

  // 操作方法
  login: (loginData: LoginRequest) => Promise<boolean>
  quickLogin: (userInfo: UserInfo) => void
  logout: () => Promise<void>
  switchRole: (role: UserRole) => void
  initializeUser: () => Promise<void>
  setLoading: (loading: boolean) => void
}

// 创建 Zustand store
export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        // 初始状态
        user: null,
        isAuthenticated: false,
        loading: true,

        // 设置加载状态
        setLoading: (loading: boolean) => {
          set({ loading }, false, 'setLoading')
        },

        // 初始化用户状态
        initializeUser: async () => {
          try {
            set({ loading: true }, false, 'initializeUser/start')

            const token = localStorage.getItem('token')
            if (token) {
              const userInfo = await authAPI.getUserInfo(token)
              if (userInfo) {
                set(
                  {
                    user: userInfo,
                    isAuthenticated: true,
                    loading: false,
                  },
                  false,
                  'initializeUser/success',
                )
              } else {
                // Token 无效，清除本地存储
                localStorage.removeItem('token')
                localStorage.removeItem('userInfo')
                set(
                  {
                    user: null,
                    isAuthenticated: false,
                    loading: false,
                  },
                  false,
                  'initializeUser/tokenInvalid',
                )
              }
            } else {
              set(
                {
                  user: null,
                  isAuthenticated: false,
                  loading: false,
                },
                false,
                'initializeUser/noToken',
              )
            }
          } catch (error) {
            console.error('Failed to get user info:', error)
            // 获取用户信息失败，清除本地存储
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
            set(
              {
                user: null,
                isAuthenticated: false,
                loading: false,
              },
              false,
              'initializeUser/error',
            )
          }
        },

        // API 登录
        login: async (loginData: LoginRequest): Promise<boolean> => {
          try {
            set({ loading: true }, false, 'login/start')

            const response = await authAPI.login(loginData)

            if (response.success && response.data) {
              const { user: userInfo, token } = response.data

              // 保存用户信息和 token
              localStorage.setItem('token', token)
              localStorage.setItem('userInfo', JSON.stringify(userInfo))

              set(
                {
                  user: userInfo,
                  isAuthenticated: true,
                  loading: false,
                },
                false,
                'login/success',
              )

              message.success(response.message || '登录成功')
              return true
            } else {
              set({ loading: false }, false, 'login/failed')
              message.error(response.message || '登录失败')
              return false
            }
          } catch (error) {
            console.error('Login error:', error)
            set({ loading: false }, false, 'login/error')
            message.error('登录请求失败')
            return false
          }
        },

        // 快速登录（用于演示，直接设置用户信息）
        quickLogin: (userInfo: UserInfo) => {
          const token = `quick_token_${userInfo.id}_${Date.now()}`

          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          localStorage.setItem('token', token)

          set(
            {
              user: userInfo,
              isAuthenticated: true,
              loading: false,
            },
            false,
            'quickLogin',
          )
        },

        // 登出
        logout: async () => {
          try {
            set({ loading: true }, false, 'logout/start')
            await authAPI.logout()
          } catch (error) {
            console.error('Logout error:', error)
          } finally {
            // 无论 API 调用是否成功，都清除本地状态
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')

            set(
              {
                user: null,
                isAuthenticated: false,
                loading: false,
              },
              false,
              'logout/complete',
            )

            message.success('已退出登录')
          }
        },

        // 切换角色（用于演示）
        switchRole: (role: UserRole) => {
          const { user } = get()
          if (user) {
            const updatedUser = { ...user, role }
            localStorage.setItem('userInfo', JSON.stringify(updatedUser))

            set(
              {
                user: updatedUser,
              },
              false,
              'switchRole',
            )

            message.info(`已切换到 ${role} 角色`)
          }
        },
      }),
      {
        name: 'user-store', // 持久化存储的 key
        partialize: (state) => ({
          // 只持久化 user 和 isAuthenticated，不持久化 loading
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
    {
      name: 'user-store', // DevTools 中显示的名称
    },
  ),
)

// 创建用于组件使用的简化 hook
export const useUser = () => {
  const store = useUserStore()
  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    loading: store.loading,
    login: store.login,
    quickLogin: store.quickLogin,
    logout: store.logout,
    switchRole: store.switchRole,
    initializeUser: store.initializeUser,
  }
}
