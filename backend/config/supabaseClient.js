import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_API_URL;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY;
console.log('¿URL cargada?:', !!supabaseUrl)
console.log('¿Key cargada?:', !!supabaseKey)

export const supabase = createClient(supabaseUrl, supabaseKey);