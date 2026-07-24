import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  LogIn,
  Lightbulb,
  Search,
} from "lucide-react";
import GlassCard from "../ui/GlassCard";
import type { TimelinePoint } from "../../types/trade";

interface LastTradeReviewProps {
  timeline: TimelinePoint[];
}

const typeConfig: Record<
  TimelinePoint["type"],
  {
    icon: React.ReactNode;
    label: string;
    dotColor: string;
    lineColor: string;
    bgColor: string;
    borderColor: string;
    textColor: string;
  }
> = {
  entry: {
    icon: <LogIn className="w-4 h-4" />,
    label: "Entry",
    dotColor: "bg-blue-500",
    lineColor: "border-blue-500/40",
    bgColor: "bg-blue-500/8",
    borderColor: "border-blue-500/20",
    textColor: "text-blue-400",
  },
  analysis: {
    icon: <Search className="w-4 h-4" />,
    label: "Analysis",
    dotColor: "bg-purple-500",
    lineColor: "border-purple-500/40",
    bgColor: "bg-purple-500/8",
    borderColor: "border-purple-500/20",
    textColor: "text-purple-400",
  },
  mistake: {
    icon: <AlertTriangle className="w-4 h-4" />,
    label: "Mistake",
    dotColor: "bg-red-500",
    lineColor: "border-red-500/40",
    bgColor: "bg-red-500/8",
    borderColor: "border-red-500/20",
    textColor: "text-red-400",
  },
  positive: {
    icon: <CheckCircle className="w-4 h-4" />,
    label: "Positive",
    dotColor: "bg-emerald-500",
    lineColor: "border-emerald-500/40",
    bgColor: "bg-emerald-500/8",
    borderColor: "border-emerald-500/20",
    textColor: "text-emerald-400",
  },
  recommendation: {
    icon: <ArrowRight className="w-4 h-4" />,
    label: "Action",
    dotColor: "bg-amber-500",
    lineColor: "border-amber-500/40",
    bgColor: "bg-amber-500/8",
    borderColor: "border-amber-500/20",
    textColor: "text-amber-400",
  },
};

export default function LastTradeReview({ timeline }: LastTradeReviewProps) {
  return (
    <GlassCard className="p-6 mb-6" delay={0.1}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/20">
          <Lightbulb className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <p className="section-label text-blue-400/70">Section 4</p>
          <h2 className="text-lg font-bold text-white">Last Trade Review</h2>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-0">
        {timeline.map((point, i) => {
          const cfg = typeConfig[point.type];
          const isLast = i === timeline.length - 1;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="flex gap-4"
            >
              {/* Left: dot + connector */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full ${cfg.dotColor} flex items-center justify-center shrink-0 z-10`}
                  style={{ boxShadow: `0 0 12px ${cfg.dotColor.includes("blue") ? "rgba(59,130,246,0.4)" : cfg.dotColor.includes("red") ? "rgba(239,68,68,0.4)" : cfg.dotColor.includes("emerald") ? "rgba(16,185,129,0.4)" : cfg.dotColor.includes("amber") ? "rgba(245,158,11,0.4)" : "rgba(139,92,246,0.4)"}` }}
                >
                  <span className="text-white">{cfg.icon}</span>
                </div>
                {!isLast && (
                  <div
                    className="w-0.5 flex-1 my-1"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.03))",
                      minHeight: 24,
                    }}
                  />
                )}
              </div>

              {/* Right: card */}
              <div className={`flex-1 mb-4 p-4 rounded-xl border ${cfg.borderColor} ${cfg.bgColor}`}>
                <p className={`section-label ${cfg.textColor} mb-1`}>{cfg.label}</p>
                <p className="text-sm text-white/80 leading-relaxed">{point.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}
