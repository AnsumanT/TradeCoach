import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp } from "lucide-react";
import GlassCard from "./ui/GlassCard";

type Props = {
  data: { trade: number; equity: number }[];
};

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div
        className="px-3 py-2 rounded-xl border text-sm"
        style={{
          background: "rgba(17,24,39,0.95)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
        }}
      >
        <p className="text-white/50 text-xs mb-1">Trade #{label}</p>
        <p className={`font-bold ${value >= 0 ? "text-emerald-400" : "text-red-400"}`}>
          {value >= 0 ? "+" : ""}
          {Number(value).toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
}

export default function EquityCurve({ data }: Props) {
  const isPositive = data.length > 0 && data[data.length - 1]?.equity >= 0;

  return (
    <GlassCard className="p-5" hover={false}>
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-emerald-500/15">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
        </div>
        <h2 className="text-base font-semibold text-white">Equity Curve</h2>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 4, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={isPositive ? "#10b981" : "#ef4444"}
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor={isPositive ? "#10b981" : "#ef4444"}
                stopOpacity={0.02}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke="rgba(255,255,255,0.04)"
            strokeDasharray="4 4"
            vertical={false}
          />
          <XAxis
            dataKey="trade"
            stroke="transparent"
            tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="transparent"
            tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="equity"
            stroke={isPositive ? "#10b981" : "#ef4444"}
            strokeWidth={2.5}
            fill="url(#equityGradient)"
            dot={false}
            activeDot={{ r: 5, fill: isPositive ? "#10b981" : "#ef4444", stroke: "none" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
