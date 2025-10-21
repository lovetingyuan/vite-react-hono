import { createStore } from 'react-atomic-store'

export const { useStore } = createStore('appStore', {
  count: 0,
})
