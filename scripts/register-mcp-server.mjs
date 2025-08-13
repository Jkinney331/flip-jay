#!/usr/bin/env node

const GITBOOK_API_TOKEN = process.env.GITBOOK_API_TOKEN || 'gb_api_0rumUbSCYTKbxqMekAqVB1YaI7cVDgs3UKqf85LI';
const ORG_ID = '1fpGiCXMasmq13h2ZHbI';
const SITE_ID = 'site_DI1At';
const MCP_SERVER_URL = 'http://localhost:3001';

async function registerMcpServer() {
  console.log('🚀 Registering Custom GitBook MCP Server...');
  console.log(`Organization ID: ${ORG_ID}`);
  console.log(`Site ID: ${SITE_ID}`);
  console.log(`MCP Server URL: ${MCP_SERVER_URL}`);
  
  const registrationPayload = {
    name: "FlipTech Pro Content Manager",
    url: MCP_SERVER_URL,
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const response = await fetch(`https://api.gitbook.com/v1/orgs/${ORG_ID}/sites/${SITE_ID}/mcp-servers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITBOOK_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(registrationPayload)
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ MCP Server registered successfully!');
      console.log('Server Details:', JSON.stringify(data, null, 2));
      return data;
    } else {
      console.error('❌ Failed to register MCP server:');
      console.error('Status:', response.status);
      console.error('Response:', data);
      throw new Error(`Registration failed: ${response.status} - ${data.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('❌ Error registering MCP server:', error.message);
    throw error;
  }
}

async function listMcpServers() {
  console.log('📋 Listing existing MCP servers...');
  
  try {
    const response = await fetch(`https://api.gitbook.com/v1/orgs/${ORG_ID}/sites/${SITE_ID}/mcp-servers`, {
      headers: {
        'Authorization': `Bearer ${GITBOOK_API_TOKEN}`,
        'Accept': 'application/json'
      }
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Existing MCP servers:');
      console.log(JSON.stringify(data, null, 2));
      return data;
    } else {
      console.error('❌ Failed to list MCP servers:', data);
      throw new Error(`Failed to list servers: ${response.status}`);
    }
  } catch (error) {
    console.error('❌ Error listing MCP servers:', error.message);
    throw error;
  }
}

async function main() {
  try {
    // First, list existing MCP servers
    await listMcpServers();
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Then register our new MCP server
    await registerMcpServer();
    
    console.log('\n🎉 Setup complete! Your custom MCP server is now registered with GitBook.');
    console.log('\nNext steps:');
    console.log('1. Start the MCP server: node scripts/custom-gitbook-mcp-server.mjs');
    console.log('2. Test the connection with GitBook');
    console.log('3. Use the MCP tools to update your GitBook content');
    
  } catch (error) {
    console.error('\n💥 Setup failed:', error.message);
    process.exit(1);
  }
}

main();
