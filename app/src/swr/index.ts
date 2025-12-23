import useSWR from 'swr'
import { api } from '../client'
import { SWR_KEYS } from './keys'

export function useItems() {
  const { data, error, isLoading, mutate } = useSWR(SWR_KEYS.ITEMS, async () => {
    const res = await api.items.$get()
    if (!res.ok) {
      throw new Error('Failed to fetch items')
    }
    return res.json()
  })

  return {
    items: data,
    isLoading,
    isError: error,
    mutate,
  }
}
