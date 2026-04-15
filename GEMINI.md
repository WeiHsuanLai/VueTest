# Gemini CLI 專案記錄 (VueTest)

本專案作為 **Vue 3 學習與練習範例** 使用。

## 專案狀態 (2026-04-14)

- **框架**: Vue 3 (Composition API) + TypeScript + Vite
- **狀態管理**: Pinia (已初始化，目前無資料夾內容)
- **路由管理**: Vue Router (已配置並加入繁體中文註解)
- **文件系統**: VitePress (已配置並加入基礎範例)
- **清理工作**: 已移除官方範例（HelloWorld, TheWelcome 等）及相關 Assets。
- **程式碼風格**: 加入了詳細的繁體中文註解。
- **Git 配置**: `.gitignore` 已排除 `GEMINI.md`。

## 開發規範

1. **註解**: 所有的程式碼註解必須使用 **繁體中文**。
2. **Emoji 規範**: 嚴禁在程式碼、註解及專案文件中使用 **Emoji**。
3. **TypeScript 規範**:
   - **嚴禁使用 `any` 型別**：所有變數、函式參數與組件實例都必須定義明確的 Interface 或 Type。
   - **型別安全**：必須通過 `vue-tsc` 的型別檢查，確保型別推導完整。
   - **組件 Ref**：存取組件實例時，必須使用 `InstanceType<typeof Component>`。
4. **樣式**: 偏好使用 Scoped CSS，除非是全局基礎樣式（`src/assets/base.css`）。
5. **組件**:
   - 元件放置於 `src/components`。
   - 頁面級組件放置於 `src/views`。
6. **命名**:
   - 組件檔案使用 PascalCase（例如：`MyComponent.vue`）。
   - 邏輯檔案使用 camelCase（例如：`main.ts`）。

## 待辦事項 (TODO)

- [ ] 在 `src/components` 建立基礎佈局組件。
- [ ] 在 `src/stores` 根據需求建立 Pinia Store。
- [ ] 視需求加入 CSS 框架（如 Tailwind 或 UnoCSS）。

## 給 Gemini 的提示

- 在修改程式碼時，請確保維持現有的 **繁體中文註解** 風格。
- **嚴格遵守 TypeScript 規範**：在任何情況下都不得使用 `any` 型別，必須定義明確的型別或介面。
- 在建立新功能前，先確認是否需要建立對應的 Store 或 Router 路徑。
