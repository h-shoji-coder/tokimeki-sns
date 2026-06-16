import type {
  User,
  Post,
  DiagnosisQuestion,
  DiagnosisResult,
  LoveType,
  RankingUser,
  TrendHashtag,
} from "./types";

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "さくら",
    age: 28,
    gender: "female",
    photos: [
      "https://api.dicebear.com/9.x/personas/svg?seed=sakura&backgroundColor=fce7f3",
    ],
    bio: "カフェ巡りと読書が好きです☕ 旅行は年3回以上行きたい派。一緒に笑える人と出会いたいです🌸",
    hobbies: ["カフェ巡り", "読書", "旅行", "料理"],
    loveType: "romantic",
    location: "東京都",
    job: "マーケター",
    likedCount: 342,
    matchedCount: 28,
    createdAt: "2024-01-15",
  },
  {
    id: "u2",
    name: "たくや",
    age: 31,
    gender: "male",
    photos: [
      "https://api.dicebear.com/9.x/personas/svg?seed=takuya&backgroundColor=dbeafe",
    ],
    bio: "週末は筋トレか登山。料理が得意で特にパスタは自信あり🍝 真剣に将来のことを考えられる人と。",
    hobbies: ["筋トレ", "登山", "料理", "映画"],
    loveType: "serious",
    location: "埼玉県",
    job: "エンジニア",
    likedCount: 198,
    matchedCount: 15,
    createdAt: "2024-02-01",
  },
  {
    id: "u3",
    name: "はな",
    age: 26,
    gender: "female",
    photos: [
      "https://api.dicebear.com/9.x/personas/svg?seed=hana&backgroundColor=d1fae5",
    ],
    bio: "音楽フェスとアウトドアが大好き🎵 ワンコ2匹と暮らしてます。フットワーク軽めな人と仲良くしたい！",
    hobbies: ["音楽フェス", "アウトドア", "ペット", "ヨガ"],
    loveType: "free",
    location: "神奈川県",
    job: "デザイナー",
    likedCount: 521,
    matchedCount: 43,
    createdAt: "2024-01-20",
  },
  {
    id: "u4",
    name: "りょう",
    age: 33,
    gender: "male",
    photos: [
      "https://api.dicebear.com/9.x/personas/svg?seed=ryo&backgroundColor=fef9c3",
    ],
    bio: "茶道・将棋・読書が趣味の文科系です📚 穏やかに過ごせる日常を大切にしたい。一緒に成長できる人と。",
    hobbies: ["茶道", "将棋", "読書", "美術館"],
    loveType: "calm",
    location: "京都府",
    job: "公務員",
    likedCount: 156,
    matchedCount: 12,
    createdAt: "2024-03-01",
  },
  {
    id: "u5",
    name: "みさき",
    age: 27,
    gender: "female",
    photos: [
      "https://api.dicebear.com/9.x/personas/svg?seed=misaki&backgroundColor=ede9fe",
    ],
    bio: "海外旅行が趣味で15カ国制覇🌍 英語・フランス語話せます。グローバルな視点を持つ人と話したい！",
    hobbies: ["海外旅行", "語学", "グルメ", "ショッピング"],
    loveType: "passionate",
    location: "大阪府",
    job: "外資系営業",
    likedCount: 428,
    matchedCount: 35,
    createdAt: "2024-02-15",
  },
  {
    id: "u6",
    name: "けんた",
    age: 29,
    gender: "male",
    photos: [
      "https://api.dicebear.com/9.x/personas/svg?seed=kenta&backgroundColor=ffedd5",
    ],
    bio: "スポーツ大好き！週末はフットサルかサーフィン🏄 明るくて一緒にいて楽しい人が好きです。",
    hobbies: ["フットサル", "サーフィン", "BBQ", "ドライブ"],
    loveType: "playful",
    location: "千葉県",
    job: "営業",
    likedCount: 289,
    matchedCount: 22,
    createdAt: "2024-03-10",
  },
];

export const mockPosts: Post[] = [
  {
    id: "p1",
    userId: "u1",
    userName: "さくら",
    userPhoto:
      "https://api.dicebear.com/9.x/personas/svg?seed=sakura&backgroundColor=fce7f3",
    content:
      "今日はお気に入りのカフェで新しいラテを発見☕✨ こういう小さな幸せを共有できる人がいたらいいな〜🌸 #婚活 #カフェ巡り #東京カフェ",
    hashtags: ["婚活", "カフェ巡り", "東京カフェ"],
    likeCount: 87,
    commentCount: 12,
    liked: false,
    createdAt: "2024-06-15T10:30:00Z",
  },
  {
    id: "p2",
    userId: "u3",
    userName: "はな",
    userPhoto:
      "https://api.dicebear.com/9.x/personas/svg?seed=hana&backgroundColor=d1fae5",
    content:
      "週末フェスに行ってきた🎵 一人でも楽しいけど、隣で一緒に盛り上がれる人がいたらもっと最高だったな〜！誰かいませんか笑 #音楽フェス #婚活 #フェス好き",
    hashtags: ["音楽フェス", "婚活", "フェス好き"],
    likeCount: 134,
    commentCount: 28,
    liked: true,
    createdAt: "2024-06-14T20:15:00Z",
  },
  {
    id: "p3",
    userId: "u2",
    userName: "たくや",
    userPhoto:
      "https://api.dicebear.com/9.x/personas/svg?seed=takuya&backgroundColor=dbeafe",
    content:
      "今日も筋トレ完了💪 自炊で高タンパクパスタ作ったんだけど、一緒に食べてくれる人いないかな笑 料理は得意なので一緒に作るのもアリです！ #婚活 #筋トレ飯 #自炊男子",
    hashtags: ["婚活", "筋トレ飯", "自炊男子"],
    likeCount: 62,
    commentCount: 9,
    liked: false,
    createdAt: "2024-06-14T19:00:00Z",
  },
  {
    id: "p4",
    userId: "u5",
    userName: "みさき",
    userPhoto:
      "https://api.dicebear.com/9.x/personas/svg?seed=misaki&backgroundColor=ede9fe",
    content:
      "先週パリから帰国しました🗼✨ やっぱり旅行は最高！次はバルセロナに行きたいな。一緒に世界を旅してくれるパートナーを探してます🌍 #婚活 #海外旅行 #旅好き",
    hashtags: ["婚活", "海外旅行", "旅好き"],
    likeCount: 203,
    commentCount: 41,
    liked: false,
    createdAt: "2024-06-13T16:45:00Z",
  },
  {
    id: "p5",
    userId: "u4",
    userName: "りょう",
    userPhoto:
      "https://api.dicebear.com/9.x/personas/svg?seed=ryo&backgroundColor=fef9c3",
    content:
      "先週末は美術館へ。モネの睡蓮をじっくり観てきました🎨 芸術を一緒に楽しめる人、いますか？穏やかな休日を共有したいです。 #婚活 #美術館 #アート",
    hashtags: ["婚活", "美術館", "アート"],
    likeCount: 45,
    commentCount: 7,
    liked: false,
    createdAt: "2024-06-12T14:00:00Z",
  },
];

