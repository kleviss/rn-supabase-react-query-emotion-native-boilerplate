import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_APP_URL;
const apiKey = process.env.EXPO_PUBLIC_SUPABASE_API_KEY;

console.log({supabaseUrl, apiKey});

if (!supabaseUrl || !apiKey) {
  throw new Error('Missing Supabase URL or Supabase Anon Key');
}

export const supabase = createClient(supabaseUrl, apiKey);