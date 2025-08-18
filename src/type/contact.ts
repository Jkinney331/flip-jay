// TypeScript interfaces for contact form system

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  timeline: string;
  budgetRange: string;
  message: string;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  timestamp: string;
  ip?: string;
  userAgent?: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
  adminEmail: string;
}

export interface RateLimitData {
  ip: string;
  count: number;
  resetTime: number;
}