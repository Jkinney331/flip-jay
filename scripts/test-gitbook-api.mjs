#!/usr/bin/env node

const GITBOOK_API_TOKEN = 'gb_api_0rumUbSCYTKbxqMekAqVB1YaI7cVDgs3UKqf85LI';
const GITBOOK_API_BASE = 'https://api.gitbook.com/v1';

async function testGitBookAPI() {
  try {
    console.log('🔗 Testing GitBook API connection...');
    
    const response = await fetch(`${GITBOOK_API_BASE}/user`, {
      headers: {
        'Authorization': `Bearer ${GITBOOK_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const user = await response.json();
    console.log('✅ API connection successful!');
    console.log('👤 User:', user.displayName || user.name || 'Unknown');
    
    // Test organizations endpoint
    console.log('\\n🏢 Fetching organizations...');
    const orgsResponse = await fetch(`${GITBOOK_API_BASE}/orgs`, {
      headers: {
        'Authorization': `Bearer ${GITBOOK_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (orgsResponse.ok) {
      const orgs = await orgsResponse.json();
      console.log(`✅ Found ${orgs.items?.length || 0} organizations`);
      
      if (orgs.items && orgs.items.length > 0) {
        const org = orgs.items[0];
        console.log(`   Organization: ${org.title} (${org.id})`);
        
        // Try to get spaces from the organization
        console.log('\\n📋 Fetching spaces from organization...');
        const spacesResponse = await fetch(`${GITBOOK_API_BASE}/orgs/${org.id}/spaces`, {
          headers: {
            'Authorization': `Bearer ${GITBOOK_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (spacesResponse.ok) {
          const spaces = await spacesResponse.json();
          console.log(`✅ Found ${spaces.items?.length || 0} spaces`);
          
          if (spaces.items && spaces.items.length > 0) {
            console.log('\\n📚 Existing spaces:');
            spaces.items.forEach((space, index) => {
              console.log(`   ${index + 1}. ${space.title} (${space.id})`);
              if (space.urls?.public) {
                console.log(`      URL: ${space.urls.public}`);
              }
            });
          }
        } else {
          console.log(`⚠️  Could not fetch spaces: ${spacesResponse.status} ${spacesResponse.statusText}`);
          const errorText = await spacesResponse.text();
          console.log('Response:', errorText);
        }
      }
    } else {
      console.log(`⚠️  Could not fetch organizations: ${orgsResponse.status} ${orgsResponse.statusText}`);
      const errorText = await orgsResponse.text();
      console.log('Response:', errorText);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testGitBookAPI();
