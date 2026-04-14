<script setup lang="ts">
import { 
  onBeforeMount, 
  onMounted, 
  onBeforeUpdate, 
  onUpdated, 
  onBeforeUnmount, 
  onUnmounted,
  ref 
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

onBeforeMount(() => addLog('onBeforeMount (組件掛載前：已完成數據初始化，尚未建立 DOM)'))
onMounted(() => addLog('onMounted (組件掛載後：DOM 已建立，可進行 DOM 操作)'))
onBeforeUpdate(() => addLog('onBeforeUpdate (數據更新前：數據已變更，DOM 尚未渲染)', false))
onUpdated(() => addLog('onUpdated (數據更新後：DOM 已完成更新)', false))
onBeforeUnmount(() => addLog('onBeforeUnmount (組件卸載前：適合清理計時器或監聽器)'))
onUnmounted(() => addLog('onUnmounted (組件卸載後：組件已完全移除)'))
</script>

<template>
  <div class="lifecycle-view">
    <h1 class="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-emerald-500 pb-2">
      Vue 3 生命週期詳解
    </h1>

    <!-- 系統化解釋區塊 -->
    <section class="mb-10 grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div class="p-4 bg-blue-50 border border-blue-100 rounded-lg">
        <h3 class="font-bold text-blue-800 mb-2">1. 建立期 (Creation)</h3>
        <p class="text-sm text-blue-700">
          在 <code>setup()</code> 階段。此時組件實例剛被建立，屬性已綁定，但尚未開始渲染。
        </p>
      </div>
      <div class="p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
        <h3 class="font-bold text-emerald-800 mb-2">2. 掛載期 (Mounting)</h3>
        <p class="text-sm text-emerald-700">
          包含 <code>onBeforeMount</code> 與 <code>onMounted</code>。將組件掛載到實際的 HTML DOM 中。
        </p>
      </div>
      <div class="p-4 bg-amber-50 border border-amber-100 rounded-lg">
        <h3 class="font-bold text-amber-800 mb-2">3. 更新期 (Updating)</h3>
        <p class="text-sm text-amber-700">
          包含 <code>onBeforeUpdate</code> 與 <code>onUpdated</code>。當響應式數據改變，畫面需要重新渲染時觸發。
        </p>
      </div>
      <div class="p-4 bg-rose-50 border border-rose-100 rounded-lg">
        <h3 class="font-bold text-rose-800 mb-2">4. 卸載期 (Unmounting)</h3>
        <p class="text-sm text-rose-700">
          包含 <code>onBeforeUnmount</code> 與 <code>onUnmounted</code>。組件被移除，釋放內存資源。
        </p>
      </div>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- 練習說明 -->
      <section class="space-y-4 text-slate-600">
        <h2 class="text-xl font-bold text-slate-800">為什麼要學生命週期？</h2>
        <p>開發 Vue 應用時，我們經常需要在特定時間點執行邏輯，例如：</p>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>API 請求：</strong> 通常放在 <code>onMounted</code>。</li>
          <li><strong>DOM 操作：</strong> 必須在 <code>onMounted</code> 之後才能抓到元素。</li>
          <li><strong>效能監控：</strong> 可以在 <code>onUpdated</code> 觀察渲染頻率。</li>
          <li><strong>清理資源：</strong> 在 <code>onUnmounted</code> 清除 <code>setInterval</code>，避免記憶體洩漏。</li>
        </ul>
        
        <div class="mt-6 p-4 bg-slate-100 rounded-lg border-l-4 border-slate-500">
          <p class="text-sm">
            <strong>注意：</strong> 在 Vue 3 組合式 API 中，<code>beforeCreate</code> 和 <code>created</code> 被 <code>setup()</code> 取代了，不需要特別的掛鉤。
          </p>
        </div>
      </section>

      <!-- 實作區塊 -->
      <section class="space-y-6">
        <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-slate-800">實作測試區</h3>
            <span class="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded font-mono">Count: {{ count }}</span>
          </div>
          <button 
            @click="count++" 
            class="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold transition-all shadow-md active:translate-y-0.5"
          >
            點我變更數據 (觸發 Update 掛鉤)
          </button>
        </div>

        <div class="p-6 bg-slate-900 rounded-xl shadow-inner min-h-[250px] relative">
          <h3 class="text-emerald-400 font-mono text-xs mb-4 flex justify-between">
            <span># 生命週期即時紀錄</span>
            <button @click="logs = []" class="hover:text-white underline">清空</button>
          </h3>
          <div class="space-y-2 font-mono text-[13px] h-[200px] overflow-y-auto pr-2 custom-scrollbar">
            <div v-for="(log, index) in logs" :key="index" class="text-emerald-200 border-b border-slate-800 pb-1">
              {{ log }}
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #1e293b;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 10px;
}
.lifecycle-view {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
