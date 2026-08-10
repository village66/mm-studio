# Step 6.5｜Publish Approval Checklist

## 必須由使用者提供，不得推測

- [ ] `district`：`project.json` 第 8 個欄位；填入可公開的縣市／行政區正式字串（1–40 字元），未確認時保持 `null`。
- [ ] `area`：`project.json` 第 9 個欄位；填入實際室內設計或工程坪數（大於 0 的 JSON number，不加「坪」文字），未確認時保持 `null`。
- [ ] `publishDate`：`project.json` 的 `before`／`after` 後方欄位；填入正式公開日期字串，格式 `YYYY-MM-DD` 且必須是有效日曆日期，未確認時保持 `null`。
- [ ] 使用者明確核准由 `review` 轉為 `approved` 或 `published`。

## 可選但建議補齊

- [ ] 攝影師姓名與公開署名／授權方式。
- [ ] 主要材料、品牌與可公開規格。
- [ ] 更完整的設計概念、需求、限制與改造策略。
- [ ] Gallery、Before、After 每張圖片的真實 caption。
- [ ] 是否列為首頁精選（`featured`）；未確認前維持 `false`。
- [ ] 品牌端確認 `style` 的「現代、自然」標籤；未確認不阻擋發布。
- [ ] Before／After 圖片；沒有改造前後素材時可維持空陣列。

以上選填項可填、可不填；未填只允許產生 Warning，不得成為發布 Blocker。

## 自動 Publish Gate（全部必須 PASS）

- [ ] Schema 與 status transition。
- [ ] `district`、`area`、`publishDate` 真實值。
- [ ] Cover 與 Gallery 圖片存在。
- [ ] SEO title、meta description、canonical。
- [ ] JSON-LD 必要欄位。
- [ ] 圖片 ALT 可穩定產生。
- [ ] slug 不與 Content Engine 或舊 route 衝突。
- [ ] `productionEligible=true`；選填補強項未填不影響此結果。

## 執行流程

1. 補入經確認的真實資料，維持 `status=review`。
2. 執行 `npm run content:validate -- courtyard-house-renewal`。
3. 執行 `npm run content:generate -- courtyard-house-renewal`。
4. 執行 `npm run content:publish-gate -- courtyard-house-renewal --target-status approved`。
5. 執行 `npm run content:final-qa`，確認隔離 fixture 的 approved／published 完整路徑 PASS。
6. Gate 顯示 `PASS` 且使用者明確核准後，才可修改 status；不得由 CLI 自動改檔。

完整 Final QA、release 與 rollback 流程見 `docs/content-engine/final-release-preparation.md`。

目前案件保持 `review`、`featured=false`、`productionEligible=false`，不得進正式 route、sitemap 或首頁。
