import { motion } from "framer-motion";
import { Bot, Brain } from "lucide-react";
import GlassCard from "../ui/GlassCard";

interface TradingPsychologyProps {
  text: string;
}

// Regex-based highlight key trading psychology terms
const PSYCHOLOGY_KEYWORDS = [
  "revenge trading",
  "fear",
  "greed",
  "FOMO",
  "overtrading",
  "discipline",
  "patience",
  "emotional",
  "impulsive",
  "confident",
  "hesitation",
  "consistency",
  "mindset",
  "psychology",
  "anxiety",
  "focus",
];

function renderWithHighlights(text: string): React.ReactNode {
  if (!text) return <span className="text-white/40 italic">No psychology data available yet.</span>;

  // Clean markdown
  const clean = text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1');
  
  const regex = new RegExp(`(${PSYCHOLOGY_KEYWORDS.join('|')})`, 'gi');
  const parts = clean.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        const isKeyword = PSYCHOLOGY_KEYWORDS.some(
          (kw) => kw.toLowerCase() === part.toLowerCase()
        );
        if (isKeyword) {
          return (
            <span
              key={i}
              className="inline-flex highlight-text font-semibold text-blue-300"
            >
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function TradingPsychology({ text }: TradingPsychologyProps) {
  return (
    <GlassCard className="p-6 mb-6" delay={0.1}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/20">
          <Brain className="w-4 h-4 text-purple-400" />
        </div>
        <div>
          <p className="section-label text-purple-400/70">Section 5</p>
          <h2 className="text-lg font-bold text-white">Trading Psychology</h2>
        </div>
      </div>

      {/* Chat bubble UI */}
      <div className="space-y-4">
        {/* Typing indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3"
        >
          {/* Avatar */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, #6d28d9, #7c3aed)",
              boxShadow: "0 0 16px rgba(109,40,217,0.5)",
            }}
          >
            <Bot className="w-5 h-5 text-white" />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-purple-400">TradeCoach AI</span>
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(139,92,246,0.15)",
                color: "#a78bfa",
                border: "1px solid rgba(139,92,246,0.25)",
              }}
            >
              Psychology Analysis
            </span>
          </div>
        </motion.div>

        {/* Message bubble */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="ml-12"
        >
          <div className="chat-bubble p-5 rounded-2xl rounded-tl-none">
            <p className="text-sm text-white/80 leading-relaxed">
              {renderWithHighlights(text)}
            </p>
          </div>
        </motion.div>
      </div>
    </GlassCard>
  );
}
