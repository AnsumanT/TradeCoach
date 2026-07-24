import { motion } from "framer-motion";
import {
  Activity,
  Brain,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";
import Badge from "../ui/Badge";
import CountUp from "../ui/CountUp";
import ProgressBar from "../ui/ProgressBar";
import type { Analytics, ExecutiveSummaryData, Grade, RiskLevel } from "../../types/trade";

interface HeroCardProps {
  summary: ExecutiveSummaryData;
  analytics: Analytics;
}

const gradeColors: Record<string, { bg: string; text: string; glow: string }> = {
  "A+": { bg: "from-emerald-500 to-green-400", text: "text-emerald-400", glow: "rgba(16,185,129,0.4)" },
  A: { bg: "from-emerald-500 to-teal-400", text: "text-emerald-400", glow: "rgba(16,185,129,0.35)" },
  "A-": { bg: "from-teal-500 to-cyan-400", text: "text-teal-400", glow: "rgba(20,184,166,0.35)" },
  "B+": { bg: "from-blue-500 to-cyan-400", text: "text-blue-400", glow: "rgba(59,130,246,0.35)" },
  B: { bg: "from-blue-600 to-blue-400", text: "text-blue-400", glow: "rgba(59,130,246,0.35)" },
  "B-": { bg: "from-blue-700 to-indigo-400", text: "text-indigo-400", glow: "rgba(99,102,241,0.3)" },
  "C+": { bg: "from-indigo-600 to-purple-400", text: "text-purple-400", glow: "rgba(139,92,246,0.3)" },
  C: { bg: "from-purple-600 to-violet-400", text: "text-purple-400", glow: "rgba(139,92,246,0.3)" },
  "C-": { bg: "from-amber-600 to-yellow-400", text: "text-amber-400", glow: "rgba(245,158,11,0.3)" },
  D: { bg: "from-orange-600 to-amber-400", text: "text-amber-400", glow: "rgba(245,158,11,0.25)" },
  F: { bg: "from-red-600 to-rose-400", text: "text-red-400", glow: "rgba(239,68,68,0.3)" },
};

const riskBadgeVariant: Record<RiskLevel, "success" | "info" | "warning" | "danger" | "purple"> = {
  "Very Low": "success",
  Low: "success",
  Moderate: "info",
  High: "warning",
  "Very High": "danger",
};

function getRiskBadge(risk: RiskLevel) {
  return riskBadgeVariant[risk] ?? "info";
}

export default function HeroCard({ summary, analytics }: HeroCardProps) {
  const grade = summary.overallGrade as Grade;
  const gradeStyle = gradeColors[grade] ?? gradeColors["C"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden rounded-3xl mb-6"
      style={{
        background:
          "linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(15,23,42,0.98) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
      }}
    >
      {/* Background decorative elements */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-5"
        style={{
          background: `radial-gradient(circle, ${gradeStyle.glow.replace("0.4", "1")} 0%, transparent 70%)`,
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,1) 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <div className="relative z-10 p-8">
        <div className="flex items-start justify-between gap-8">
          {/* Left: Info */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/20">
                <Brain className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="section-label text-blue-400/70">TradeCoach AI</p>
                <h1 className="text-2xl font-bold gradient-text">
                  Performance Analysis Report
                </h1>
              </div>
            </div>

            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Badge variant={getRiskBadge(summary.riskLevel)} dot size="md">
                {summary.riskLevel} Risk
              </Badge>
              <Badge variant="neutral" size="md">
                {summary.traderType}
              </Badge>
              <Badge variant="info" size="md">
                {analytics.total_trades} Trades Analyzed
              </Badge>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-3 rounded-xl bg-white/4 border border-white/5">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="section-label text-white/50">Win Rate</span>
                </div>
                <p className="text-xl font-bold text-emerald-400">
                  <CountUp end={analytics.win_rate} decimals={1} suffix="%" />
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/4 border border-white/5">
                <div className="flex items-center gap-1.5 mb-1">
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                  <span className="section-label text-white/50">Profit Factor</span>
                </div>
                <p className="text-xl font-bold text-blue-400">
                  <CountUp end={analytics.profit_factor} decimals={2} />
                </p>
              </div>

              <div
                className={`p-3 rounded-xl bg-white/4 border border-white/5 ${analytics.total_pnl >= 0 ? "" : ""}`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Zap className="w-3.5 h-3.5 text-purple-400" />
                  <span className="section-label text-white/50">Total PnL</span>
                </div>
                <p
                  className={`text-xl font-bold ${analytics.total_pnl >= 0 ? "text-emerald-400" : "text-red-400"}`}
                >
                  {analytics.total_pnl >= 0 ? "+" : ""}
                  <CountUp end={analytics.total_pnl} decimals={2} />
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/4 border border-white/5">
                <div className="flex items-center gap-1.5 mb-1">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span className="section-label text-white/50">Win / Loss</span>
                </div>
                <p className="text-xl font-bold text-white">
                  {analytics.winning_trades}
                  <span className="text-white/40">/</span>
                  {analytics.losing_trades}
                </p>
              </div>
            </div>

            {/* Confidence score */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60 font-medium">AI Confidence Score</span>
                <span className="text-sm font-bold text-blue-400">{summary.confidenceScore}%</span>
              </div>
              <ProgressBar
                value={summary.confidenceScore}
                color="blue"
                height={8}
                delay={0.4}
              />
            </div>
          </div>

          {/* Right: Grade */}
          <div className="flex flex-col items-center gap-3 shrink-0">
            <p className="section-label text-white/40">Overall Grade</p>
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 200 }}
              className={`relative w-28 h-28 rounded-2xl bg-gradient-to-br ${gradeStyle.bg} flex items-center justify-center`}
              style={{ boxShadow: `0 0 40px ${gradeStyle.glow}, 0 0 80px ${gradeStyle.glow.replace("0.4", "0.15")}` }}
            >
              <span className="text-5xl font-black text-white tracking-tight">
                {grade}
              </span>
            </motion.div>
            <div className="text-center">
              <p className="text-xs text-white/40">Performance</p>
              <p className="text-sm font-semibold text-white/80">
                {grade.startsWith("A")
                  ? "Excellent"
                  : grade.startsWith("B")
                    ? "Good"
                    : grade.startsWith("C")
                      ? "Average"
                      : grade === "D"
                        ? "Below Average"
                        : "Needs Work"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
