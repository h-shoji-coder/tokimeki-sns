import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "gold" | "outline";
  className?: string;
}

const variantClass = {
  primary: "bg-rose-100 text-rose-600",
  secondary: "bg-pink-50 text-pink-500",
  gold: "bg-amber-100 text-amber-600",
  outline: "border border-rose-200 text-rose-500 bg-transparent",
};

export default function Badge({
  children,
  variant = "primary",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
        variantClass[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
