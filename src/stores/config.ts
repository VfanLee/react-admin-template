// Zustand DevTools 配置
export const devtoolsConfig = {
  enabled: import.meta.env.DEV,
  anonymousActionType: 'unknown',
  serialize: {
    // 自定义序列化选项
    options: {
      undefined: true,
      function: true,
      symbol: true,
    },
  },
}

// 持久化配置
export const persistConfig = {
  // 存储到 localStorage
  getStorage: () => localStorage,
  // 合并策略
  merge: (persistedState: unknown, currentState: unknown) => ({
    ...(currentState as Record<string, unknown>),
    ...(persistedState as Record<string, unknown>),
    // 确保 loading 状态始终从当前状态获取
    loading: (currentState as { loading: boolean }).loading,
  }),
}
