import type { MenuProps } from 'antd'
import type { ExtendedRouteObject, UserRole } from '@/router/routes'

type MenuItem = Required<MenuProps>['items'][number]

/**
 * 检查用户是否有权限访问路由
 * @param route 路由配置
 * @param userRole 用户角色
 * @param isAuthenticated 是否已认证
 * @returns 是否有权限
 */
export function hasPermission(route: ExtendedRouteObject, userRole?: UserRole, isAuthenticated?: boolean): boolean {
  // 如果路由需要认证但用户未认证，则无权限
  if (route.meta?.requireAuth && !isAuthenticated) {
    return false
  }

  // 如果路由没有指定角色要求，则所有人都可以访问
  if (!route.meta?.roles || route.meta.roles.length === 0) {
    return true
  }

  // 如果用户未认证但路由需要特定角色，则无权限
  if (!userRole) {
    return false
  }

  // 检查用户角色是否在允许的角色列表中
  return route.meta.roles.includes(userRole)
}

/**
 * 根据路由配置生成菜单项（支持角色过滤）
 * @param routes 路由配置数组
 * @param parentPath 父级路径
 * @param userRole 用户角色
 * @param isAuthenticated 是否已认证
 * @returns 菜单项数组
 */
export function generateMenuItems(
  routes: ExtendedRouteObject[],
  parentPath = '',
  userRole?: UserRole,
  isAuthenticated = false,
): MenuItem[] {
  const menuItems: MenuItem[] = []

  routes.forEach((route) => {
    // 跳过不需要显示在菜单中的路由
    if (route.meta?.hideInMenu) {
      return
    }

    // 检查权限
    if (!hasPermission(route, userRole, isAuthenticated)) {
      return
    }

    // 构建完整路径
    const fullPath = route.path
      ? route.path.startsWith('/')
        ? route.path
        : `${parentPath}/${route.path}`.replace(/\/+/g, '/')
      : parentPath

    // 如果有子路由，递归生成子菜单
    if (route.children && route.children.length > 0) {
      const children = generateMenuItems(route.children, fullPath, userRole, isAuthenticated)

      // 如果有可显示的子菜单项，则创建父菜单项
      if (children.length > 0) {
        menuItems.push({
          key: fullPath,
          icon: route.meta?.icon,
          label: route.meta?.title || route.path,
          children,
        })
      }
    } else if (route.meta?.title) {
      // 叶子节点且有标题的路由
      menuItems.push({
        key: fullPath,
        icon: route.meta?.icon,
        label: route.meta?.title,
      })
    }
  })

  // 根据order排序
  return menuItems.sort((a, b) => {
    const getRouteByKey = (key: string) => {
      return routes.find((r) => {
        const fullPath = r.path?.startsWith('/') ? r.path : `${parentPath}/${r.path}`.replace(/\/+/g, '/')
        return fullPath === key
      })
    }

    const orderA = getRouteByKey((a as { key: string }).key)?.meta?.order || 999
    const orderB = getRouteByKey((b as { key: string }).key)?.meta?.order || 999

    return orderA - orderB
  })
}

/**
 * 根据当前路径获取选中的菜单项key
 * @param pathname 当前路径
 * @returns 选中的菜单key数组
 */
export function getSelectedKeys(pathname: string): string[] {
  // 移除末尾的斜杠并确保以斜杠开头
  const normalizedPath = pathname === '/' ? '/home' : pathname
  return [normalizedPath]
}

/**
 * 根据当前路径获取展开的菜单项key
 * @param pathname 当前路径
 * @returns 展开的菜单key数组
 */
export function getOpenKeys(pathname: string): string[] {
  const pathSegments = pathname.split('/').filter(Boolean)
  const openKeys: string[] = []

  let currentPath = ''
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`
    openKeys.push(currentPath)
  })

  return openKeys.slice(0, -1) // 移除最后一个，因为它是当前选中项
}
