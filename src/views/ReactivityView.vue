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

// --- ref 包裝物件範例 ---
const refUser = ref<User>({ name: '初始小華', age: 25 })
const refLogs = ref<string[]>([])

const addRefLog = (msg: string): void => {
  const time = new Date().toLocaleTimeString()
  refLogs.value.unshift(`[${time}] ${msg}`)
  if (refLogs.value.length > 5) refLogs.value.pop()
}

const updateRef = (): void => {
  refCount.value++
}

const updateReactive = (): void => {
  reactiveUser.name = '已變更的 Reactive'
  reactiveUser.age++
}

const updateRefProp = (): void => {
  // 修改屬性：盒子沒換，內容變了
  refUser.value.name = '小華 (僅修改名稱)'
  addRefLog(`📝 修改屬性: name = '小華 (僅修改名稱)'`)
}

const replaceRefObj = (): void => {
  // 替換物件：直接拿一個新盒子過來
  refUser.value = { name: '全新物件 (完全替換)', age: 99 }
  addRefLog(`🔄 替換整個物件: { name: '全新物件', age: 99 }`)
  addRefLog(`✅ 證明：UI 立即同步更新，因為 ref 的「外殼」沒變。`)
}

const updateAfterReplace = (): void => {
  refUser.value.name = '替換後再修改'
  refUser.value.age--
  addRefLog(`✨ 替換後再次修改屬性: ${refUser.value.name} (${refUser.value.age}歲)`)
  addRefLog(`🔥 結論：ref 依然精準連動！`)
}

// --- 範例切換狀態 ---
const langMode = ref<'ts' | 'js'>('ts')

// --- TypeScript 原始碼 (供複製) ---
const refCodeTS = `import { ref } from 'vue'

const refCount = ref<number>(0)

const updateRef = (): void => {
  refCount.value++
}`

const refObjCodeTS = `import { ref } from 'vue'

interface User { name: string; age: number }

const refUser = ref<User>({ name: '小華', age: 25 })

// 1. 修改內部屬性 (盒子沒換)
const updateProp = (): void => {
  refUser.value.name = '小華 (僅修改名稱)'
}

// 2. 替換整個物件 (拿新盒子)
const replaceObj = (): void => {
  refUser.value = { name: '全新物件', age: 99 }
}`

const reactiveCodeTS = `import { reactive } from 'vue'

interface User { name: string; age: number }

const reactiveUser = reactive<User>({ name: '小明', age: 30 })

const updateReactive = (): void => {
  // 直接修改屬性
  reactiveUser.name = '已更新'
  reactiveUser.age++
}`

const reactiveLostCodeTS = `import { reactive } from 'vue'

let state = reactive({ count: 0 })

// ❌ 錯誤：重新賦值會失去響應
const fail = () => {
  state = { count: 99 } // UI 不會更新！
}

// ✅ 正確：應使用 ref 或修改屬性
const correct = () => {
  state.count = 99
}`

// --- JavaScript 原始碼 (供複製) ---
const refCodeJS = `import { ref } from 'vue'

const refCount = ref(0)

const updateRef = () => {
  refCount.value++
}`

const refObjCodeJS = `import { ref } from 'vue'

const refUser = ref({ name: '小華', age: 25 })

// 1. 修改內部屬性
const updateProp = () => {
  refUser.value.name = '小華 (僅修改名稱)'
}

// 2. 替換整個物件
const replaceObj = () => {
  refUser.value = { name: '全新物件', age: 99 }
}`

const reactiveCodeJS = `import { reactive } from 'vue'

const reactiveUser = reactive({
  name: '小明',
  age: 30
})

const updateReactive = () => {
  reactiveUser.name = '已更新'
  reactiveUser.age++
}`

const reactiveLostCodeJS = `import { reactive } from 'vue'

let state = reactive({ count: 0 })

const fail = () => {
  state = { count: 99 }
}`

