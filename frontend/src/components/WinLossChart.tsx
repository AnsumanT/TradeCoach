import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart2 } from "lucide-react";
import GlassCard from "./ui/GlassCard";

type Props = {
  data: { wins: number; losses: number };
};

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const isWin = label === "Wins";
    return (
      <div
        className="px-3 py-2 rounded-xl border text-sm"
        style={{
          background: "rgba(17,24,39,0.95)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
        }}
      >
        <p className={`font-bold ${isWin ? "text-emerald-400" : "text-red-400"}`}>
          {label}: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
}

export default function WinLossChart({ data }: Props) {
  const total = data.wins + data.losses;
  const winRate = total > 0 ? ((data.wins / total) * 100).toFixed(1) : "0.0";

  const chartData = [
    { name: "Wins", value: data.wins },
    { name: "Losses", value: data.losses },
  ];

  return (
    <GlassCard className="p-5" hover={false}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-500/15">
            <BarChart2 className="w-4 h-4 text-blue-400" />
          </div>
          <h2 className="text-base font-semibold text-white">Win / Loss</h2>
        </div>
        <div
          className="text-xs font-bold px-2.5 py-1 rounded-lg"
          style={{
            background: "rgba(16,185,129,0.12)",
            color: "#34d399",
            border: "1px solid rgba(16,185,129,0.22)",
          }}
        >
          {winRate}% Win Rate
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 10, right: 4, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="winGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#059669" stopOpacity={0.7} />
            </linearGradient>
            <linearGradient id="lossGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#dc2626" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke="rgba(255,255,255,0.04)"
            strokeDasharray="4 4"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke="transparent"
            tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="transparent"
            tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
          <Bar dataKey="value" radius={[10, 10, 4, 4]} maxBarSize={100}>
            <Cell fill="url(#winGrad)" />
            <Cell fill="url(#lossGrad)" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
