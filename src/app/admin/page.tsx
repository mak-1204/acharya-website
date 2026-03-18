'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, BookOpen, Clock, TrendingUp } from 'lucide-react';

const STATS = [
  { label: 'Total Enquiries', value: '128', icon: Users, color: 'bg-blue-500' },
  { label: 'Active Courses', value: '12', icon: BookOpen, color: 'bg-green-500' },
  { label: 'New Leads Today', value: '5', icon: TrendingUp, color: 'bg-primary' },
  { label: 'Pending Actions', value: '3', icon: Clock, color: 'bg-orange-500' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-secondary mb-2">Welcome Back, Admin</h1>
        <p className="text-muted-foreground">Here's an overview of Acharya Education's performance today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={cn("p-3 rounded-2xl text-white shadow-lg", stat.color)}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Enquiries</CardTitle>
            <CardDescription>Latest student enquiries across all programs.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground italic">
              Recent enquiry list will appear here as students fill the forms.
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Commonly used management tools.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl border border-border hover:bg-muted/50 cursor-pointer transition-colors group">
              <p className="font-bold text-secondary group-hover:text-primary transition-colors">Manage JEE/NEET Batches</p>
              <p className="text-xs text-muted-foreground mt-1">Update schedules and seat availability.</p>
            </div>
            <div className="p-4 rounded-xl border border-border hover:bg-muted/50 cursor-pointer transition-colors group">
              <p className="font-bold text-secondary group-hover:text-primary transition-colors">Export Lead Reports</p>
              <p className="text-xs text-muted-foreground mt-1">Download CSV reports for sales tracking.</p>
            </div>
            <div className="p-4 rounded-xl border border-border hover:bg-muted/50 cursor-pointer transition-colors group">
              <p className="font-bold text-secondary group-hover:text-primary transition-colors">Update Hero Banners</p>
              <p className="text-xs text-muted-foreground mt-1">Change the home page carousel images.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper for local class merging inside this component
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
