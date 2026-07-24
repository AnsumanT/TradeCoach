import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  Target,
} from "lucide-react";
import Badge from "../ui/Badge";
import GlassCard from "../ui/GlassCard";
import type { ImprovementItem, Priority, ImpactLevel } from "../../types/trade";

interface ImprovementPlanProps {
  items: ImprovementItem[];
}

const priorityVariant: Record<Priority, "danger" | "warning" | "info" | "neutral"> = {
  Critical: "danger",
  High: "warning",
  Medium: "info",
  Low: "neutral",
};

const impactVariant: Record<ImpactLevel, "success" | "info" | "neutral"> = {
  High: "success",
  Medium: "info",
  Low: "neutral",
};

export default function ImprovementPlan({ items }: ImprovementPlanProps) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggle = (i: number) =>
    setChecked((prev) => ({ ...prev, [i]: !prev[i] }));

  const expand = (i: number) =>
    setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));

  const doneCount = Object.values(checked).filter(Boolean).length;

  return (
    <GlassCard className="p-6 mb-6" delay={0.1}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/20">
            <Target className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <p className="section-label text-amber-400/70">Section 8</p>
            <h2 className="text-lg font-bold text-white">Personalized Improvement Plan</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-amber-400">{doneCount}</span>
          <span className="text-sm text-white/40">/ {items.length} done</span>
        </div>
      </div>

      {/* Progress bar for checklist */}
      <div className="w-full rounded-full overflow-hidden mb-6" style={{ height: 4, background: "rgba(255,255,255,0.07)" }}>
        <motion.div
          animate={{ width: `${(doneCount / items.length) * 100}%` }}
          transition={{ duration: 0.5 }}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #d97706, #fbbf24)",
            borderRadius: 999,
            boxShadow: "0 0 8px rgba(245,158,11,0.5)",
          }}
        />
      </div>

      {/* Checklist */}
      <div className="space-y-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
              checked[i]
                ? "border-white/6 bg-white/2 opacity-60"
                : "border-white/8 bg-white/3 hover:border-amber-500/25 hover:bg-amber-500/4"
            }`}
          >
            {/* Main row */}
            <div
              className="flex items-center gap-4 p-4 cursor-pointer"
              onClick={() => expand(i)}
            >
              {/* Checkbox */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(i);
                }}
                className="shrink-0 transition-transform active:scale-90"
              >
                {checked[i] ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Circle className="w-5 h-5 text-white/30 hover:text-amber-400 transition-colors" />
                )}
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p
                    className={`text-sm font-semibold ${checked[i] ? "line-through text-white/40" : "text-white"}`}
                  >
                    {item.title}
                  </p>
                  <Badge variant={priorityVariant[item.priority]} size="sm">
                    {item.priority}
                  </Badge>
                  <Badge variant={impactVariant[item.impact]} size="sm">
                    {item.impact} Impact
                  </Badge>
                </div>
              </div>

              <ChevronDown
                className={`w-4 h-4 text-white/40 shrink-0 transition-transform duration-200 ${expanded[i] ? "rotate-180" : ""}`}
              />
            </div>

            {/* Expanded content */}
            <AnimatePresence>
              {expanded[i] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="px-4 pb-4 pt-0">
                    <div className="ml-9 pl-4 border-l-2 border-amber-500/30">
                      <p className="section-label text-amber-400/70 mb-1">Why it matters</p>
                      <p className="text-sm text-white/65 leading-relaxed">{item.why}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
