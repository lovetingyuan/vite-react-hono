import { Link } from 'react-router'

export default function NavBar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          home
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/about" className="link link-hover">
              about
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
