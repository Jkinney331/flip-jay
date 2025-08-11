# Supabase Setup Instructions

## Prerequisites
1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project

## Database Setup

### 1. Create the contact_submissions table

Run this SQL in your Supabase SQL editor:

```sql
CREATE TABLE contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  ip TEXT,
  user_agent TEXT,
  submission_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX idx_contact_submissions_submission_id ON contact_submissions(submission_id);

-- Add Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy for service role (your API)
CREATE POLICY "Service role can insert contact submissions" ON contact_submissions
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can select contact submissions" ON contact_submissions
  FOR SELECT
  TO service_role
  USING (true);
```

### 2. Environment Variables

Add these to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_email_password
SMTP_FROM=your_email@gmail.com
ADMIN_EMAIL=admin@fliptechpro.com
```

## Where to find your Supabase credentials:

1. Go to your Supabase project dashboard
2. Click on "Settings" in the sidebar
3. Click on "API"
4. Copy the "Project URL" and "anon public" key
5. Paste them into your `.env.local` file

## Testing

After setup, test the contact form by:
1. Filling out the contact form on your website
2. Checking your Supabase database for the new submission
3. Verifying you receive email notifications (if configured)

## Note

The contact form will continue to work with file-based storage if Supabase is not configured, but submissions will be saved to local files instead of the database.
