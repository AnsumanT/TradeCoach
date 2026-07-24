import { motion } from "framer-motion";
import { AlertTriangle, XCircle } from "lucide-react";
import type { WeaknessItem } from "../../types/trade";

interface WeaknessesProps {
  items: WeaknessItem[];
}

const WEAKNESS_ICONS = ["⚠️", "🎭", "😤", "💸", "🔄", "❌", "😰", "📉"];

export default function Weaknesses({ items }: WeaknessesProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-red-500/15 border border-red-500/20">
          <AlertTriangle className="w-4 h-4 text-red-400" />
        </div>
        <div>
          <p className="section-label text-red-400/70">Section 7</p>
          <h2 className="text-lg font-bold text-white">Weaknesses</h2>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            whileHover={{ x: -4 }}
            className="flex items-start gap-4 p-4 rounded-2xl border cursor-default transition-all duration-200"
            style={{
              background: "rgba(239,68,68,0.06)",
              borderColor: "rgba(239,68,68,0.18)",
            }}
          >
            <div className="shrink-0">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={{
                  background: "rgba(239,68,68,0.12)",
                  border: "1px solid rgba(239,68,68,0.22)",
                }}
              >
                {WEAKNESS_ICONS[i % WEAKNESS_ICONS.length]}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-400 mb-0.5">
                    {item.title}
                  </p>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
