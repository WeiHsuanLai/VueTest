# Vue 3 專案範本

這是一個乾淨、高效的 Vue 3 專案基礎範本，使用了 Vite 作為建構工具。

## 技術棧

- **Vue 3**: 組合式 API (Composition API)
- **Vite**: 極速的前端開發工具
- **TypeScript**: 強型別的 JavaScript
- **Pinia**: 現代化 Vue 狀態管理
- **Vue Router**: 官方路由管理
- **ESLint & Prettier**: 程式碼風格檢查與自動格式化

## 目錄結構

```text
src/
├── assets/          # 靜態資源 (CSS, 圖片)
├── components/      # 共用元件 (目前已清空，待新增)
├── router/          # 路由配置 (含中文註解)
├── stores/          # Pinia 狀態管理 (目前已清空)
├── views/           # 頁面級組件 (Home, About)
├── App.vue          # 主進入點組件
└── main.ts          # 專案初始化進入點
```

## 開發指南

### 安裝依賴
```sh
npm install
```

### 啟動開發伺服器
```sh
npm run dev
```

### 建構生產版本
```sh
npm run build
```

### 程式碼檢查與格式化
```sh
# 執行 ESLint 檢查
npm run lint

# 執行程式碼自動格式化
npm run format
```

## 備註

- 專案程式碼中已加入詳細的 **繁體中文註解**，方便開發者快速上手。
- 已配置 `.gitignore` 自動忽略 `GEMINI.md` 等非必要檔案。
