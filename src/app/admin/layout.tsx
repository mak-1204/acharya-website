'use client';

import React from 'react';
import { AdminAuthGuard } from '@/components/AdminAuthGuard';
import { AdminSidebar } from '@/components/AdminSidebar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-muted/30">
        <AdminSidebar />
        <main className="pl-64 min-h-screen">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </AdminAuthGuard>
  );
}
