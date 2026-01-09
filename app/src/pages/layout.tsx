import { Outlet } from 'react-router';
import { useEffect } from 'react';
import NavBar from './_components/NavBar';
import ThemeController from '../components/Theme/ThemeController';
import { ToastContainer, toast } from '../components/Toast';
import { api } from '../client';

export default function Home() {
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await api.health.$get();
        if (!res.ok) {
          toast.error('服务器目前存在问题');
        }
      } catch {
        toast.error('服务器目前存在问题');
      }
    };
    checkHealth();
  }, []);

  return (
    <div>
      <ThemeController />
      <NavBar />
      <ToastContainer />
      <Outlet />
    </div>
  );
}