// --- 語法高亮 HTML 內容 (供顯示) ---
const refHTML_TS = `<span class="text-emerald-400">import</span> { ref } from 'vue'

<span class="text-emerald-400">const</span> <span class="text-blue-400">refCount</span> = ref&lt;number&gt;(0)

<span class="text-emerald-400">const</span> <span class="text-yellow-400">updateRef</span> = (): void => {
  <span class="text-blue-400">refCount</span>.value++
}`

const refObjHTML_TS = `<span class="text-emerald-400">import</span> { ref } from 'vue'

<span class="text-emerald-400">interface</span> <span class="text-yellow-400">User</span> { name: string; age: number }

<span class="text-slate-500">// 1. 修改屬性 (盒子沒換)</span>
<span class="text-blue-400">refUser</span>.value.name = <span class="text-orange-400">'已修改名稱'</span>

<span class="text-slate-500">// 2. 替換整個物件 (拿新盒子)</span>
<span class="text-blue-400">refUser</span>.value = { name: <span class="text-orange-400">'全新物件'</span>, age: <span class="text-orange-400">99</span> }`

const reactiveHTML_TS = `<span class="text-emerald-400">import</span> { reactive } from 'vue'

<span class="text-emerald-400">const</span> <span class="text-blue-400">reactiveUser</span> = reactive({ name: <span class="text-orange-400">'小明'</span>, age: <span class="text-orange-400">30</span> })

<span class="text-emerald-400">const</span> <span class="text-yellow-400">updateReactive</span> = (): void => {
  <span class="text-blue-400">reactiveUser</span>.name = <span class="text-orange-400">'已更新'</span>
}`

const reactiveLostHTML_TS = `<span class="text-emerald-400">import</span> { reactive } from 'vue'

<span class="text-emerald-400">let</span> <span class="text-blue-400">state</span> = reactive({ count: 0 })

<span class="text-slate-500">// ❌ 重新賦值導致失去響應</span>
<span class="text-emerald-400">const</span> <span class="text-yellow-400">fail</span> = () => {
  <span class="text-blue-400">state</span> = { count: 99 }
}`

const refHTML_JS = `<span class="text-emerald-400">import</span> { ref } from 'vue'

<span class="text-emerald-400">const</span> <span class="text-blue-400">refCount</span> = ref(0)

<span class="text-emerald-400">const</span> <span class="text-yellow-400">updateRef</span> = () => {
  <span class="text-blue-400">refCount</span>.value++
}`

const refObjHTML_JS = `<span class="text-emerald-400">import</span> { ref } from 'vue'

<span class="text-emerald-400">const</span> <span class="text-blue-400">refUser</span> = ref({ name: <span class="text-orange-400">'小華'</span>, age: <span class="text-orange-400">25</span> })

<span class="text-blue-400">refUser</span>.value = { name: <span class="text-orange-400">'全新物件'</span>, age: <span class="text-orange-400">99</span> }`

const reactiveHTML_JS = `<span class="text-emerald-400">import</span> { reactive } from 'vue'

<span class="text-emerald-400">const</span> <span class="text-blue-400">reactiveUser</span> = reactive({ name: <span class="text-orange-400">'小明'</span>, age: <span class="text-orange-400">30</span> })

<span class="text-emerald-400">const</span> <span class="text-yellow-400">updateReactive</span> = () => {
  <span class="text-blue-400">reactiveUser</span>.name = <span class="text-orange-400">'已更新'</span>
}`

const reactiveLostHTML_JS = `<span class="text-emerald-400">import</span> { reactive } from 'vue'

<span class="text-emerald-400">let</span> <span class="text-blue-400">state</span> = reactive({ count: 0 })

<span class="text-blue-400">state</span> = { count: 99 }`

// --- 失去響應實作變數 ---
let reactiveLost = reactive<User>({ name: '測試員', age: 10 })
const operationLogs = ref<string[]>([])

