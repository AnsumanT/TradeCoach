import { motion } from "framer-motion";
import {
  BarChart2,
  DollarSign,
  Percent,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import CountUp from "../ui/CountUp";
import type { Analytics } from "../../types/trade";

interface MetricsDashboardProps {
  analytics: Analytics;
}

interface MetricDef {
  key: string;
  label: string;
  value: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  isPositiveGood?: boolean;
}

export default function MetricsDashboard({ analytics }: MetricsDashboardProps) {
  const metrics: MetricDef[] = [
    {
      key: "win_rate",
      label: "Win Rate",
      value: analytics.win_rate,
      decimals: 1,
      suffix: "%",
      icon: <Percent className="w-4 h-4" />,
      colorClass: analytics.win_rate >= 50 ? "text-emerald-400" : "text-amber-400",
      bgClass: analytics.win_rate >= 50 ? "bg-emerald-500/10" : "bg-amber-500/10",
      borderClass: analytics.win_rate >= 50 ? "border-emerald-500/20" : "border-amber-500/20",
      isPositiveGood: true,
    },
    {
      key: "profit_factor",
      label: "Profit Factor",
      value: analytics.profit_factor,
      decimals: 2,
      icon: <BarChart2 className="w-4 h-4" />,
      colorClass: analytics.profit_factor >= 1.5 ? "text-blue-400" : analytics.profit_factor >= 1 ? "text-amber-400" : "text-red-400",
      bgClass: analytics.profit_factor >= 1.5 ? "bg-blue-500/10" : "bg-amber-500/10",
      borderClass: analytics.profit_factor >= 1.5 ? "border-blue-500/20" : "border-amber-500/20",
      isPositiveGood: true,
    },
    {
      key: "total_pnl",
      label: "Total PnL",
      value: analytics.total_pnl,
      decimals: 2,
      icon: <DollarSign className="w-4 h-4" />,
      colorClass: analytics.total_pnl >= 0 ? "text-emerald-400" : "text-red-400",
      bgClass: analytics.total_pnl >= 0 ? "bg-emerald-500/10" : "bg-red-500/10",
      borderClass: analytics.total_pnl >= 0 ? "border-emerald-500/20" : "border-red-500/20",
      isPositiveGood: true,
    },
    {
      key: "average_win",
      label: "Avg Win",
      value: analytics.average_win,
      decimals: 2,
      icon: <TrendingUp className="w-4 h-4" />,
      colorClass: "text-emerald-400",
      bgClass: "bg-emerald-500/10",
      borderClass: "border-emerald-500/20",
    },
    {
      key: "average_loss",
      label: "Avg Loss",
      value: analytics.average_loss,
      decimals: 2,
      icon: <TrendingDown className="w-4 h-4" />,
      colorClass: "text-red-400",
      bgClass: "bg-red-500/10",
      borderClass: "border-red-500/20",
    },
    {
      key: "total_trades",
      label: "Total Trades",
      value: analytics.total_trades,
      decimals: 0,
      icon: <BarChart2 className="w-4 h-4" />,
      colorClass: "text-purple-400",
      bgClass: "bg-purple-500/10",
      borderClass: "border-purple-500/20",
    },
  ];

  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/20">
          <BarChart2 className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <p className="section-label text-cyan-400/70">Section 3</p>
          <h2 className="text-lg font-bold text-white">Trading Metrics Dashboard</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.45 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`glass rounded-2xl p-4 border ${m.borderClass} glass-hover cursor-default`}
          >
            <div className={`inline-flex p-2 rounded-lg ${m.bgClass} ${m.colorClass} mb-3`}>
              {m.icon}
            </div>
            <p className="text-[11px] text-white/50 font-medium mb-1">{m.label}</p>
            <p className={`text-xl font-bold ${m.colorClass}`}>
              {m.prefix}
              <CountUp
                end={Math.abs(m.value)}
                decimals={m.decimals}
                suffix={m.suffix}
              />
            </p>
            {/* Trend indicator */}
            <div className="mt-2 flex items-center gap-1">
              {m.isPositiveGood !== undefined && (
                <>
                  {m.value > 0 ? (
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-400" />
                  )}
                  <span className={`text-[10px] font-medium ${m.value > 0 ? "text-emerald-400/70" : "text-red-400/70"}`}>
                    {m.value > 0 ? "Positive" : "Negative"}
                  </span>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
