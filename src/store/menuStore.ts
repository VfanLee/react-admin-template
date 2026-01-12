import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { MenuProps } from 'antd'
import type { UserRole } from '@/router/routes'
import { generateMenuFromConfig, getSelectedKeys, getOpenKeys } from '@/utils/menuConfig'

type MenuItem = Required<MenuProps>['items'][number]

// 菜单状态接口
interface MenuState {
  // 状态
  menuItems: MenuItem[]
  selectedKeys: string[]
  openKeys: string[]
  collapsed: boolean
  loading: boolean

  // 操作方法
  generateMenus: (userRole?: UserRole, isAuthenticated?: boolean) => Promise<void>
  updateSelectedKeys: (pathname: string) => void
  updateOpenKeys: (pathname: string) => void
  setCollapsed: (collapsed: boolean) => void
  toggleCollapsed: () => void
}

// 创建菜单状态管理 store
export const useMenuStore = create<MenuState>()(
  devtools(
    (set, get) => ({
      // 初始状态
      menuItems: [],
      selectedKeys: [],
      openKeys: [],
      collapsed: false,
      loading: false,

      // 生成菜单项
      generateMenus: async (userRole?: UserRole, isAuthenticated = false) => {
        try {
          set({ loading: true }, false, 'generateMenus/start')

          // 使用新的菜单配置生成菜单项
          const menuItems = generateMenuFromConfig(userRole, isAuthenticated)

          set(
            {
              menuItems,
              loading: false,
            },
            false,
            'generateMenus/success',
          )
        } catch (error) {
          console.error('Failed to generate menus:', error)
          set(
            {
              menuItems: [],
              loading: false,
            },
            false,
            'generateMenus/error',
          )
        }
      },

      // 更新选中的菜单项
      updateSelectedKeys: (pathname: string) => {
        const selectedKeys = getSelectedKeys(pathname)
        set({ selectedKeys }, false, 'updateSelectedKeys')
      },

      // 更新展开的菜单项
      updateOpenKeys: (pathname: string) => {
        const { collapsed } = get()
        const openKeys = collapsed ? [] : getOpenKeys(pathname)
        set({ openKeys }, false, 'updateOpenKeys')
      },

      // 设置侧边栏折叠状态
      setCollapsed: (collapsed: boolean) => {
        const { openKeys } = get()
        set(
          {
            collapsed,
            openKeys: collapsed ? [] : openKeys,
          },
          false,
          'setCollapsed',
        )
      },

      // 切换侧边栏折叠状态
      toggleCollapsed: () => {
        const { collapsed } = get()
        get().setCollapsed(!collapsed)
      },
    }),
    {
      name: 'menu-store',
    },
  ),
)

// 创建用于组件使用的简化 hook
export const useMenu = () => {
  const store = useMenuStore()
  return {
    menuItems: store.menuItems,
    selectedKeys: store.selectedKeys,
    openKeys: store.openKeys,
    collapsed: store.collapsed,
    loading: store.loading,
    generateMenus: store.generateMenus,
    updateSelectedKeys: store.updateSelectedKeys,
    updateOpenKeys: store.updateOpenKeys,
    setCollapsed: store.setCollapsed,
    toggleCollapsed: store.toggleCollapsed,
  }
}
