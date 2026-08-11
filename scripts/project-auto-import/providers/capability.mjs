import { unavailableImageAnalyzer } from "../core.mjs";

export const VISION_PROVIDER_REQUIRED = "VISION_PROVIDER_REQUIRED";

export function resolveImageAnalysisCapability() {
  return {
    available: false,
    provider: null,
    capability: "not-configured",
    code: VISION_PROVIDER_REQUIRED,
    reason: "找不到 repo 既有的 Vision SDK、圖片理解 API 設定或對應環境變數。",
    requirements: [
      "一個支援圖片輸入與結構化 JSON 輸出的 Vision API",
      "僅供 server-side CLI 使用的 API credential",
      "明確的模型名稱、呼叫上限與成本上限",
    ],
    analyzeImage: unavailableImageAnalyzer,
  };
}
