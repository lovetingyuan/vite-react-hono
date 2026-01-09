import { useState } from 'react';
import { useTodos } from '../../swr/todos';
import { toast } from '../../components/Toast';
import type { Todo } from 'server/routes/todo';

export default function TodoPage() {
  const [newTodo, setNewTodo] = useState('');
  const { todos, isLoading, addTodo, toggleTodo, deleteTodo } = useTodos();

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) {
      return;
    }
    
    const success = await addTodo(newTodo);
    if (success) {
      setNewTodo('');
      toast.success('Todo added');
    } else {
      toast.error('Failed to add todo');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">Todo List</h1>
      
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="What needs to be done?"
          className="input input-bordered flex-1"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Add</button>
      </form>

      {isLoading ? (
        <div className="flex justify-center"><span className="loading loading-spinner loading-lg"></span></div>
      ) : (
        <ul className="space-y-3">
          {todos?.map((todo: Todo) => (
            <li key={todo.id} className="flex items-center gap-3 p-3 bg-base-100 rounded-lg group">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id, !todo.completed)}
              />
              <span className={`flex-1 ${todo.completed ? 'line-through text-base-content/50' : ''}`}>
                {todo.title}
              </span>
              <button
                className="btn btn-ghost btn-xs text-error opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => {
                  deleteTodo(todo.id);
                  toast.success('Todo deleted');
                }}
              >
                Delete
              </button>
            </li>
          ))}
          {todos?.length === 0 && (
            <p className="text-center text-base-content/50 py-4">No tasks yet. Add one above!</p>
          )}
        </ul>
      )}
    </div>
  );
}
