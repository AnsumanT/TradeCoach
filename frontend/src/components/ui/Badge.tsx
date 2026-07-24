import type { ReactNode } from "react";

type Variant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "purple"
  | "cyan"
  | "gold";

interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
  warning: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
  danger: "bg-red-500/15 text-red-400 border border-red-500/25",
  info: "bg-blue-500/15 text-blue-400 border border-blue-500/25",
  neutral: "bg-slate-700/50 text-slate-300 border border-slate-600/50",
  purple: "bg-purple-500/15 text-purple-400 border border-purple-500/25",
  cyan: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/25",
  gold: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/25",
};

const dotStyles: Record<Variant, string> = {
  success: "bg-emerald-400",
  warning: "bg-amber-400",
  danger: "bg-red-400",
  info: "bg-blue-400",
  neutral: "bg-slate-400",
  purple: "bg-purple-400",
  cyan: "bg-cyan-400",
  gold: "bg-yellow-400",
};

const sizeStyles: Record<string, string> = {
  sm: "text-[10px] px-2 py-0.5 rounded-md gap-1",
  md: "text-xs px-2.5 py-1 rounded-lg gap-1.5",
  lg: "text-sm px-3 py-1.5 rounded-xl gap-2",
};

export default function Badge({
  children,
  variant = "neutral",
  size = "md",
  dot = false,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center font-semibold",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(" ")}
    >
      {dot && (
        <span
          className={[
            "rounded-full shrink-0",
            dotStyles[variant],
            size === "sm" ? "w-1 h-1" : "w-1.5 h-1.5",
          ].join(" ")}
        />
      )}
      {children}
    </span>
  );
}
