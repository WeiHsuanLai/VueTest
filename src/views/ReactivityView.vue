<!-- 路徑: src/views/ReactivityView.vue | 功能: 解析響應式 API (ref vs reactive)，並示範 reactive 重新賦值導致響應性失效的常見陷阱 -->
<script setup lang="ts">
import { ref, reactive } from 'vue'

// --- 基礎練習變數 ---
const refCount = ref(0)
const reactiveUser = reactive({ name: '小明', age: 30 })

// --- 響應性陷阱實驗室變數 ---
// 我們必須用 let 才能示範重新賦值，但在實務中這就是問題所在
let trapUser = reactive({ name: '初始名稱', status: '正常' })
const correctUser = reactive({ name: '初始名稱', status: '正常' })

const updateRef = () => refCount.value++
const updateReactive = () => {
  reactiveUser.name = '已變更的 Reactive'
  reactiveUser.age++
}

// 證明失敗：直接重新賦值
const failReassign = () => {
  console.warn('執行：trapUser = { ... }')
  trapUser = reactive({ name: '嘗試重新賦值', status: '已斷開響應' })
  alert('變數 trapUser 已指向新物件，但 Vue 模板仍監控著舊的 Proxy，所以畫面不會動！')
}

// 證明成功：使用 Object.assign 或修改屬性
const successUpdate = () => {
  Object.assign(correctUser, { name: '正確更新', status: '響應正常' })
}
</script>

<template>
  <div class="reactivity-view space-y-10">
    <h1 class="text-3xl font-bold text-slate-800 border-b-2 border-emerald-500 pb-2">
      響應式 API：深度解析
    </h1>

    <!-- 1. 基礎對比區 (保持簡潔) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <h3 class="font-bold text-emerald-600 mb-4">ref() 的用法</h3>
        <p class="text-sm text-slate-500 mb-4">存取必須加 .value</p>
        <button @click="updateRef" class="px-4 py-2 bg-emerald-500 text-white rounded-lg">
          Count is: {{ refCount }}
        </button>
      </div>

      <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <h3 class="font-bold text-blue-600 mb-4">reactive() 的用法</h3>
        <p class="text-sm text-slate-500 mb-4">直接操作屬性即可</p>
        <button @click="updateReactive" class="px-4 py-2 bg-blue-500 text-white rounded-lg">
          User: {{ reactiveUser.name }} ({{ reactiveUser.age }})
        </button>
      </div>
    </div>

    <!-- 2. 核心實驗室：證明 reactive 重新賦值失效 -->
    <section class="p-8 bg-slate-900 rounded-2xl text-white shadow-2xl">
      <h2 class="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
        響應性陷阱實驗室 (The Reassignment Trap)
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <!-- 失敗組 -->
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span
              class="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/50 rounded-full text-xs"
              >失敗示範</span
            >
          </div>
          <div class="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <p class="text-sm text-slate-400 mb-2 font-mono">// 即使數據變了，畫面也不會更新</p>
            <p class="text-xl font-mono">
              Name: <span class="text-white">{{ trapUser.name }}</span>
            </p>
            <p class="text-xl font-mono">
              Status: <span class="text-red-400">{{ trapUser.status }}</span>
            </p>
          </div>
          <button
            @click="failReassign"
            class="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-all shadow-lg active:scale-95"
          >
            執行重新賦值 (trapUser = { ... })
          </button>
          <p class="text-xs text-slate-500 italic">點擊後，你會發現上面的文字死都不會動。</p>
        </div>

        <!-- 成功組 -->
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span
              class="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 rounded-full text-xs"
              >正確做法</span
            >
          </div>
          <div class="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <p class="text-sm text-slate-400 mb-2 font-mono">
              // 使用 Object.assign 保持原本的 Proxy
            </p>
            <p class="text-xl font-mono">
              Name: <span class="text-white">{{ correctUser.name }}</span>
            </p>
            <p class="text-xl font-mono">
              Status: <span class="text-emerald-400">{{ correctUser.status }}</span>
            </p>
          </div>
          <button
            @click="successUpdate"
            class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-bold transition-all shadow-lg active:scale-95"
          >
            正確更新 (Object.assign)
          </button>
          <p class="text-xs text-slate-500 italic">點擊後，Vue 能成功攔截到物件內部的屬性變化。</p>
        </div>
      </div>

      <div class="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
        <h4 class="text-emerald-400 font-bold mb-2">結論</h4>
        <p class="text-sm text-slate-300 leading-relaxed">
          Vue 的 <code>reactive</code> 就像是一個<b>「被監視的盒子」</b>。 當你執行
          <code>Object.assign</code> 時，你是在往同一個盒子裡換內容； 但當你執行
          <code>trapUser = { ... }</code> 時，你是拿了一個<b>「新的盒子」</b>給變數， 而 Vue
          仍然在盯著<b>「那個舊的盒子」</b>，所以它完全不知道內容已經被你換掉了。
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.reactivity-view {
  animation: slideIn 0.5s ease-out;
}
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