export const diagnosisQuestions: DiagnosisQuestion[] = [
  {
    id: 1,
    text: "理想のデートといえば？",
    options: [
      {
        id: "a",
        text: "夜景の見えるレストランでディナー🌃",
        scores: { romantic: 3, serious: 1 },
      },
      {
        id: "b",
        text: "一緒に料理を作って家で過ごす🍳",
        scores: { caring: 3, calm: 1 },
      },
      {
        id: "c",
        text: "突然の旅行！どこか遠くへ✈️",
        scores: { free: 3, playful: 1 },
      },
      {
        id: "d",
        text: "お気に入りの映画を語り合う🎬",
        scores: { logical: 3, calm: 1 },
      },
    ],
  },
  {
    id: 2,
    text: "喧嘩したとき、どうする？",
    options: [
      {
        id: "a",
        text: "その場で全部話し合って解決する",
        scores: { passionate: 3, serious: 1 },
      },
      {
        id: "b",
        text: "少し冷静になってから話す",
        scores: { logical: 3, calm: 1 },
      },
      {
        id: "c",
        text: "相手の気持ちを先に聞く",
        scores: { caring: 3, romantic: 1 },
      },
      {
        id: "d",
        text: "笑いで和解する",
        scores: { playful: 3, free: 1 },
      },
    ],
  },
  {
    id: 3,
    text: "休日の過ごし方は？",
    options: [
      {
        id: "a",
        text: "家でゆっくり充電する☕",
        scores: { calm: 3, logical: 1 },
      },
      {
        id: "b",
        text: "アウトドア・スポーツで動く🏃",
        scores: { free: 3, playful: 1 },
      },
      {
        id: "c",
        text: "パートナーと過ごす時間優先💑",
        scores: { romantic: 3, caring: 1 },
      },
      {
        id: "d",
        text: "新しいことに挑戦する✨",
        scores: { passionate: 3, free: 1 },
      },
    ],
  },
  {
    id: 4,
    text: "大切な記念日、どうする？",
    options: [
      {
        id: "a",
        text: "サプライズで感動させたい🎁",
        scores: { romantic: 3, passionate: 1 },
      },
      {
        id: "b",
        text: "二人で計画を立てて楽しむ📅",
        scores: { logical: 3, serious: 1 },
      },
      {
        id: "c",
        text: "相手が喜ぶことを全力でやる🌸",
        scores: { caring: 3, romantic: 1 },
      },
      {
        id: "d",
        text: "いつも通りの自然な日でいい",
        scores: { calm: 3, free: 1 },
      },
    ],
  },
  {
    id: 5,
    text: "パートナーに一番求めるものは？",
    options: [
      {
        id: "a",
        text: "一緒にいるだけで幸せな空気感",
        scores: { romantic: 3, calm: 1 },
      },
      {
        id: "b",
        text: "価値観・目標の一致",
        scores: { serious: 3, logical: 1 },
      },
      {
        id: "c",
        text: "自由を尊重してくれること",
        scores: { free: 3, playful: 1 },
      },
      {
        id: "d",
        text: "お互いを高め合える関係",
        scores: { passionate: 3, serious: 1 },
      },
    ],
  },
  {
    id: 6,
    text: "好きな人にアプローチするとき？",
    options: [
      {
        id: "a",
        text: "ロマンチックな告白を計画する💌",
        scores: { romantic: 3, passionate: 1 },
      },
      {
        id: "b",
        text: "友達から始めてゆっくり距離を縮める",
        scores: { calm: 3, logical: 1 },
      },
      {
        id: "c",
        text: "気持ちが盛り上がったら即告白！",
        scores: { playful: 3, free: 1 },
      },
      {
        id: "d",
        text: "相手の気持ちをしっかり見極めてから",
        scores: { serious: 3, caring: 1 },
      },
    ],
  },
  {
    id: 7,
    text: "将来のイメージは？",
    options: [
      {
        id: "a",
        text: "子どもと賑やかな家庭を作りたい👨‍👩‍👧‍👦",
        scores: { caring: 3, serious: 1 },
      },
      {
        id: "b",
        text: "二人でいつまでも恋愛的な関係でいたい",
        scores: { romantic: 3, passionate: 1 },
      },
      {
        id: "c",
        text: "お互いの夢を応援し合うパートナー",
        scores: { logical: 3, free: 1 },
      },
      {
        id: "d",
        text: "一緒にいると自然と笑える毎日",
        scores: { playful: 3, calm: 1 },
      },
    ],
  },
  {
    id: 8,
    text: "SNSについてどう思う？",
    options: [
      {
        id: "a",
        text: "二人の思い出をたくさんシェアしたい📸",
        scores: { romantic: 3, playful: 1 },
      },
      {
        id: "b",
        text: "プライベートは二人だけの秘密にしたい",
        scores: { serious: 3, calm: 1 },
      },
      {
        id: "c",
        text: "SNSより直接会う時間を大切にしたい",
        scores: { caring: 3, passionate: 1 },
      },
      {
        id: "d",
        text: "お互い自由にすればいい",
        scores: { free: 3, logical: 1 },
      },
    ],
  },
  {
    id: 9,
    text: "一番テンションが上がる瞬間は？",
    options: [
      {
        id: "a",
        text: "好きな人からのメッセージ💬",
        scores: { romantic: 3, caring: 1 },
      },
      {
        id: "b",
        text: "目標を達成したとき🏆",
        scores: { passionate: 3, serious: 1 },
      },
      {
        id: "c",
        text: "思いがけない出来事・サプライズ🎊",
        scores: { playful: 3, free: 1 },
      },
      {
        id: "d",
        text: "静かで落ち着いた時間を過ごすとき",
        scores: { calm: 3, logical: 1 },
      },
    ],
  },
  {
    id: 10,
    text: "あなたにとって「愛情表現」とは？",
    options: [
      {
        id: "a",
        text: "言葉で「好き」「ありがとう」を伝える",
        scores: { romantic: 3, caring: 1 },
      },
      {
        id: "b",
        text: "行動で示す（手料理・サポートなど）",
        scores: { caring: 3, serious: 1 },
      },
      {
        id: "c",
        text: "一緒に時間を過ごすことが愛情",
        scores: { calm: 3, playful: 1 },
      },
      {
        id: "d",
        text: "相手の自由と成長を尊重すること",
        scores: { logical: 3, free: 1 },
      },
    ],
  },
];

