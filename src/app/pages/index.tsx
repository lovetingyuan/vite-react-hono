import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import honoLogo from '../assets/hono.svg'
import { useStore } from '../store'
import { useState } from 'react'
import { api } from '../client'
import { useItems } from '../swr'

function App() {
  const { count, setCount } = useStore()
  const { items = [], isLoading, mutate } = useItems()
  const [newItemName, setNewItemName] = useState('')

  // Add item
  const addItem = async () => {
    if (!newItemName) {
      return
    }
    const res = await api.items.$post({
      json: { name: newItemName },
    })
    if (res.ok) {
      mutate() // 刷新 SWR 缓存
      setNewItemName('')
    }
  }

  // Delete item
  const deleteItem = async (id: number) => {
    const res = await api.items[':id'].$delete({
      param: { id: String(id) },
    })
    if (res.ok) {
      mutate() // 刷新 SWR 缓存
    }
  }

  return (
    <>
      <div className="flex gap-8 mt-10 justify-center">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="w-16 h-16" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-16 h-16" alt="React logo" />
        </a>
        <a href="https://hono.dev" target="_blank">
          <img src={honoLogo} className="w-16 h-16" alt="Hono logo" />
        </a>
      </div>
      <h1 className="my-5 text-center">Vite + React + Hono (Click on the logos to learn more)</h1>
      <hr className="my-5" />

      <div className="card flex flex-col items-center">
        {/* Original counter example */}
        <div className="flex gap-2">
          <button
            className="btn btn-accent"
            onClick={() => {
              setCount((count: number) => count + 1)
            }}
          >
            count is {count}
          </button>
          <button
            className="btn btn-primary"
            onClick={async () => {
              const res = await api.test.$get({
                query: { count: String(count) },
              })
              if (res.ok) {
                const data = await res.json()
                alert('success! /api/test: ' + JSON.stringify(data))
              }
            }}
          >
            click to send count to api
          </button>
        </div>

        {/* CRUD Example */}
        <div className="mt-10 w-full max-w-md p-6 bg-base-200 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4">API Example: CRUD List</h2>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter item name..."
              className="input input-bordered grow"
              value={newItemName}
              onChange={e => setNewItemName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addItem()}
            />
            <button className="btn btn-secondary" onClick={addItem}>
              Add
            </button>
          </div>

          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <ul className="space-y-2 text-left">
              {items.map(item => (
                <li
                  key={item.id}
                  className="flex justify-between items-center p-3 bg-base-100 rounded shadow-sm"
                >
                  <span>{item.name}</span>
                  <button className="btn btn-error btn-xs" onClick={() => deleteItem(item.id)}>
                    Delete
                  </button>
                </li>
              ))}
              {items.length === 0 && (
                <li className="text-center text-gray-500">No data available</li>
              )}
            </ul>
          )}
          <button className="btn btn-ghost btn-sm w-full mt-4" onClick={() => mutate()}>
            Refresh List
          </button>
        </div>
      </div>
    </>
  )
}

export default App
