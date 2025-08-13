#!/usr/bin/env node

const GITBOOK_API_TOKEN = 'gb_api_0rumUbSCYTKbxqMekAqVB1YaI7cVDgs3UKqf85LI';
const GITBOOK_API_BASE = 'https://api.gitbook.com/v1';
const ORG_ID = '1fpGiCXMasmq13h2ZHbI';
const SPACE_ID = '2VkzwhEE8N0kzafEuE3k';

// Comprehensive content mapping
const CONTENT_MAPPING = {
  // Main pages
  'introduction': {
    title: 'Introduction',
    content: `# Welcome to FlipTech Pro Documentation

Your comprehensive guide to deploying AI Teams and Departments that transform businesses in 30 days.`
  },
  'welcome': {
    title: 'Welcome to FlipTech Pro',
    content: `# Welcome to FlipTech Pro

FlipTech Pro transforms businesses through AI Teams and Departments—not just individual agents, but coordinated groups of AI specialists that work together like a well-oiled machine. We live outside the hype, focusing on what actually drives results: getting things done in 30 days or less.`
  },
  'purpose-vision': {
    title: 'Our Purpose & Vision',
    content: `# Our Purpose & Vision

In a world drowning in AI promises and proof-of-concepts that never ship, FlipTech Pro exists to be different. We're not here to sell you on the potential of AI—we're here to deliver working systems that generate ROI from day one.

**Our Mission**: Empower businesses to deploy functional AI departments that integrate seamlessly with existing workflows, delivering measurable impact in 30 days.

**Our Vision**: To be the trusted partner that bridges the gap between AI's promise and practical business value—making enterprise AI accessible, reliable, and results-driven.`
  },
  'ai-teams-matter': {
    title: 'Why AI Agent Teams Matter',
    content: `# Why AI Agent Teams Matter

While others focus on single-purpose chatbots, we build entire departments. Think about it: your human teams don't work in isolation—they collaborate, share context, and build on each other's work. Your AI should do the same.

## Key Differentiators

- **Coordinated Intelligence**: Our AI teams share context and collaborate in real-time
- **Department-Level Thinking**: Complete workflows, not just individual tasks
- **30-Day Deployment**: From concept to production-ready systems
- **Zero Technical Debt**: Modular architecture that scales with your business`
  },
  'pricing': {
    title: 'Pricing',
    content: `# Pricing

## One Price, Complete Solution

### $20,000/month

No hidden fees. No surprise costs. Just comprehensive AI departments that work.

## What's Included

### Complete AI Department Deployment
- Custom development and configuration
- Full system integration
- Comprehensive documentation
- Team training sessions

### Ongoing Support & Evolution
- 24/7 system monitoring
- Monthly optimization sprints
- Quarterly strategy reviews
- Unlimited technical support

### Performance Guarantees
- 30-day money-back guarantee
- 99.9% uptime SLA
- Response time commitments
- ROI tracking and reporting

## Enterprise Options

For organizations needing:
- Custom SLAs
- Dedicated infrastructure
- White-label solutions
- Multi-department deployments

[Contact us for enterprise pricing]

## ROI Calculator

### Typical Returns
- **Cost Savings**: $50,000-200,000/year in reduced headcount
- **Efficiency Gains**: 70% reduction in task completion time
- **Revenue Impact**: 20-40% improvement in conversion rates
- **Scale Benefits**: 10x capacity without 10x costs

**Payback Period**: Most clients see positive ROI within 60-90 days.`
  },
  'faq': {
    title: 'Frequently Asked Questions',
    content: `# Frequently Asked Questions

## General Questions

**Q: How is FlipTech Pro different from other AI solutions?**
A: We deploy entire AI departments, not just single agents. Our teams collaborate, share context, and handle complete workflows—delivering in 30 days what others promise in months.

**Q: Do I need technical expertise to use FlipTech Pro?**
A: No. Our dashboard is designed for business users. We handle all technical complexity while you focus on results.

**Q: Can FlipTech Pro integrate with my existing systems?**
A: Yes. We support 850+ integrations out of the box and can build custom connections as needed.

## Technical Questions

**Q: How do you ensure AI accuracy?**
A: Multi-layer validation including reasoning checks, confidence scoring, and human-in-the-loop options for critical decisions.

**Q: What happens if an AI makes a mistake?**
A: Our systems include error detection, automatic corrections, and escalation protocols. All actions are logged for review.

**Q: Can I customize the AI's responses?**
A: Absolutely. Every aspect from tone to reasoning depth can be configured through our dashboard.

## Business Questions

**Q: What's the typical ROI?**
A: Most clients see 3-5x ROI within 6 months through cost savings and efficiency gains.

**Q: Do you offer a trial period?**
A: We provide a customized demo showing your actual use case. Plus, we offer a 30-day money-back guarantee.

**Q: How do you handle data security?**
A: Enterprise-grade encryption, isolated environments, and compliance with SOC 2, GDPR, and CCPA standards.`
  }
};

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

