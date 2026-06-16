import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  ring?: boolean;
}

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

const sizeClass = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

export default function Avatar({
  src,
  alt,
  size = "md",
  className,
  ring = false,
}: AvatarProps) {
  const px = sizeMap[size];
  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden shrink-0",
        sizeClass[size],
        ring && "ring-2 ring-rose-400 ring-offset-2",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={px}
        height={px}
        className="object-cover w-full h-full bg-pink-100"
        unoptimized
      />
    </div>
  );
}
