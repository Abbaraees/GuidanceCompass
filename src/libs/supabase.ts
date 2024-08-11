import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabase = createClient("https://oiardontcafmehcxgveb.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pYXJkb250Y2FmbWVoY3hndmViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzNjEwNzAsImV4cCI6MjAzODkzNzA3MH0.n8wm0BtBCnmfKsC3ec9ldjZkPM3-P9M95yNb0AJAXyU", {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase