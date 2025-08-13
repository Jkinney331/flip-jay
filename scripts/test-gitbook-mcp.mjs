#!/usr/bin/env node

import { spawn } from 'child_process';

// Your GitBook configuration
const GITBOOK_API_TOKEN = 'gb_api_0rumUbSCYTKbxqMekAqVB1YaI7cVDgs3UKqf85LI';
const ORG_ID = '1fpGiCXMasmq13h2ZHbI';
const SPACE_ID = '2VkzwhEE8N0kzafEuE3k';

async function testGitBookMCP() {
  console.log('🧪 Testing GitBook MCP Server...');
  console.log('📋 Configuration:');
  console.log(`   Organization ID: ${ORG_ID}`);
  console.log(`   Space ID: ${SPACE_ID}`);
  console.log(`   API Token: ${GITBOOK_API_TOKEN.substring(0, 20)}...`);
  
  try {
    // Test 1: Check if the MCP server can be started
    console.log('\n1️⃣ Testing MCP server startup...');
    
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

    let output = '';
    let errorOutput = '';

    mcpProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    mcpProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    // Wait a moment for the server to start
    await new Promise(resolve => setTimeout(resolve, 3000));

    if (mcpProcess.killed) {
      console.log('❌ MCP server failed to start');
      console.log('Error output:', errorOutput);
    } else {
      console.log('✅ MCP server started successfully');
      console.log('Output:', output);
    }

    // Clean up
    mcpProcess.kill();

    // Test 2: Test basic MCP communication
    console.log('\n2️⃣ Testing MCP communication...');
    
    const testMessage = {
      jsonrpc: '2.0',
      id: 1,
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

    const mcpTest = spawn('npx', [
      'gitbook-mcp',
      '--organization-id', ORG_ID
    ], {
      env: {
        ...process.env,
        GITBOOK_API_TOKEN: GITBOOK_API_TOKEN
      },
      stdio: ['pipe', 'pipe', 'pipe']
    });

    mcpTest.stdin.write(JSON.stringify(testMessage) + '\n');
    
    let testOutput = '';
    mcpTest.stdout.on('data', (data) => {
      testOutput += data.toString();
      console.log('MCP Response:', data.toString());
    });

    await new Promise(resolve => setTimeout(resolve, 2000));
    mcpTest.kill();

    // Test 3: Test direct API calls using the MCP tools
    console.log('\n3️⃣ Testing direct API functionality...');
    
    // Test list_organizations
    console.log('   Testing list_organizations...');
    const listOrgsResult = await testMCPTool('list_organizations', {});
    console.log('   Organizations:', listOrgsResult);

    // Test list_spaces
    console.log('   Testing list_spaces...');
    const listSpacesResult = await testMCPTool('list_spaces', { organizationId: ORG_ID });
    console.log('   Spaces:', listSpacesResult);

    // Test get_space_content
    console.log('   Testing get_space_content...');
    const getContentResult = await testMCPTool('get_space_content', { spaceId: SPACE_ID });
    console.log('   Content structure:', getContentResult);

    console.log('\n🎉 GitBook MCP testing complete!');

  } catch (error) {
    console.error('❌ Error testing GitBook MCP:', error.message);
  }
}

async function testMCPTool(toolName, params) {
  return new Promise((resolve, reject) => {
    const mcpProcess = spawn('npx', [
      'gitbook-mcp',
      '--organization-id', ORG_ID
    ], {
      env: {
        ...process.env,
        GITBOOK_API_TOKEN: GITBOOK_API_TOKEN
      },
      stdio: ['pipe', 'pipe', 'pipe']
    });

    const request = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: params
      }
    };

    let output = '';
    mcpProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    mcpProcess.stderr.on('data', (data) => {
      console.log('MCP Error:', data.toString());
    });

    mcpProcess.on('close', (code) => {
      if (code === 0) {
        try {
          const response = JSON.parse(output);
          resolve(response.result);
        } catch (e) {
          resolve(output);
        }
      } else {
        reject(new Error(`MCP process exited with code ${code}`));
      }
    });

    mcpProcess.stdin.write(JSON.stringify(request) + '\n');
    
    // Give it some time to process
    setTimeout(() => {
      mcpProcess.kill();
      resolve('Timeout - no response received');
    }, 5000);
  });
}

// Run the test
testGitBookMCP();
