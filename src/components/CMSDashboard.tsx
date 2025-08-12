'use client';

import { useState, useEffect } from 'react';
import { getDomainConfig, DOMAIN_CONFIG, getCurrentDomain } from '@/lib/domain-config';
import { DOMAIN_CONTENT } from '@/lib/domain-content';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDomainContent } from '@/hooks/useDomainContent';

interface CMSUser {
  id: string;
  email: string;
  role: 'admin' | 'editor';
  permissions: string[];
}

interface ContentSection {
  id: string;
  name: string;
  type: 'text' | 'textarea' | 'number' | 'array';
  value: any;
  description: string;
}

export function CMSDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<CMSUser | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string>('fliptechpro.com');
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState<any>({});
  const [showLogin, setShowLogin] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });
  
  const { domain: currentDomain, config } = useDomainContent();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('cms_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    
    setSelectedDomain(currentDomain);
  }, [currentDomain]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication - in production, use proper auth
    if (loginCredentials.email === 'admin@fliptechpro.com' && loginCredentials.password === 'admin123') {
      const user: CMSUser = {
        id: '1',
        email: loginCredentials.email,
        role: 'admin',
        permissions: ['read', 'write', 'publish']
      };
      
      setCurrentUser(user);
      setIsAuthenticated(true);
      setShowLogin(false);
      localStorage.setItem('cms_user', JSON.stringify(user));
    } else {
      alert('Invalid credentials. Use admin@fliptechpro.com / admin123');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('cms_user');
  };

  const getContentSections = (domain: string): ContentSection[] => {
    const content = DOMAIN_CONTENT[domain as keyof typeof DOMAIN_CONTENT];
    if (!content) return [];

    return [
      {
        id: 'hero',
        name: 'Hero Section',
        type: 'text',
        value: content.hero,
        description: 'Main hero section content including title, subtitle, and CTAs'
      },
      {
        id: 'pricing',
        name: 'Pricing Section',
        type: 'text',
        value: content.pricing,
        description: 'Pricing information, features, and guarantees'
      },
      {
        id: 'cta',
        name: 'Call to Action',
        type: 'text',
        value: content.cta,
        description: 'Main call-to-action section content'
      }
    ];
  };

  const handleContentEdit = (sectionId: string, field: string, value: any) => {
    setEditedContent((prev: any) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [field]: value
      }
    }));
  };

  const handleSaveChanges = () => {
    // In a real CMS, this would save to a database
    // For now, we'll update localStorage and show a success message
    localStorage.setItem(`cms_content_${selectedDomain}`, JSON.stringify(editedContent));
    setIsEditing(false);
    alert('Content saved successfully! (Note: This is a demo - changes are stored locally)');
  };

  const handlePublishChanges = () => {
    // In production, this would trigger a deployment
    alert('Publishing changes... This would trigger a new deployment in production.');
    setIsEditing(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setShowLogin(true)}
          variant="outline"
          size="sm"
          className="bg-blue-900 text-white border-blue-700 hover:bg-blue-800"
        >
          CMS Login
        </Button>
        
        {showLogin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-96">
              <CardHeader>
                <CardTitle>CMS Login</CardTitle>
                <CardDescription>Enter your credentials to access the CMS</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={loginCredentials.email}
                      onChange={(e) => setLoginCredentials(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="admin@fliptechpro.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Password</label>
                    <Input
                      type="password"
                      value={loginCredentials.password}
                      onChange={(e) => setLoginCredentials(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="admin123"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">Login</Button>
                    <Button type="button" variant="outline" onClick={() => setShowLogin(false)}>
                      Cancel
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Demo credentials: admin@fliptechpro.com / admin123
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }

  const domainConfig = getDomainConfig(selectedDomain);
  const contentSections = getContentSections(selectedDomain);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 h-5/6 max-w-6xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">FlipTech Pro CMS</h1>
            <p className="text-sm text-gray-300">
              Logged in as {currentUser?.email} ({currentUser?.role})
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-white border-white">
              {selectedDomain}
            </Badge>
            <Button onClick={handleLogout} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Domain Selection</h3>
                <div className="space-y-2">
                  {Object.keys(DOMAIN_CONFIG).map((domain) => (
                    <Button
                      key={domain}
                      onClick={() => setSelectedDomain(domain)}
                      variant={domain === selectedDomain ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-start"
                    >
                      {domain === 'localhost' ? 'Development' : domain}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Domain Info</h3>
                <div className="text-sm space-y-1">
                  <p><strong>Audience:</strong> {domainConfig.audience}</p>
                  <p><strong>Brand:</strong> {domainConfig.branding.name}</p>
                  <p><strong>Analytics:</strong> {domainConfig.analytics.gaId}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <Button
                    onClick={() => window.open(`https://${selectedDomain}`, '_blank')}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    View Live Site
                  </Button>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    {isEditing ? 'Cancel Editing' : 'Edit Content'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="border-b p-4">
                <TabsList>
                  {contentSections.map((section) => (
                    <TabsTrigger key={section.id} value={section.id}>
                      {section.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {contentSections.map((section) => (
                  <TabsContent key={section.id} value={section.id} className="h-full">
                    <Card>
                      <CardHeader>
                        <CardTitle>{section.name}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {isEditing ? (
                          <div className="space-y-4">
                            {Object.entries(section.value).map(([key, value]) => (
                              <div key={key}>
                                <label className="text-sm font-medium capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </label>
                                {typeof value === 'string' && value.length > 100 ? (
                                  <Textarea
                                    value={editedContent[section.id]?.[key] || value}
                                    onChange={(e) => handleContentEdit(section.id, key, e.target.value)}
                                    className="mt-1"
                                    rows={4}
                                  />
                                ) : typeof value === 'string' ? (
                                  <Input
                                    value={editedContent[section.id]?.[key] || value}
                                    onChange={(e) => handleContentEdit(section.id, key, e.target.value)}
                                    className="mt-1"
                                  />
                                ) : typeof value === 'number' ? (
                                  <Input
                                    type="number"
                                    value={editedContent[section.id]?.[key] || value}
                                    onChange={(e) => handleContentEdit(section.id, key, Number(e.target.value))}
                                    className="mt-1"
                                  />
                                ) : Array.isArray(value) ? (
                                  <div className="mt-1 space-y-2">
                                    {(editedContent[section.id]?.[key] || value).map((item: string, index: number) => (
                                      <div key={index} className="flex gap-2">
                                        <Input
                                          value={item}
                                          onChange={(e) => {
                                            const newArray = [...(editedContent[section.id]?.[key] || value)];
                                            newArray[index] = e.target.value;
                                            handleContentEdit(section.id, key, newArray);
                                          }}
                                        />
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => {
                                            const newArray = [...(editedContent[section.id]?.[key] || value)];
                                            newArray.splice(index, 1);
                                            handleContentEdit(section.id, key, newArray);
                                          }}
                                        >
                                          Remove
                                        </Button>
                                      </div>
                                    ))}
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        const newArray = [...(editedContent[section.id]?.[key] || value), ''];
                                        handleContentEdit(section.id, key, newArray);
                                      }}
                                    >
                                      Add Item
                                    </Button>
                                  </div>
                                ) : (
                                  <pre className="mt-1 p-2 bg-gray-100 rounded text-sm">
                                    {JSON.stringify(value, null, 2)}
                                  </pre>
                                )}
                              </div>
                            ))}
                            
                            <div className="flex gap-2 pt-4">
                              <Button onClick={handleSaveChanges}>
                                Save Changes
                              </Button>
                              <Button onClick={handlePublishChanges} variant="default">
                                Publish to Live
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {Object.entries(section.value).map(([key, value]) => (
                              <div key={key}>
                                <label className="text-sm font-medium capitalize text-gray-600">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </label>
                                <div className="mt-1 p-3 bg-gray-50 rounded">
                                  {typeof value === 'string' ? (
                                    <p>{value}</p>
                                  ) : Array.isArray(value) ? (
                                    <ul className="list-disc list-inside space-y-1">
                                      {value.map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <pre className="text-sm">{JSON.stringify(value, null, 2)}</pre>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook to show the CMS only when needed
export function useCMSDashboard() {
  const [showCMS, setShowCMS] = useState(false);

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    const isAuthenticated = localStorage.getItem('cms_user') !== null;
    setShowCMS(isDev || isAuthenticated);
  }, []);

  return showCMS;
}
