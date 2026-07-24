import { motion } from "framer-motion";
import { Award } from "lucide-react";
import CircularProgress from "../ui/CircularProgress";
import ProgressBar from "../ui/ProgressBar";
import type { ReportCardScore } from "../../types/trade";

interface ReportCardProps {
  scores: ReportCardScore[];
}

const colorMap: Record<string, { bar: "blue" | "green" | "purple" | "amber" | "cyan"; label: string }> = {
  blue: { bar: "blue", label: "text-blue-400" },
  green: { bar: "green", label: "text-emerald-400" },
  purple: { bar: "purple", label: "text-purple-400" },
  orange: { bar: "amber", label: "text-amber-400" },
  cyan: { bar: "cyan", label: "text-cyan-400" },
};

function getScoreLabel(score: number): string {
  if (score >= 9) return "Exceptional";
  if (score >= 7.5) return "Strong";
  if (score >= 6) return "Good";
  if (score >= 4.5) return "Average";
  if (score >= 3) return "Below Avg";
  return "Needs Work";
}

export default function ReportCard({ scores }: ReportCardProps) {
  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/20">
          <Award className="w-4 h-4 text-purple-400" />
        </div>
        <div>
          <p className="section-label text-purple-400/70">Section 2</p>
          <h2 className="text-lg font-bold text-white">Trader Report Card</h2>
        </div>
      </div>

      {/* Score Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {scores.map((item, i) => {
          const cm = colorMap[item.color] ?? colorMap.blue;
          return (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass rounded-2xl p-5 flex flex-col items-center gap-3 text-center cursor-default glass-hover"
            >
              {/* Icon */}
              <span className="text-2xl">{item.icon}</span>

              {/* Circle */}
              <CircularProgress
                score={item.score}
                color={item.color}
                size={80}
                strokeWidth={6}
                delay={i * 0.12}
              />

              {/* Category */}
              <div>
                <p className="text-sm font-semibold text-white">{item.category}</p>
                <p className={`text-xs font-medium ${cm.label}`}>
                  {getScoreLabel(item.score)}
                </p>
              </div>

              {/* Mini bar */}
              <div className="w-full">
                <ProgressBar
                  value={(item.score / 10) * 100}
                  color={cm.bar}
                  height={4}
                  delay={i * 0.1 + 0.3}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
