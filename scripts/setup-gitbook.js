#!/usr/bin/env node

const { gitbook } = require('../src/lib/gitbook');

const INITIAL_CONTENT = {
  'Getting Started': `# Getting Started with FlipTech Pro

Welcome to FlipTech Pro! This guide will help you get started with your AI team deployment in 30 days.

## What is FlipTech Pro?

FlipTech Pro deploys specialized AI departments across marketing, operations, product, research, and support. Each department works seamlessly together, handling complex tasks so your human teams can focus on strategic initiatives.

## Quick Start

1. **Initial Consultation** - We'll assess your current workflows and identify automation opportunities
2. **Team Design** - Custom AI teams tailored to your specific business needs
3. **Integration Setup** - Seamless connection with your existing tools and platforms
4. **Deployment** - Full AI team deployment within 30 days
5. **Training & Support** - Comprehensive knowledge transfer and ongoing support

## Key Features

- **AI Departments**: Specialized teams for different business functions
- **30-Day Deployment**: Complete solution delivery in one month
- **Custom Integration**: Works with your existing tech stack
- **Real-time Analytics**: Monitor performance and ROI
- **24/7 Operation**: AI teams work around the clock

## Next Steps

Ready to transform your business? [Book a demo](/#contact) to see how FlipTech Pro can accelerate your operations.`,

  'AI Departments': `# AI Departments Overview

FlipTech Pro deploys complete AI departments that work together like human teams, but with the speed and consistency of artificial intelligence.

## Available Departments

### Content Team
- **Blog Writing**: Generate high-quality blog posts and articles
- **Social Media**: Create engaging social media content
- **Email Campaigns**: Craft personalized email marketing
- **SEO Optimization**: Optimize content for search engines

### Analytics Team
- **Data Processing**: Analyze large datasets in real-time
- **Reporting**: Generate comprehensive business reports
- **Predictive Insights**: Forecast trends and opportunities
- **Performance Monitoring**: Track KPIs and metrics

### Operations Team
- **Workflow Automation**: Streamline business processes
- **Task Management**: Coordinate project execution
- **Quality Assurance**: Ensure consistent output quality
- **Resource Optimization**: Maximize efficiency

### Customer Success Team
- **Support Automation**: Handle customer inquiries 24/7
- **Onboarding**: Guide new customers through setup
- **Retention Analysis**: Identify at-risk customers
- **Feedback Processing**: Analyze customer feedback

## Custom Teams

Need something specific? We can create custom AI departments tailored to your unique business requirements. Contact us to discuss your specific needs.`,

  'Integration Guide': `# Integration Guide

FlipTech Pro seamlessly integrates with your existing tech stack through pre-built connectors and APIs.

## Supported Integrations

### CRM Systems
- Salesforce
- HubSpot
- Pipedrive
- Custom CRM solutions

### Marketing Tools
- Mailchimp
- Constant Contact
- Marketo
- Google Ads
- Facebook Ads

### Project Management
- Asana
- Trello
- Monday.com
- Jira
- Slack

### Analytics & Reporting
- Google Analytics
- Google Tag Manager
- Mixpanel
- Amplitude

### E-commerce
- Shopify
- WooCommerce
- Magento
- BigCommerce

## Integration Process

1. **Assessment**: We analyze your current tech stack
2. **Mapping**: Identify integration points and data flows
3. **Configuration**: Set up secure connections and APIs
4. **Testing**: Validate all integrations work correctly
5. **Training**: Show your team how to manage integrations

## API Documentation

For custom integrations, we provide comprehensive API documentation and developer support.

### Authentication
All API calls require authentication using your unique API key.

### Rate Limits
- 1000 requests per hour for standard plans
- Unlimited for enterprise customers

### Webhooks
Real-time notifications for important events and updates.

## Support

Need help with integrations? Our technical team is available 24/7 to assist with setup and troubleshooting.`,

  'API Reference': `# API Reference

The FlipTech Pro API allows you to interact with your AI departments programmatically.

## Base URL
\`\`\`
https://api.fliptechpro.com/v1
\`\`\`

## Authentication

Include your API key in the Authorization header:

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://api.fliptechpro.com/v1/departments
\`\`\`

## Departments

### List Departments
\`\`\`http
GET /departments
\`\`\`

Returns a list of all your AI departments.

### Get Department Details
\`\`\`http
GET /departments/{department_id}
\`\`\`

Returns detailed information about a specific department.

### Create Task
\`\`\`http
POST /departments/{department_id}/tasks
\`\`\`

Create a new task for a department to execute.

**Request Body:**
\`\`\`json
{
  "title": "Generate blog post",
  "description": "Write a blog post about AI trends",
  "priority": "high",
  "due_date": "2024-02-01T00:00:00Z"
}
\`\`\`

## Analytics

### Get Performance Metrics
\`\`\`http
GET /analytics/performance
\`\`\`

Returns performance metrics for all departments.

### Get ROI Report
\`\`\`http
GET /analytics/roi
\`\`\`

Returns ROI analysis and cost savings data.

## Webhooks

Configure webhooks to receive real-time notifications:

\`\`\`http
POST /webhooks
\`\`\`

**Request Body:**
\`\`\`json
{
  "url": "https://yourdomain.com/webhook",
  "events": ["task_completed", "department_status_changed"]
}
\`\`\`

## Error Handling

The API uses conventional HTTP response codes:

- \`200\` - Success
- \`400\` - Bad Request
- \`401\` - Unauthorized
- \`404\` - Not Found
- \`500\` - Server Error

Error responses include details:

\`\`\`json
{
  "error": {
    "code": "invalid_request",
    "message": "The request is missing required parameters"
  }
}
\`\`\``,

  'FAQ': `# Frequently Asked Questions

## General Questions

### What makes FlipTech Pro different from other AI solutions?

FlipTech Pro deploys complete AI departments, not just individual tools. Our teams work together like human departments, sharing context and collaborating to achieve business goals.

### How long does deployment take?

Complete deployment takes 30 days from start to finish. This includes consultation, custom development, integration, testing, and training.

### What if I need changes after deployment?

We include 2 weeks of post-launch support for any adjustments. Additional customizations can be made through our support team.

## Technical Questions

### What are the system requirements?

FlipTech Pro is cloud-based and requires no on-premises hardware. You need:
- Stable internet connection
- Modern web browser
- Access to integrate with your existing tools

### How secure is my data?

We use enterprise-grade security including:
- End-to-end encryption
- SOC 2 Type II certification
- Role-based access controls
- Regular security audits

### Can you integrate with our custom systems?

Yes! We can integrate with any system that has an API or database connection. Our team will work with your developers to ensure seamless integration.

## Pricing Questions

### What's included in the $9,500 price?

The complete package includes:
- Custom AI department development
- Full integration with your systems
- 30-day deployment
- Comprehensive documentation
- 2 weeks post-launch support
- Knowledge transfer sessions
- AI Control Dashboard

### Are there ongoing costs?

After the initial deployment, there are no mandatory ongoing costs. Optional services include:
- Extended support plans
- Additional customizations
- New department development

### Do you offer refunds?

Yes, we offer a 30-day money-back guarantee if you're not satisfied with the results.

## Support Questions

### How do I get support?

Multiple support channels available:
- 24/7 chat support
- Email support
- Video calls for complex issues
- Dedicated success manager for enterprise clients

### What happens if something breaks?

Our AI departments are designed for reliability, but if issues occur:
- Automatic failover systems minimize downtime
- Real-time monitoring alerts our team
- Emergency support available 24/7
- Service level agreements guarantee response times`
};

