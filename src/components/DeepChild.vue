<!-- 路徑: src/components/DeepChild.vue | 功能: 孫子組件示例，直接透過 $attrs 接收來自祖父組件的資料與事件 -->
<script setup lang="ts">
import { useAttrs } from 'vue'

// 在組合式 API 中可以使用 useAttrs 存取 $attrs
const attrs = useAttrs()
</script>

<template>
  <div class="p-6 bg-rose-50 border border-rose-200 rounded-2xl shadow-sm">
    <h4 class="font-bold text-rose-800 mb-3 flex items-center gap-2">
      👧 孫子組件 (DeepChild)
    </h4>
    <div class="space-y-2 text-sm text-rose-700 font-mono">
      <p>來自祖父的資料: <span class="font-bold underline">{{ attrs.msg }}</span></p>
      <p>來自祖父的計數: <span class="font-bold underline">{{ attrs.count }}</span></p>
    </div>
    
    <button 
      @click="($emit as any)('reset')" 
      class="mt-4 w-full py-2 bg-rose-500 text-white rounded-lg shadow-sm font-bold text-xs"
    >
      通知祖父重置 (透過 $attrs)
    </button>
  </div>
</template>
