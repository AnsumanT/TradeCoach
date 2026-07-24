import { motion } from "framer-motion";
import { Brain, Loader2, Sparkles } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
  loading: boolean;
}

export default function GenerateButton({ onClick, loading }: GenerateButtonProps) {
  return (
    <div className="flex flex-col items-center gap-3 my-8">
      <motion.button
        onClick={onClick}
        disabled={loading}
        whileHover={loading ? {} : { scale: 1.03 }}
        whileTap={loading ? {} : { scale: 0.97 }}
        className="relative overflow-hidden flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-white disabled:cursor-not-allowed disabled:opacity-70 transition-all duration-200"
        style={{
          background: loading
            ? "rgba(30,41,59,0.8)"
            : "linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #2563eb 100%)",
          backgroundSize: "200% 100%",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: loading
            ? "none"
            : "0 0 30px rgba(99,102,241,0.35), 0 0 60px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        {/* Animated gradient overlay */}
        {!loading && (
          <motion.div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
            }}
          />
        )}

        {/* Shimmer on loading */}
        {loading && (
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        )}

        <span className="relative z-10 flex items-center gap-2.5">
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating AI Report...</span>
            </>
          ) : (
            <>
              <Brain className="w-5 h-5" />
              <span>Analyze Latest Trades</span>
              <Sparkles className="w-4 h-4 opacity-70" />
            </>
          )}
        </span>
      </motion.button>

      {!loading && (
        <p className="text-xs text-white/30">
          Powered by Gemini AI · Analyzes your last 10 trades
        </p>
      )}
    </div>
  );
}
