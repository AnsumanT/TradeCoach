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

type Props = {
  data: {
    wins: number;
    losses: number;
  };
};

export default function WinLossChart({ data }: Props) {
  const chartData = [
    {
      name: "Wins",
      value: data.wins,
    },
    {
      name: "Losses",
      value: data.losses,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <CartesianGrid stroke="#334155" />
        <XAxis dataKey="name" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip />

        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
          <Cell fill="#22c55e" />
          <Cell fill="#ef4444" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
