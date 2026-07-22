export default function Header() {
  return (
    <div className="mb-10 flex items-center justify-between">
      <div>
        <h1 className="text-5xl font-bold text-blue-400">📈 TradeCoach</h1>

        <p className="mt-2 text-slate-400">AI Powered Trading Performance Coach</p>
      </div>

      <div className="text-right">
        <div className="font-semibold text-green-400">🟢 Connected</div>

        <div className="text-sm text-slate-400">Gemini AI • Delta Exchange</div>
      </div>
    </div>
  );
}
