export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type LoveType =
  | "romantic"
  | "logical"
  | "free"
  | "caring"
  | "passionate"
  | "calm"
  | "playful"
  | "serious";

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          clerk_user_id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          age: number | null;
          gender: "male" | "female" | "other" | null;
          location: string | null;
          job: string | null;
          hobbies: string[];
          love_type: LoveType | null;
          liked_count: number;
          matched_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          clerk_user_id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          age?: number | null;
          gender?: "male" | "female" | "other" | null;
          location?: string | null;
          job?: string | null;
          hobbies?: string[];
          love_type?: LoveType | null;
          liked_count?: number;
          matched_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          clerk_user_id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          age?: number | null;
          gender?: "male" | "female" | "other" | null;
          location?: string | null;
          job?: string | null;
          hobbies?: string[];
          love_type?: LoveType | null;
          liked_count?: number;
          matched_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          image_urls: string[];
          hashtags: string[];
          like_count: number;
          comment_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content: string;
          image_urls?: string[];
          hashtags?: string[];
          like_count?: number;
          comment_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content?: string;
          image_urls?: string[];
          hashtags?: string[];
          like_count?: number;
          comment_count?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      post_likes: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      user_likes: {
        Row: {
          id: string;
          from_user_id: string;
          to_user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          from_user_id: string;
          to_user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          from_user_id?: string;
          to_user_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      matches: {
        Row: {
          id: string;
          user_a_id: string;
          user_b_id: string;
          matched_at: string;
        };
        Insert: {
          id?: string;
          user_a_id: string;
          user_b_id: string;
          matched_at?: string;
        };
        Update: {
          id?: string;
          user_a_id?: string;
          user_b_id?: string;
          matched_at?: string;
        };
        Relationships: [];
      };
      diagnosis_results: {
        Row: {
          id: string;
          user_id: string;
          love_type: LoveType;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          love_type: LoveType;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          love_type?: LoveType;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      gender_type: "male" | "female" | "other";
      love_type: LoveType;
    };
    CompositeTypes: Record<string, never>;
  };
};
