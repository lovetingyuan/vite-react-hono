import { Outlet } from 'react-router'
import NavBar from './_components/NavBar'

export default function Home() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}
