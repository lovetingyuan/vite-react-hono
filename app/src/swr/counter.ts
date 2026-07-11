import useSWRMutation from 'swr/mutation';
import { api } from '../client';
import { SWR_KEYS } from './keys';

export const useCounterRequest = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    SWR_KEYS.counter,
    async (_key: string, { arg }: { arg: number }) => {
      const res = await api.counter.$get({
        query: { count: String(arg) },
      });

      if (!res.ok) {
        throw new Error('Failed to request counter');
      }

      return res.json();
    },
  );

  return {
    response: data,
    error,
    isMutating,
    requestCounter: trigger,
  };
};
