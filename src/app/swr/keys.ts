/**
 * SWR 请求键名枚举
 */
export const SWR_KEYS = {
  /**
   * 获取项目列表
   * 返回值类型: Item[]
   */
  ITEMS: 'items',
} as const

/**
 * SWR 键名类型
 */
export type SWRKey = (typeof SWR_KEYS)[keyof typeof SWR_KEYS]
