import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://gkzoxcpvjbulhbulaxni.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdrem94Y3B2amJ1bGhidWxheG5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNjE4MzEsImV4cCI6MjA3OTYzNzgzMX0.EewGESGQmsKy1u7qA5VglORVe24oICqspkf41OO-fVQ'
);
