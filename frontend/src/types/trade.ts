export interface Analytics {
  total_trades: number;
  winning_trades: number;
  losing_trades: number;
  win_rate: number;
  total_pnl: number;
  average_win: number;
  average_loss: number;
  profit_factor: number;
}

export interface CoachResponse {
  analytics: Analytics;
  ai_feedback: string;
}

// ─── Structured AI Report Types ──────────────────────────────────────────────

export type Grade = "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D" | "F";
export type RiskLevel = "Very Low" | "Low" | "Moderate" | "High" | "Very High";
export type Priority = "Critical" | "High" | "Medium" | "Low";
export type ImpactLevel = "High" | "Medium" | "Low";

export interface ReportCardScore {
  category: string;
  score: number; // 0–10
  description: string;
  color: string; // tailwind color class prefix e.g. "blue"
  icon: string;
}

export interface TimelinePoint {
  type: "entry" | "analysis" | "mistake" | "positive" | "recommendation";
  label: string;
  text: string;
}

export interface StrengthItem {
  title: string;
  description: string;
}

export interface WeaknessItem {
  title: string;
  description: string;
}

export interface ImprovementItem {
  title: string;
  why: string;
  priority: Priority;
  impact: ImpactLevel;
}

export interface MissionItem {
  title: string;
  description: string;
}

export interface ExecutiveSummaryData {
  text: string;
  biggestStrength: string;
  biggestWeakness: string;
  overallGrade: Grade;
  confidenceScore: number; // 0–100
  riskLevel: RiskLevel;
  traderType: string;
}

export interface AICoachReport {
  executiveSummary: ExecutiveSummaryData;
  reportCard: ReportCardScore[];
  lastTradeReview: TimelinePoint[];
  recentPattern: string;
  psychology: string;
  riskManagement: string;
  strengths: StrengthItem[];
  weaknesses: WeaknessItem[];
  improvementPlan: ImprovementItem[];
  tomorrowMissions: MissionItem[];
}

export interface ChartData {
  equityCurve: { trade: number; equity: number }[];
  winLoss: { wins: number; losses: number };
}