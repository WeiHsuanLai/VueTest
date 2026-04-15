<!-- 路徑: src/views/EventModifiersView.vue | 功能: 詳盡解說 Vue 事件修飾符，並將操作與日誌統一配置於右側 -->
<script setup lang="ts">
import { ref } from 'vue'

const logs = ref<string[]>([])

const addLog = (msg: string) => {
  const time = new Date().toLocaleTimeString()
  logs.value.unshift(`[${time}] ${msg}`)
}

// 事件處理函式
const handleParentClick = () => addLog('觸發：父層容器事件')
const handleChildClick = () => addLog('觸發：子層按鈕點擊')
const handleLinkClick = () => addLog('觸發：超連結點擊 (頁面未跳轉)')
const handleOnceClick = () => addLog('觸發：一次性按鈕執行')
const handleSelfClick = () => addLog('觸發：.self 容器本體事件')

// 詳細技術文件資料
const fullModifierDocs = [
  {
    name: '.stop',
    title: '停止冒泡 (Stop Propagation)',
    nature: '事件流控制',
    action: '呼叫 event.stopPropagation()',
    effect:
      '阻止事件繼續向上傳遞給父節點。在 DOM 中，事件預設會從目標元素一路向外層冒泡，此修飾符可在此處「截斷」流程。',
    useCase: '巢狀點擊、選單內的按鈕、彈窗中的操作項。',
  },
  {
    name: '.prevent',
    title: '防止預設 (Prevent Default)',
    nature: '瀏覽器行為攔截',
    action: '呼叫 event.preventDefault()',
    effect:
      '攔截瀏覽器的原生行為。許多 DOM 元素有其預設動作（如提交表單會刷新、點擊連結會跳轉），此修飾符可取消這些動作。',
    useCase: 'SPA 路由跳轉、Ajax 表單提交、自定義右鍵選單。',
  },
  {
    name: '.self',
    title: '僅限自身觸發 (Self-Target)',
    nature: '目標過濾器',
    action: '判斷 event.target === event.currentTarget',
    effect:
      '只有當事件是直接在該元素上觸發時才執行。即使子元素觸發了冒泡，只要不是點擊元素本人，處理函式就不會執行。',
    useCase: 'Modal 遮罩層點擊關閉、大型容器的背景點擊行為。',
  },
  {
    name: '.once',
    title: '僅執行一次 (Once)',
    nature: '生命週期限制',
    action: '執行後自動銷毀事件監聽器',
    effect:
      '限制處理函式在整個組件生命週期中僅能觸發一次。觸發後，Vue 會自動移除該事件監聽，後續點擊將失效。',
    useCase: '表單防重複提交、初始化引導點擊、領取一次性獎勵按鈕。',
  },
  {
    name: '.capture',
    title: '捕獲模式 (Capture)',
    nature: '優先順序切換',
    action: '使用 addEventListener(..., true)',
    effect:
      '將事件處理從預設的「冒泡階段」改為「捕獲階段」。這意味著事件會先從外層傳入，父層的處理函式會比子層先執行。',
    useCase: '全域事件監控、需要在子元素反應前優先攔截的邏輯。',
  },
  {
    name: '.passive',
    title: '不阻斷捲動 (Passive)',
    nature: '滾動效能優化',
    action: '提升瀏覽器渲染執行緒效率',
    effect:
      '告訴瀏覽器處理程序「不會」攔截預設行為。瀏覽器可以不等 JS 執行完就直接進行滾動渲染，大幅提升行動端流暢度。',
    useCase: '手機端的 touchstart、滾輪 wheel 事件監聽。',
  },
]
</script>

