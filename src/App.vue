<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

// 控制側邊欄是否收合
const isCollapsed = ref(false)

// 切換收合狀態的函式
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <!-- 頂部導覽列 -->
  <header class="navbar">
    <div class="navbar-container">
      <div class="navbar-left">
        <!-- 三條線收合按鈕 -->
        <button
          class="hamburger-btn"
          @click="toggleSidebar"
          :class="{ 'is-active': !isCollapsed }"
          :title="isCollapsed ? '展開選單' : '收合選單'"
        >
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </button>
        <div class="logo">
          <RouterLink to="/">Vue<span>Practice</span></RouterLink>
        </div>
      </div>
    </div>
  </header>

  <div class="app-layout" :class="{ 'sidebar-collapsed': isCollapsed }">
    <!-- 左側側邊導覽列 -->
    <aside class="sidebar">
      <nav class="sidebar-nav">
        <div class="menu-label">主要選單</div>
        <RouterLink to="/" class="sidebar-item">
          <i class="icon"></i>
          <span class="label">專案首頁</span>
        </RouterLink>

        <div class="menu-label">學習主題</div>
        <!-- 生命週期現在移動到學習主題下 -->
        <RouterLink to="/lifecycle" class="sidebar-item">
          <i class="icon"></i>
          <span class="label">生命週期</span>
        </RouterLink>
        <RouterLink to="/reactivity" class="sidebar-item">
          <i class="icon"></i>
          <span class="label">響應式 API</span>
        </RouterLink>
        <RouterLink to="/closure" class="sidebar-item">
          <i class="icon"></i>
          <span class="label">JS 閉包</span>
        </RouterLink>
        <RouterLink to="/communication" class="sidebar-item">
          <i class="icon"></i>
          <span class="label">組件通信</span>
        </RouterLink>
        <RouterLink to="/advanced-communication" class="sidebar-item">
          <i class="icon"></i>
          <span class="label">進階組件通信</span>
        </RouterLink>
        <RouterLink to="/global-communication" class="sidebar-item">
          <i class="icon"></i>
          <span class="label">全域與隔代通信</span>
        </RouterLink>
        <RouterLink to="/accessor" class="sidebar-item">
          <i class="icon"></i>
          <span class="label">Get / Set 存取器</span>
        </RouterLink>
        <RouterLink to="/event-modifiers" class="sidebar-item">
          <i class="icon"></i>
          <span class="label">事件修飾符</span>
        </RouterLink>
      </nav>
    </aside>

    <!-- 主要內容區域 -->
    <main class="main-content">
      <div class="content-wrapper">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
/* 頂部導覽列 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  z-index: 1000;
  display: flex;
  align-items: center;
}

.navbar-container {
  width: 100%;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* 漢堡選單按鈕 */
.hamburger-btn {
  background: transparent;
  border: none;
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 0;
}

.hamburger-btn .line {
  width: 20px;
  height: 2px;
  background-color: #475569;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger-btn.is-active .line:nth-child(2) {
  width: 14px;
}

.logo a {
  font-size: 1.25rem;
  font-weight: 800;
  text-decoration: none;
  color: #2c3e50;
}

.logo span {
  color: #42b883;
}

/* 版面配置 */
.app-layout {
  display: flex;
  padding-top: 60px;
  min-height: 100vh;
}

/* 側邊欄樣式 */
.sidebar {
  width: 240px;
  background-color: #f8fafc;
  border-right: 1px solid #e2e8f0;
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 900;
  backface-visibility: hidden;
  will-change: transform;
}

/* 自定義側邊欄滾動條 (美化) */
.sidebar::-webkit-scrollbar {
  width: 4px;
}
.sidebar::-webkit-scrollbar-track {
  background: transparent;
}
.sidebar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.sidebar:hover::-webkit-scrollbar-thumb {
  background: #cbd5e1;
}

.sidebar-collapsed .sidebar {
  transform: translateX(-100%);
}

.sidebar-nav {
  width: 240px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1.5rem 0;
}

.menu-label {
  padding: 0 1.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
}

.sidebar-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  color: #475569;
  font-weight: 500;
  transition: all 0.2s ease;
  border-left: 4px solid transparent;
}

.sidebar-item:hover {
  background-color: #f1f5f9;
  color: #42b883;
}

.sidebar-item .icon {
  font-style: normal;
  width: 20px;
  margin-right: 0.75rem;
  text-align: center;
}

.sidebar-item.router-link-exact-active {
  background-color: #effaf3;
  color: #42b883;
  border-left-color: #42b883;
  font-weight: 600;
}

/* 主要內容區域：動態調整邊距 */
.main-content {
  flex: 1;
  margin-left: 240px;
  background-color: #ffffff;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-collapsed .main-content {
  margin-left: 0;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.btn-primary {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  .main-content {
    margin-left: 0 !important;
  }
}
</style>
