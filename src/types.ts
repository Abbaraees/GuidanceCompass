import { Database } from './database.types';

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

  export type UpdateProfileDataTypes = {
    available_hours: string | null
    avatar_url: string | null
    date_of_birth: string | null
    field_of_study: string | null
    field_of_work: string | null
    full_name: string | null
    institution: string | null
    position: string | null
    qualification: string | null
    target_audience: string | null
    years_of_experience: string | null
  }