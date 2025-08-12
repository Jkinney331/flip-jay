# 🚀 CMS Deployment Guide - Two Netlify Projects

## 🎯 Overview

This guide will help you deploy your multi-domain CMS system to both Netlify projects and set up proper content management for both domains.

## 📋 Prerequisites

- ✅ Two Netlify projects already created
- ✅ Domains already connected to Netlify
- ✅ GitHub repository connected to both projects
- ✅ Google Analytics properties set up

## 🛠 Step 1: Deploy to fliptechpro.com Project

### 1.1 Configure Netlify Project Settings

**In your fliptechpro.com Netlify project:**

1. **Go to Site Settings → Environment Variables**
2. **Add these variables:**
   ```
   NEXT_PUBLIC_DEFAULT_DOMAIN = fliptechpro.com
   NEXT_PUBLIC_GA_ID = G-9FP4KSXP0J
   NODE_ENV = production
   ```

### 1.2 Configure Build Settings

1. **Go to Site Settings → Build & Deploy**
2. **Set Build Command:** `npm run build`
3. **Set Publish Directory:** `.next`
4. **Set Node Version:** `18`

### 1.3 Deploy the Code

1. **Connect to GitHub** (if not already connected)
2. **Select Repository:** `Jkinney331/Fliptechpro_Final-aug-10`
3. **Set Branch:** `main`
4. **Click "Deploy site"**

## 🛠 Step 2: Deploy to fliptech-ai.com Project

### 2.1 Configure Netlify Project Settings

**In your fliptech-ai.com Netlify project:**

1. **Go to Site Settings → Environment Variables**
2. **Add these variables:**
   ```
   NEXT_PUBLIC_DEFAULT_DOMAIN = fliptech-ai.com
   NEXT_PUBLIC_GA_ID = G-YOUR-NEW-GA-ID
   NODE_ENV = production
   ```

### 2.2 Configure Build Settings

1. **Go to Site Settings → Build & Deploy**
2. **Set Build Command:** `npm run build`
3. **Set Publish Directory:** `.next`
4. **Set Node Version:** `18`

### 2.3 Deploy the Code

1. **Connect to the same GitHub repository**
2. **Select Repository:** `Jkinney331/Fliptechpro_Final-aug-10`
3. **Set Branch:** `main`
4. **Click "Deploy site"**

## 🔐 Step 3: CMS Authentication Setup

### 3.1 Production Authentication

For production, you should replace the demo authentication with a proper system:

**Option A: Simple Password Protection**
```typescript
// In CMSDashboard.tsx, replace the demo login with:
const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  
  // Use environment variables for production
  const adminEmail = process.env.NEXT_PUBLIC_CMS_EMAIL || 'admin@fliptechpro.com';
  const adminPassword = process.env.NEXT_PUBLIC_CMS_PASSWORD || 'admin123';
  
  if (loginCredentials.email === adminEmail && loginCredentials.password === adminPassword) {
    // ... rest of login logic
  }
};
```

**Option B: Supabase Authentication (Recommended)**
```typescript
// Add Supabase auth for production
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: loginCredentials.email,
    password: loginCredentials.password,
  });
  
  if (data.user) {
    setCurrentUser(data.user);
    setIsAuthenticated(true);
  }
};
```

### 3.2 Add CMS Environment Variables

**For both Netlify projects, add:**
```
NEXT_PUBLIC_CMS_EMAIL = your-admin-email@fliptechpro.com
NEXT_PUBLIC_CMS_PASSWORD = your-secure-password
```

## 📊 Step 4: Content Management Setup

### 4.1 Access the CMS

1. **Visit either domain:** `https://fliptechpro.com` or `https://fliptech-ai.com`
2. **Click "CMS Login"** (bottom-right corner)
3. **Login with credentials:**
   - Email: `admin@fliptechpro.com`
   - Password: `admin123`

### 4.2 CMS Features

**✅ Domain Management:**
- Switch between domains in the sidebar
- View domain-specific configurations
- See audience targeting info

**✅ Content Editing:**
- Edit Hero Section content
- Modify Pricing information
- Update Call-to-Action text
- Manage feature lists

**✅ Publishing:**
- Save changes locally (demo mode)
- Publish to live site (production mode)
- Preview changes before publishing

## 🎯 Step 5: Content Strategy

### 5.1 fliptechpro.com (SMB Content)

**Hero Section:**
- Title: "Where Vision Meets Velocity"
- Subtitle: "AI Solutions Built for Growing Businesses"
- CTA: "Start Your AI Journey"

**Pricing Section:**
- Price: $9,500
- Savings: "Save $15,500 vs building in-house"
- Badge: "Most Popular"

### 5.2 fliptech-ai.com (Enterprise Content)

**Hero Section:**
- Title: "Enterprise AI Excellence"
- Subtitle: "Scalable AI Solutions for Large Organizations"
- CTA: "Schedule Consultation"

**Pricing Section:**
- Price: $19,500
- Savings: "Save $30,500 vs enterprise solutions"
- Badge: "Enterprise Grade"

## 🔧 Step 6: Production Enhancements

### 6.1 Database Integration

For production content management, consider adding:

**Supabase Database Schema:**
```sql
-- Content management table
CREATE TABLE cms_content (
  id SERIAL PRIMARY KEY,
  domain VARCHAR(255) NOT NULL,
  section VARCHAR(255) NOT NULL,
  field VARCHAR(255) NOT NULL,
  value TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User management
CREATE TABLE cms_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'editor',
  permissions JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 6.2 Content Versioning

Add content versioning for rollback capabilities:

```typescript
// In CMSDashboard.tsx
const handlePublishChanges = async () => {
  // Save current version
  await saveContentVersion(selectedDomain, 'backup');
  
  // Publish new content
  await publishContent(selectedDomain, editedContent);
  
  // Trigger deployment
  await triggerDeployment(selectedDomain);
};
```

## 🚀 Step 7: Launch Checklist

### ✅ Pre-Launch Verification

- [ ] Both domains deploy successfully
- [ ] CMS login works on both domains
- [ ] Content editing functions properly
- [ ] Domain-specific content displays correctly
- [ ] Analytics tracking works on both domains
- [ ] A/B testing functions on both domains

### ✅ Post-Launch Monitoring

- [ ] Monitor site performance on both domains
- [ ] Check analytics data collection
- [ ] Verify content updates work in production
- [ ] Test CMS functionality in production
- [ ] Monitor error logs for both projects

## 🎉 Success!

Your multi-domain CMS system is now ready for production use! You can:

- ✅ **Manage content** for both domains from one interface
- ✅ **Edit specific sections** for each audience
- ✅ **Publish changes** independently to each domain
- ✅ **Track performance** separately for each audience
- ✅ **Run A/B tests** specific to each domain

## 📞 Support

If you encounter any issues:

1. **Check Netlify deployment logs** for build errors
2. **Verify environment variables** are set correctly
3. **Test CMS functionality** in development first
4. **Monitor browser console** for JavaScript errors

**Ready to start managing your multi-domain content! 🚀**
