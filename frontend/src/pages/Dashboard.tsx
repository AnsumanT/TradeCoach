import { useEffect, useState } from "react";
import { api } from "../api/api";
import type { CoachResponse } from "../types/trade";

import AICoach from "../components/AICoach";
import AnalyticsCards from "../components/AnalyticsCards";
import EquityCurve from "../components/EquityCurve";
import Header from "../components/Header";
import WinLossChart from "../components/WinLossChart";

export default function Dashboard() {
  const [data, setData] = useState<CoachResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);

  const [chartData, setChartData] = useState({
    equityCurve: [] as { trade: number; equity: number }[],
    winLoss: {
      wins: 0,
      losses: 0,
    },
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // Fetch analytics
        const analyticsRes = await api.get("/trades/analytics");

        setData({
          analytics: analyticsRes.data,
          ai_feedback: "🤖 Click **Analyze Latest Trades** to generate your AI coaching report.",
        });

        // Fetch chart data
        const chartRes = await api.get("/trades/charts");
        setChartData(chartRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const generateAIReport = async () => {
    try {
      setAiLoading(true);

      const res = await api.post("/trades/ai-coach");

      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-2xl font-semibold">Loading TradeCoach...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-red-400">
        Failed to load dashboard data.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl p-8">
        <Header />

        <AnalyticsCards analytics={data.analytics} />

        <div className="mb-8 grid grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-4 text-xl font-semibold">📈 Equity Curve</h2>

            <EquityCurve data={chartData.equityCurve} />
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-4 text-xl font-semibold">📊 Win / Loss</h2>

            <WinLossChart data={chartData.winLoss} />
          </div>
        </div>

        <div className="mb-4 flex justify-end">
          <button
            onClick={generateAIReport}
            disabled={aiLoading}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-600"
          >
            {aiLoading ? "Generating AI Report..." : "🧠 Analyze Latest Trades"}
          </button>
        </div>

        <AICoach feedback={data.ai_feedback} />
      </div>
    </div>
  );
}
