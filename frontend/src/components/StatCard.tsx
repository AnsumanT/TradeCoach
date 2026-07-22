interface StatCardProps {
  title: string;
  value: string | number;
  valueColor?: string;
}

export default function StatCard({ title, value, valueColor = "text-white" }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:scale-105 hover:border-blue-500">
      <p className="text-sm text-slate-400">{title}</p>

      <h2 className={`mt-3 text-3xl font-bold ${valueColor}`}>{value}</h2>
    </div>
  );
}
