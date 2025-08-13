#!/usr/bin/env node

import { spawn } from 'child_process';

const GITBOOK_API_TOKEN = 'gb_api_0rumUbSCYTKbxqMekAqVB1YaI7cVDgs3UKqf85LI';
const ORG_ID = '1fpGiCXMasmq13h2ZHbI';
const SPACE_ID = '2VkzwhEE8N0kzafEuE3k';

async function testMCPSimple() {
  console.log('🧪 Testing GitBook MCP Server (Simple)...');
  
  const mcpProcess = spawn('npx', [
    'gitbook-mcp',
    '--organization-id', ORG_ID,
    '--space-id', SPACE_ID
  ], {
    env: {
      ...process.env,
      GITBOOK_API_TOKEN: GITBOOK_API_TOKEN
    },
    stdio: ['pipe', 'pipe', 'pipe']
  });

  let messageId = 1;

  // Send initialize message
  const initMessage = {
    jsonrpc: '2.0',
    id: messageId++,
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: {
        name: 'test-client',
        version: '1.0.0'
      }
    }
  };

  console.log('📤 Sending initialize...');
  mcpProcess.stdin.write(JSON.stringify(initMessage) + '\n');

  // Listen for responses
  mcpProcess.stdout.on('data', (data) => {
    const lines = data.toString().split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      try {
        const response = JSON.parse(line);
        console.log('📥 Received:', JSON.stringify(response, null, 2));
        
        // If we got an initialize response, send tools/list
        if (response.id === 1 && response.result) {
          console.log('✅ Initialize successful, listing tools...');
          
          const listToolsMessage = {
            jsonrpc: '2.0',
            id: messageId++,
            method: 'tools/list'
          };
          
          mcpProcess.stdin.write(JSON.stringify(listToolsMessage) + '\n');
        }
        
        // If we got tools list, test a specific tool
        if (response.id === 2 && response.result) {
          console.log('✅ Tools listed, testing list_organizations...');
          
          const listOrgsMessage = {
            jsonrpc: '2.0',
            id: messageId++,
            method: 'tools/call',
            params: {
              name: 'list_organizations',
              arguments: {}
            }
          };
          
          mcpProcess.stdin.write(JSON.stringify(listOrgsMessage) + '\n');
        }
        
        // If we got organizations, test list_spaces
        if (response.id === 3 && response.result) {
          console.log('✅ Organizations listed, testing list_spaces...');
          
          const listSpacesMessage = {
            jsonrpc: '2.0',
            id: messageId++,
            method: 'tools/call',
            params: {
              name: 'list_spaces',
              arguments: {
                organizationId: ORG_ID
              }
            }
          };
          
          mcpProcess.stdin.write(JSON.stringify(listSpacesMessage) + '\n');
        }
        
        // If we got spaces, test get_space_content
        if (response.id === 4 && response.result) {
          console.log('✅ Spaces listed, testing get_space_content...');
          
          const getContentMessage = {
            jsonrpc: '2.0',
            id: messageId++,
            method: 'tools/call',
            params: {
              name: 'get_space_content',
              arguments: {
                spaceId: SPACE_ID
              }
            }
          };
          
          mcpProcess.stdin.write(JSON.stringify(getContentMessage) + '\n');
        }
        
        // If we got content, we're done
        if (response.id === 5 && response.result) {
          console.log('✅ Content retrieved successfully!');
          console.log('🎉 All MCP tests passed!');
          mcpProcess.kill();
        }
        
      } catch (e) {
        console.log('📄 Raw line:', line);
      }
    }
  });

  mcpProcess.stderr.on('data', (data) => {
    console.log('❌ Error:', data.toString());
  });

  mcpProcess.on('close', (code) => {
    console.log(`🔚 MCP process closed with code ${code}`);
  });

  // Timeout after 30 seconds
  setTimeout(() => {
    console.log('⏰ Test timeout, killing process...');
    mcpProcess.kill();
  }, 30000);
}

testMCPSimple();
