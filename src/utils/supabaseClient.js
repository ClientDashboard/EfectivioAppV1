// src/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Use a direct string for the URL (not empty or undefined)
const supabaseUrl = 'https://olsqklmqrbzdykpbilre.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sc3FrbG1xcmJ6ZHlrcGJpbHJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0OTI1MzEsImV4cCI6MjA1NzA2ODUzMX0.D_ownxmCNuC8f_bOX1r0jqaBIE4p7_rS0LJq0WIX69M';

// Define client outside the try block
let supabase;

// Add some defensive code to ensure the URL is valid
try {
  // Test the URL validity 
  new URL(supabaseUrl);
  
  // Create the client
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
  console.error('Invalid Supabase URL:', supabaseUrl);
  // Create a dummy client that will throw clear errors when used
  supabase = {
    from: () => {
      throw new Error('Supabase client not properly initialized due to invalid URL');
    },
    auth: {
      getUser: async () => ({ data: null, error: 'Auth not available' }),
      signInWithPassword: async () => ({ data: null, error: 'Auth not available' }),
      signUp: async () => ({ data: null, error: 'Auth not available' }),
      signOut: async () => ({ error: 'Auth not available' }),
      getSession: async () => ({ data: { session: null }, error: 'Auth not available' }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } }, error: 'Auth not available' })
    }
  };
}

// Export the client
export { supabase };