#!/usr/bin/env node

const GITBOOK_API_TOKEN = 'gb_api_0rumUbSCYTKbxqMekAqVB1YaI7cVDgs3UKqf85LI';
const GITBOOK_API_BASE = 'https://api.gitbook.com/v1';
const ORG_ID = '1fpGiCXMasmq13h2ZHbI';
const SPACE_ID = '2VkzwhEE8N0kzafEuE3k';

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

async function checkPublishingCapabilities() {
  console.log('🔍 Checking GitBook publishing capabilities...');
  
  try {
    // Test various publishing-related endpoints
    const publishingEndpoints = [
      `/spaces/${SPACE_ID}/publish`,
      `/spaces/${SPACE_ID}/publishing`,
      `/spaces/${SPACE_ID}/deploy`,
      `/spaces/${SPACE_ID}/deployment`,
      `/spaces/${SPACE_ID}/revisions/fRONVRUsolcdkmyaSs5z/publish`,
      `/spaces/${SPACE_ID}/revisions/fRONVRUsolcdkmyaSs5z/deploy`,
      `/spaces/${SPACE_ID}/change-requests`,
      `/spaces/${SPACE_ID}/change-requests/approve`,
      `/spaces/${SPACE_ID}/change-requests/merge`
    ];

    console.log('\n📋 Testing publishing endpoints:');
    
    for (const endpoint of publishingEndpoints) {
      try {
        console.log(`\nTesting: ${endpoint}`);
        
        // Try GET first to see if endpoint exists
        const result = await gitbookApiRequest(endpoint, 'GET');
        console.log(`✅ GET ${endpoint} - Success`);
        console.log('Response keys:', Object.keys(result));
        
        // If it's a change requests endpoint, try to list them
        if (endpoint.includes('change-requests') && !endpoint.includes('approve') && !endpoint.includes('merge')) {
          console.log('Change requests found:', result.items?.length || 0);
        }
        
      } catch (error) {
        console.log(`❌ GET ${endpoint} - ${error.message}`);
        
        // If GET fails, try POST to see if it's a POST-only endpoint
        try {
          const postResult = await gitbookApiRequest(endpoint, 'POST', {});
          console.log(`✅ POST ${endpoint} - Success (POST-only endpoint)`);
        } catch (postError) {
          console.log(`❌ POST ${endpoint} - ${postError.message}`);
        }
      }
    }
    
    // Check current space status
    console.log('\n📊 Current space status:');
    const spaceInfo = await gitbookApiRequest(`/spaces/${SPACE_ID}`);
    console.log('Space visibility:', spaceInfo.visibility);
    console.log('Space published:', spaceInfo.published);
    console.log('Current revision:', spaceInfo.revision);
    
    // Check if there are any pending change requests
    console.log('\n�� Checking change requests:');
    const changeRequests = await gitbookApiRequest(`/spaces/${SPACE_ID}/change-requests`);
    console.log('Total change requests:', changeRequests.items?.length || 0);
    
    if (changeRequests.items && changeRequests.items.length > 0) {
      console.log('\nPending change requests:');
      changeRequests.items.forEach((cr, index) => {
        console.log(`${index + 1}. ${cr.title} (ID: ${cr.id})`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error checking publishing capabilities:', error.message);
  }
}

checkPublishingCapabilities();
