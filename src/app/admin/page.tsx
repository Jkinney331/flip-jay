'use client';

import { useState, useEffect } from 'react';
import { useDomainContent } from '@/hooks/useDomainContent';
import { CMSDashboard } from '@/components/CMSDashboard';
import { MultiDomainDashboard } from '@/components/MultiDomainDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminPage() {
  const { config } = useDomainContent();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - replace with proper auth in production
    if (password === 'fliptech2025') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Enter admin password to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Login
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Managing: <Badge variant="secondary">{config?.branding?.name || 'Loading...'}</Badge>
            </p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="cms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cms">Content Management</TabsTrigger>
            <TabsTrigger value="domains">Multi-Domain</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="cms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Management System</CardTitle>
                <CardDescription>
                  Edit content for {config?.branding?.name} ({config?.audience} audience)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CMSDashboard />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="domains" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Multi-Domain Management</CardTitle>
                <CardDescription>
                  Monitor and manage both FlipTech Pro and FlipTech AI sites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MultiDomainDashboard />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Overview</CardTitle>
                <CardDescription>
                  Performance metrics and insights for {config?.branding?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-border rounded-md">
                    <h3 className="font-semibold text-sm text-muted-foreground">Total Visitors</h3>
                    <p className="text-2xl font-bold">12,845</p>
                  </div>
                  <div className="p-4 border border-border rounded-md">
                    <h3 className="font-semibold text-sm text-muted-foreground">Conversion Rate</h3>
                    <p className="text-2xl font-bold">3.2%</p>
                  </div>
                  <div className="p-4 border border-border rounded-md">
                    <h3 className="font-semibold text-sm text-muted-foreground">Demos Booked</h3>
                    <p className="text-2xl font-bold">47</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">
                    📊 Analytics integration will be connected to Google Analytics for real-time data
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