const addLog = (msg: string): void => {
  const time = new Date().toLocaleTimeString()
  operationLogs.value.unshift(`[${time}] ${msg}`)
  if (operationLogs.value.length > 5) operationLogs.value.pop()
}

const triggerReassign = (): void => {
  // ts-expect-error - 故意展示錯誤用法
  reactiveLost = { name: '重新賦值後', age: 88 }
  addLog(`❌ 已重新賦值為: { name: '重新賦值後', age: 88 }`)
  addLog(`⚠️ 注意：UI 上的資料不會更新，因為它仍連結在「舊盒子」上。`)
}

const triggerUpdateNoLog = (): void => {
  reactiveLost.name = '純粹更新 (無日誌)'
  reactiveLost.age++
  // 因為沒有 addLog，這是一個純粹的變數更新
  // 在失去響應後，你會看到 UI 完全沒有反應
}

const triggerUpdateAfterReassign = (): void => {
  reactiveLost.name = '試圖更新 (帶日誌)'
  reactiveLost.age++
  addLog(`📝 JS 記憶體中的值變更為: ${reactiveLost.name} (${reactiveLost.age}歲)`)
  addLog(
    `💡 為什麼 UI 會動？是因為 addLog 更新了「日誌 ref」，強制整個組件重繪，才讓你看到了變數的新值。這並非真正的「響應式更新」。`,
  )
}

// 複製功能
const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text)
    alert('程式碼已複製到剪貼簿')
  } catch (err) {
    console.error('複製失敗:', err)
  }
}
</script>

