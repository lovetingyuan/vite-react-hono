import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router'

import ReactDOM from 'react-dom/client'

import React from 'react'

type Comp = { default: React.ComponentType }

const pages = import.meta.glob<Comp>(['./pages/**/index.tsx', './pages/**/layout.tsx'])
const notFound = import.meta.glob<Comp>('./pages/404.tsx')

type RouteMetaItem = {
  $page?: () => Promise<Comp>
  $layout?: () => Promise<Comp>
} & {
  [K in string as K extends '$page' | '$layout' ? never : K]: RouteMetaItem
}

const pagesMap: RouteMetaItem = {}

Object.keys(pages).map(file => {
  const paths = file.split('/')
  let map = pagesMap
  const comp = paths.pop() // index.tsx or layout.tsx
  paths.shift() // .
  paths.shift() // pages
  paths.unshift('/') // route path
  for (const p of paths) {
    map[p] ??= {}
    map = map[p]
  }
  const key = comp === 'index.tsx' ? '$page' : '$layout'
  map[key] = pages[file]
})

/**
 * 接受当前路由名称，路由配置，以及父级路由数组
 */
function buildRoute(route: string, config: RouteMetaItem, routes: RouteObject[] = []) {
  const children: RouteObject[] = []
  route = route.startsWith('[') && route.endsWith(']') ? ':' + route.slice(1, -1) : route
  const router: RouteObject = {
    path: route,
    // Component: null,
    children,
  }
  if (config.$layout) {
    if (config.$page) {
      children.push({
        index: true,
        Component: React.lazy(config.$page),
      })
      delete config.$page
    }
    router.Component = React.lazy(config.$layout)
    delete config.$layout
  } else if (config.$page) {
    router.Component = React.lazy(config.$page)
    delete config.$page
  }
  for (const key in config) {
    if (!key.startsWith('_')) {
      buildRoute(key, config[key], children)
    }
  }
  routes.push(router)
  return routes
}

// console.log('pages', pages)
// console.log('routes', pagesMap)
const routes = buildRoute('/', pagesMap['/'])

if (notFound['./pages/404.tsx']) {
  routes.push({
    path: '*',
    Component: React.lazy(notFound['./pages/404.tsx']),
  })
}
console.log(routes)
const router = createBrowserRouter(routes)

const root = document.getElementById('root')

ReactDOM.createRoot(root!).render(<RouterProvider router={router} />)
