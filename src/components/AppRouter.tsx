import { BrowserRouter, useRoutes } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import AuthGuard from '@/components/AuthGuard'
import { routes } from '@/router/routes'
import type { ExtendedRouteObject } from '@/router/routes'

// 转换扩展路由为标准路由（移除 meta 字段）
const convertRoutes = (routes: ExtendedRouteObject[]): RouteObject[] => {
  return routes.map(({ meta: _meta, children, ...rest }) => ({
    ...rest,
    children: children ? convertRoutes(children) : undefined,
  })) as RouteObject[]
}

// 路由元素组件（必须在 Router 内部）
const RouteElement = () => useRoutes(convertRoutes(routes))

const AppRouter = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <AuthGuard>
        <RouteElement />
      </AuthGuard>
    </BrowserRouter>
  )
}

export default AppRouter
