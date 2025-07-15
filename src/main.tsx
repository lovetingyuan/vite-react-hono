import { createBrowserRouter, RouterProvider } from 'react-router'

import ReactDOM from 'react-dom/client'

import React from 'react'

const pages = import.meta.glob(['./pages/**/index.tsx', './pages/404.tsx'])
const notFound = pages['./pages/404.tsx']
// @ts-expect-error ignore
if (notFound) {
  delete pages['./pages/404.tsx']
}
const routes = Object.keys(pages).map(file => {
  const path = file.slice(7, -10) || '/'
  const pathStr = path
    .split('/')
    .filter(p => !p.startsWith('_'))
    .map(seg => {
      if (seg.startsWith('[') && seg.endsWith(']')) {
        return ':' + seg.slice(1, -1)
      }
      return seg
    })
    .join('/')
  return {
    path: pathStr,
    // @ts-expect-error ignore
    Component: React.lazy(pages[file]),
  }
})
if (notFound) {
  routes.push({
    path: '*',
    // @ts-expect-error ignore
    Component: React.lazy(notFound),
  })
}
console.log(routes)
const router = createBrowserRouter(routes)

const root = document.getElementById('root')

ReactDOM.createRoot(root!).render(<RouterProvider router={router} />)
