import { createBrowserRouter, RouterProvider } from 'react-router'

import ReactDOM from 'react-dom/client'
import AboutPage from './pages/About'
import ApiTestPage from './pages/ApiTest'
import App from './App'

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/api-test',
    Component: ApiTestPage,
  },
])

const root = document.getElementById('root')

ReactDOM.createRoot(root!).render(<RouterProvider router={router} />)
