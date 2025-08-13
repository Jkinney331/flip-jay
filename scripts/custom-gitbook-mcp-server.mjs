#!/usr/bin/env node

import http from 'http';
import { URL } from 'url';

// Configuration
const PORT = process.env.MCP_SERVER_PORT || 3001;
const GITBOOK_API_TOKEN = process.env.GITBOOK_API_TOKEN;
const GITBOOK_API_BASE = 'https://api.gitbook.com/v1';
const SPACE_ID = '2VkzwhEE8N0kzafEuE3k';

// MCP Server Tools
const tools = {
  update_page_content: {
    name: "update_page_content",
    description: "Update content of a GitBook page",
    inputSchema: {
      type: "object",
      properties: {
        pageId: { type: "string", description: "GitBook page ID" },
        content: { type: "string", description: "New page content in markdown" },
        title: { type: "string", description: "Page title (optional)" }
      },
      required: ["pageId", "content"]
    }
  },
  create_page: {
    name: "create_page", 
    description: "Create a new GitBook page",
    inputSchema: {
      type: "object",
      properties: {
        parentId: { type: "string", description: "Parent page ID (optional)" },
        title: { type: "string", description: "Page title" },
        content: { type: "string", description: "Page content in markdown" },
        path: { type: "string", description: "Page path (optional)" }
      },
      required: ["title", "content"]
    }
  },
  list_pages: {
    name: "list_pages",
    description: "List all pages in the GitBook space",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  },
  get_page_content: {
    name: "get_page_content",
    description: "Get content of a specific GitBook page",
    inputSchema: {
      type: "object", 
      properties: {
        pageId: { type: "string", description: "GitBook page ID" }
      },
      required: ["pageId"]
    }
  }
};

// GitBook API Helper Functions
async function gitbookApiRequest(endpoint, method = 'GET', body = null) {
  const url = `${GITBOOK_API_BASE}${endpoint}`;
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${GITBOOK_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`GitBook API Error: ${response.status} - ${data.message || 'Unknown error'}`);
    }
    
    return data;
  } catch (error) {
    console.error('GitBook API request failed:', error);
    throw error;
  }
}

// Tool Implementations
async function updatePageContent(pageId, content, title = null) {
  try {
    // First, get the current page to understand its structure
    const pageData = await gitbookApiRequest(`/spaces/${SPACE_ID}/content/documents/${pageId}`);
    
    // Prepare update payload
    const updatePayload = {
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: content
              }
            ]
          }
        ]
      }
    };

    if (title) {
      updatePayload.title = title;
    }

    // Attempt to update via the content API
    const result = await gitbookApiRequest(`/spaces/${SPACE_ID}/content/documents/${pageId}`, 'PATCH', updatePayload);
    
    return {
      success: true,
      message: `Page ${pageId} updated successfully`,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to update page: ${error.message}`,
      error: error.toString()
    };
  }
}

async function createPage(parentId, title, content, path = null) {
  try {
    const createPayload = {
      title,
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: content
              }
            ]
          }
        ]
      }
    };

    if (parentId) {
      createPayload.parentId = parentId;
    }

    if (path) {
      createPayload.path = path;
    }

    // Note: This endpoint might not work due to GitBook API limitations
    const result = await gitbookApiRequest('/spaces/${SPACE_ID}/content/documents', 'POST', createPayload);
    
    return {
      success: true,
      message: `Page "${title}" created successfully`,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to create page: ${error.message}`,
      error: error.toString()
    };
  }
}

async function listPages() {
  try {
    const result = await gitbookApiRequest('/spaces/${SPACE_ID}/content/documents');
    
    return {
      success: true,
      message: 'Pages retrieved successfully',
      data: result
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to list pages: ${error.message}`,
      error: error.toString()
    };
  }
}

async function getPageContent(pageId) {
  try {
    const result = await gitbookApiRequest(`/spaces/${SPACE_ID}/content/documents/${pageId}`);
    
    return {
      success: true,
      message: `Page ${pageId} content retrieved successfully`,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to get page content: ${error.message}`,
      error: error.toString()
    };
  }
}

// MCP Server Request Handler
async function handleMcpRequest(request, response) {
  try {
    const url = new URL(request.url, `http://localhost:${PORT}`);
    
    if (request.method === 'POST' && url.pathname === '/tools/call') {
      let body = '';
      request.on('data', chunk => {
        body += chunk.toString();
      });
      
      request.on('end', async () => {
        try {
          const { name, arguments: args } = JSON.parse(body);
          
          let result;
          switch (name) {
            case 'update_page_content':
              result = await updatePageContent(args.pageId, args.content, args.title);
              break;
            case 'create_page':
              result = await createPage(args.parentId, args.title, args.content, args.path);
              break;
            case 'list_pages':
              result = await listPages();
              break;
            case 'get_page_content':
              result = await getPageContent(args.pageId);
              break;
            default:
              result = {
                success: false,
                message: `Unknown tool: ${name}`
              };
          }
          
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ result }));
        } catch (error) {
          response.writeHead(400, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ 
            error: 'Invalid request format',
            details: error.message 
          }));
        }
      });
    } else if (request.method === 'GET' && url.pathname === '/tools/list') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ tools: Object.values(tools) }));
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Not found' }));
    }
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }));
  }
}

// Start the server
const server = http.createServer(handleMcpRequest);

server.listen(PORT, () => {
  console.log(`Custom GitBook MCP Server running on port ${PORT}`);
  console.log(`Available tools: ${Object.keys(tools).join(', ')}`);
  console.log(`GitBook API Token: ${GITBOOK_API_TOKEN ? 'Configured' : 'NOT CONFIGURED'}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down MCP server...');
  server.close(() => {
    console.log('MCP server stopped');
    process.exit(0);
  });
});

export { tools, updatePageContent, createPage, listPages, getPageContent };
