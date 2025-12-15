import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import honoLogo from '../assets/hono.svg'
import { useStore } from '../store'

function App() {
  const { count, setCount } = useStore()

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
      <div className="card justify-center items-center">
        <div className="flex gap-2">
          <button
            className="btn btn-accent"
            onClick={() => {
              setCount(count => count + 1)
            }}
          >
            count is {count}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              fetch('/api/test?count=' + count)
                .then(res => res.json())
                .then(data => {
                  alert('success! /api/test: ' + JSON.stringify(data))
                })
            }}
          >
            click to send count to api
          </button>
        </div>
        <p className="my-6">
          Edit <code>src/pages/index.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
