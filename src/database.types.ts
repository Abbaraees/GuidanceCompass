export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chats: {
        Row: {
          created_at: string
          id: number
          message: string | null
          receiver_id: string | null
          sender_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          message?: string | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          message?: string | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chats_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chats_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          available_hours: string | null
          avatar_url: string | null
          date_of_birth: string | null
          field_of_study: string | null
          field_of_work: string | null
          full_name: string | null
          id: string
          institution: string | null
          position: string | null
          qualification: string | null
          ratings: number | null
          role: string | null
          target_audience: string | null
          username: string | null
          years_of_experience: string | null
        }
        Insert: {
          available_hours?: string | null
          avatar_url?: string | null
          date_of_birth?: string | null
          field_of_study?: string | null
          field_of_work?: string | null
          full_name?: string | null
          id: string
          institution?: string | null
          position?: string | null
          qualification?: string | null
          ratings?: number | null
          role?: string | null
          target_audience?: string | null
          username?: string | null
          years_of_experience?: string | null
        }
        Update: {
          available_hours?: string | null
          avatar_url?: string | null
          date_of_birth?: string | null
          field_of_study?: string | null
          field_of_work?: string | null
          full_name?: string | null
          id?: string
          institution?: string | null
          position?: string | null
          qualification?: string | null
          ratings?: number | null
          role?: string | null
          target_audience?: string | null
          username?: string | null
          years_of_experience?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          author_id: string | null
          body: string | null
          category: Json | null
          created_at: string
          dislikes: number | null
          id: number
          image_url: string | null
          likes: number | null
          title: string | null
        }
        Insert: {
          author_id?: string | null
          body?: string | null
          category?: Json | null
          created_at?: string
          dislikes?: number | null
          id?: number
          image_url?: string | null
          likes?: number | null
          title?: string | null
        }
        Update: {
          author_id?: string | null
          body?: string | null
          category?: Json | null
          created_at?: string
          dislikes?: number | null
          id?: number
          image_url?: string | null
          likes?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