<template>
  <div class="reactivity-view max-w-7xl mx-auto p-12 flex flex-col gap-12 text-slate-900 font-sans">
    <!-- 1. 標題區 -->
    <div class="text-center space-y-4">
      <h1 class="text-5xl font-extrabold tracking-tight">響應式 API 深度對比</h1>
      <p class="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
        掌握
        <code
          class="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-emerald-600 font-mono"
          >ref</code
        >
        與
        <code
          class="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-blue-600 font-mono"
          >reactive</code
        >
        在物件處理上的核心差異。
      </p>
    </div>

    <!-- 2. 核心展示區 (二欄佈局，將 ref 與 reactive 分開) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      <!-- 2a. ref (基本) -->
      <div
        class="group relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
      >
        <div
          class="absolute -top-3 left-6 px-3 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full shadow-lg"
        >
          REF 基本型
        </div>
        <div class="space-y-4">
          <h3 class="text-lg font-bold text-slate-800 border-b border-slate-50 pb-2">
            處理單一變數
          </h3>
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
            <p class="text-[10px] uppercase tracking-wider text-slate-400 font-bold">COUNT</p>
            <p class="font-mono text-3xl text-emerald-600 font-black">{{ refCount }}</p>
            <button
              @click="updateRef"
              class="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95"
            >
              增加數值 (refCount.value++)
            </button>
          </div>
        </div>
      </div>

      <!-- 2b. ref (物件) -->
      <div
        class="group relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
      >
        <div
          class="absolute -top-3 left-6 px-3 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-full shadow-lg"
        >
          REF 物件型
        </div>
        <div class="space-y-4">
          <h3 class="text-lg font-bold text-slate-800 border-b border-slate-50 pb-2">
            可替換的盒子
          </h3>
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
            <div class="space-y-1">
              <p class="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                USER INFO (UI 狀態)
              </p>
              <p class="font-bold text-emerald-700 text-lg">{{ refUser.name }}</p>
              <p class="text-xs text-slate-500">年齡: {{ refUser.age }}</p>
            </div>
            <div class="flex flex-col gap-2">
              <button
                @click="updateRefProp"
                class="w-full py-2 bg-slate-800 text-white text-[10px] font-bold rounded-lg hover:bg-slate-700 transition-all border border-slate-700 shadow-sm"
              >
                1. 修改屬性 (盒子沒換)
              </button>
              <button
                @click="replaceRefObj"
                class="w-full py-2 bg-emerald-600 text-white text-[10px] font-bold rounded-lg hover:bg-emerald-700 transition-all border border-emerald-500 shadow-md"
              >
                2. 替換整個物件 (內部更新)
              </button>
              <button
                @click="updateAfterReplace"
                class="w-full py-2 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-lg hover:bg-emerald-200 transition-all border border-emerald-200"
              >
                3. 替換後再次更新 (證明不掉線)
              </button>
            </div>
          </div>

          <!-- 背景日誌區塊 -->
          <div v-if="refLogs.length" class="space-y-2">
            <p
              class="text-[11px] font-black text-slate-400 flex items-center gap-1 uppercase tracking-tighter"
            >
              <span>⚡</span> 內部狀態追蹤:
            </p>
            <div
              class="bg-slate-900 rounded-xl p-3 h-32 overflow-y-auto space-y-1.5 shadow-inner border border-slate-800"
            >
              <p
                v-for="(log, idx) in refLogs"
                :key="idx"
                class="text-xs font-mono leading-tight"
                :class="idx === 0 ? 'text-emerald-400' : 'text-slate-500'"
              >
                {{ log }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 2c. reactive -->
      <div
        class="group relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
      >
        <div
          class="absolute -top-3 left-6 px-3 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded-full shadow-lg"
        >
          REACTIVE()
        </div>
        <div class="space-y-4">
          <h3 class="text-lg font-bold text-slate-800 border-b border-slate-50 pb-2">
            深度連動物件
          </h3>
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
            <div class="space-y-1">
              <p class="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                REACTIVE INFO
              </p>
              <p class="font-bold text-blue-700 text-lg">{{ reactiveUser.name }}</p>
              <p class="text-xs text-slate-500">年齡: {{ reactiveUser.age }}</p>
            </div>
            <button
              @click="updateReactive"
              class="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95"
            >
              更新資料 (不可替換盒子)
            </button>
          </div>
        </div>
      </div>

      <!-- 2d. reactive (失去響應) -->
      <div
        class="group relative bg-white p-6 rounded-3xl border border-red-200 shadow-sm hover:shadow-xl transition-all duration-300"
      >
        <div
          class="absolute -top-3 left-6 px-3 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full shadow-lg"
        >
          REACTIVE 錯誤示範
        </div>
        <div class="space-y-4">
          <h3 class="text-lg font-bold text-slate-800 border-b border-slate-50 pb-2">
            失去響應的情境
          </h3>
          <div class="p-4 bg-red-50 rounded-2xl border border-red-100 space-y-4">
            <div class="space-y-1">
              <p class="text-[10px] uppercase tracking-wider text-red-400 font-bold">
                LOST REACTIVITY (UI 狀態)
              </p>
              <p class="font-bold text-red-700 text-lg">{{ reactiveLost.name }}</p>
              <p class="text-xs text-slate-500">年齡: {{ reactiveLost.age }}</p>
            </div>
            <div class="flex flex-col gap-2">
              <button
                @click="triggerReassign"
                class="w-full py-2 bg-red-600 text-white text-[10px] font-bold rounded-lg hover:bg-red-700 transition-all shadow-sm"
              >
                1. 重新賦值 (變數更新但 UI 不動)
              </button>
              <button
                @click="triggerUpdateNoLog"
                class="w-full py-2 bg-slate-200 text-slate-600 text-[10px] font-bold rounded-lg hover:bg-slate-300 transition-all"
              >
                2. 純粹更新 (不留日誌，觀察 UI)
              </button>
              <button
                @click="triggerUpdateAfterReassign"
                class="w-full py-2 bg-slate-800 text-white text-[10px] font-bold rounded-lg hover:bg-slate-700 transition-all border border-slate-700 shadow-md"
              >
                3. 更新並留日誌 (會觸發重繪)
              </button>
            </div>
          </div>

          <!-- 新增背景日誌區塊 -->
          <div v-if="operationLogs.length" class="space-y-2">
            <p
              class="text-[11px] font-black text-slate-400 flex items-center gap-1 uppercase tracking-tighter"
            >
              <span>⚡</span> 背景操作日誌 (真實變數內容):
            </p>
            <div
              class="bg-slate-900 rounded-xl p-3 h-32 overflow-y-auto space-y-1.5 shadow-inner border border-slate-800"
            >
              <p
                v-for="(log, idx) in operationLogs"
                :key="idx"
                class="text-xs font-mono leading-tight"
                :class="idx === 0 ? 'text-emerald-400' : 'text-slate-500'"
              >
                {{ log }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. 總結區塊 -->
    <div
      class="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl overflow-hidden relative border border-slate-800"
    >
      <div
        class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-2xl"
      ></div>
      <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div class="space-y-2">
          <h4 class="text-xl font-bold text-emerald-400 tracking-tight">
            為什麼要用 ref 包裝物件？
          </h4>
          <p class="text-slate-400 text-sm leading-relaxed">
            當你需要<strong>「一次性更新整個資料結構」</strong>（例如從 API
            取得新資料並直接替換）時，<code>ref</code> 是唯一的選擇。而
            <code>reactive</code> 的優點是語法更接近原生
            JS，但它無法處理基本型別，且一旦被<strong>重新賦值</strong>或<strong>解構</strong>，UI
            就不會再隨資料變動。
          </p>
        </div>
      </div>
    </div>

    <!-- 4. VitePress 風格範例區 -->
    <div class="flex flex-col gap-10 border-t border-slate-100 pt-10">
      <div class="space-y-2">
        <h2 class="text-3xl font-black text-slate-800 tracking-tight">實作範例</h2>
        <p class="text-slate-500 font-medium text-sm italic">點擊右側 TS/JS 切換查看不同語法實作</p>
      </div>

      <div class="flex flex-col gap-8">
        <!-- ref (基本) -->
        <div class="space-y-4">
          <div
            class="flex items-center gap-2 text-emerald-600 font-bold font-mono text-sm uppercase tracking-tighter"
          >
            <span>#</span> ref() 基本型
          </div>
          <div
            class="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800 relative group/code"
          >
            <div
              class="px-4 py-2 bg-slate-800 border-b border-slate-700 flex justify-between items-center text-[10px] font-mono"
            >
              <span class="text-slate-400">ReactivityView.vue</span>
              <div class="flex items-center gap-2">
                <div class="flex bg-slate-900 p-0.5 rounded-lg border border-slate-700">
                  <button
                    @click="langMode = 'ts'"
                    :class="[
                      langMode === 'ts'
                        ? 'bg-emerald-500 text-white'
                        : 'text-slate-500 hover:text-slate-300',
                    ]"
                    class="px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all"
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
                    class="px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all"
                  >
                    JS
                  </button>
                </div>
                <button
                  @click="copyToClipboard(langMode === 'ts' ? refCodeTS : refCodeJS)"
                  class="px-2 py-1 hover:bg-slate-700 rounded text-slate-300 font-bold border border-slate-600 transition-all"
                >
                  複製
                </button>
              </div>
            </div>
            <pre class="code-pre" v-html="langMode === 'ts' ? refHTML_TS : refHTML_JS"></pre>
          </div>
        </div>

        <!-- ref (物件) -->
        <div class="space-y-4">
          <div
            class="flex items-center gap-2 text-emerald-700 font-bold font-mono text-sm uppercase tracking-tighter"
          >
            <span>#</span> ref() 物件型
          </div>
          <div
            class="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800 relative group/code"
          >
            <div
              class="px-4 py-2 bg-slate-800 border-b border-slate-700 flex justify-between items-center text-[10px] font-mono"
            >
              <span class="text-slate-400">ReactivityView.vue</span>
              <div class="flex items-center gap-2">
                <div class="flex bg-slate-900 p-0.5 rounded-lg border border-slate-700">
                  <button
                    @click="langMode = 'ts'"
                    :class="[
                      langMode === 'ts'
                        ? 'bg-emerald-500 text-white'
                        : 'text-slate-500 hover:text-slate-300',
                    ]"
                    class="px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all"
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
                    class="px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all"
                  >
                    JS
                  </button>
                </div>
                <button
                  @click="copyToClipboard(langMode === 'ts' ? refObjCodeTS : refObjCodeJS)"
                  class="px-2 py-1 hover:bg-slate-700 rounded text-slate-300 font-bold border border-slate-600 transition-all"
                >
                  複製
                </button>
              </div>
            </div>
            <pre class="code-pre" v-html="langMode === 'ts' ? refObjHTML_TS : refObjHTML_JS"></pre>
          </div>
        </div>

        <!-- reactive -->
        <div class="space-y-4">
          <div
            class="flex items-center gap-2 text-blue-600 font-bold font-mono text-sm uppercase tracking-tighter"
          >
            <span>#</span> reactive()
          </div>
          <div
            class="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800 relative group/code"
          >
            <div
              class="px-4 py-2 bg-slate-800 border-b border-slate-700 flex justify-between items-center text-[10px] font-mono"
            >
              <span class="text-slate-400">ReactivityView.vue</span>
              <div class="flex items-center gap-2">
                <div class="flex bg-slate-900 p-0.5 rounded-lg border border-slate-700">
                  <button
                    @click="langMode = 'ts'"
                    :class="[
                      langMode === 'ts'
                        ? 'bg-emerald-500 text-white'
                        : 'text-slate-500 hover:text-slate-300',
                    ]"
                    class="px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all"
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
                    class="px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all"
                  >
                    JS
                  </button>
                </div>
                <button
                  @click="copyToClipboard(langMode === 'ts' ? reactiveCodeTS : reactiveCodeJS)"
                  class="px-2 py-1 hover:bg-slate-700 rounded text-slate-300 font-bold border border-slate-600 transition-all"
                >
                  複製
                </button>
              </div>
            </div>
            <pre
              class="code-pre"
              v-html="langMode === 'ts' ? reactiveHTML_TS : reactiveHTML_JS"
            ></pre>
          </div>
        </div>

        <!-- reactive (失去響應) -->
        <div class="space-y-4">
          <div
            class="flex items-center gap-2 text-red-600 font-bold font-mono text-sm uppercase tracking-tighter"
          >
            <span>#</span> reactive() 失去響應範例
          </div>
          <div
            class="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800 relative group/code"
          >
            <div
              class="px-4 py-2 bg-slate-800 border-b border-slate-700 flex justify-between items-center text-[10px] font-mono"
            >
              <span class="text-slate-400">ReactivityView.vue</span>
              <div class="flex items-center gap-2">
                <div class="flex bg-slate-900 p-0.5 rounded-lg border border-slate-700">
                  <button
                    @click="langMode = 'ts'"
                    :class="[
                      langMode === 'ts'
                        ? 'bg-emerald-500 text-white'
                        : 'text-slate-500 hover:text-slate-300',
                    ]"
                    class="px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all"
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
                    class="px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all"
                  >
                    JS
                  </button>
                </div>
                <button
                  @click="
                    copyToClipboard(langMode === 'ts' ? reactiveLostCodeTS : reactiveLostCodeJS)
                  "
                  class="px-2 py-1 hover:bg-slate-700 rounded text-slate-300 font-bold border border-slate-600 transition-all"
                >
                  複製
                </button>
              </div>
            </div>
            <pre
              class="code-pre"
              v-html="langMode === 'ts' ? reactiveLostHTML_TS : reactiveLostHTML_JS"
            ></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
@reference "../assets/main.css";

.code-pre {
  @apply p-6 overflow-x-auto text-sm leading-relaxed font-mono text-white;
  white-space: pre !important;
}
</style>
