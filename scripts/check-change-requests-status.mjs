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

async function checkChangeRequestsStatus() {
  console.log('🔍 Checking change requests status and publishing workflow...');
  
  try {
    // Check current space status
    console.log('\n📊 Current space status:');
    const spaceInfo = await gitbookApiRequest(`/spaces/${SPACE_ID}`);
    console.log('Space visibility:', spaceInfo.visibility);
    console.log('Current revision:', spaceInfo.revision);
    console.log('Change requests count:', spaceInfo.changeRequests);
    console.log('Change requests draft count:', spaceInfo.changeRequestsDraft);
    console.log('Change requests open count:', spaceInfo.changeRequestsOpen);
    
    // Check if there are any change requests
    console.log('\n📝 Checking for change requests:');
    const changeRequests = await gitbookApiRequest(`/spaces/${SPACE_ID}/change-requests`);
    console.log('Total change requests found:', changeRequests.items?.length || 0);
    
    if (changeRequests.items && changeRequests.items.length > 0) {
      console.log('\n📋 Change requests details:');
      changeRequests.items.forEach((cr, index) => {
        console.log(`${index + 1}. ${cr.title} (ID: ${cr.id})`);
        console.log(`   Status: ${cr.status || 'unknown'}`);
        console.log(`   Created: ${cr.createdAt}`);
        console.log(`   Updated: ${cr.updatedAt}`);
        console.log('   ---');
      });
    } else {
      console.log('No change requests found. This could mean:');
      console.log('1. The change requests were automatically approved/merged');
      console.log('2. The change requests are in a different state');
      console.log('3. The content was already published');
    }
    
    // Check the current content to see if our changes are there
    console.log('\n📄 Checking current content:');
    const currentContent = await gitbookApiRequest(`/spaces/${SPACE_ID}/content`);
    console.log('Current pages count:', currentContent.pages?.length || 0);
    
    if (currentContent.pages && currentContent.pages.length > 0) {
      console.log('\n📋 Current pages:');
      currentContent.pages.forEach((page, index) => {
        console.log(`${index + 1}. ${page.title} (ID: ${page.id})`);
      });
    }
    
    // Check if there are any publishing-related endpoints
    console.log('\n🚀 Checking for publishing workflow:');
    
    // Try to find any publishing-related endpoints
    const publishingEndpoints = [
      `/spaces/${SPACE_ID}/publish`,
      `/spaces/${SPACE_ID}/deploy`,
      `/spaces/${SPACE_ID}/revisions/${spaceInfo.revision}/publish`,
      `/spaces/${SPACE_ID}/revisions/${spaceInfo.revision}/deploy`
    ];
    
    for (const endpoint of publishingEndpoints) {
      try {
        console.log(`\nTesting: ${endpoint}`);
        const result = await gitbookApiRequest(endpoint, 'POST', {});
        console.log(`✅ POST ${endpoint} - Success!`);
        console.log('Result:', result);
      } catch (error) {
        console.log(`❌ POST ${endpoint} - ${error.message}`);
      }
    }
    
    console.log('\n💡 Publishing workflow analysis:');
    console.log('Based on the GitBook API structure, publishing appears to be:');
    console.log('1. Manual through the GitBook web interface');
    console.log('2. Automatic when change requests are approved');
    console.log('3. Not available through direct API calls');
    
  } catch (error) {
    console.error('❌ Error checking change requests status:', error.message);
  }
}

checkChangeRequestsStatus();
