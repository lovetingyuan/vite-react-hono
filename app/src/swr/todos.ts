import useSWR from 'swr';
import { api } from '../client';

export const useTodos = () => {
  const { data, error, isLoading, mutate } = useSWR('todos', async () => {
    const res = await api.todos.$get();
    if (!res.ok) {throw new Error('Failed to fetch todos');}
    return res.json();
  });

  const addTodo = async (title: string) => {
    const res = await api.todos.$post({ json: { title } });
    if (res.ok) {mutate();}
    return res.ok;
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    const res = await api.todos[':id'].$put({
      param: { id: String(id) },
      json: { completed },
    });
    if (res.ok) {mutate();}
    return res.ok;
  };

  const deleteTodo = async (id: number) => {
    const res = await api.todos[':id'].$delete({
      param: { id: String(id) },
    });
    if (res.ok) {mutate();}
    return res.ok;
  };

  return {
    todos: data,
    isLoading,
    isError: error,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
};
