import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://olsqklmqrbzdykpbilre.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sc3FrbG1xcmJ6ZHlrcGJpbHJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0OTI1MzEsImV4cCI6MjA1NzA2ODUzMX0.D_ownxmCNuC8f_bOX1r0jqaBIE4p7_rS0LJq0WIX69M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);