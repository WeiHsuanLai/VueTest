<!-- 路徑: src/components/ChildEmits.vue | 功能: 子組件示例，示範如何使用 defineEmits 向父組件發送自定義事件與資料回傳 -->
<script setup lang="ts">
// 定義自定義事件
const emit = defineEmits<{
  (e: 'change-name', name: string): void
  (e: 'reset-count'): void
}>()

const changeName = () => {
  emit('change-name', '來自子組件的新名字')
}

const reset = () => {
  emit('reset-count')
}
</script>

<template>
  <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
    <h4 class="font-bold text-emerald-800 mb-2">子組件 B (Emits)</h4>
    <div class="flex flex-col gap-2">
      <button 
        @click="changeName" 
        class="text-xs px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
      >
        通知父組件改名
      </button>
      <button 
        @click="reset" 
        class="text-xs px-3 py-1 bg-white border border-emerald-300 text-emerald-600 rounded hover:bg-emerald-100 transition-colors"
      >
        通知父組件重置計數
      </button>
    </div>
    <div class="mt-2 text-[10px] text-emerald-400 italic"># 資料流：Child -> Parent (事件驅動)</div>
  </div>
</template>
