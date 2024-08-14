import { Session, User, WeakPassword } from '@supabase/supabase-js';
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
  company: string | null
  full_name: string | null
  institution: string | null
  position: string | null
  qualification: string | null
  target_audience: string | null
  years_of_experience: string | null
}

export type LoginResultType = {success: boolean, message: string | undefined, data: {
  user: User,
  session: Session;
  weakPassword?: WeakPassword | undefined;
} | {
  user: null;
  session: null;
  weakPassword?: null | undefined;
}}

export type SignupResultType = {
  success: boolean,
  message: string | undefined,
  data: {
    user: User | null;
    session: Session | null;
  } | {
      user: null;
      session: null;
  }
}