<template>
  <div class="modifiers-view">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-slate-800 border-b-2 border-orange-500 pb-2 inline-block">
        Vue 事件修飾符詳解
      </h1>
      <p class="text-sm text-slate-500 mt-2">Event Modifiers Deep Dive & Interactive Lab</p>
    </header>

    <div class="main-layout">
      <!-- 1. 左側：指南與詳細說明 (2/3) -->
      <div class="guide-panel">
        <section class="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            特性與作用全手冊
          </h3>
          <div class="grid grid-cols-1 gap-4">
            <div
              v-for="item in fullModifierDocs"
              :key="item.name"
              class="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                <div class="flex items-center gap-3">
                  <span
                    class="px-3 py-1 bg-orange-600 text-white font-mono text-sm rounded shadow-sm font-bold"
                    >{{ item.name }}</span
                  >
                  <span class="font-bold text-slate-700 text-base">{{ item.title }}</span>
                </div>
                <span
                  class="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-full uppercase tracking-wider"
                >
                  {{ item.nature }}
                </span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div class="space-y-2">
                  <p class="text-slate-700 font-bold flex items-center gap-1">
                    <span class="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                    具體作用：
                  </p>
                  <p
                    class="text-slate-500 leading-relaxed bg-slate-50 p-2 rounded border border-slate-100 italic"
                  >
                    {{ item.action }}
                  </p>
                  <p class="text-slate-600 leading-relaxed">
                    {{ item.effect }}
                  </p>
                </div>
                <div class="space-y-2">
                  <p class="text-orange-600 font-bold flex items-center gap-1">
                    <span class="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    使用場景與時機：
                  </p>
                  <p class="text-slate-500 leading-relaxed border-l-2 border-orange-200 pl-3 py-1">
                    {{ item.useCase }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 2. 右側：實作區塊與日誌控制台 (1/3) -->
      <aside class="lab-panel">
        <div class="sticky-lab space-y-6">
          <div class="lab-label">
            <span class="line"></span> 互動操作區 <span class="line"></span>
          </div>

          <!-- .stop & .prevent -->
          <div class="lab-card">
            <h3 class="card-title">傳遞與行為攔截</h3>
            <div class="space-y-4">
              <div @click="handleParentClick" class="outer-box">
                <p class="box-label">父層容器 (@click)</p>
                <div class="flex flex-col gap-2">
                  <button @click="handleChildClick" class="btn-secondary">普通點擊 (冒泡)</button>
                  <button @click.stop="handleChildClick" class="btn-primary">
                    .stop 點擊 (攔截)
                  </button>
                </div>
              </div>
              <div class="text-center">
                <a href="#" @click.prevent="handleLinkClick" class="link-demo"
                  >.prevent: 攔截跳轉</a
                >
              </div>
            </div>
          </div>

          <!-- .self & .once -->
          <div class="lab-card">
            <h3 class="card-title">精確觸發與次數</h3>
            <div class="space-y-4">
              <div @click.self="handleSelfClick" class="self-box">
                <p class="box-label">點擊灰色背景才有效</p>
                <button class="btn-ghost">按鈕 (不觸發 .self)</button>
              </div>
              <button @click.once="handleOnceClick" class="btn-dark">僅能點一次 (.once)</button>
            </div>
          </div>

          <!-- 日誌輸出 (移動至此) -->
          <section class="console-box">
            <div class="console-header">
              <span class="status-dot"></span>
              <span class="title">RUNTIME_LOG</span>
              <button @click="logs = []" class="clear-btn">RESET</button>
            </div>
            <div class="console-body custom-scrollbar">
              <div v-for="(log, index) in logs" :key="index" class="log-entry">
                <span class="log-arrow">></span> {{ log }}
              </div>
              <div v-if="logs.length === 0" class="empty-msg">等待上方操作觸發...</div>
            </div>
          </section>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
/* 強制左右並排 */
.main-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: start;
}

.guide-panel {
  min-width: 0;
}
.lab-panel {
  min-width: 250px;
}
.sticky-lab {
  position: sticky;
  top: 1.5rem;
}

/* 實驗室樣式 */
.lab-label {
  font-size: 0.75rem;
  font-weight: 800;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.lab-label .line {
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

.lab-card {
  background: #ffffff;
  border-radius: 1.25rem;
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
.card-title {
  font-weight: 800;
  color: #ea580c;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.outer-box {
  background: #fffaf5;
  border: 2px dashed #fed7aa;
  padding: 1.25rem;
  border-radius: 1rem;
  text-align: center;
}
.self-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 1.25rem;
  border-radius: 1rem;
  text-align: center;
  cursor: pointer;
}
.self-box:hover {
  background: #f1f5f9;
}

.box-label {
  font-size: 0.65rem;
  font-weight: 800;
  color: #94a3b8;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

/* 按鈕樣式 */
.btn-primary {
  width: 100%;
  padding: 0.5rem;
  background: #f97316;
  color: white;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  transition: all 0.2s;
}
.btn-primary:hover {
  background: #ea580c;
}
.btn-secondary {
  width: 100%;
  padding: 0.5rem;
  background: #ffffff;
  border: 1px solid #fdba74;
  color: #ea580c;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  transition: all 0.2s;
}
.btn-secondary:hover {
  background: #fff7ed;
}
.btn-dark {
  width: 100%;
  padding: 0.75rem;
  background: #1e293b;
  color: white;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
}
.btn-dark:active {
  transform: scale(0.95);
}
.btn-ghost {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  color: #64748b;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  background: white;
}

.link-demo {
  color: #3b82f6;
  text-decoration: underline;
  font-size: 0.75rem;
  font-weight: 700;
}

/* 日誌樣式 */
.console-box {
  background: #0f172a;
  border-radius: 1.25rem;
  padding: 1.25rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
  margin-top: 1rem;
}
.console-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #1e293b;
  padding-bottom: 0.5rem;
  margin-bottom: 0.75rem;
}
.status-dot {
  width: 0.4rem;
  height: 0.4rem;
  background: #f97316;
  border-radius: 50%;
  animation: pulse 2s infinite;
}
.console-header .title {
  font-family: monospace;
  font-weight: 800;
  color: #f97316;
  font-size: 0.7rem;
}
.clear-btn {
  color: #64748b;
  font-size: 0.6rem;
  text-decoration: underline;
  font-family: monospace;
}
.console-body {
  height: 200px;
  overflow-y: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.7rem;
}
.log-entry {
  color: #fecca3;
  border-left: 2px solid rgba(249, 115, 22, 0.2);
  padding-left: 0.6rem;
  margin-bottom: 0.4rem;
  animation: slideIn 0.3s ease-out;
}
.log-arrow {
  color: #ea580c;
  font-weight: bold;
}
.empty-msg {
  color: #475569;
  font-style: italic;
  text-align: center;
  padding-top: 3rem;
  font-size: 0.7rem;
}

/* 其他 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 10px;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-5px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
