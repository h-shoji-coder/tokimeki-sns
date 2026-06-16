import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "ときめき | 婚活SNS",
  description:
    "出会いをもっと、ときめきに。バズる婚活SNS「ときめき」で、診断・マッチング・タイムラインを楽しもう。",
  openGraph: {
    title: "ときめき | 婚活SNS",
    description: "出会いをもっと、ときめきに。",
    type: "website",
  },
};

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
const isClerkReady =
  clerkKey.startsWith("pk_test_") || clerkKey.startsWith("pk_live_");

function AppContent({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isClerkReady) {
    // デモモード: Clerk なしで動作
    return <AppContent>{children}</AppContent>;
  }

  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#f43f5e",
          colorBackground: "#fff1f2",
          borderRadius: "1rem",
          fontFamily: "'Noto Sans JP', 'Inter', sans-serif",
        },
        elements: {
          formButtonPrimary:
            "bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-full",
          card: "shadow-xl shadow-rose-100 border border-pink-100",
          headerTitle: "text-gray-800 font-bold",
          socialButtonsBlockButton:
            "border-2 border-pink-100 hover:border-rose-300 hover:bg-rose-50 rounded-full",
        },
      }}
    >
      <AppContent>{children}</AppContent>
    </ClerkProvider>
  );
}
