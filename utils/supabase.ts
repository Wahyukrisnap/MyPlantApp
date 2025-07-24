import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tzwouoletwliecgmlkbx.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6d291b2xldHdsaWVjZ21sa2J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNTMyMzYsImV4cCI6MjA2ODgyOTIzNn0.6AS2NYINGJaSr94Q-0L6iV3HNAfenaOqk1EXaIh8mnc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
