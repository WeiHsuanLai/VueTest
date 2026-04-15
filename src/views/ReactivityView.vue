<!-- 路徑: src/views/ReactivityView.vue | 功能: 解析響應式 API (ref vs reactive) 的基礎用法與差異 -->
<script setup lang="ts">
import { ref, reactive } from 'vue'

// 定義 User 介面以確保型別安全，嚴禁使用 any
interface User {
  name: string
  age: number
}

// --- 基礎練習變數 ---
const refCount = ref<number>(0)
const reactiveUser = reactive<User>({ name: '小明', age: 30 })

const updateRef = (): void => {
  refCount.value++
}

const updateReactive = (): void => {
  reactiveUser.name = '已變更的 Reactive'
  reactiveUser.age++
}

// --- 程式碼範例字串 ---
const refCode = `import { ref } from 'vue'

// 定義一個響應式的數字
const refCount = ref<number>(0)

const updateRef = (): void => {
  // 在 script 中透過 .value 進行遞增
  refCount.value++
}`

const reactiveCode = `import { reactive } from 'vue'

interface User { name: string; age: number }

// 定義一個具有深度響應性的物件
const reactiveUser = reactive<User>({
  name: '小明',
  age: 30
})

const updateReactive = (): void => {
  // 直接修改屬性，不需要 .value
  reactiveUser.name = '已變更的 Reactive'
  reactiveUser.age++
}`

// 複製功能
const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text)
    alert('程式碼已複製到剪貼簿！')
  } catch (err) {
    console.error('複製失敗:', err)
  }
}
</script>

<template>
  <!-- 使用 flex flex-col 與 gap 確保各個區塊之間有緊湊的空隙 -->
  <div class="reactivity-view max-w-5xl mx-auto p-12 flex flex-col gap-12">
    <!-- 1. 標題區 -->
    <div class="text-center space-y-4">
      <h1 class="text-5xl font-extrabold text-slate-900 tracking-tight">響應式 API 基礎對比</h1>
      <p class="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
        理解 Vue 3 核心的
        <code
          class="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-emerald-600 mx-1"
          >ref</code
        >
        與
        <code class="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-blue-600 mx-1"
          >reactive</code
        >
        兩種定義響應式數據的方式。
      </p>
    </div>

    <!-- 2. 基礎對比區 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- ref 卡片 -->
      <div
        class="group relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
      >
        <div
          class="absolute -top-4 left-8 px-4 py-1 bg-emerald-500 text-white text-sm font-bold rounded-full shadow-lg"
        >
          精簡型：ref()
        </div>
        <div class="space-y-6">
          <div class="space-y-2">
            <h3 class="text-2xl font-bold text-slate-800">基本型別的首選</h3>
            <p class="text-slate-500 text-sm leading-relaxed">
              適合處理數字、字串、布林值。在 Script 中必須使用
              <code class="px-1 py-0.5 bg-slate-100 rounded text-emerald-600 font-mono"
                >.value</code
              >
              存取，但在 Template 中會自動解包。
            </p>
          </div>
          <div
            class="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100"
          >
            <div class="space-y-1">
              <p class="text-xs uppercase tracking-widest text-slate-400 font-bold">當前數值</p>
              <p class="font-mono text-3xl text-emerald-600 font-black">{{ refCount }}</p>
            </div>
            <button
              @click="updateRef"
              class="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
            >
              增加數值
            </button>
          </div>
          <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <p class="text-xs text-emerald-700 leading-relaxed font-medium">
              💡 提示：雖然
              <code class="text-emerald-900 font-bold">ref</code>
              也能包裝物件，但通常建議用於單一變數。
            </p>
          </div>
        </div>
      </div>

      <!-- reactive 卡片 -->
      <div
        class="group relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
      >
        <div
          class="absolute -top-4 left-8 px-4 py-1 bg-blue-500 text-white text-sm font-bold rounded-full shadow-lg"
        >
          物件型：reactive()
        </div>
        <div class="space-y-6">
          <div class="space-y-2">
            <h3 class="text-2xl font-bold text-slate-800">複雜物件的首選</h3>
            <p class="text-slate-500 text-sm leading-relaxed">
              專為物件、陣列設計。不需要使用
              <code class="px-1 py-0.5 bg-slate-100 rounded text-blue-600 font-mono">.value</code
              >，操作起來就像原生 JavaScript 物件，具有深度響應性。
            </p>
          </div>
          <div
            class="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100"
          >
            <div class="space-y-1">
              <p class="text-xs uppercase tracking-widest text-slate-400 font-bold">使用者資料</p>
              <p class="font-mono text-xl text-blue-600 font-black">{{ reactiveUser.name }}</p>
              <p class="text-sm text-slate-500">年齡：{{ reactiveUser.age }}</p>
            </div>
            <button
              @click="updateReactive"
              class="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
            >
              更新資料
            </button>
          </div>
          <div class="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p class="text-xs text-blue-700 leading-relaxed font-medium">
              💡 提示：<code class="text-blue-900 font-bold">reactive</code> 無法處理基本型別（如
              string, number）。
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. 總結卡片 -->
    <div
      class="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl overflow-hidden relative border border-slate-800"
    >
      <div
        class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-2xl"
      ></div>
      <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div
          class="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl shadow-lg"
        >
          📝
        </div>
        <div class="space-y-2">
          <h4 class="text-xl font-bold text-emerald-400">該選哪一個？</h4>
          <p class="text-slate-400 text-sm leading-relaxed">
            對於簡單的狀態（如 <code class="text-white font-mono">count</code>,
            <code class="text-white font-mono">isOpen</code>），請使用 <strong>ref</strong>。<br />
            對於多個相關聯的屬性組成的物件（如 <code class="text-white font-mono">formState</code>,
            <code class="text-white font-mono">userData</code>），請優先考慮
            <strong>reactive</strong>。
          </p>
        </div>
      </div>
    </div>

    <!-- 4. VitePress 風格範例區 -->
    <div class="flex flex-col gap-10 border-t border-slate-100 pt-10">
      <div class="space-y-4">
        <h2 class="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <span
            class="w-8 h-8 bg-slate-800 text-white rounded-lg flex items-center justify-center text-sm"
            >💡</span
          >
          實作程式碼範例
        </h2>
        <p class="text-slate-500">以下是 VitePress 風格的實作參考：</p>
      </div>

      <!-- ref 範例 -->
      <div class="space-y-4">
        <div class="flex items-center gap-2 text-emerald-600 font-bold font-mono">
          <span>#</span> 使用 ref() 定義基本型別
        </div>
        <div
          class="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800 relative group/code"
        >
          <div
            class="px-4 py-2 bg-slate-800 border-b border-slate-700 flex justify-between items-center"
          >
            <span class="text-xs text-slate-400 font-mono">ReactivityView.vue</span>
            <div class="flex items-center gap-3">
              <span class="text-xs text-slate-500 font-mono">typescript</span>
              <button
                @click="copyToClipboard(refCode)"
                class="transition-all p-1.5 hover:bg-slate-700 rounded-md text-xs text-slate-300 font-bold border border-slate-600 flex items-center gap-1 shadow-sm"
              >
                📋 複製
              </button>
            </div>
          </div>
          <!-- 使用 pre + code 組合，確保格式化與換行被保留 -->
          <pre
            class="p-6 overflow-x-auto text-sm leading-relaxed font-mono text-white"
          ><code><span class="text-emerald-400">import</span> { ref } from 'vue'

