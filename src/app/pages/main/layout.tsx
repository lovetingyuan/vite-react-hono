import { Outlet } from 'react-router'

export default function Main() {
  return (
    <div>
      <p>main page</p>
      <Outlet />
    </div>
  )
}
