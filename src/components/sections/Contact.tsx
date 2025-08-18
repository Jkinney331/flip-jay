'use client';

import React, { useState } from 'react';
import { SectionHeader } from '@/components/section-header';
// import { Button } from '@/components/ui/button';
import { ContactFormData, ContactFormResponse } from '@/type/contact'
import { LiquidButton } from '../ui/Liquid-button';

const ContactSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    timeline: '',
    budgetRange: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Prevent hydration errors from browser extensions
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result: ContactFormResponse = await response.json();
      if (result.success) {
        setSubmitStatus({ type: 'success', message: result.message });
        setFormData({ 
          name: '', 
          email: '', 
          company: '', 
          projectType: '',
          timeline: '',
          budgetRange: '',
          message: '' 
        });
      } else {
        setSubmitStatus({ type: 'error', message: result.message });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="flex flex-col items-center justify-center gap-10 pb-10 w-full relative">
      <SectionHeader>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance">Let's talk about your project</h2>
        <p className="text-muted-foreground text-center text-balance font-medium">Quick call, honest assessment, clear next steps</p>
      </SectionHeader>

      <div className="w-full px-6 flex justify-center">
        {!isMounted ? (
          <div className="w-full max-w-[800px] h-[600px] p-6 md:p-8 border border-border rounded-lg dark:bg-zinc-900 bg-white animate-pulse" />
        ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-[800px] space-y-6 p-6 md:p-8 border border-border rounded-lg dark:bg-zinc-900 bg-white " suppressHydrationWarning>
          {submitStatus.type && (
            <div className={`p-4 rounded-lg text-sm font-medium ${submitStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-800' : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-800'}`}>
              {submitStatus.message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name *</label>
              <input id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} className="flex h-12 w-full rounded-md border border-input bg-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 touch-manipulation" placeholder="Your name" disabled={isSubmitting} autoComplete="name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email *</label>
              <input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} className="flex h-12 w-full rounded-md border border-input bg-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 touch-manipulation" placeholder="your@email.com" disabled={isSubmitting} autoComplete="email" inputMode="email" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Company</label>
            <input id="company" name="company" type="text" value={formData.company} onChange={handleInputChange} className="flex h-12 w-full rounded-md border border-input bg-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 touch-manipulation" placeholder="Your company (optional)" disabled={isSubmitting} autoComplete="organization" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="projectType" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Project Type *</label>
              <select id="projectType" name="projectType" required value={formData.projectType} onChange={handleInputChange} className="flex h-12 w-full rounded-md border border-input bg-background px-4 py-3 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting}>
                <option value="">Select project type</option>
                <option value="bug-fix">Bug Fix</option>
                <option value="new-site">New Site</option>
                <option value="redesign">Redesign</option>
                <option value="web-app">Web App</option>
                <option value="mobile-app">Mobile App</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="timeline" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Timeline *</label>
              <select id="timeline" name="timeline" required value={formData.timeline} onChange={handleInputChange} className="flex h-12 w-full rounded-md border border-input bg-background px-4 py-3 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting}>
                <option value="">Select timeline</option>
                <option value="asap">ASAP</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="budgetRange" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Budget Range *</label>
              <select id="budgetRange" name="budgetRange" required value={formData.budgetRange} onChange={handleInputChange} className="flex h-12 w-full rounded-md border border-input bg-background px-4 py-3 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting}>
                <option value="">Select budget</option>
                <option value="under-5k">Under $5K</option>
                <option value="5k-15k">$5K-$15K</option>
                <option value="15k-50k">$15K-$50K</option>
                <option value="50k-plus">$50K+</option>
                <option value="hourly">Hourly</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Project Details *</label>
            <textarea id="message" name="message" required value={formData.message} onChange={handleInputChange} rows={6} className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 touch-manipulation resize-y" placeholder="Tell us about your project, requirements, and any specific needs..." disabled={isSubmitting} />
          </div>

         {/* Submit Button */}
         <LiquidButton 
          type="submit"
          className="w-full cursor-pointer bg-transparent hover:bg-transparent text-black dark:text-white px-4 py-2 rounded-lg transition"
          disabled={isSubmitting}
        >
         {isSubmitting ? 'Sending...' : 'Start Your Project'}
     </LiquidButton>

        </form>
        )}
      </div>
    </section>
  );
};

export default ContactSection;