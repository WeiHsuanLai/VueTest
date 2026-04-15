<!-- 路徑: src/views/AdvancedCommunicationView.vue | 功能: 展示 Template Refs 與 defineExpose 的進階父子組件通信 -->
<script setup lang="ts">
import { ref } from 'vue'
import ChildRef from '../components/ChildRef.vue'

// 1. 使用 InstanceType 取得子組件實例的正確型別，避免使用 any
const childRef = ref<InstanceType<typeof ChildRef> | null>(null)

// 2. 存取子組件資料
const getChildData = () => {
  if (childRef.value) {
    // 現在 TypeScript 知道 childRef.value 裡面有 childName
    alert(`獲取子組件資料: ${childRef.value.childName}`)
  }
}

// 3. 呼叫子組件方法
const callChildMethod = () => {
  // 現在 TypeScript 知道 childRef.value 裡面有 showAlert
  childRef.value?.showAlert()
}
</script>

<template>
  <div class="advanced-view space-y-8">
    <h1 class="text-3xl font-bold text-slate-800 border-b-2 border-purple-500 pb-2">
      進階通信：Template Refs & $parent
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- 父組件操作區 -->
      <section class="p-8 bg-slate-50 border rounded-2xl shadow-sm">
        <h3 class="font-bold text-slate-700 mb-6">父組件操作台</h3>
        <div class="flex flex-col gap-3">
          <button 
            @click="getChildData" 
            class="px-4 py-3 bg-indigo-500 text-white rounded-xl shadow-md hover:bg-indigo-600 transition-all active:scale-95 text-left"
          >
            獲取子組件資料 (Ref 讀取)
          </button>
          <button 
            @click="callChildMethod" 
            class="px-4 py-3 bg-emerald-500 text-white rounded-xl shadow-md hover:bg-emerald-600 transition-all active:scale-95 text-left"
          >
            呼叫子組件方法 (Ref 執行)
          </button>
        </div>
        
        <div class="mt-10 p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <p class="text-xs text-slate-400 font-mono mb-2"># 練習筆記</p>
          <p class="text-sm text-slate-600 leading-relaxed">
            在 Vue 3 組合式 API 中，子組件預設是「封閉」的。父組件若想透過 <code>ref</code> 存取子組件內部的資料或方法，子組件必須主動使用 <code>defineExpose</code> 進行公開。
          </p>
        </div>
      </section>

      <!-- 子組件實體 -->
      <section class="space-y-4">
        <h3 class="font-bold text-slate-400 uppercase text-xs tracking-widest">子組件渲染區</h3>
        <!-- 使用 ref 綁定子組件實例 -->
        <ChildRef ref="childRef" />
        
        <div class="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs mt-6 italic leading-relaxed">
          <strong>關於 $parent：</strong> <br>
          在子組件中可以使用 <code>getCurrentInstance()</code> 取得 <code>$parent</code> 來存取父組件實例。但這種做法會造成強耦合（組件必須放在特定父組件下才能運作），一般不建議在正式專案中使用。
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.advanced-view {
  animation: slideIn 0.5s ease-out;
}
@keyframes slideIn {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
</style>
