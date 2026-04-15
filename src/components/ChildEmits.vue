<!-- 路徑: src/components/ChildEmits.vue | 功能: 子組件示例，示範如何使用 defineEmits 向父組件發送自定義事件與資料回傳 -->
<script setup lang="ts">
import { ref } from 'vue'

// 定義自定義事件
const emit = defineEmits<{
  (e: 'change-name', name: string): void
  (e: 'reset-count'): void
}>()

// 區域變數儲存輸入的名稱
const localName = ref('')

const changeName = () => {
  // 如果輸入為空，不執行
  if (!localName.value.trim()) return
  emit('change-name', localName.value)
  // 傳送後清空
  localName.value = ''
}

const reset = () => {
  emit('reset-count')
}
</script>

<template>
  <div class="p-6 bg-emerald-50 border-2 border-emerald-100 rounded-2xl shadow-sm flex flex-col gap-4">
    <h4 class="font-bold text-emerald-800 mb-0 flex items-center gap-2">
      子組件 B (Emits)
    </h4>

    <div class="flex flex-col gap-3">
      <div class="flex gap-2">
        <input
          v-model="localName"
          @keyup.enter="changeName"
          type="text"
          placeholder="輸入回應訊息"
          class="flex-1 px-3 py-2 bg-white border-2 border-emerald-200 rounded-lg outline-none focus:border-emerald-500 text-slate-700 font-semibold text-xs transition-all shadow-inner"
        />
        <button
          @click="changeName"
          :disabled="!localName.trim()"
          class="text-xs px-4 py-2 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md"
        >
          送出改名
        </button>
      </div>

      <button
        @click="reset"
        class="text-xs px-3 py-2 bg-white border-2 border-emerald-300 text-emerald-700 font-bold rounded-lg hover:bg-emerald-100 transition-all active:scale-95 shadow-sm"
      >
        通知父組件重置計數
      </button>
    </div>

    <div class="mt-0 text-[10px] text-emerald-400 italic font-medium"># 資料流：Child -> Parent (事件驅動)</div>
  </div>
</template>
