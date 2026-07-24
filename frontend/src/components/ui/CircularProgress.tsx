import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface CircularProgressProps {
  score: number; // 0–10
  size?: number;
  strokeWidth?: number;
  color: string; // e.g. "blue", "green", "purple", "orange", "cyan"
  delay?: number;
  showScore?: boolean;
  label?: string;
}

const colorMap: Record<string, { stroke: string; glow: string; text: string }> = {
  blue: { stroke: "#3b82f6", glow: "rgba(59,130,246,0.4)", text: "#60a5fa" },
  green: { stroke: "#10b981", glow: "rgba(16,185,129,0.4)", text: "#34d399" },
  purple: { stroke: "#8b5cf6", glow: "rgba(139,92,246,0.4)", text: "#a78bfa" },
  orange: { stroke: "#f59e0b", glow: "rgba(245,158,11,0.4)", text: "#fbbf24" },
  cyan: { stroke: "#06b6d4", glow: "rgba(6,182,212,0.4)", text: "#22d3ee" },
  red: { stroke: "#ef4444", glow: "rgba(239,68,68,0.4)", text: "#f87171" },
};

export default function CircularProgress({
  score,
  size = 96,
  strokeWidth = 7,
  color = "blue",
  delay = 0,
  showScore = true,
  label,
}: CircularProgressProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<SVGSVGElement>(null);

  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = score / 10;
  const offset = circumference - pct * circumference;

  const { stroke, glow, text } = colorMap[color] ?? colorMap.blue;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), delay * 1000 + 300);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Glow backdrop */}
        {animated && (
          <div
            className="absolute inset-0 rounded-full opacity-30 blur-md"
            style={{ background: glow }}
          />
        )}
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="rotate-[-90deg]"
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animated ? offset : circumference}
            className="progress-ring-circle"
            style={{
              filter: animated ? `drop-shadow(0 0 6px ${glow})` : "none",
            }}
          />
        </svg>

        {showScore && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={animated ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: delay + 0.4, duration: 0.4 }}
              className="text-xl font-bold leading-none"
              style={{ color: text }}
            >
              {score.toFixed(1)}
            </motion.span>
            <span className="text-[10px] text-white/40 mt-0.5">/10</span>
          </div>
        )}
      </div>
      {label && (
        <span className="text-xs font-medium text-white/60 text-center">{label}</span>
      )}
    </div>
  );
}
