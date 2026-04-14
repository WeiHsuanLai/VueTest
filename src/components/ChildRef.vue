<!-- 路徑: src/components/ChildRef.vue | 功能: 演示 defineExpose 與 $parent 存取 -->
<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'

const childName = ref('我是子組件的私有資料')

// 子組件內部的方法
const showAlert = () => {
  alert('父組件成功呼叫了子組件的方法！')
}

// ⚠️ 存取父組件 (不推薦，僅作教學示範)
const accessParent = () => {
  const instance = getCurrentInstance()
  // @ts-ignore - $parent 在 TS 中需要較複雜的型別定義
  const parentName = instance?.proxy?.$parent?.$.type.__name
  alert(`我的父組件檔案名稱是: ${parentName}`)
}

// 重要：必須公開 (Expose) 才能讓父組件透過 Ref 存取
defineExpose({
  childName,
  showAlert
})
</script>

<template>
  <div class="p-6 bg-purple-50 border border-purple-200 rounded-xl shadow-sm">
    <h4 class="font-bold text-purple-800 mb-2 font-mono">ChildRef.vue</h4>
    <p class="text-sm text-purple-600 mb-4">
      私有狀態：<span class="font-bold underline">{{ childName }}</span>
    </p>
    <button 
      @click="accessParent" 
      class="text-xs px-3 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-colors"
    >
      🧪 點我：透過 $parent 探測父組件
    </button>
  </div>
</template>
