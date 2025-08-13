#!/usr/bin/env node

const GITBOOK_API_TOKEN = 'gb_api_0rumUbSCYTKbxqMekAqVB1YaI7cVDgs3UKqf85LI';
const GITBOOK_API_BASE = 'https://api.gitbook.com/v1';
const ORG_ID = '1fpGiCXMasmq13h2ZHbI';
const SPACE_ID = '2VkzwhEE8N0kzafEuE3k';

async function testContentCreation() {
  try {
    console.log('🧪 Testing GitBook content creation API...');
    
    // First, let's see the current content structure
    console.log('\n📋 Fetching current space content...');
    const contentResponse = await fetch(`${GITBOOK_API_BASE}/spaces/${SPACE_ID}/content`, {
      headers: {
        'Authorization': `Bearer ${GITBOOK_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (contentResponse.ok) {
      const content = await contentResponse.json();
      console.log('✅ Current content structure:');
      console.log(JSON.stringify(content, null, 2));
    } else {
      console.log(`⚠️  Could not fetch content: ${contentResponse.status} ${contentResponse.statusText}`);
      const errorText = await contentResponse.text();
      console.log('Error details:', errorText);
    }

    // Try to create a simple page using different API endpoints
    console.log('\n🧪 Testing page creation with different endpoints...');
    
    // Test 1: Try /spaces/{space}/content (what we used)
    console.log('\n1. Testing /spaces/{space}/content...');
    try {
      const createResponse1 = await fetch(`${GITBOOK_API_BASE}/spaces/${SPACE_ID}/content`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GITBOOK_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Test Page 1',
          path: '/test-page-1',
          content: {
            object: 'document',
            document: {
              object: 'document',
              data: {},
              nodes: [
                {
                  object: 'block',
                  type: 'paragraph',
                  data: {},
                  nodes: [
                    {
                      object: 'text',
                      leaves: [
                        {
                          object: 'leaf',
                          text: 'This is a test page.',
                          marks: []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
        }),
      });
      
      if (createResponse1.ok) {
        const result1 = await createResponse1.json();
        console.log('✅ Method 1 successful:', result1);
      } else {
        console.log(`❌ Method 1 failed: ${createResponse1.status} ${createResponse1.statusText}`);
        const errorText1 = await createResponse1.text();
        console.log('Error details:', errorText1);
      }
    } catch (error) {
      console.log(`❌ Method 1 error: ${error.message}`);
    }

    // Test 2: Try /orgs/{org}/spaces/{space}/content
    console.log('\n2. Testing /orgs/{org}/spaces/{space}/content...');
    try {
      const createResponse2 = await fetch(`${GITBOOK_API_BASE}/orgs/${ORG_ID}/spaces/${SPACE_ID}/content`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GITBOOK_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Test Page 2',
          path: '/test-page-2',
          content: {
            object: 'document',
            document: {
              object: 'document',
              data: {},
              nodes: [
                {
                  object: 'block',
                  type: 'paragraph',
                  data: {},
                  nodes: [
                    {
                      object: 'text',
                      leaves: [
                        {
                          object: 'leaf',
                          text: 'This is another test page.',
                          marks: []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
        }),
      });
      
      if (createResponse2.ok) {
        const result2 = await createResponse2.json();
        console.log('✅ Method 2 successful:', result2);
      } else {
        console.log(`❌ Method 2 failed: ${createResponse2.status} ${createResponse2.statusText}`);
        const errorText2 = await createResponse2.text();
        console.log('Error details:', errorText2);
      }
    } catch (error) {
      console.log(`❌ Method 2 error: ${error.message}`);
    }

    // Test 3: Try simplified content structure
    console.log('\n3. Testing simplified content structure...');
    try {
      const createResponse3 = await fetch(`${GITBOOK_API_BASE}/spaces/${SPACE_ID}/content`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GITBOOK_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Test Page 3',
          kind: 'page',
          content: 'This is a simple test page with plain text content.'
        }),
      });
      
      if (createResponse3.ok) {
        const result3 = await createResponse3.json();
        console.log('✅ Method 3 successful:', result3);
      } else {
        console.log(`❌ Method 3 failed: ${createResponse3.status} ${createResponse3.statusText}`);
        const errorText3 = await createResponse3.text();
        console.log('Error details:', errorText3);
      }
    } catch (error) {
      console.log(`❌ Method 3 error: ${error.message}`);
    }

    // Let's also check what endpoints are available
    console.log('\n🔍 Checking available API endpoints...');
    try {
      const optionsResponse = await fetch(`${GITBOOK_API_BASE}/spaces/${SPACE_ID}/content`, {
        method: 'OPTIONS',
        headers: {
          'Authorization': `Bearer ${GITBOOK_API_TOKEN}`,
        },
      });
      
      if (optionsResponse.ok) {
        console.log('✅ Available methods:', optionsResponse.headers.get('Allow'));
      } else {
        console.log(`⚠️  Could not get options: ${optionsResponse.status}`);
      }
    } catch (error) {
      console.log(`⚠️  Options error: ${error.message}`);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testContentCreation();
