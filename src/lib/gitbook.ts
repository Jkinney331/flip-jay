export const GITBOOK_API_TOKEN = 'gb_api_0rumUbSCYTKbxqMekAqVB1YaI7cVDgs3UKqf85LI';
export const GITBOOK_API_BASE = 'https://api.gitbook.com/v1';

export interface GitBookSpace {
  id: string;
  title: string;
  description?: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface GitBookPage {
  id: string;
  title: string;
  path: string;
  kind: 'page' | 'group';
  pages?: GitBookPage[];
}

export interface GitBookContent {
  object: string;
  document: {
    object: string;
    nodes: any[];
  };
}

class GitBookAPI {
  private token: string;
  private baseUrl: string;

  constructor() {
    this.token = GITBOOK_API_TOKEN;
    this.baseUrl = GITBOOK_API_BASE;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`GitBook API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getSpaces(): Promise<{ items: GitBookSpace[] }> {
    return this.request('/spaces');
  }

  async createSpace(title: string, description?: string): Promise<GitBookSpace> {
    return this.request('/spaces', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description: description || 'FlipTech Pro Documentation',
      }),
    });
  }

  async getSpace(spaceId: string): Promise<GitBookSpace> {
    return this.request(`/spaces/${spaceId}`);
  }

  async getSpaceContent(spaceId: string): Promise<GitBookPage[]> {
    const response = await this.request<{ pages: GitBookPage[] }>(`/spaces/${spaceId}/content`);
    return response.pages;
  }

  async createPage(spaceId: string, title: string, content: string, path?: string): Promise<GitBookPage> {
    return this.request(`/spaces/${spaceId}/content`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        path: path || `/${title.toLowerCase().replace(/\s+/g, '-')}`,
        content: {
          object: 'document',
          document: {
            object: 'document',
            nodes: [
              {
                object: 'block',
                type: 'paragraph',
                nodes: [
                  {
                    object: 'text',
                    text: content,
                  },
                ],
              },
            ],
          },
        },
      }),
    });
  }

  async updatePage(spaceId: string, pageId: string, content: Partial<{ title: string; content: GitBookContent }>): Promise<GitBookPage> {
    return this.request(`/spaces/${spaceId}/content/${pageId}`, {
      method: 'PATCH',
      body: JSON.stringify(content),
    });
  }

  async publishSpace(spaceId: string): Promise<void> {
    await this.request(`/spaces/${spaceId}/publish`, {
      method: 'POST',
    });
  }
}

export const gitbook = new GitBookAPI();
