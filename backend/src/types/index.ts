export interface AnalysisRequest {
  text: string;
}

export interface RedFlag {
  indicator: string;
  explanation: string;
  severity: "high" | "medium" | "low";
}

export interface AnalysisResponse {
  score: number; // 0 to 100
  riskLevel: "safe" | "medium" | "high";
  category: string; // e.g., "Phishing Link", "Financial Scam", "Safe"
  summary: string;
  redFlags: RedFlag[];
  recommendations: string[];
}

export interface EmergencyActionStep {
  step: number;
  title: string;
  detail: string;
  urgency: "critical" | "high" | "medium";
  action: { type: "phone" | "link"; value: string; label: string } | null;
}

export interface EmergencyDiagnosisResponse {
  urgencyLevel: "critical" | "high" | "medium";
  urgencyMessage: string;
  timeWindow: string;
  diagnosis: string;
  actionPlan: EmergencyActionStep[];
  importantNotes: string[];
}

