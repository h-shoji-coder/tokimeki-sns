import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const variantClass = {
  primary:
    "bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white shadow-sm shadow-rose-200",
  secondary:
    "bg-pink-100 hover:bg-pink-200 active:bg-pink-300 text-rose-600",
  outline:
    "border-2 border-rose-400 text-rose-500 hover:bg-rose-50 active:bg-rose-100",
  ghost: "text-gray-500 hover:bg-pink-50 active:bg-pink-100",
  danger: "bg-red-500 hover:bg-red-600 text-white",
};

const sizeClass = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold",
        "transition-all duration-200 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClass[variant],
        sizeClass[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