async function exploreGitBookApi() {
  console.log('🔍 Exploring GitBook API endpoints...');
  
  try {
    // Test various endpoints to understand what's available
    const endpoints = [
      '/orgs',
      `/orgs/${ORG_ID}/spaces`,
      `/spaces/${SPACE_ID}`,
      `/spaces/${SPACE_ID}/content`,
      `/spaces/${SPACE_ID}/content/documents`,
      `/spaces/${SPACE_ID}/pages`,
      `/spaces/${SPACE_ID}/revisions`,
      `/spaces/${SPACE_ID}/change-requests`,
      '/content/documents',
      '/content/pages'
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`\nTesting endpoint: ${endpoint}`);
        const result = await gitbookApiRequest(endpoint);
        console.log(`✅ ${endpoint} - Success`);
        console.log('Response keys:', Object.keys(result));
        if (result.items) {
          console.log(`Items count: ${result.items.length}`);
        }
      } catch (error) {
        console.log(`❌ ${endpoint} - ${error.message}`);
      }
    }
  } catch (error) {
    console.error('Exploration failed:', error.message);
  }
}

async function getSpaceContent() {
  console.log('\n📄 Getting space content...');
  
  try {
    // Try different approaches to get content
    const approaches = [
      () => gitbookApiRequest(`/spaces/${SPACE_ID}/content`),
      () => gitbookApiRequest(`/spaces/${SPACE_ID}/pages`),
      () => gitbookApiRequest(`/spaces/${SPACE_ID}/content/documents`),
      () => gitbookApiRequest('/content/documents')
    ];

    for (let i = 0; i < approaches.length; i++) {
      try {
        console.log(`\nTrying approach ${i + 1}...`);
        const result = await approaches[i]();
        console.log(`✅ Approach ${i + 1} successful!`);
        console.log('Result:', JSON.stringify(result, null, 2));
        return result;
      } catch (error) {
        console.log(`❌ Approach ${i + 1} failed: ${error.message}`);
      }
    }
    
    throw new Error('All approaches failed');
  } catch (error) {
    console.error('Failed to get space content:', error.message);
    return null;
  }
}

async function createChangeRequest(title, content) {
  console.log(`\n📝 Creating change request for: ${title}`);
  
  try {
    const changeRequestPayload = {
      title: `Update: ${title}`,
      description: `Automated content update for ${title}`,
      changes: [
        {
          type: 'page_update',
          page: {
            title: title,
            content: content
          }
        }
      ]
    };

    const result = await gitbookApiRequest(`/spaces/${SPACE_ID}/change-requests`, 'POST', changeRequestPayload);
    console.log('✅ Change request created successfully');
    console.log('Change request ID:', result.id);
    return result;
  } catch (error) {
    console.error('❌ Failed to create change request:', error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting comprehensive GitBook content update...');
  console.log(`Organization ID: ${ORG_ID}`);
  console.log(`Space ID: ${SPACE_ID}`);
  console.log(`Space Title: FlipTech Pro Documentation`);
  
  try {
    // Step 1: Explore the API to understand available endpoints
    await exploreGitBookApi();
    
    // Step 2: Try to get current space content
    const currentContent = await getSpaceContent();
    
    if (currentContent) {
      console.log('\n📋 Current content structure:');
      console.log(JSON.stringify(currentContent, null, 2));
    }
    
    // Step 3: Create change requests for content updates
    console.log('\n🔄 Creating change requests for content updates...');
    
    for (const [key, content] of Object.entries(CONTENT_MAPPING)) {
      console.log(`\nProcessing: ${key}`);
      const changeRequest = await createChangeRequest(content.title, content.content);
      
      if (changeRequest) {
        console.log(`✅ Change request created for ${key}`);
      } else {
        console.log(`❌ Failed to create change request for ${key}`);
      }
    }
    
    console.log('\n🎉 Content update process completed!');
    console.log('\n💡 Next steps:');
    console.log('1. Review the change requests in your GitBook space');
    console.log('2. Approve and merge the changes');
    console.log('3. Publish the updated content');
    
  } catch (error) {
    console.error('\n💥 Process failed:', error.message);
  }
}

main();
