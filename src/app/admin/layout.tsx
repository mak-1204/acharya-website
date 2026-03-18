'use client';

import React from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';
import { usePathname } from 'next/navigation';
import { AdminAuthGuard } from '@/components/AdminAuthGuard';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <div className="min-h-screen bg-muted/30">{children}</div>;
  }

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-muted/30">
        <AdminSidebar />
        <main className="lg:pl-64 min-h-screen">
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </AdminAuthGuard>
  );
}
