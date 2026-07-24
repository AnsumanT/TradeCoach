import type {
  AICoachReport,
  Analytics,
  ExecutiveSummaryData,
  Grade,
  ImpactLevel,
  ImprovementItem,
  MissionItem,
  Priority,
  ReportCardScore,
  RiskLevel,
  StrengthItem,
  TimelinePoint,
  WeaknessItem,
} from "../types/trade";

// ─── Grade Derivation ─────────────────────────────────────────────────────────

function deriveGrade(analytics: Analytics): Grade {
  const { win_rate, profit_factor } = analytics;
  if (win_rate >= 68 && profit_factor >= 2.5) return "A+";
  if (win_rate >= 62 && profit_factor >= 2.0) return "A";
  if (win_rate >= 57 && profit_factor >= 1.7) return "A-";
  if (win_rate >= 55 && profit_factor >= 1.5) return "B+";
  if (win_rate >= 50 && profit_factor >= 1.3) return "B";
  if (win_rate >= 47 && profit_factor >= 1.1) return "B-";
  if (win_rate >= 44 && profit_factor >= 1.0) return "C+";
  if (win_rate >= 40 && profit_factor >= 0.85) return "C";
  if (win_rate >= 36 && profit_factor >= 0.7) return "C-";
  if (win_rate >= 30 || profit_factor >= 0.6) return "D";
  return "F";
}

function deriveConfidence(analytics: Analytics): number {
  const pf = Math.min(analytics.profit_factor, 3);
  const wr = analytics.win_rate / 100;
  return Math.round((pf / 3) * 50 + wr * 50);
}

function deriveRiskLevel(analytics: Analytics): RiskLevel {
  const { average_win, average_loss } = analytics;
  if (average_loss === 0) return "Very Low";
  const ratio = Math.abs(average_loss) / Math.abs(average_win || 1);
  if (ratio < 0.3) return "Very Low";
  if (ratio < 0.6) return "Low";
  if (ratio < 1.0) return "Moderate";
  if (ratio < 1.5) return "High";
  return "Very High";
}

function deriveTraderType(analytics: Analytics): string {
  const { total_trades } = analytics;
  if (total_trades > 100) return "Scalper";
  if (total_trades > 40) return "Day Trader";
  if (total_trades > 15) return "Swing Trader";
  return "Position Trader";
}

// ─── Section Splitter ─────────────────────────────────────────────────────────

