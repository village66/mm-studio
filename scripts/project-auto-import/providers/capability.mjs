import { unavailableImageAnalyzer } from "../core.mjs";

export function resolveImageAnalysisCapability() {
  return {
    available: false,
    provider: null,
    capability: "not-configured",
    reason: "找不到 repo 既有的 Vision SDK、圖片理解 API 設定或對應環境變數。",
    analyzeImage: unavailableImageAnalyzer,
  };
}
