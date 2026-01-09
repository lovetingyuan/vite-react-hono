import { useStore, removeToast } from './store';
import type { ToastItem as ToastItemType, ToastPosition } from './store';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

function ToastItem({ toast }: { toast: ToastItemType }) {
  const { id, message, type, closable, visible, position } = toast;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const isActuallyVisible = visible && mounted;

  const alertClass = clsx('alert shadow-lg transition-all duration-300 ease-in-out flex items-center gap-2 min-w-64', {
    'alert-success': type === 'success',
    'alert-error': type === 'error',
    'alert-info': type === 'info',
    'alert-warning': type === 'warning',
    'opacity-100 translate-x-0 translate-y-0 scale-100': isActuallyVisible,
    'opacity-0 scale-95': !isActuallyVisible,
    'translate-x-full': !isActuallyVisible && position.includes('end'),
    '-translate-x-full': !isActuallyVisible && position.includes('start'),
    'translate-y-4': !isActuallyVisible && position.includes('center') && !position.includes('middle'),
  });

  return (
    <div className={alertClass}>
      <div className="flex items-center gap-2 flex-1">
        {type === 'success' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        {type === 'error' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        {type === 'info' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        {type === 'warning' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        )}
        <span className="text-sm font-medium">{message}</span>
      </div>
      {closable && (
        <button
          onClick={() => removeToast(id)}
          className="btn btn-ghost btn-xs btn-circle shrink-0 select-none"
          aria-label="Close"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default function ToastContainer() {
  const { toasts } = useStore() as unknown as { toasts: ToastItemType[] };
  const toastList = toasts || [];

  // Group toasts by position
  const groupedToasts = toastList.reduce((acc, toast) => {
    const pos = toast.position as ToastPosition;
    if (!acc[pos]) {
      acc[pos] = [];
    }
    acc[pos]!.push(toast);
    return acc;
  }, {} as Partial<Record<ToastPosition, ToastItemType[]>>);

  return (
    <>
      {Object.entries(groupedToasts).map(([position, positionToasts]) => (
        <div key={position} className={clsx('toast z-[100] p-4 gap-2', position)}>
          {positionToasts?.map((toast) => (
            <ToastItem key={toast.id} toast={toast} />
          ))}
        </div>
      ))}
    </>
  );
}
