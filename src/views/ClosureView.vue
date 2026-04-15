<!-- 路徑: src/views/ClosureView.vue | 功能: 解析 JavaScript 閉包 (Closure) 的概念，並示範純 JS 閉包如何與 Vue 響應式橋接以更新 UI -->
<script setup lang="ts">
import { ref } from 'vue'

// 定義閉包實例的型別結構
interface CounterInstance {
  getName: () => string
  getValue: () => number
  increment: () => number
}

// 定義列表項目的型別結構
interface CounterItem {
  name: string
  displayValue: number
  instance: CounterInstance
}

// --- 閉包核心邏輯 (純 JavaScript) ---
function createCounter(name: string): CounterInstance {
  let count = 0
  return {
    getName: () => name,
    getValue: () => count,
    increment: () => {
      count++
      return count
    },
  }
}

// --- Vue 響應式橋樑 ---
const counterList = ref<CounterItem[]>([])
const newCounterName = ref<string>('')

const addNewCounter = (): void => {
  if (!newCounterName.value) return

  // 1. 建立純 JS 閉包實例
  const instance = createCounter(newCounterName.value)

  // 2. 將實例與一個「響應式變數 (displayValue)」綁定在一起存入清單
  counterList.value.push({
    name: instance.getName(),
    displayValue: instance.getValue(),
    instance: instance,
  })

  newCounterName.value = ''
}

const handleIncrement = (index: number): void => {
  const item = counterList.value[index]

  // 加入檢查，確保項目存在
  if (!item) return

  // 3. 執行閉包內部的邏輯
  const newValue = item.instance.increment()

  // 4. 更新「響應式變數」，觸發畫面更新
  item.displayValue = newValue

  console.log(`[閉包更新] ${item.name} 目前內部私有值為: ${newValue}`)
}

// --- 範例展示邏輯 (參考 ReactivityView.vue) ---
const langMode = ref<'ts' | 'js'>('ts')

// 複製功能
const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text)
    alert('程式碼已複製到剪貼簿')
  } catch (err) {
    console.error('複製失敗:', err)
  }
}

// --- 程式碼範例 ---
const closureCodeTS = `// 1. 定義閉包邏輯 (純 TS)
function createCounter(name: string) {
  let count = 0 // 私有變數
  return {
    getName: () => name,
    increment: () => ++count
  }
}

// 2. 在 Vue 組件中使用
const counterList = ref<CounterItem[]>([])

const addNewCounter = (name: string) => {
  const instance = createCounter(name)
  // 將實例與響應式屬性封裝
  counterList.value.push({
    name: instance.getName(),
    displayValue: 0,
    instance
  })
}

const handleIncrement = (index: number) => {
  const item = counterList.value[index]
  // 呼叫閉包方法並手動更新 Vue 的響應式值
  item.displayValue = item.instance.increment()
}`

const closureCodeJS = `// 1. 定義閉包邏輯 (純 JS)
function createCounter(name) {
  let count = 0
  return {
    getName: () => name,
    increment: () => ++count
  }
}

// 2. 在 Vue 組件中使用
const counterList = ref([])

const addNewCounter = (name) => {
  const instance = createCounter(name)
  counterList.push({
    name: instance.getName(),
    displayValue: 0,
    instance
  })
}

const handleIncrement = (index) => {
  const item = counterList.value[index]
  item.displayValue = item.instance.increment()
}`

const closureHTML_TS = `<span class="text-slate-500">// 1. 定義閉包邏輯 (純 TS)</span>
<span class="text-emerald-400">function</span> <span class="text-yellow-400">createCounter</span>(name: string) {
  <span class="text-emerald-400">let</span> <span class="text-blue-400">count</span> = 0 <span class="text-slate-500">// 私有變數</span>
  <span class="text-emerald-400">return</span> {
    getName: () => name,
    increment: () => ++<span class="text-blue-400">count</span>
  }
}

<span class="text-slate-500">// 2. 在 Vue 組件中使用</span>
<span class="text-emerald-400">const</span> <span class="text-blue-400">counterList</span> = ref&lt;<span class="text-yellow-400">CounterItem</span>[]&gt;([])

<span class="text-emerald-400">const</span> <span class="text-yellow-400">handleIncrement</span> = (index: number) => {
  <span class="text-emerald-400">const</span> <span class="text-blue-400">item</span> = counterList.value[index]
  <span class="text-slate-500">// 呼叫閉包方法並手動更新 Vue 的響應式值</span>
  <span class="text-blue-400">item</span>.displayValue = <span class="text-blue-400">item</span>.instance.increment()
}`

