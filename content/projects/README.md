# Project Auto Import

這個資料夾只用於建立「待審核 draft」，不會自動修改正式網站資料。

## 最小資料夾格式

```text
content/projects/<slug>/
├─ project.json  # 選填；未提供時 draft 會明確列出待補欄位
├─ original/     # 原始空間
├─ design/       # 設計實現
└─ completed/    # 完成空間
```

`project.json` 完全選填；只放照片也能先開啟 review-only preview。正式發布前才需要補齊現有網站真正使用的欄位：

```json
{
  "titleZh": "中文作品名稱",
  "category": "renovation"
}
```

`titleEn` 可選填；preview 缺少 `titleZh` 時會顯示「待命名作品」，但不會寫入正式資料。

`category` 僅允許現有首頁分類：`residential`、`commercial`、`renovation`。slug 直接使用資料夾名稱，不需重複填寫。

只放三個照片資料夾執行掃描時，draft 會輸出 `compatibility.previewReady = true` 與 `publishReady = false`；目的圖片路徑、首頁卡片連結維持 `null`，直到補齊正式發布欄位。

舊的 `before/`、`progress/` 資料夾仍可讀取，並分別映射為同一組網站 phase key；新作品請使用 `original/`、`design/`。

圖片可使用 `.jpg`、`.jpeg`、`.png`、`.webp`、`.avif`，依檔名自然排序。資料夾可暫時沒有圖片；但三個資料夾全部為空時不會建立 draft。

執行 `npm run project:scan -- --project <slug>`，輸出位於 `drafts/project-auto-import/<slug>.draft.json`（已忽略 Git）。它包含首頁卡片、既有作品頁 `ProjectCase` / `ProjectPhase`、圖片複製審核清單及待分析欄位。

掃描後可在本機開啟 `/preview/project-auto-import/<slug>`。預覽 route 為 noindex，不會加入首頁、sitemap 或 `data/projects.ts`。

目前沒有設定影像模型或外部 API，因此掃描器只整理檔案，不會假裝看過圖片，也不會產生虛構說明。
