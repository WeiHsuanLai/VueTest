<!-- 路徑: src/views/LifecycleView.vue | 功能: 介紹 Vue 3 生命週期掛鉤 (Lifecycle Hooks)，包含每個階段的用法詳解與即時紀錄測試 -->
<script setup lang="ts">
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  ref,
} from 'vue'

const count = ref(0)
const logs = ref<string[]>([])

// 輔助函式：記錄生命週期紀錄
const addLog = (hook: string, updateUi = true) => {
  const time = new Date().toLocaleTimeString()
  const message = `[${time}] 觸發 ${hook}`

  if (updateUi) {
    logs.value.unshift(message)
  }
  console.log(`%c[Vue Lifecycle]%c ${hook}`, 'color: #42b883; font-weight: bold', '')
}

onBeforeMount(() => addLog('onBeforeMount (掛載前)'))
onMounted(() => addLog('onMounted (掛載後)'))
onBeforeUpdate(() => addLog('onBeforeUpdate (更新前)', false))
onUpdated(() => addLog('onUpdated (更新後)', false))
onBeforeUnmount(() => addLog('onBeforeUnmount (卸載前)'))
onUnmounted(() => addLog('onUnmounted (卸載後)'))
</script>

<template>
  <div class="lifecycle-view">
    <h1 class="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-emerald-500 pb-2">
      Vue 3 生命週期：深度解析
    </h1>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <!-- 詳細用法指南 -->
      <section class="space-y-6 overflow-y-auto max-h-[80vh] pr-4 custom-scrollbar">
        <!-- Setup 階段 -->
        <div class="p-5 bg-slate-50 border-l-4 border-slate-400 rounded-r-lg">
          <h3 class="font-bold text-slate-800 text-lg mb-2">1. setup() 階段</h3>
          <p class="text-sm text-slate-600 leading-relaxed">
            <strong>用法：</strong> 這是組合式 API 的起點。所有的響應式數據 (ref, reactive)
            與計算屬性 (computed) 都在此定義。 <br /><strong>注意：</strong>
            此時組件實例尚未建立，無法訪問 <code>this</code> (在組合式 API 中也不需要)。它取代了 Vue
            2 的 <code>beforeCreate</code> 與 <code>created</code>。
          </p>
        </div>

        <!-- 掛載階段 -->
        <div class="p-5 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg">
          <h3 class="font-bold text-emerald-800 text-lg mb-2">2. 掛載階段 (onMounted)</h3>
          <p class="text-sm text-emerald-700 leading-relaxed mb-2">
            <strong>用法：</strong> 這是最常用的掛鉤。用於發送 <strong>API 請求</strong>、操作
            <strong>DOM 元素</strong> (例如初始化圖表庫如 ECharts、Swiper)、設定定時器。
          </p>
          <p class="text-xs text-emerald-600 bg-white/50 p-2 rounded">
            💡 <strong>實戰技巧：</strong> 如果你需要確保子組件也掛載完畢，可以在此執行邏輯。
          </p>
        </div>

        <!-- 更新階段 -->
        <div class="p-5 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
          <h3 class="font-bold text-amber-800 text-lg mb-2">3. 更新階段 (onUpdated)</h3>
          <p class="text-sm text-amber-700 leading-relaxed">
            <strong>用法：</strong> 在響應式數據導致 DOM
            重新渲染後調用。通常用於在更新後重新計算位置或測量 DOM 尺寸。 <br /><strong
              >⚠️ 警告：</strong
            >
            <strong>絕對不要</strong>在此處修改狀態數據，否則會導致無限更新迴圈。
          </p>
        </div>

        <!-- 卸載階段 -->
        <div class="p-5 bg-rose-50 border-l-4 border-rose-500 rounded-r-lg">
          <h3 class="font-bold text-rose-800 text-lg mb-2">4. 卸載階段 (onUnmounted)</h3>
          <p class="text-sm text-rose-700 leading-relaxed">
            <strong>用法：</strong> 資源清理的黃金時機。用於
            <strong>清除 setInterval/setTimeout</strong>、<strong>取消 API 訂閱</strong>、<strong
              >移除原生事件監聽器</strong
            >
            (window.addEventListener)。 <br /><strong>💡 目的：</strong>
            防止「記憶體洩漏」，確保組件消失後不會繼續佔用電腦效能。
          </p>
        </div>
      </section>

      <!-- 實作測試與紀錄 -->
      <section class="flex flex-col gap-6">
        <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-slate-800">生命週期互動區</h3>
            <span class="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full font-bold"
              >Count: {{ count }}</span
            >
          </div>
          <button
            @click="count++"
            class="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-all shadow-lg active:scale-95"
          >
            點我更新數據 (觸發 Update 掛鉤)
          </button>
          <p class="mt-4 text-xs text-slate-400 text-center italic">
            觀察控制台 (F12) 的輸出順序與說明
          </p>
        </div>

        <div class="flex-1 p-6 bg-slate-900 rounded-2xl shadow-2xl relative min-h-[400px]">
          <h3
            class="text-emerald-400 font-mono text-xs mb-6 flex justify-between items-center border-b border-slate-800 pb-2"
          >
            <span>生命週期執行紀錄</span>
            <button @click="logs = []" class="text-slate-500 hover:text-white transition-colors">
              CLEAR
            </button>
          </h3>
          <div
            class="space-y-3 font-mono text-[13px] overflow-y-auto max-h-[350px] custom-scrollbar pr-4"
          >
            <div
              v-for="(log, index) in logs"
              :key="index"
              class="flex gap-3 text-emerald-200 group"
            >
              <span class="text-slate-600 whitespace-nowrap">[{{ index }}]</span>
              <span class="group-hover:text-white transition-colors">{{ log }}</span>
            </div>
            <div
              v-if="logs.length === 0"
              class="text-slate-600 italic text-center py-20 animate-pulse"
            >
              [SYSTEM] 正在等待掛載掛鉤執行...
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.lifecycle-view {
  animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
