// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pygxypljmxbausdhmbrr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5Z3h5cGxqbXhiYXVzZGhtYnJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MTEzNjEsImV4cCI6MjA2NzM4NzM2MX0.RLdehxwpyjZ4SUJohHaCxbBqNspZ8vEIHfZPzEE7MrE";
export const supabase = createClient(supabaseUrl, supabaseKey);
