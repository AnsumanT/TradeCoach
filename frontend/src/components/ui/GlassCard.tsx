import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: "blue" | "green" | "purple" | "red" | "amber" | "none";
  hover?: boolean;
  gradient?: boolean;
  delay?: number;
  id?: string;
}

const glowMap: Record<string, string> = {
  blue: "glow-blue",
  green: "glow-green",
  purple: "glow-purple",
  red: "glow-red",
  amber: "glow-amber",
  none: "",
};

export default function GlassCard({
  children,
  className = "",
  glow = "none",
  hover = true,
  gradient = false,
  delay = 0,
  id,
}: GlassCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      className={[
        gradient ? "gradient-border" : "glass",
        hover ? "glass-hover" : "",
        glowMap[glow],
        "rounded-2xl",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </motion.div>
  );
}
