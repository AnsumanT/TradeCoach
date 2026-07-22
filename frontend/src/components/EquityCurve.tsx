import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  data: {
    trade: number;
    equity: number;
  }[];
};

export default function EquityCurve({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid stroke="#334155" />
        <XAxis dataKey="trade" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip />
        <Line type="monotone" dataKey="equity" stroke="#22c55e" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
