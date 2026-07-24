import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Quote } from "lucide-react";
import Badge from "../ui/Badge";
import GlassCard from "../ui/GlassCard";
import type { ExecutiveSummaryData, RiskLevel } from "../../types/trade";

interface ExecutiveSummaryProps {
  summary: ExecutiveSummaryData;
}

function getRiskVariant(risk: RiskLevel): "success" | "info" | "warning" | "danger" {
  const map: Record<RiskLevel, "success" | "info" | "warning" | "danger"> = {
    "Very Low": "success",
    Low: "success",
    Moderate: "info",
    High: "warning",
    "Very High": "danger",
  };
  return map[risk] ?? "info";
}

export default function ExecutiveSummary({ summary }: ExecutiveSummaryProps) {
  return (
    <GlassCard className="p-6 mb-6" delay={0.1}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/15 border border-indigo-500/20">
            <Quote className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <p className="section-label text-indigo-400/70">Section 1</p>
            <h2 className="text-lg font-bold text-white">Executive Summary</h2>
          </div>
        </div>
        <Badge variant={getRiskVariant(summary.riskLevel)} dot>
          {summary.riskLevel} Risk
        </Badge>
      </div>

      {/* Summary Text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-base text-white/75 leading-relaxed mb-5"
      >
        {summary.text}
      </motion.p>

      {/* Callout Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strength */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-start gap-3 p-4 rounded-xl border"
          style={{
            background: "rgba(16,185,129,0.07)",
            borderColor: "rgba(16,185,129,0.2)",
          }}
        >
          <div className="p-1.5 rounded-lg bg-emerald-500/15 shrink-0 mt-0.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="section-label text-emerald-400/70 mb-1">Biggest Strength</p>
            <p className="text-sm font-semibold text-emerald-400">{summary.biggestStrength}</p>
          </div>
        </motion.div>

        {/* Weakness */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-start gap-3 p-4 rounded-xl border"
          style={{
            background: "rgba(239,68,68,0.07)",
            borderColor: "rgba(239,68,68,0.2)",
          }}
        >
          <div className="p-1.5 rounded-lg bg-red-500/15 shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <p className="section-label text-red-400/70 mb-1">Biggest Weakness</p>
            <p className="text-sm font-semibold text-red-400">{summary.biggestWeakness}</p>
          </div>
        </motion.div>
      </div>
    </GlassCard>
  );
}
