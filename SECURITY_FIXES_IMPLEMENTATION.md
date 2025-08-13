# Security Fixes Implementation Guide

## 1. Secure Authentication Implementation

### Install Required Packages
```bash
npm install next-auth @auth/prisma-adapter bcryptjs jsonwebtoken
npm install --save-dev @types/bcryptjs
```

### Create Auth Configuration (`/src/lib/auth.ts`)
```typescript
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare, hash } from 'bcryptjs';
import { supabase } from './supabase';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        // Check user in database
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', credentials.email)
          .single();

        if (error || !user) {
          throw new Error('User not found');
        }

        // Verify password
        const isValid = await compare(credentials.password, user.password_hash);
        
        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  }
};
```

---

## 2. Secure API Route with Rate Limiting

### Install Rate Limiting Packages
```bash
npm install express-rate-limit redis ioredis
```

### Create Rate Limiter (`/src/lib/rate-limiter.ts`)
```typescript
import { Redis } from 'ioredis';
import { NextRequest } from 'next/server';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
});

interface RateLimitOptions {
  windowMs: number;
  max: number;
  message?: string;
}

export async function rateLimit(
  req: NextRequest,
  options: RateLimitOptions = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
  }
): Promise<{ success: boolean; message?: string }> {
  const ip = req.headers.get('x-forwarded-for') || 
             req.headers.get('x-real-ip') || 
             'unknown';
  
  const key = `rate-limit:${ip}`;
  const now = Date.now();
  const windowStart = now - options.windowMs;

  try {
    // Remove old entries
    await redis.zremrangebyscore(key, '-inf', windowStart);
    
    // Count requests in current window
    const requests = await redis.zcard(key);
    
    if (requests >= options.max) {
      return {
        success: false,
        message: options.message || 'Too many requests, please try again later.'
      };
    }
    
    // Add current request
    await redis.zadd(key, now, `${now}-${Math.random()}`);
    await redis.expire(key, Math.ceil(options.windowMs / 1000));
    
    return { success: true };
  } catch (error) {
    console.error('Rate limiting error:', error);
    // Fail open - allow request if Redis is down
    return { success: true };
  }
}
```

---

## 3. Input Sanitization and Validation

### Install Sanitization Packages
```bash
npm install dompurify jsdom validator xss
```

### Create Sanitization Utility (`/src/lib/sanitizer.ts`)
```typescript
import DOMPurify from 'isomorphic-dompurify';
import validator from 'validator';
import { z } from 'zod';

// XSS Prevention
export function sanitizeHTML(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href'],
    ALLOW_DATA_ATTR: false,
  });
}

// SQL Injection Prevention (for raw queries)
export function escapeSql(str: string): string {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
    switch (char) {
      case "\0": return "\\0";
      case "\x08": return "\\b";
      case "\x09": return "\\t";
      case "\x1a": return "\\z";
      case "\n": return "\\n";
      case "\r": return "\\r";
      case "\"":
      case "'":
      case "\\":
      case "%":
        return "\\" + char;
      default:
        return char;
    }
  });
}

// Email validation
export function validateEmail(email: string): boolean {
  return validator.isEmail(email, {
    allow_display_name: false,
    require_tld: true,
    allow_ip_domain: false,
  });
}

// Enhanced Contact Form Schema
export const ContactFormSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name is too long')
    .refine(val => !/<[^>]*>/g.test(val), 'HTML not allowed')
    .transform(val => sanitizeHTML(val)),
  
  email: z.string()
    .email('Invalid email format')
    .max(200, 'Email is too long')
    .refine(val => validateEmail(val), 'Invalid email format'),
  
  company: z.string()
    .max(100, 'Company name is too long')
    .optional()
    .transform(val => val ? sanitizeHTML(val) : undefined),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message is too long')
    .transform(val => sanitizeHTML(val)),
});

// File upload validation
export function validateFileUpload(file: File): { valid: boolean; error?: string } {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
  
  if (file.size > MAX_SIZE) {
    return { valid: false, error: 'File size exceeds 5MB' };
  }
  
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'File type not allowed' };
  }
  
  // Check file extension
  const extension = file.name.split('.').pop()?.toLowerCase();
  const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'pdf'];
  
  if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
    return { valid: false, error: 'Invalid file extension' };
  }
  
  return { valid: true };
}
```

---

## 4. CSRF Protection Middleware

### Create CSRF Middleware (`/src/middleware.ts`)
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createHash, randomBytes } from 'crypto';

const CSRF_SECRET = process.env.CSRF_SECRET || randomBytes(32).toString('hex');

function generateToken(sessionId: string): string {
  return createHash('sha256')
    .update(`${sessionId}:${CSRF_SECRET}`)
    .digest('hex');
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Skip CSRF for GET requests
  if (request.method === 'GET') {
    return response;
  }
  
  // Check CSRF token for POST/PUT/DELETE
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    const token = request.headers.get('x-csrf-token');
    const sessionId = request.cookies.get('session-id')?.value;
    
    if (!sessionId || !token) {
      return NextResponse.json(
        { error: 'CSRF token missing' },
        { status: 403 }
      );
    }
    
    const expectedToken = generateToken(sessionId);
    
    if (token !== expectedToken) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }
  }
  
  // Set security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Set HSTS for production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    );
  }
  
  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/admin/:path*',
  ],
};
```

---

## 5. Secure Environment Variables

### Create `.env.local.example`
```bash
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
CSRF_SECRET=generate-with-openssl-rand-base64-32

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Redis (for rate limiting)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# Email (use OAuth2 or API-based service)
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_FROM=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com

# External APIs (rotate these immediately)
GITBOOK_API_TOKEN=your-new-gitbook-token

