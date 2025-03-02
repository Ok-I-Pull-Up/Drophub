import { createClient } from '@supabase/supabase-js';

// Supabase URL i klucz API powinny być przechowywane w zmiennych środowiskowych w produkcji
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Tworzenie klienta Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
