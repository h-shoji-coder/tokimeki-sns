export type LoveType =
  | "romantic"
  | "logical"
  | "free"
  | "caring"
  | "passionate"
  | "calm"
  | "playful"
  | "serious";

export interface User {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  photos: string[];
  bio: string;
  hobbies: string[];
  loveType?: LoveType;
  location: string;
  job: string;
  likedCount: number;
  matchedCount: number;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  content: string;
  images?: string[];
  hashtags: string[];
  likeCount: number;
  commentCount: number;
  liked: boolean;
  createdAt: string;
}

export interface DiagnosisQuestion {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    scores: Partial<Record<LoveType, number>>;
  }[];
}

export interface DiagnosisResult {
  type: LoveType;
  title: string;
  description: string;
  strengths: string[];
  advice: string;
  compatibleTypes: LoveType[];
  emoji: string;
  color: string;
  bgColor: string;
}

export interface RankingUser {
  rank: number;
  user: User;
  weeklyLikes: number;
}

export interface TrendHashtag {
  tag: string;
  count: number;
  trend: "up" | "stable" | "down";
}
