# FlipTech Pro - Complete Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Getting Started](#getting-started)
4. [Development Workflow](#development-workflow)
5. [Project Structure](#project-structure)
6. [Key Features](#key-features)
7. [Component Architecture](#component-architecture)
8. [Database Integration](#database-integration)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)
11. [Maintenance](#maintenance)

---

## 🚀 Project Overview

**FlipTech Pro** is a modern, responsive software development company website built with Next.js 15. The site showcases AI-powered development services with interactive animations, mobile-first design, and integrated contact management.

### 🌟 Key Highlights
- **Interactive Hyperspeed Animation** - WebGL-powered background effects
- **Mobile-First Responsive Design** - Optimized for all devices
- **AI Agent Showcase** - Dynamic carousel of specialized AI services
- **Contact Form Integration** - Supabase database with fallback storage
- **Performance Optimized** - Fast loading with modern web technologies

---

## 🛠 Technology Stack

### Frontend
- **Next.js 15.4.6** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Three.js** - 3D graphics and animations
- **Postprocessing** - Advanced visual effects

### Backend & Database
- **Supabase** - Database and authentication
- **Nodemailer** - Email functionality
- **Zod** - Schema validation

### Deployment & Analytics
- **Netlify** - Hosting and deployment
- **Google Analytics** - Website analytics
- **Vercel Analytics** - Performance monitoring

### Development Tools
- **Turbopack** - Fast bundling
- **ESLint** - Code quality
- **Git** - Version control

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jkinney331/Fliptechpro_Final-aug-10.git
   cd Fliptechpro_Final-aug-10
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   # Supabase Configuration (Optional)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Email Configuration (Optional)
   EMAIL_HOST=your_smtp_host
   EMAIL_PORT=587
   EMAIL_USER=your_email
   EMAIL_PASS=your_password
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

---

## 🔄 Development Workflow

### Standard Workflow
1. **Local Development** → Make changes on `localhost:3000`
2. **Test & Review** → Verify all features work correctly
3. **Git Commit** → Stage and commit changes
4. **Push to GitHub** → Update remote repository
5. **Netlify Deploy** → Automatic deployment to production

### Commands
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint

# Git workflow
git add .            # Stage all changes
git commit -m "message"  # Commit changes
git push origin main # Push to GitHub

# Deployment
netlify deploy --prod # Deploy to production
```

---

## 📁 Project Structure

```
Fliptechpro_Final-aug-10/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── contact/       # Contact form endpoint
│   │   ├── privacy/           # Privacy policy page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── sections/          # Page sections
│   │   │   ├── navbar.tsx     # Navigation
│   │   │   ├── hero-section.tsx # Hero with animation
│   │   │   ├── pricing-section.tsx # Pricing tiers
│   │   │   └── cta-section.tsx # Call-to-action
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── hyperspeed-component.tsx # WebGL animation
│   │   │   ├── Liquid-button.tsx # Animated buttons
│   │   │   ├── Orb.tsx       # 3D orb component
│   │   │   └── mobile-sticky-cta.tsx # Mobile CTA
│   │   └── AIAgentsSection.tsx # AI agents showcase
│   └── lib/                  # Utilities and config
│       ├── config.tsx        # Site configuration
│       └── supabase.ts       # Database client
├── data/                     # Local data storage
├── public/                   # Static assets
├── netlify.toml             # Netlify configuration
└── package.json             # Dependencies
```

---

## ✨ Key Features

### 1. Hyperspeed Animation System
- **WebGL-powered** background animation
- **Theme-aware** (light/dark mode support)
- **Performance optimized** with Three.js
- **Responsive** across all devices

**Key Files:**
- `src/components/ui/hyperspeed-component.tsx`
- `src/components/ui/hyperspeed.tsx`
- `src/components/sections/hero-section.tsx`

### 2. Mobile-First Responsive Design
- **Sticky contact button** for mobile users
- **Optimized layouts** for all screen sizes
- **Touch-friendly** interactions
- **Fast loading** on mobile networks

**Key Files:**
- `src/components/ui/mobile-sticky-cta.tsx`
- `src/components/AIAgentsSection.tsx`
- `src/components/sections/pricing-section.tsx`

### 3. Contact Form Integration
- **Supabase database** storage
- **File-based fallback** when database unavailable
- **Email notifications** (configurable)
- **Rate limiting** and validation

**Key Files:**
- `src/app/api/contact/route.ts`
- `src/lib/supabase.ts`
- `SUPABASE_SETUP.md`

### 4. AI Agents Showcase
- **Interactive carousel** of AI services
- **Dynamic content** management
- **Professional presentation** of capabilities
- **Call-to-action** integration

---

## 🧩 Component Architecture

### Core Components

#### Hyperspeed Animation
```typescript
// Main animation component
<Hyperspeed 
  theme={theme} 
  effectOptions={hyperspeedPresets(theme).one} 
/>

// Features:
// - WebGL rendering with Three.js
// - Postprocessing effects
// - Theme-aware color schemes
// - Performance optimization
```

#### Mobile Sticky CTA
```typescript
// Mobile-only floating contact button
<MobileStickyCTA />

// Features:
// - Appears after 200px scroll
// - Smooth scroll to contact section
// - Mobile-only display
// - Animated appearance
```

#### Liquid Button
```typescript
// Animated button component
<LiquidButton 
  onClick={handleClick}
  className="custom-styles"
>
  Button Text
</LiquidButton>

// Features:
// - Liquid animation effects
// - Customizable styling
// - Accessibility support
// - Touch-friendly
```

---

## 🗄 Database Integration

### Supabase Setup

1. **Create Supabase Project**
   - Visit [supabase.com](https://supabase.com)
   - Create new project
   - Note your project URL and anon key

2. **Database Schema**
   ```sql
   -- Contact submissions table
   CREATE TABLE contact_submissions (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     company TEXT,
     message TEXT NOT NULL,
     ip TEXT,
     user_agent TEXT,
     submission_id TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

3. **Environment Variables**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

### Fallback System
- **Primary**: Supabase database
- **Fallback**: Local JSON file storage
- **Automatic**: Seamless switching based on configuration

---

## 🚀 Deployment

### Netlify Deployment

1. **Automatic Deployment**
   - Connected to GitHub repository
   - Automatic builds on push to main branch
   - Preview deployments for pull requests

2. **Configuration**
   ```toml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

3. **Environment Variables**
   - Set in Netlify dashboard
   - Same variables as local development
   - Secure storage of sensitive data

### Production URL
- **Live Site**: https://friendly-tanuki-928dc0.netlify.app
- **GitHub**: https://github.com/Jkinney331/Fliptechpro_Final-aug-10

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Development Server Issues
```bash
# Port conflicts
pkill -f "next dev"  # Kill existing processes
npm run dev          # Restart server

# Build errors
rm -rf .next         # Clear build cache
npm run build        # Rebuild
```

#### 2. Hyperspeed Animation Problems
- **Canvas not rendering**: Check WebGL support
- **Performance issues**: Reduce animation complexity
- **Theme switching**: Verify theme prop passing

#### 3. Contact Form Issues
- **Database errors**: Check Supabase configuration
- **Email failures**: Verify SMTP settings
- **Validation errors**: Check form data format

#### 4. Mobile Responsiveness
- **Text overflow**: Use `max-w-xs` containers
- **Layout issues**: Check Tailwind breakpoints
- **Touch interactions**: Verify button sizing

### Debug Commands
```bash
# Check server status
lsof -i :3000

# Verify build
npm run build

# Test production build
npm run start

# Check dependencies
npm audit
```

---

## 🛠 Maintenance

### Regular Tasks

#### Weekly
- [ ] Check Google Analytics data
- [ ] Review contact form submissions
- [ ] Test mobile responsiveness
- [ ] Verify all links work

#### Monthly
- [ ] Update dependencies
- [ ] Review performance metrics
- [ ] Backup database
- [ ] Update content if needed

#### Quarterly
- [ ] Security audit
- [ ] Performance optimization
- [ ] Feature updates
- [ ] User feedback review

### Performance Monitoring
- **Google Analytics**: User behavior and traffic
- **Vercel Analytics**: Performance metrics
- **Netlify Analytics**: Deployment and uptime

### Content Updates
- **Configuration**: Edit `src/lib/config.tsx`
- **Styling**: Modify Tailwind classes
- **Content**: Update component text
- **Images**: Replace files in `public/` directory

---

## 📞 Support & Contact

### Development Team
- **Repository**: https://github.com/Jkinney331/Fliptechpro_Final-aug-10
- **Live Site**: https://friendly-tanuki-928dc0.netlify.app
- **Documentation**: This GitBook

### Key Contacts
- **Technical Issues**: Check GitHub issues
- **Content Updates**: Modify configuration files
- **Deployment**: Netlify dashboard

---

## 📚 Additional Resources

### Documentation Files
- `SUPABASE_SETUP.md` - Database setup guide
- `README.md` - Project overview
- `package.json` - Dependencies list

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Three.js Documentation](https://threejs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)

---

*Last Updated: December 2024*
*Version: 1.0.0*
