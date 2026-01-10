import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gjhwrrwvahlmcdxfsqdh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaHdycnd2YWhsbWNkeGZzcWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1MTE2NjksImV4cCI6MjA4MzA4NzY2OX0.mp5g7BZf3hiFhqe6O_DXlHK8E0Ugz6Mo_b-m2maplmw';

export const supabase = createClient(supabaseUrl, supabaseKey);