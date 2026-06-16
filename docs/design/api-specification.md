# API仕様書 - ときめき（Tokimeki）婚活SNS

## 1. 設計原則
- MVP段階ではフロントエンドでモックデータを使用
- 将来的なSupabase連携を想定した型定義を採用

## 2. データ型

### User
```typescript
interface User {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
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
```

### Post
```typescript
interface Post {
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
```

### LoveType
```typescript
type LoveType = 'romantic' | 'logical' | 'free' | 'caring' | 'passionate' | 'calm' | 'playful' | 'serious';
```

### DiagnosisQuestion
```typescript
interface DiagnosisQuestion {
  id: number;
  text: string;
  options: { id: string; text: string; score: Record<LoveType, number> }[];
}
```

### DiagnosisResult
```typescript
interface DiagnosisResult {
  type: LoveType;
  title: string;
  description: string;
  strengths: string[];
  advice: string;
  compatibleTypes: LoveType[];
  emoji: string;
  color: string;
}
```

## 3. 想定エンドポイント（将来用）

| メソッド | パス | 説明 |
|----------|------|------|
| GET | /api/users | ユーザー一覧（マッチング候補） |
| GET | /api/users/:id | ユーザー詳細 |
| POST | /api/likes | いいね送信 |
| GET | /api/matches | マッチング一覧 |
| GET | /api/posts | タイムライン投稿一覧 |
| POST | /api/posts | 投稿作成 |
| POST | /api/posts/:id/like | 投稿いいね |
| POST | /api/posts/:id/comment | コメント追加 |
| GET | /api/ranking/users | 人気ユーザーランキング |
| GET | /api/ranking/hashtags | トレンドハッシュタグ |
| POST | /api/diagnosis | 診断結果保存 |

## 4. モックデータ
フロントエンド実装時は `lib/mock-data.ts` にモックデータを定義し、ローカルstateで管理する。