# Security
ENCRYPTION_KEY=generate-with-openssl-rand-base64-32
SESSION_SECRET=generate-with-openssl-rand-base64-32

# Monitoring
SENTRY_DSN=your-sentry-dsn
```

### Generate Secure Secrets
```bash
# Generate secure random secrets
openssl rand -base64 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 6. Secure Session Management

### Create Session Handler (`/src/lib/session.ts`)
```typescript
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'change-this-secret'
);

export interface SessionData {
  userId: string;
  email: string;
  role: string;
  expiresAt: number;
}

export async function createSession(data: Omit<SessionData, 'expiresAt'>): Promise<string> {
  const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
  
  const token = await new SignJWT({ ...data, expiresAt })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
  
  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
  
  return token;
}

export async function getSession(): Promise<SessionData | null> {
  const token = cookies().get('session')?.value;
  
  if (!token) {
    return null;
  }
  
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionData;
  } catch (error) {
    console.error('Invalid session token:', error);
    return null;
  }
}

export async function deleteSession(): Promise<void> {
  cookies().delete('session');
}
```

---

## 7. Secure Logging and Monitoring

### Install Monitoring Packages
```bash
npm install @sentry/nextjs winston
```

### Create Logger (`/src/lib/logger.ts`)
```typescript
import winston from 'winston';
import * as Sentry from '@sentry/nextjs';

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

// Create Winston logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/security.log',
      level: 'warn',
    }),
  ],
});

// Security event logging
export function logSecurityEvent(
  event: string,
  details: Record<string, any>,
  severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    severity,
    ...details,
  };
  
  logger.warn('Security Event', logEntry);
  
  // Send critical events to Sentry
  if (severity === 'critical' || severity === 'high') {
    Sentry.captureMessage(`Security Event: ${event}`, {
      level: severity === 'critical' ? 'error' : 'warning',
      extra: details,
    });
  }
}

// Failed login attempt tracking
export async function trackFailedLogin(email: string, ip: string) {
  logSecurityEvent('failed_login', {
    email,
    ip,
    userAgent: 'user-agent-here',
  }, 'medium');
  
  // Track in database for account lockout
  // Implementation depends on your database
}

export default logger;
```

---

## 8. Security Testing Script

### Create Security Test (`/scripts/security-test.js`)
```javascript
const https = require('https');
const fs = require('fs');

// Security checks
const securityTests = {
  // Check for exposed credentials
  checkEnvVariables: () => {
    const envFile = fs.readFileSync('.env.local', 'utf8');
    const exposedPatterns = [
      /password\s*=\s*['"]?[^'"\s]+/gi,
      /api[_-]?key\s*=\s*['"]?[^'"\s]+/gi,
      /secret\s*=\s*['"]?[^'"\s]+/gi,
    ];
    
    exposedPatterns.forEach(pattern => {
      if (pattern.test(envFile)) {
        console.warn('⚠️  Potential exposed credential found');
      }
    });
  },
  
  // Check security headers
  checkHeaders: async (url) => {
    return new Promise((resolve) => {
      https.get(url, (res) => {
        const headers = res.headers;
        const requiredHeaders = [
          'x-frame-options',
          'x-content-type-options',
          'strict-transport-security',
          'content-security-policy',
        ];
        
        requiredHeaders.forEach(header => {
          if (!headers[header]) {
            console.error(`❌ Missing security header: ${header}`);
          } else {
            console.log(`✅ Security header present: ${header}`);
          }
        });
        resolve();
      });
    });
  },
  
  // Check for common vulnerabilities
  checkVulnerabilities: () => {
    const files = [
      'src/app/api/contact/route.ts',
      'src/app/admin/page.tsx',
    ];
    
    files.forEach(file => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        
        // Check for hardcoded passwords
        if (/password\s*===?\s*['"][^'"]+['"]/i.test(content)) {
          console.error(`❌ Hardcoded password found in ${file}`);
        }
        
        // Check for eval() usage
        if (/eval\s*\(/g.test(content)) {
          console.error(`❌ Dangerous eval() usage in ${file}`);
        }
        
        // Check for SQL injection vulnerabilities
        if (/query\s*\(\s*[`'"].*\$\{/g.test(content)) {
          console.warn(`⚠️  Potential SQL injection in ${file}`);
        }
      }
    });
  }
};

// Run all tests
async function runSecurityTests() {
  console.log('🔒 Running Security Tests...\n');
  
  securityTests.checkEnvVariables();
  securityTests.checkVulnerabilities();
  
  if (process.env.SITE_URL) {
    await securityTests.checkHeaders(process.env.SITE_URL);
  }
  
  console.log('\n✅ Security tests completed');
}

runSecurityTests();
```

---

## Implementation Priority

### Day 1 - Critical Fixes
1. Remove all hardcoded credentials
2. Implement environment variables properly
3. Add basic authentication

### Week 1 - High Priority
1. Implement rate limiting
2. Add input sanitization
3. Set up CSRF protection
4. Configure security headers

### Week 2 - Medium Priority
1. Set up monitoring and logging
2. Implement session management
3. Add security testing
4. Configure HTTPS and SSL

### Month 1 - Long-term
1. Penetration testing
2. Security audit
3. Compliance review
4. Incident response plan

---

## Testing Your Security Implementation

```bash
# Run security tests
npm run security:test

# Check for vulnerabilities
npm audit
npx snyk test

# Test rate limiting
for i in {1..10}; do curl -X POST http://localhost:3000/api/contact; done

# Test authentication
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass"}'
```

---

Remember: Security is not a one-time task but an ongoing process. Regular updates, monitoring, and testing are essential for maintaining a secure application.