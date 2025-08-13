# Leadership Loss Calculator

A comprehensive tool for MSME business owners to calculate the financial impact of leadership gaps in their organization.

## Database Setup

The application uses Supabase for data storage. The database migration will automatically create the required table structure.

### Database Schema

The `leadership_assessments` table stores:
- User contact information (name, email, phone)
- Company details (name, revenue, size)
- Assessment results (annual loss calculation)
- Submission metadata (date, status)

### Setup Instructions

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the API settings
3. Update your `.env` file with the Supabase credentials
4. The database migration will run automatically when the Edge Function is first called

## Features

- Interactive assessment of 11 leadership challenges
- Real-time financial impact calculations
- Visual data representation with charts
- Professional summary with actionable insights
- Lead capture with Supabase database storage
- Export and print functionality
- Responsive design for all devices

## Development

```bash
npm install
npm run dev
```

## Deployment

The application is configured for deployment on Netlify with Supabase Edge Functions for the backend functionality.