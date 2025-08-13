#!/usr/bin/env node

import http from 'http';
import { URL } from 'url';

// Configuration
const PORT = process.env.MCP_SERVER_PORT || 3001;
const GITBOOK_API_TOKEN = process.env.GITBOOK_API_TOKEN || 'gb_api_0rumUbSCYTKbxqMekAqVB1YaI7cVDgs3UKqf85LI';
const GITBOOK_API_BASE = 'https://api.gitbook.com/v1';
const ORG_ID = '1fpGiCXMasmq13h2ZHbI';
const SPACE_ID = '2VkzwhEE8N0kzafEuE3k';

// MCP Server Tools
const tools = {
  list_spaces: {
    name: "list_spaces",
    description: "List all spaces in the organization",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  },
  get_space_info: {
    name: "get_space_info",
    description: "Get information about a specific space",
    inputSchema: {
      type: "object",
      properties: {
        spaceId: { type: "string", description: "Space ID (optional, defaults to FlipTech Pro space)" }
      },
      required: []
    }
  },
  list_organizations: {
    name: "list_organizations",
    description: "List all organizations accessible with the API token",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  },
  test_api_connection: {
    name: "test_api_connection",
    description: "Test the GitBook API connection and permissions",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
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
      throw new Error(`GitBook API Error: ${response.status} - ${data.error?.message || data.message || 'Unknown error'}`);
    }
    
    return data;
  } catch (error) {
    console.error('GitBook API request failed:', error);
    throw error;
  }
}

// Tool Implementations
async function listSpaces() {
  try {
    const result = await gitbookApiRequest(`/orgs/${ORG_ID}/spaces`);
    
    return {
      success: true,
      message: 'Spaces retrieved successfully',
      data: result
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to list spaces: ${error.message}`,
      error: error.toString()
    };
  }
}

async function getSpaceInfo(spaceId = SPACE_ID) {
  try {
    const result = await gitbookApiRequest(`/spaces/${spaceId}`);
    
    return {
      success: true,
      message: `Space ${spaceId} information retrieved successfully`,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to get space info: ${error.message}`,
      error: error.toString()
    };
  }
}

async function listOrganizations() {
  try {
    const result = await gitbookApiRequest('/orgs');
    
    return {
      success: true,
      message: 'Organizations retrieved successfully',
      data: result
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to list organizations: ${error.message}`,
      error: error.toString()
    };
  }
}

async function testApiConnection() {
  try {
    // Test basic API access
    const orgs = await gitbookApiRequest('/orgs');
    const spaces = await gitbookApiRequest(`/orgs/${ORG_ID}/spaces`);
    const spaceInfo = await gitbookApiRequest(`/spaces/${SPACE_ID}`);
    
    return {
      success: true,
      message: 'API connection test successful',
      data: {
        organizations: orgs.items?.length || 0,
        spaces: spaces.items?.length || 0,
        currentSpace: spaceInfo.title,
        permissions: spaceInfo.permissions
      }
    };
  } catch (error) {
    return {
      success: false,
      message: `API connection test failed: ${error.message}`,
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
            case 'list_spaces':
              result = await listSpaces();
              break;
            case 'get_space_info':
              result = await getSpaceInfo(args.spaceId);
              break;
            case 'list_organizations':
              result = await listOrganizations();
              break;
            case 'test_api_connection':
              result = await testApiConnection();
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
  console.log(`Simple GitBook MCP Server running on port ${PORT}`);
  console.log(`Available tools: ${Object.keys(tools).join(', ')}`);
  console.log(`GitBook API Token: ${GITBOOK_API_TOKEN ? 'Configured' : 'NOT CONFIGURED'}`);
  console.log(`Organization ID: ${ORG_ID}`);
  console.log(`Space ID: ${SPACE_ID}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down MCP server...');
  server.close(() => {
    console.log('MCP server stopped');
    process.exit(0);
  });
});

export { tools, listSpaces, getSpaceInfo, listOrganizations, testApiConnection };
