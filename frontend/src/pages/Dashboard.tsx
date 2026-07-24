import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../api/api";
import { parseAIReport } from "../utils/parseAIReport";
import type { AICoachReport, Analytics, ChartData } from "../types/trade";

// Components
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import GenerateButton from "../components/GenerateButton";
import EquityCurve from "../components/EquityCurve";
import WinLossChart from "../components/WinLossChart";

// Dashboard sections
import HeroCard from "../components/dashboard/HeroCard";
import ExecutiveSummary from "../components/dashboard/ExecutiveSummary";
import ReportCard from "../components/dashboard/ReportCard";
import MetricsDashboard from "../components/dashboard/MetricsDashboard";
import LastTradeReview from "../components/dashboard/LastTradeReview";
import TradingPsychology from "../components/dashboard/TradingPsychology";
import Strengths from "../components/dashboard/Strengths";
import Weaknesses from "../components/dashboard/Weaknesses";
import ImprovementPlan from "../components/dashboard/ImprovementPlan";
import TomorrowMission from "../components/dashboard/TomorrowMission";

export default function Dashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [chartData, setChartData] = useState<ChartData>({
    equityCurve: [],
    winLoss: { wins: 0, losses: 0 },
  });
  const [aiReport, setAiReport] = useState<AICoachReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reportRef = useRef<HTMLDivElement>(null);

  // Initial data fetch
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [analyticsRes, chartRes] = await Promise.all([
          api.get("/trades/analytics"),
          api.get("/trades/charts"),
        ]);
        setAnalytics(analyticsRes.data);
        setChartData(chartRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  // Generate AI report
  const generateAIReport = async () => {
    if (!analytics) return;
    try {
      setAiLoading(true);
      setAiReport(null);
      const res = await api.post("/trades/ai-coach");
      const markdown: string = res.data.ai_feedback;
      const parsed = parseAIReport(markdown, analytics);
      setAiReport(parsed);

      // Scroll to report after short delay
      setTimeout(() => {
        reportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  // ── Loading state ───────────────────────────────────────────────────────────
  if (loading) return <LoadingScreen />;

  // ── Error state ─────────────────────────────────────────────────────────────
  if (error || !analytics) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0B1220" }}
      >
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-red-400 font-semibold text-lg">{error ?? "No data available"}</p>
          <p className="text-white/40 text-sm mt-2">Make sure the backend is running on port 8000</p>
        </div>
      </div>
    );
  }

  // ── Main render ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: "#0B1220" }}>
      <Header />

      <main className="max-w-7xl mx-auto px-6 pb-16">
        {/* ── Analytics & Charts section ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Metrics */}
          <MetricsDashboard analytics={analytics} />

          {/* Charts row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
            <EquityCurve data={chartData.equityCurve} />
            <WinLossChart data={chartData.winLoss} />
          </div>
        </motion.div>

        {/* ── Generate Button ─────────────────────────────────────────────── */}
        <GenerateButton onClick={generateAIReport} loading={aiLoading} />

        {/* ── AI Loading placeholder ──────────────────────────────────────── */}
        <AnimatePresence>
          {aiLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 mt-4"
            >
              {[180, 120, 280, 160].map((h, i) => (
                <div
                  key={i}
                  className="animate-shimmer rounded-2xl"
                  style={{ height: h }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── AI Report Dashboard ─────────────────────────────────────────── */}
        <AnimatePresence>
          {aiReport && !aiLoading && (
            <motion.div
              ref={reportRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Section: Hero */}
              <HeroCard summary={aiReport.executiveSummary} analytics={analytics} />

              {/* Section: Executive Summary */}
              <ExecutiveSummary summary={aiReport.executiveSummary} />

              {/* Section: Report Card */}
              <ReportCard scores={aiReport.reportCard} />

              {/* Section: Last Trade Review */}
              <LastTradeReview timeline={aiReport.lastTradeReview} />

              {/* Section: Psychology */}
              <TradingPsychology text={aiReport.psychology || aiReport.recentPattern} />

              {/* Section: Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div
                  className="glass rounded-2xl p-6"
                  style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <Strengths items={aiReport.strengths} />
                </div>
                <div
                  className="glass rounded-2xl p-6"
                  style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <Weaknesses items={aiReport.weaknesses} />
                </div>
              </div>

              {/* Section: Improvement Plan */}
              <ImprovementPlan items={aiReport.improvementPlan} />

              {/* Section: Tomorrow's Mission */}
              <TomorrowMission missions={aiReport.tomorrowMissions} />

              {/* Bottom spacer / finish line */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center mt-8 pb-4"
              >
                <div
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium"
                  style={{
                    background: "rgba(59,130,246,0.08)",
                    border: "1px solid rgba(59,130,246,0.15)",
                    color: "rgba(148,163,184,0.7)",
                  }}
                >
                  <span>🧠</span>
                  <span>Analysis powered by Gemini AI · TradeCoach</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
