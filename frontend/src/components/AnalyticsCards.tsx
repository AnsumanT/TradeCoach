import type { Analytics } from "../types/trade";
import StatCard from "./StatCard";

interface Props {
  analytics: Analytics;
}

export default function AnalyticsCards({ analytics }: Props) {
  return (
    <div className="mb-8 grid grid-cols-5 gap-6">
      <StatCard title="Total PnL" value={analytics.total_pnl} valueColor="text-green-400" />

      <StatCard title="Win Rate" value={`${analytics.win_rate}%`} />

      <StatCard title="Profit Factor" value={analytics.profit_factor} />

      <StatCard title="Avg Win" value={analytics.average_win} valueColor="text-green-400" />

      <StatCard title="Avg Loss" value={analytics.average_loss} valueColor="text-red-400" />
    </div>
  );
}
