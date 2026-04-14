<!-- 路徑: src/components/ChildProps.vue | 功能: 子組件示例，示範如何使用 defineProps 接收父組件傳遞的單向資料流 -->
<script setup lang="ts">
// 定義 Props，接收來自父組件的資料
defineProps<{
  msg: string
  count: number
}>()
</script>

<template>
  <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
    <h4 class="font-bold text-blue-800 mb-2">子組件 A (Props)</h4>
    <p class="text-sm text-blue-700">我收到的訊息：<span class="font-mono font-bold">{{ msg }}</span></p>
    <p class="text-sm text-blue-700">父組件目前的計數：<span class="font-mono font-bold">{{ count }}</span></p>
    <div class="mt-2 text-[10px] text-blue-400 italic"># 資料流：Parent -> Child (單向)</div>
  </div>
</template>
