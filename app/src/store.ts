import { createStore } from 'react-atomic-store'

export const { useStore } = createStore('appStore', {
  count: 0,
  theme: (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system',
})