const closureHTML_JS = `<span class="text-slate-500">// 1. 定義閉包邏輯 (純 JS)</span>
<span class="text-emerald-400">function</span> <span class="text-yellow-400">createCounter</span>(name) {
  <span class="text-emerald-400">let</span> <span class="text-blue-400">count</span> = 0
  <span class="text-emerald-400">return</span> {
    getName: () => name,
    increment: () => ++<span class="text-blue-400">count</span>
  }
}

<span class="text-slate-500">// 2. 在 Vue 組件中使用</span>
<span class="text-emerald-400">const</span> <span class="text-blue-400">counterList</span> = ref([])

<span class="text-emerald-400">const</span> <span class="text-yellow-400">handleIncrement</span> = (index) => {
  <span class="text-emerald-400">const</span> <span class="text-blue-400">item</span> = counterList.value[index]
  <span class="text-blue-400">item</span>.displayValue = <span class="text-blue-400">item</span>.instance.increment()
}`
</script>

<template>
  <div class="closure-view max-w-7xl mx-auto p-12 flex flex-col gap-12 text-slate-900 font-sans">
    <!-- 1. 標題區 -->
    <div class="text-center space-y-4">
      <h1 class="text-5xl font-extrabold tracking-tight">JavaScript 閉包實踐</h1>
      <p class="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
        理解
        <code
          class="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-indigo-600 font-mono"
          >Closure</code
        >
        如何保護私有變數，以及如何與 Vue 的響應式系統協作。
      </p>
    </div>

    <!-- 2. 核心展示區 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 2a. 理念說明 -->
      <section class="flex flex-col gap-6">
        <div
          class="group relative bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <div
            class="absolute -top-3 left-6 px-3 py-0.5 bg-indigo-500 text-white text-[10px] font-bold rounded-full shadow-lg"
          >
            核心理念
          </div>
          <div class="prose prose-slate max-w-none">
            <h2 class="text-2xl font-bold text-indigo-800 mb-4">為什麼需要「橋樑」？</h2>
            <p class="text-slate-600 text-sm leading-relaxed mb-4">
              純 JavaScript 的閉包變數是<strong>「隱形」</strong>的。Vue 的監控系統（Proxy）看不到函式內部的
              <code class="text-indigo-600 font-mono">let count</code>。
            </p>
            <div class="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
              <p class="text-indigo-900 text-xs font-medium leading-relaxed">
                💡 <strong>關鍵實作：</strong><br />
                為了讓畫面更新，我們必須在點擊時，將閉包計算後的結果
                <strong class="text-indigo-700">「主動賦值」</strong> 給 Vue 的響應式變數（如
                <code class="text-indigo-700">displayValue</code>）。
              </p>
            </div>
          </div>
        </div>

        <!-- 閉包特性清單 -->
        <div class="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-2xl">
          <h4 class="text-sm font-bold text-indigo-400 mb-4 uppercase tracking-widest">
            閉包的三大特性
          </h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <span class="w-5 h-5 bg-indigo-500/20 rounded flex items-center justify-center text-indigo-400 text-xs mt-0.5 font-bold">1</span>
              <div>
                <p class="text-sm font-bold">封裝私有性</p>
                <p class="text-xs text-slate-400">外部無法直接存取內部的變數狀態。</p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-5 h-5 bg-indigo-500/20 rounded flex items-center justify-center text-indigo-400 text-xs mt-0.5 font-bold">2</span>
              <div>
                <p class="text-sm font-bold">狀態持久化</p>
                <p class="text-xs text-slate-400">即使外部函式執行完畢，內部變數依然存在記憶體中。</p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-5 h-5 bg-indigo-500/20 rounded flex items-center justify-center text-indigo-400 text-xs mt-0.5 font-bold">3</span>
              <div>
                <p class="text-sm font-bold">工廠模式</p>
                <p class="text-xs text-slate-400">可以根據不同參數生成多個獨立的狀態實例。</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- 2b. 實驗室 -->
      <section
        class="group relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
      >
        <div
          class="absolute -top-3 left-6 px-3 py-0.5 bg-slate-800 text-white text-[10px] font-bold rounded-full shadow-lg"
        >
          閉包與 VUE 協作實驗室
        </div>
        <div class="space-y-6">
          <div class="flex gap-2">
            <input
              v-model="newCounterName"
              @keyup.enter="addNewCounter"
              type="text"
              placeholder="給計數器一個名字..."
              class="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm"
            />
            <button
              @click="addNewCounter"
              class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-2xl transition-all shadow-md active:scale-95"
            >
              建立實例
            </button>
          </div>

          <!-- 實例清單 -->
          <div class="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            <div v-if="counterList.length === 0" class="text-center py-12 border-2 border-dashed border-slate-100 rounded-3xl">
              <p class="text-slate-400 text-xs font-medium">尚未建立任何閉包實例</p>
            </div>
            <div
              v-for="(item, index) in counterList"
              :key="index"
              class="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center group/item hover:bg-indigo-50/50 hover:border-indigo-100 transition-all"
            >
              <div>
                <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{{ item.name }}</span>
                <p class="text-3xl font-mono font-black text-slate-800">
                  {{ item.displayValue }}
                </p>
              </div>
              <button
                @click="handleIncrement(index)"
                class="px-5 py-2.5 bg-white text-indigo-600 border border-indigo-200 text-xs font-black rounded-xl shadow-sm hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all active:scale-90"
              >
                +1 (執行閉包)
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 3. VitePress 風格範例區 -->
    <div class="flex flex-col gap-10 border-t border-slate-100 pt-10">
      <div class="space-y-2">
        <h2 class="text-3xl font-black text-slate-800 tracking-tight">實作範例</h2>
        <p class="text-slate-500 font-medium text-sm italic">查看閉包邏輯如何封裝，並與 Vue 屬性進行手動同步</p>
      </div>

      <div class="flex flex-col gap-8">
        <div class="space-y-4">
          <div
            class="flex items-center gap-2 text-indigo-600 font-bold font-mono text-sm uppercase tracking-tighter"
          >
            <span>#</span> 閉包邏輯與 Vue 橋接實作
          </div>
          <div
            class="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative group/code"
          >
            <div
              class="px-6 py-3 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center text-[10px] font-mono"
            >
              <span class="text-slate-400">ClosureView.vue</span>
              <div class="flex items-center gap-3">
                <div class="flex bg-slate-900 p-0.5 rounded-xl border border-slate-700">
                  <button
                    @click="langMode = 'ts'"
                    :class="[
                      langMode === 'ts'
                        ? 'bg-indigo-500 text-white'
                        : 'text-slate-500 hover:text-slate-300',
                    ]"
                    class="px-3 py-1 rounded-lg text-[8px] font-bold uppercase transition-all"
                  >
                    TS
                  </button>
                  <button
                    @click="langMode = 'js'"
                    :class="[
                      langMode === 'js'
                        ? 'bg-blue-500 text-white'
                        : 'text-slate-500 hover:text-slate-300',
                    ]"
                    class="px-3 py-1 rounded-lg text-[8px] font-bold uppercase transition-all"
                  >
                    JS
                  </button>
                </div>
                <button
                  @click="copyToClipboard(langMode === 'ts' ? closureCodeTS : closureCodeJS)"
                  class="px-3 py-1.5 hover:bg-slate-700 rounded-lg text-slate-300 font-bold border border-slate-600 transition-all text-[9px]"
                >
                  複製
                </button>
              </div>
            </div>
            <pre class="code-pre" v-html="langMode === 'ts' ? closureHTML_TS : closureHTML_JS"></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
@reference "../assets/main.css";

.code-pre {
  @apply p-8 overflow-x-auto text-sm leading-relaxed font-mono text-white;
  white-space: pre !important;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 rounded-full;
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  @apply bg-slate-300;
}
</style>
