<!-- 路徑: src/components/MiddleComponent.vue | 功能: 中間組件，作為橋樑將祖父的 $attrs 完整傳遞給孫子組件 -->
<script setup lang="ts">
import DeepChild from './DeepChild.vue'

// 1. 在 Vue 3 中，可以使用 inheritAttrs: false 禁用預設的屬性繼承 (如果要手動綁定)
// 在組合式 API 中如果不需要特別處理，直接 v-bind="$attrs" 即可
</script>

<template>
  <div class="p-6 bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl">
    <h4 class="font-bold text-slate-500 mb-4 text-xs uppercase tracking-widest">
      中轉組件 (MiddleComponent)
    </h4>
    <!-- 2. 將所有的屬性 ($attrs) 往下傳遞給孫子組件 -->
    <DeepChild v-bind="$attrs" />
    
    <p class="mt-4 text-[10px] text-slate-400 italic">
      我沒宣告 Props，只是當個路人把資料往下傳。
    </p>
  </div>
</template>
