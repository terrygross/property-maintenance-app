
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://kgwehxjlxhgnmshpnjxm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnd2VoeGpseGhnbm1zaHBuanhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjY5MjIsImV4cCI6MjA1ODc0MjkyMn0.U2qBmGot0mOuhAmL01cUKvJlt74rfRidv_T0q8zC6CU';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

/**
 * Helper functions for accessing database tables
 */
export const profilesTable = () => {
  return supabase.from('profiles');
};

export const reporterJobsTable = () => {
  return supabase.from('reporter_jobs');
};

export const propertiesTable = () => {
  return supabase.from('properties');
};