function splitSections(markdown: string): Record<string, string> {
  const sections: Record<string, string> = {};
  // Match lines that start with 1-2 # chars
  const parts = markdown.split(/\n(?=#{1,2}\s)/);

  for (const part of parts) {
    const lines = part.trim().split("\n");
    const headingLine = lines[0];
    if (!headingLine.match(/^#{1,2}\s/)) continue;

    // Clean heading: remove # markers, emojis, trim
    const rawHeading = headingLine
      .replace(/^#+\s*/, "")
      .replace(
        /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F000}-\u{1F02F}\u{1FA00}-\u{1FA9F}⚠️⚠🎯💪🔍📊📈🏆🧠💰🚀💡🔥⭐✅❌]/gu,
        ""
      )
      .trim()
      .toLowerCase();

    const content = lines.slice(1).join("\n").trim();
    sections[rawHeading] = content;
  }
  return sections;
}

function findSection(
  sections: Record<string, string>,
  keywords: string[]
): string {
  for (const key of Object.keys(sections)) {
    for (const kw of keywords) {
      if (key.includes(kw.toLowerCase())) return sections[key];
    }
  }
  return "";
}

// ─── Bullet / Number List Parsers ─────────────────────────────────────────────

function parseBulletList(text: string): string[] {
  return text
    .split("\n")
    .filter((l) => l.match(/^[\-\*\+]\s/) || l.match(/^\d+[\.\)]\s/))
    .map((l) => l.replace(/^[\-\*\+\d\.\)]+\s*/, "").trim())
    .filter((l) => l.length > 3);
}

function parseTitledBullets(text: string): { title: string; description: string }[] {
  const items = parseBulletList(text);
  return items.map((item) => {
    // Try to match **Title**: Description pattern
    const boldMatch = item.match(/^\*{1,2}(.+?)\*{1,2}[:\-–]\s*(.*)/s);
    if (boldMatch) {
      return { title: boldMatch[1].trim(), description: boldMatch[2].trim() };
    }
    // Fallback: first 6 words = title
    const words = item.split(" ");
    const titleWords = words.slice(0, Math.min(6, words.length));
    return {
      title: titleWords.join(" ").replace(/:$/, ""),
      description: words.slice(titleWords.length).join(" ") || item,
    };
  });
}

// ─── Report Card Parser ───────────────────────────────────────────────────────

const CATEGORY_META: Record<string, { color: string; icon: string }> = {
  discipline: { color: "blue", icon: "🎯" },
  "risk management": { color: "green", icon: "🛡️" },
  execution: { color: "purple", icon: "⚡" },
  "emotional control": { color: "orange", icon: "🧘" },
  consistency: { color: "cyan", icon: "📊" },
};

function parseReportCard(text: string): ReportCardScore[] {
  const rows = text.split("\n").filter((l) => l.includes("|"));
  const scores: ReportCardScore[] = [];

  for (const row of rows) {
    // Skip separator rows
    if (row.includes("---") || row.includes("===")) continue;
    const cells = row
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    if (cells.length < 2) continue;

    const category = cells[0].toLowerCase().replace(/[^a-z\s]/g, "").trim();
    const scoreRaw = cells[1];

    // Extract number from "7/10", "7", "7.5/10", etc.
    const scoreMatch = scoreRaw.match(/(\d+(?:\.\d+)?)/);
    if (!scoreMatch) continue;
    const score = parseFloat(scoreMatch[1]);
    if (score > 10 || score < 0) continue;

    // Match to known categories
    const meta = Object.entries(CATEGORY_META).find(([k]) => category.includes(k));
    const { color, icon } = meta?.[1] ?? { color: "blue", icon: "⭐" };
    const displayCategory = meta ? meta[0] : category;

    // Find description line after the table
    scores.push({
      category:
        displayCategory.charAt(0).toUpperCase() + displayCategory.slice(1),
      score,
      description: "",
      color,
      icon,
    });
  }

  // If we didn't get 5 scores, fill with defaults
  const defaultCategories = [
    { category: "Discipline", score: 5, color: "blue", icon: "🎯" },
    { category: "Execution", score: 5, color: "purple", icon: "⚡" },
    { category: "Risk Management", score: 5, color: "green", icon: "🛡️" },
    { category: "Emotional Control", score: 5, color: "orange", icon: "🧘" },
    { category: "Consistency", score: 5, color: "cyan", icon: "📊" },
  ];

  if (scores.length === 0) {
    return defaultCategories.map((d) => ({ ...d, description: "Analysis pending" }));
  }

  return scores.slice(0, 5).map((s, i) => ({
    ...s,
    description: s.description || defaultCategories[i]?.category + " score",
  }));
}

// ─── Timeline Parser ──────────────────────────────────────────────────────────

function parseTimeline(text: string): TimelinePoint[] {
  const bullets = parseBulletList(text);
  const points: TimelinePoint[] = [];

  const typeMap: { keywords: string[]; type: TimelinePoint["type"]; label: string }[] = [
    { keywords: ["entry", "enter", "entered", "open"], type: "entry", label: "Entry" },
    { keywords: ["exit", "close", "closed", "exited"], type: "analysis", label: "Exit Analysis" },
    { keywords: ["mistake", "error", "wrong", "missed", "poor"], type: "mistake", label: "Mistake" },
    { keywords: ["positive", "strength", "good", "well", "correct"], type: "positive", label: "Positive" },
    { keywords: ["recommend", "next time", "action", "should", "improve", "confidence"], type: "recommendation", label: "Recommendation" },
  ];

  for (const bullet of bullets) {
    const lc = bullet.toLowerCase();
    const match = typeMap.find((t) => t.keywords.some((kw) => lc.includes(kw)));
    points.push({
      type: match?.type ?? "analysis",
      label: match?.label ?? "Analysis",
      text: bullet,
    });
  }

  // Ensure at least one entry and one recommendation
  if (!points.find((p) => p.type === "entry")) {
    points.unshift({ type: "entry", label: "Entry", text: "Trade entry reviewed." });
  }
  if (!points.find((p) => p.type === "recommendation")) {
    points.push({ type: "recommendation", label: "Recommendation", text: "Continue monitoring your trading patterns." });
  }

  return points.slice(0, 8);
}

// ─── Improvement Plan Parser ──────────────────────────────────────────────────

function parseImprovementPlan(text: string): ImprovementItem[] {
  const bullets = parseBulletList(text);
  const priorities: Priority[] = ["Critical", "High", "High", "Medium", "Medium"];
  const impacts: ImpactLevel[] = ["High", "High", "Medium", "High", "Medium"];

  return bullets.slice(0, 5).map((bullet, i) => {
    const boldMatch = bullet.match(/^\*{1,2}(.+?)\*{1,2}[:\-–]\s*(.*)/s);
    const title = boldMatch ? boldMatch[1].trim() : bullet.split(":")[0].trim();
    const why = boldMatch ? boldMatch[2].trim() : bullet;
    return {
      title,
      why: why || "Critical for trading improvement.",
      priority: priorities[i] ?? "Medium",
      impact: impacts[i] ?? "Medium",
    };
  });
}

// ─── Missions Parser ──────────────────────────────────────────────────────────

function parseMissions(text: string): MissionItem[] {
  const bullets = parseBulletList(text);
  return bullets.slice(0, 3).map((bullet) => {
    const boldMatch = bullet.match(/^\*{1,2}(.+?)\*{1,2}[:\-–]\s*(.*)/s);
    const title = boldMatch ? boldMatch[1].trim() : bullet.split(":")[0].substring(0, 50).trim();
    const description = boldMatch ? boldMatch[2].trim() : bullet;
    return { title, description: description || bullet };
  });
}

// ─── Strength/Weakness Extract from Summary ───────────────────────────────────

function extractBiggestStrengthAndWeakness(
  strengthItems: StrengthItem[],
  weaknessItems: WeaknessItem[]
): { biggestStrength: string; biggestWeakness: string } {
  return {
    biggestStrength: strengthItems[0]?.title ?? "Consistent position sizing",
    biggestWeakness: weaknessItems[0]?.title ?? "Emotional trading patterns",
  };
}

// ─── Main Parser ──────────────────────────────────────────────────────────────

export function parseAIReport(markdown: string, analytics: Analytics): AICoachReport {
  const sections = splitSections(markdown);

  const executiveSummaryText = findSection(sections, ["executive summary", "executive"]);
  const reportCardText = findSection(sections, ["report card", "trader report"]);
  const lastTradeText = findSection(sections, ["last trade review", "last trade", "trade review"]);
  const recentPatternText = findSection(sections, ["recent trading pattern", "trading pattern", "recent pattern"]);
  const psychologyText = findSection(sections, ["trading psychology", "psychology"]);
  const riskText = findSection(sections, ["risk management"]);
  const strengthsText = findSection(sections, ["strengths", "strength"]);
  const weaknessesText = findSection(sections, ["weaknesses", "weakness", "biggest weakness"]);
  const improvementText = findSection(sections, ["improvement plan", "personalized improvement", "improvement"]);
  const missionsText = findSection(sections, ["tomorrow", "mission"]);

  const strengths = parseTitledBullets(strengthsText) as StrengthItem[];
  const weaknesses = parseTitledBullets(weaknessesText) as WeaknessItem[];
  const { biggestStrength, biggestWeakness } = extractBiggestStrengthAndWeakness(strengths, weaknesses);

  const overallGrade = deriveGrade(analytics);
  const confidenceScore = deriveConfidence(analytics);
  const riskLevel = deriveRiskLevel(analytics);
  const traderType = deriveTraderType(analytics);

  const executiveSummary: ExecutiveSummaryData = {
    text: executiveSummaryText || "Your trading performance has been analyzed by TradeCoach AI.",
    biggestStrength,
    biggestWeakness,
    overallGrade,
    confidenceScore,
    riskLevel,
    traderType,
  };

  const reportCard = parseReportCard(reportCardText);
  const lastTradeReview = parseTimeline(lastTradeText);
  const improvementPlan = parseImprovementPlan(improvementText);
  const tomorrowMissions = parseMissions(missionsText);

  // Fallback missions if parsing returned nothing
  const finalMissions: MissionItem[] =
    tomorrowMissions.length > 0
      ? tomorrowMissions
      : [
          { title: "Review Your Journal", description: "Document today's trades and identify patterns." },
          { title: "Set Risk Limits", description: "Define your max loss per trade before the session." },
          { title: "Practice Patience", description: "Only enter trades that match your setup criteria." },
        ];

  return {
    executiveSummary,
    reportCard,
    lastTradeReview,
    recentPattern: recentPatternText || psychologyText || "",
    psychology: psychologyText || "",
    riskManagement: riskText || "",
    strengths: strengths.length ? strengths : [{ title: "Consistent Trading", description: "You maintain a consistent approach to the markets." }],
    weaknesses: weaknesses.length ? weaknesses : [{ title: "Risk Management", description: "Further refinement of risk controls is recommended." }],
    improvementPlan:
      improvementPlan.length > 0
        ? improvementPlan
        : [
            { title: "Tighten Stop Losses", why: "Reducing losses per trade improves overall PnL.", priority: "High", impact: "High" },
            { title: "Follow Your Trading Plan", why: "Consistency is key to long-term profitability.", priority: "Critical", impact: "High" },
            { title: "Track Emotions", why: "Emotional decisions lead to poor trade outcomes.", priority: "High", impact: "Medium" },
          ],
    tomorrowMissions: finalMissions,
  };
}
