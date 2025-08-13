/*
  # Submit Lead to Supabase Database

  1. New Edge Function
    - Handles form submissions from the lead capture component
    - Stores data directly in Supabase database
    - Returns success/error response to frontend

  2. Security
    - CORS headers for cross-origin requests
    - Input validation for form data
    - Uses service role for database access
*/

import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'npm:@supabase/supabase-js@2';

interface LeadData {
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  annualRevenue?: string;
  companySize?: string;
  totalAnnualLoss: number;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    // Parse request body
    let leadData: LeadData;
    try {
      leadData = await req.json();
    } catch (error) {
      console.error('Error parsing request JSON:', error);
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { name, email, phone, companyName, annualRevenue, companySize, totalAnnualLoss } = leadData;

    // Validate required fields
    if (!name || !email || !phone) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, email, and phone are required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Get Supabase credentials from environment
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase credentials');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert data into leadership_assessments table
    const { data, error } = await supabase
      .from('leadership_assessments')
      .insert({
        name,
        email,
        phone,
        company_name: companyName || null,
        annual_revenue: annualRevenue || null,
        company_size: companySize || null,
        annual_loss: totalAnnualLoss || 0,
        submission_date: new Date().toISOString(),
        status: 'New Lead'
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return new Response(
        JSON.stringify({ 
          error: `Database error: ${error.message}`,
          code: error.code 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Successfully inserted lead:', data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Lead submitted successfully',
        id: data.id 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Unexpected error processing request:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});