import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "#0B1220" }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6 mb-12"
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center animate-float"
          style={{
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            boxShadow: "0 0 40px rgba(59,130,246,0.4), 0 0 80px rgba(59,130,246,0.15)",
          }}
        >
          <span className="text-3xl">📈</span>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold gradient-text mb-1">TradeCoach</h1>
          <p className="text-white/40 text-sm">Loading your dashboard...</p>
        </div>
      </motion.div>

      {/* Shimmer cards */}
      <div className="w-full max-w-4xl px-6 space-y-4">
        {/* Top row */}
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="h-24 rounded-2xl animate-shimmer"
            />
          ))}
        </div>

        {/* Wide card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="h-48 rounded-2xl animate-shimmer"
        />

        {/* Two columns */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="h-32 rounded-2xl animate-shimmer"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="h-32 rounded-2xl animate-shimmer"
          />
        </div>
      </div>
    </div>
  );
}
