import { RouterProvider } from 'react-router'
import ReactDOM from 'react-dom/client'

// import { router } from './lib/route'
import routes from 'virtual:route?routePath=./pages'
import { createBrowserRouter } from 'react-router'

const router = createBrowserRouter(routes)

const root = document.getElementById('root')

const app = ReactDOM.createRoot(root!)
app.render(<RouterProvider router={router} />)
