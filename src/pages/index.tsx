import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import honoLogo from '../assets/hono.svg'
import NavBar from './_components/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <div className="flex gap-8 mt-10">
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
      <h1 className="my-5">Vite + React + Hono</h1>
      <div className="card ">
        <button
          className="btn btn-accent"
          onClick={() => {
            setCount(count => count + 1)
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/pages/index.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="mt-10">Click on the Vite React Hono logos to learn more</p>
    </>
  )
}

export default App
