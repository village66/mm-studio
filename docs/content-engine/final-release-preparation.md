# Step 8｜Final Release Preparation

## 最小發布資料輸入

唯一資料來源維持 `content/projects/courtyard-house-renewal/project.json`。使用者只需把下列三個 `null` 換成已確認的真實值，先保持 `status: "review"`：

```jsonc
{
  "district": "<1–40 字元的可公開縣市／行政區正式名稱>",
  "area": NUMBER_GREATER_THAN_ZERO, // JSON number，不加「坪」文字
  "publishDate": "<YYYY-MM-DD 的有效日曆日期>"
}
```

以上只有格式標記，不是案件資料。`photographer`、`materials`、`designNarrative`、`imageCaptions`、Before／After、`styleConfirmation`、`featured` 仍是選填；未填不得阻擋發布。`featured: false` 仍可正式發布，只是不進首頁精選。

## 正式狀態變更前 Workflow

```powershell
npm run content:validate -- courtyard-house-renewal
npm run content:generate -- courtyard-house-renewal
npm run content:publish-gate -- courtyard-house-renewal --target-status approved
npm run content:final-qa
npx tsc --noEmit
npx eslint .
npm run build
git diff --check
git status --short --branch
```

全部 PASS 且使用者明確核准後，才把 `status` 改為 `approved` 或 `published`；CLI 不會自動改案件資料。狀態變更後，重跑同一組命令，並以本機 production server 檢查正式 route 回應 200、preview metadata 保持 noindex。

## Final Release QA Checklist

- [ ] `district`、`area`、`publishDate` 是已確認真實值且格式正確。
- [ ] content validate / generate PASS，generated files 與 source 一致。
- [ ] publish gate target `approved` 或 `published` 為 PASS。
- [ ] 正式 `/portfolio/[slug]` 可見；非 eligible 案件維持 404。
- [ ] `/preview/portfolio/[slug]` 固定 `noindex, nofollow, noarchive`。
- [ ] canonical、JSON-LD、ALT、cover、gallery、slug uniqueness PASS。
- [ ] eligible 案件進 sitemap；review／blocked 案件不進 sitemap。
- [ ] `featured=true` 才進首頁；`featured=false` 不進首頁但仍可發布。
- [ ] 三個既有作品 route、metadata、首頁與作品導覽回歸 PASS。
- [ ] TypeScript、ESLint、Next.js production build、`git diff --check`、乾淨工作樹 PASS。

`npm run content:release-dry-run` 只在 OS 暫存目錄建立 synthetic fixture，驗證 approved 與 published 的 validate、generate、gate、route、sitemap、featured、SEO 路徑，結束後刪除；不讀寫 `content/projects` 或正式 `generated`。

## Rollback / Recovery

- 已知安全基準：tag `content-engine-v0.1.0`。
- Step 8 工作分支：`feature/content-engine`；正式發布前不要 merge `main`、不要 deploy。
- 真實資料補齊且 Final QA 通過後，建議先建立 commit：`Pre-release courtyard-house-renewal YYYY-MM-DD`。
- 建議 pre-release tag：`content-engine-v0.2.0-rc.1`；此 Step 不建立 production release tag。
- 回復時優先建立 recovery branch 指向安全 tag 或指定 commit，再比較／revert 有問題的 release commit；不要重寫共享分支歷史。

## 尚未納入

Google Business、Facebook、Instagram、Threads API 不屬於本階段，待網站正式發布流程確認後另建整合工作。
