/*
  # Create leadership assessments table

  1. New Tables
    - `leadership_assessments`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `company_name` (text, optional)
      - `annual_revenue` (text, optional)
      - `company_size` (text, optional)
      - `annual_loss` (numeric, default 0)
      - `submission_date` (timestamp, default now)
      - `status` (text, default 'New Lead')
      - `created_at` (timestamp, default now)
      - `updated_at` (timestamp, default now)

  2. Security
    - Enable RLS on `leadership_assessments` table
    - Add policy for service role to insert data
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS leadership_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company_name text,
  annual_revenue text,
  company_size text,
  annual_loss numeric DEFAULT 0,
  submission_date timestamptz DEFAULT now(),
  status text DEFAULT 'New Lead',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE leadership_assessments ENABLE ROW LEVEL SECURITY;

-- Policy for service role to insert data (for Edge Functions)
CREATE POLICY "Service role can insert assessments"
  ON leadership_assessments
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy for authenticated users to read their own data
CREATE POLICY "Users can read own assessments"
  ON leadership_assessments
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_leadership_assessments_email ON leadership_assessments(email);
CREATE INDEX IF NOT EXISTS idx_leadership_assessments_created_at ON leadership_assessments(created_at);