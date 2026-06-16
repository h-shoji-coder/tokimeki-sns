import BottomNav from "./BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-rose-50 pb-20">
      <div className="max-w-md mx-auto">{children}</div>
      <BottomNav />
    </div>
  );
}
