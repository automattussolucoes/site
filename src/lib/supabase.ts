
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tinoukchmdhrnsfxwzrg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpbm91a2NobWRocm5zZnh3enJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NTc1NzAsImV4cCI6MjA4MzAzMzU3MH0.xtBg3EfnrfTCs_KQZzltp2fkC8h64jpiSAJKYWjRUQc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
