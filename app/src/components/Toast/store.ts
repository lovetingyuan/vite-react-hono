import { createStore } from 'react-atomic-store';

export type ToastType = 'success' | 'error' | 'info' | 'warning';
export type ToastPosition =
  | 'toast-top toast-start'
  | 'toast-top toast-center'
  | 'toast-top toast-end'
  | 'toast-middle toast-start'
  | 'toast-middle toast-center'
  | 'toast-middle toast-end'
  | 'toast-bottom toast-start'
  | 'toast-bottom toast-center'
  | 'toast-bottom toast-end';

export interface ToastOptions {
  id?: string;
  type?: ToastType;
  duration?: number;
  closable?: boolean;
  position?: ToastPosition;
}

export interface ToastItem extends Required<Omit<ToastOptions, 'id'>> {
  id: string;
  message: string;
  visible: boolean;
}

interface ToastState extends Record<string, unknown> {
  toasts: ToastItem[];
}

const initialState: ToastState = {
  toasts: [],
};

const store = createStore<ToastState>('toastStore', initialState);
export const { useStore, getStoreMethods } = store;

const methods = getStoreMethods() as unknown as {
  getToasts: () => ToastItem[];
  setToasts: (toasts: ToastItem[] | ((prev: ToastItem[]) => ToastItem[])) => void;
};

export const addToast = (message: string, options: ToastOptions = {}) => {
  // eslint-disable-next-line sonarjs/pseudo-random
  const id = options.id || Math.random().toString(36).substring(2, 9);
  const { type = 'info', duration = 3000, closable = true, position = 'toast-top toast-end' } = options;

  const newToast: ToastItem = {
    id,
    message,
    type,
    duration,
    closable,
    position,
    visible: true,
  };

  methods.setToasts((prev) => [...prev, newToast]);

  if (duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }

  return id;
};

export const removeToast = (id: string) => {
  methods.setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, visible: false } : t)));

  // Remove from DOM after animation completes
  setTimeout(() => {
    methods.setToasts((prev) => prev.filter((t) => t.id !== id));
  }, 300);
};

export const toast = {
  success: (message: string, options?: ToastOptions) => addToast(message, { ...options, type: 'success' }),
  error: (message: string, options?: ToastOptions) => addToast(message, { ...options, type: 'error' }),
  info: (message: string, options?: ToastOptions) => addToast(message, { ...options, type: 'info' }),
  warning: (message: string, options?: ToastOptions) => addToast(message, { ...options, type: 'warning' }),
  remove: removeToast,
};
