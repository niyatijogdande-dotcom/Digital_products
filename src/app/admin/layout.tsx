"use client";

import { AuthProvider } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/AdminSidebar';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Client-side auth check (works in iframes unlike cookies)
    const isAuth = localStorage.getItem('isAdminAuthenticated') === 'true';
    
    // If not authenticated and not on login page, redirect
    if (!isAuth && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setIsChecking(false);
    }
  }, [pathname, router]);

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <AuthProvider>{children}</AuthProvider>;
  }

  // Show loading state while checking auth
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 w-full min-h-screen bg-gray-50 overflow-y-auto">
          <div className="w-full px-6 lg:px-10 py-6 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}