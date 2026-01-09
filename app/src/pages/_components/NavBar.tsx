import { Link } from 'react-router';
import ThemeToggle from '../../components/Theme/ThemeToggle';

export default function NavBar() {
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          home
        </Link>
      </div>
      <div className="flex-none gap-2">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/todo" className="link link-hover">
              todo
            </Link>
          </li>
          <li>
            <Link to="/about" className="link link-hover">
              about
            </Link>
          </li>
        </ul>
        <ThemeToggle />
      </div>
    </div>
  );
}