export const diagnosisResults: Record<LoveType, DiagnosisResult> = {
  romantic: {
    type: "romantic",
    title: "ロマンチスト",
    description:
      "愛に夢を持ち、特別な瞬間を大切にするタイプ。記念日やサプライズが大好きで、パートナーをいつでも幸せにしたいという気持ちが強い。相手への愛情表現がストレートで純粋。",
    strengths: [
      "愛情表現が豊か",
      "特別な瞬間を演出するのが得意",
      "パートナーを大切にする",
    ],
    advice:
      "理想が高すぎることも。現実のパートナーのいいところを見つける練習をしてみて。",
    compatibleTypes: ["caring", "calm"],
    emoji: "💕",
    color: "#F43F5E",
    bgColor: "#FFF1F2",
  },
  logical: {
    type: "logical",
    title: "論理派",
    description:
      "感情より理性で物事を判断し、計画的に行動するタイプ。価値観の一致を重視し、長期的な将来設計を大切にする。言葉で気持ちを伝えるのは苦手だが、行動は誠実。",
    strengths: [
      "冷静に問題を解決できる",
      "約束を守る誠実さ",
      "将来設計をしっかり考える",
    ],
    advice:
      "時には感情的な共感も大切。「正しさ」より「気持ち」を優先してみて。",
    compatibleTypes: ["caring", "calm"],
    emoji: "🧠",
    color: "#3B82F6",
    bgColor: "#EFF6FF",
  },
  free: {
    type: "free",
    title: "自由人",
    description:
      "束縛が苦手で、自分らしさを大切にするタイプ。新しいことへの好奇心旺盛で、パートナーとも対等な関係を求める。一緒にいながらも個人の自由を尊重し合える関係が理想。",
    strengths: ["自立心が強い", "新しい体験をもたらす", "束縛しない関係を作れる"],
    advice: "自由すぎてパートナーを不安にさせることも。定期的な安心感の提供を意識して。",
    compatibleTypes: ["playful", "passionate"],
    emoji: "🌈",
    color: "#10B981",
    bgColor: "#ECFDF5",
  },
  caring: {
    type: "caring",
    title: "世話焼き",
    description:
      "相手の気持ちを最優先に考え、いつでも支えたいという愛情深いタイプ。家庭的で安心感を与えるが、自分のことを後回しにしすぎることも。与えることに喜びを感じる。",
    strengths: [
      "共感力が高い",
      "安心感を与える",
      "家庭的で一緒にいると落ち着く",
    ],
    advice: "自分の気持ちも大切に。我慢しすぎず、甘えることも愛情表現のひとつ。",
    compatibleTypes: ["romantic", "serious"],
    emoji: "🌸",
    color: "#EC4899",
    bgColor: "#FDF2F8",
  },
  passionate: {
    type: "passionate",
    title: "情熱家",
    description:
      "恋愛にも人生にも全力投球するタイプ。好きになったら一直線で、エネルギッシュに愛情を注ぐ。目標を持って生きていて、その情熱がパートナーにも伝染する。",
    strengths: [
      "愛情の深さと情熱",
      "一緒にいると元気をもらえる",
      "本気で向き合う真剣さ",
    ],
    advice: "暴走しないように。相手のペースも大切に尊重して。",
    compatibleTypes: ["free", "serious"],
    emoji: "🔥",
    color: "#F97316",
    bgColor: "#FFF7ED",
  },
  calm: {
    type: "calm",
    title: "穏やか派",
    description:
      "穏やかで安定した関係を好むタイプ。激しい感情の起伏より、日常の中の小さな幸せを大切にする。一緒にいると心が落ち着く存在で、長期的なパートナーシップに向いている。",
    strengths: [
      "安定した関係を作れる",
      "一緒にいると癒される",
      "長続きする関係を築ける",
    ],
    advice: "時には情熱を見せることも大切。「変わらない安心」に加えて「ときめき」も。",
    compatibleTypes: ["romantic", "logical"],
    emoji: "🍃",
    color: "#6366F1",
    bgColor: "#EEF2FF",
  },
  playful: {
    type: "playful",
    title: "遊び好き",
    description:
      "いつも明るく楽しい雰囲気を作るムードメーカータイプ。恋愛もゲーム感覚で楽しめるが、深い関係になるとその素直さが輝く。笑いが絶えない関係が理想。",
    strengths: ["場を明るくする力", "毎日を楽しくする才能", "素直な感情表現"],
    advice: "真剣な話をする勇気も大切。笑いの奥にある本音を伝えてみて。",
    compatibleTypes: ["free", "romantic"],
    emoji: "🎉",
    color: "#8B5CF6",
    bgColor: "#F5F3FF",
  },
  serious: {
    type: "serious",
    title: "真剣派",
    description:
      "婚活に本気で向き合い、将来をしっかり見据えているタイプ。誠実で約束を守り、長期的な関係構築を大切にする。少し慎重に見えるが、一度心を開くと深い愛情を示す。",
    strengths: [
      "誠実さと信頼感",
      "将来設計を真剣に考える",
      "深く長続きする関係を作れる",
    ],
    advice: "完璧を求めすぎずに。「この人でいいのか」より「この人と歩んでいきたい」で考えて。",
    compatibleTypes: ["caring", "passionate"],
    emoji: "💎",
    color: "#0EA5E9",
    bgColor: "#F0F9FF",
  },
};

export const mockRanking: RankingUser[] = [
  { rank: 1, user: mockUsers[2], weeklyLikes: 89 },
  { rank: 2, user: mockUsers[4], weeklyLikes: 76 },
  { rank: 3, user: mockUsers[0], weeklyLikes: 65 },
  { rank: 4, user: mockUsers[5], weeklyLikes: 54 },
  { rank: 5, user: mockUsers[1], weeklyLikes: 43 },
  { rank: 6, user: mockUsers[3], weeklyLikes: 31 },
];

export const mockTrendHashtags: TrendHashtag[] = [
  { tag: "婚活", count: 1284, trend: "up" },
  { tag: "恋愛タイプ診断", count: 982, trend: "up" },
  { tag: "カフェ巡り", count: 743, trend: "up" },
  { tag: "音楽フェス", count: 621, trend: "stable" },
  { tag: "筋トレ飯", count: 498, trend: "up" },
  { tag: "海外旅行", count: 415, trend: "stable" },
  { tag: "アート", count: 312, trend: "down" },
  { tag: "自炊男子", count: 287, trend: "up" },
];

export const weeklyMatchCount = 1432;
