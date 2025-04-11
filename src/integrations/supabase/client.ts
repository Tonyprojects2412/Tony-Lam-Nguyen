
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gmeblzqmalsoopydbsqx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtZWJsenFtYWxzb29weWRic3F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMzQ0MzMsImV4cCI6MjA1OTkxMDQzM30.TIdZuTdGKG6Ro71hpQ22T4gbGMOvEmULW5iZApeDzSs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
