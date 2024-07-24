// config/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '@env';
import Constants from "expo-constants";

const supabaseUrl = Constants?.expoConfig?.extra?.supabaseUrl;
const supabaseAnonKey = Constants?.expoConfig?.extra?.supabaseAnonKey


export const supabase = createClient(supabaseUrl, supabaseAnonKey)
