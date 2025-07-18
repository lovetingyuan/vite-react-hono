import { Outlet } from 'react-router'

export default function Foo() {
  return (
    <div>
      <p>foo page</p>
      <Outlet></Outlet>
    </div>
  )
}
