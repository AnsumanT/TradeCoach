import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number; // 0–100
  color?: "blue" | "green" | "purple" | "red" | "amber" | "cyan";
  height?: number;
  delay?: number;
  showLabel?: boolean;
  className?: string;
}

const gradients: Record<string, string> = {
  blue: "linear-gradient(90deg, #2563eb, #60a5fa)",
  green: "linear-gradient(90deg, #059669, #34d399)",
  purple: "linear-gradient(90deg, #7c3aed, #a78bfa)",
  red: "linear-gradient(90deg, #dc2626, #f87171)",
  amber: "linear-gradient(90deg, #d97706, #fbbf24)",
  cyan: "linear-gradient(90deg, #0891b2, #22d3ee)",
};

const glowColors: Record<string, string> = {
  blue: "rgba(59,130,246,0.5)",
  green: "rgba(16,185,129,0.5)",
  purple: "rgba(139,92,246,0.5)",
  red: "rgba(239,68,68,0.5)",
  amber: "rgba(245,158,11,0.5)",
  cyan: "rgba(6,182,212,0.5)",
};

export default function ProgressBar({
  value,
  color = "blue",
  height = 6,
  delay = 0,
  showLabel = false,
  className = "",
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));

  return (
    <div className={`w-full ${className}`}>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height, background: "rgba(255,255,255,0.07)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: [0.4, 0, 0.2, 1] }}
          style={{
            height: "100%",
            background: gradients[color],
            borderRadius: 999,
            boxShadow: `0 0 8px ${glowColors[color]}`,
          }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-white/50 mt-1 block">{pct}%</span>
      )}
    </div>
  );
}
