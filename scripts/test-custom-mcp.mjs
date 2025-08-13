#!/usr/bin/env node

const MCP_SERVER_URL = 'http://localhost:3001';

async function testMcpServer() {
  console.log('🧪 Testing Custom GitBook MCP Server...');
  
  try {
    // Test 1: List available tools
    console.log('\n1. Testing tools/list...');
    const toolsResponse = await fetch(`${MCP_SERVER_URL}/tools/list`);
    const toolsData = await toolsResponse.json();
    
    if (toolsResponse.ok) {
      console.log('✅ Tools retrieved successfully:');
      console.log('Available tools:', toolsData.tools.map(t => t.name));
    } else {
      console.error('❌ Failed to get tools:', toolsData);
    }
    
    // Test 2: Test list_pages tool
    console.log('\n2. Testing list_pages tool...');
    const listPagesResponse = await fetch(`${MCP_SERVER_URL}/tools/call`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'list_pages',
        arguments: {}
      })
    });
    
    const listPagesData = await listPagesResponse.json();
    
    if (listPagesResponse.ok) {
      console.log('✅ List pages test successful:');
      console.log('Result:', listPagesData.result.message);
    } else {
      console.error('❌ List pages test failed:', listPagesData);
    }
    
    // Test 3: Test get_page_content tool (if we have a page ID)
    console.log('\n3. Testing get_page_content tool...');
    // Note: You'll need to provide a valid page ID for this test
    const testPageId = 'test-page-id'; // Replace with actual page ID
    
    const getContentResponse = await fetch(`${MCP_SERVER_URL}/tools/call`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'get_page_content',
        arguments: { pageId: testPageId }
      })
    });
    
    const getContentData = await getContentResponse.json();
    
    if (getContentResponse.ok) {
      console.log('✅ Get page content test successful:');
      console.log('Result:', getContentData.result.message);
    } else {
      console.error('❌ Get page content test failed:', getContentData);
    }
    
    console.log('\n🎉 MCP Server tests completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure the MCP server is running:');
    console.log('   node scripts/custom-gitbook-mcp-server.mjs');
  }
}

testMcpServer();
