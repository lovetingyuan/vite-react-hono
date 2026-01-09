import { useStore } from '../../store';

export default function ThemeToggle() {
  const { theme, setTheme } = useStore();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
        <span className="capitalize text-xs font-normal">{theme}</span>
        <svg
          width="10px"
          height="10px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu menu-sm p-2 shadow bg-base-100 rounded-box w-28 mt-2">
        <li>
          <button onClick={() => setTheme('light')} className={theme === 'light' ? 'active' : ''}>
            Light
          </button>
        </li>
        <li>
          <button onClick={() => setTheme('dark')} className={theme === 'dark' ? 'active' : ''}>
            Dark
          </button>
        </li>
        <li>
          <button onClick={() => setTheme('system')} className={theme === 'system' ? 'active' : ''}>
            System
          </button>
        </li>
      </ul>
    </div>
  );
}