<span class="text-slate-500">// 定義一個響應式的數字</span>
<span class="text-emerald-400">const</span> <span class="text-blue-400">refCount</span> = ref&lt;number&gt;(0)

<span class="text-emerald-400">const</span> <span class="text-yellow-400">updateRef</span> = (): void =&gt; {
  <span class="text-slate-500">// 在 script 中透過 .value 進行遞增</span>
  <span class="text-blue-400">refCount</span>.value++
}</code></pre>
        </div>
        <!-- 模仿 VitePress ::: tip -->
        <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl">
          <p class="text-sm text-emerald-800 font-bold mb-1">提示</p>
          <p class="text-xs text-emerald-700 leading-relaxed">
            在 Template 中使用時，Vue 會自動幫你「解包」，所以不需要寫成
            <code class="px-1 py-0.5 bg-emerald-100/50 rounded text-emerald-800 font-mono"
              >refCount.value</code
            >。
          </p>
        </div>
      </div>

      <!-- reactive 範例 -->
      <div class="space-y-4">
        <div class="flex items-center gap-2 text-blue-600 font-bold font-mono">
          <span>#</span> 使用 reactive() 定義物件型別
        </div>
        <div
          class="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800 relative group/code"
        >
          <div
            class="px-4 py-2 bg-slate-800 border-b border-slate-700 flex justify-between items-center"
          >
            <span class="text-xs text-slate-400 font-mono">ReactivityView.vue</span>
            <div class="flex items-center gap-3">
              <span class="text-xs text-slate-500 font-mono">typescript</span>
              <button
                @click="copyToClipboard(reactiveCode)"
                class="transition-all p-1.5 hover:bg-slate-700 rounded-md text-xs text-slate-300 font-bold border border-slate-600 flex items-center gap-1 shadow-sm"
              >
                📋 複製
              </button>
            </div>
          </div>
          <!-- 使用 pre + code 組合，確保格式化與換行被保留 -->
          <pre
            class="p-6 overflow-x-auto text-sm leading-relaxed font-mono text-white"
          ><code><span class="text-emerald-400">import</span> { reactive } from 'vue'

<span class="text-emerald-400">interface</span> <span class="text-yellow-400">User</span> { name: string; age: number }

<span class="text-slate-500">// 定義一個具有深度響應性的物件</span>
<span class="text-emerald-400">const</span> <span class="text-blue-400">reactiveUser</span> = reactive&lt;User&gt;({
  name: <span class="text-orange-400">'小明'</span>,
  age: <span class="text-orange-400">30</span>
})

<span class="text-emerald-400">const</span> <span class="text-yellow-400">updateReactive</span> = (): void =&gt; {
  <span class="text-slate-500">// 直接修改屬性，不需要 .value</span>
  <span class="text-blue-400">reactiveUser</span>.name = <span class="text-orange-400">'已變更的 Reactive'</span>
  <span class="text-blue-400">reactiveUser</span>.age++
}</code></pre>
        </div>
        <!-- 模仿 VitePress ::: warning -->
        <div class="p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-xl">
          <p class="text-sm text-orange-800 font-bold mb-1">警告</p>
          <p class="text-xs text-orange-700 leading-relaxed">
            <code class="px-1 py-0.5 bg-orange-100/50 rounded text-orange-800 font-mono font-bold"
              >reactive</code
            >
            僅適用於物件、陣列。若要重新賦值整個物件，請使用
            <code class="px-1 py-0.5 bg-orange-100/50 rounded text-orange-800 font-mono"
              >Object.assign</code
            >。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 使用 Tailwind CSS 處理所有樣式 */
</style>
