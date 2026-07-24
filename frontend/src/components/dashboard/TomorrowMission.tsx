import { motion } from "framer-motion";
import { Flame, Rocket, Trophy, Zap } from "lucide-react";
import type { MissionItem } from "../../types/trade";

interface TomorrowMissionProps {
  missions: MissionItem[];
}

const MISSION_STYLES = [
  {
    icon: <Trophy className="w-6 h-6 text-blue-300" />,
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.22) 0%, rgba(37,99,235,0.12) 100%)",
    border: "rgba(59,130,246,0.3)",
    glow: "rgba(59,130,246,0.15)",
    accent: "text-blue-300",
    number: "01",
    numberColor: "rgba(59,130,246,0.3)",
  },
  {
    icon: <Rocket className="w-6 h-6 text-purple-300" />,
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.22) 0%, rgba(109,40,217,0.12) 100%)",
    border: "rgba(139,92,246,0.3)",
    glow: "rgba(139,92,246,0.15)",
    accent: "text-purple-300",
    number: "02",
    numberColor: "rgba(139,92,246,0.3)",
  },
  {
    icon: <Flame className="w-6 h-6 text-amber-300" />,
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.22) 0%, rgba(217,119,6,0.12) 100%)",
    border: "rgba(245,158,11,0.3)",
    glow: "rgba(245,158,11,0.15)",
    accent: "text-amber-300",
    number: "03",
    numberColor: "rgba(245,158,11,0.3)",
  },
];

export default function TomorrowMission({ missions }: TomorrowMissionProps) {
  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/20">
          <Zap className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <p className="section-label text-blue-400/70">Section 9</p>
          <h2 className="text-lg font-bold text-white">Tomorrow's Missions</h2>
        </div>
      </div>

      {/* Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {missions.slice(0, 3).map((mission, i) => {
          const style = MISSION_STYLES[i] ?? MISSION_STYLES[0];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl border p-6 cursor-default transition-all duration-300"
              style={{
                background: style.gradient,
                borderColor: style.border,
                boxShadow: `0 8px 32px ${style.glow}`,
              }}
            >
              {/* Background number */}
              <div
                className="absolute top-4 right-4 text-7xl font-black leading-none select-none"
                style={{ color: style.numberColor }}
              >
                {style.number}
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    background: `rgba(255,255,255,0.08)`,
                    border: `1px solid ${style.border}`,
                  }}
                >
                  {style.icon}
                </div>

                {/* Mission label */}
                <p className={`section-label ${style.accent} mb-2`}>
                  Mission {i + 1}
                </p>

                {/* Title */}
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {mission.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/60 leading-relaxed">
                  {mission.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
