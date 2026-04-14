<template>
  <div class="home-simple">
    <h1>Vue 練習專案首頁</h1>
    <p>歡迎來到這個 Vue 3 練習環境。</p>

    <h2>專案說明</h2>
    <p>本專案是一個使用 Vite、TypeScript、Vue Router 和 Pinia 構建的單頁應用程式 (SPA)。</p>
    <p>目前的目標是提供一個乾淨的起點，讓你可以練習 Vue 的各項功能。</p>

    <h2>目前進度</h2>
    <ul>
      <li>已完成基礎佈局（頂部與側邊導覽列）。</li>
      <li>已移除所有官方範例檔案。</li>
      <li>已配置繁體中文註解。</li>
    </ul>

    <h2>後續練習建議</h2>
    <p>你可以開始在 src/components 建立組件，或是嘗試在 src/stores 練習狀態管理。</p>

    <div class="mt-8 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
      <p class="font-bold">Tailwind CSS 已啟用！</p>
      <p>這是一個使用 Tailwind Utility Classes 渲染的區塊。</p>
    </div>
  </div>
</template>

<style scoped>
.home-simple {
  padding: 20px;
  line-height: 1.6;
  color: #333;
}

h1 {
  border-bottom: 2px solid #42b883;
  padding-bottom: 10px;
}

h2 {
  margin-top: 30px;
  color: #2c3e50;
}

ul {
  margin-top: 10px;
}
</style>