async function setupGitBook() {
  try {
    console.log('🚀 Setting up FlipTech Pro GitBook documentation...');

    // Check existing spaces
    console.log('📋 Checking existing spaces...');
    const spaces = await gitbook.getSpaces();
    
    let fliptechSpace = spaces.items.find(space => 
      space.title.toLowerCase().includes('fliptech') || 
      space.title.toLowerCase().includes('fliptechpro')
    );

    if (!fliptechSpace) {
      console.log('📝 Creating new GitBook space...');
      fliptechSpace = await gitbook.createSpace(
        'FlipTech Pro Documentation',
        'Comprehensive documentation for FlipTech Pro AI departments and integration guides'
      );
      console.log(`✅ Created space: ${fliptechSpace.title} (${fliptechSpace.id})`);
    } else {
      console.log(`✅ Found existing space: ${fliptechSpace.title} (${fliptechSpace.id})`);
    }

    // Create initial content pages
    console.log('📄 Creating documentation pages...');
    
    for (const [title, content] of Object.entries(INITIAL_CONTENT)) {
      try {
        console.log(`   Creating page: ${title}`);
        await gitbook.createPage(fliptechSpace.id, title, content);
        console.log(`   ✅ Created: ${title}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`   ⚠️  Page already exists: ${title}`);
        } else {
          console.log(`   ❌ Failed to create ${title}: ${error.message}`);
        }
      }
    }

    // Publish the space
    console.log('🚀 Publishing space...');
    try {
      await gitbook.publishSpace(fliptechSpace.id);
      console.log('✅ Space published successfully!');
    } catch (error) {
      console.log(`⚠️  Publishing may not be available: ${error.message}`);
    }

    console.log(`\\n🎉 GitBook setup complete!`);
    console.log(`📖 Documentation URL: ${fliptechSpace.url || 'Available in GitBook dashboard'}`);
    console.log(`🔗 Space ID: ${fliptechSpace.id}`);
    
    // Update the navbar with the actual GitBook URL
    if (fliptechSpace.url) {
      console.log(`\\n🔄 Next step: Update the navbar.tsx file to use: ${fliptechSpace.url}`);
    }

  } catch (error) {
    console.error('❌ Error setting up GitBook:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupGitBook();
