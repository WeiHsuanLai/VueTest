<!-- 路徑: src/views/CommunicationView.vue | 功能: 演示組件之間的通信 (Component Communication)，包含 Props 下行與 Emits 上行的單向資料流原則 -->
<script setup lang="ts">
import { ref } from 'vue'
import ChildProps from '../components/ChildProps.vue'
import ChildEmits from '../components/ChildEmits.vue'

// 1. 父組件資料 (即將傳遞給子組件 A)
const parentMsg = ref('Hello')
const parentCount = ref(0)

// 2. 接收子組件 B 事件的函式
const handleNameChange = (newName: string) => {
  parentMsg.value = newName
}

// 3. 重置計數的函式
const handleReset = () => {
  parentCount.value = 0
}

// 複製到剪貼簿
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  alert('已複製到剪貼簿')
}

// 4. 程式碼範例 (模擬 VitePress 風格)
const langMode = ref<'ts' | 'js'>('ts')

const parentCodeTS = `<span class="text-emerald-400">&lt;script setup lang="ts"&gt;</span>
<span class="text-emerald-400">import</span> { ref } <span class="text-emerald-400">from</span> <span class="text-amber-400">'vue'</span> <span class="text-slate-500">// 匯入響應式 API</span>
<span class="text-emerald-400">import</span> Child <span class="text-emerald-400">from</span> <span class="text-amber-400">'./Child.vue'</span> <span class="text-slate-500">// 匯入子組件</span>

<span class="text-emerald-400">const</span> <span class="text-blue-400">parentMsg</span> = ref(<span class="text-amber-400">'Hello'</span>) <span class="text-slate-500">// 定義要傳給子組件的字串資料</span>
<span class="text-emerald-400">const</span> <span class="text-blue-400">parentCount</span> = ref(0)     <span class="text-slate-500">// 定義要傳給子組件的數字資料</span>

<span class="text-slate-500">// 定義接收子組件事件的處理函式</span>
<span class="text-emerald-400">const</span> <span class="text-yellow-400">handleUpdate</span> = (val: <span class="text-emerald-400">string</span>) => {
  <span class="text-blue-400">parentMsg</span>.value = val <span class="text-slate-500">// 更新父組件自身的狀態</span>
}
<span class="text-emerald-400">&lt;/script&gt;</span>

<span class="text-emerald-400">&lt;template&gt;</span>
  <span class="text-slate-500">&lt;!-- :msg 與 :count 是 Props (父傳子) --&gt;</span>
  <span class="text-slate-500">&lt;!-- @update-name 是 Emit 事件 (子傳父) --&gt;</span>
  <span class="text-blue-400">&lt;Child</span>
    <span class="text-amber-400">:msg</span>=<span class="text-amber-400">"parentMsg"</span>
    <span class="text-amber-400">:count</span>=<span class="text-amber-400">"parentCount"</span>
    <span class="text-amber-400">@update-name</span>=<span class="text-amber-400">"handleUpdate"</span>
  <span class="text-blue-400">/&gt;</span>
<span class="text-emerald-400">&lt;/template&gt;</span>`

const parentCodeJS = `<span class="text-emerald-400">&lt;script setup&gt;</span>
<span class="text-emerald-400">import</span> { ref } <span class="text-emerald-400">from</span> <span class="text-amber-400">'vue'</span> <span class="text-slate-500">// 匯入響應式 API</span>
<span class="text-emerald-400">import</span> Child <span class="text-emerald-400">from</span> <span class="text-amber-400">'./Child.vue'</span> <span class="text-slate-500">// 匯入子組件</span>

<span class="text-emerald-400">const</span> <span class="text-blue-400">parentMsg</span> = ref(<span class="text-amber-400">'Hello'</span>) <span class="text-slate-500">// 定義要傳給子組件的字串資料</span>
<span class="text-emerald-400">const</span> <span class="text-blue-400">parentCount</span> = ref(0)     <span class="text-slate-500">// 定義要傳給子組件的數字資料</span>

<span class="text-slate-500">// 定義接收子組件事件的處理函式</span>
<span class="text-emerald-400">const</span> <span class="text-yellow-400">handleUpdate</span> = (val) => {
  <span class="text-blue-400">parentMsg</span>.value = val <span class="text-slate-500">// 更新父組件自身的狀態</span>
}
<span class="text-emerald-400">&lt;/script&gt;</span>

<span class="text-emerald-400">&lt;template&gt;</span>
  <span class="text-slate-500">&lt;!-- :msg 與 :count 是 Props (父傳子) --&gt;</span>
  <span class="text-slate-500">&lt;!-- @update-name 是 Emit 事件 (子傳父) --&gt;</span>
  <span class="text-blue-400">&lt;Child</span>
    <span class="text-amber-400">:msg</span>=<span class="text-amber-400">"parentMsg"</span>
    <span class="text-amber-400">:count</span>=<span class="text-amber-400">"parentCount"</span>
    <span class="text-amber-400">@update-name</span>=<span class="text-amber-400">"handleUpdate"</span>
  <span class="text-blue-400">/&gt;</span>
<span class="text-emerald-400">&lt;/template&gt;</span>`

const childCodeTS = `<span class="text-emerald-400">&lt;script setup lang="ts"&gt;</span>
<span class="text-emerald-400">import</span> { ref } <span class="text-emerald-400">from</span> <span class="text-amber-400">'vue'</span>

<span class="text-slate-500">// 1. 定義接收的 Props 型別</span>
<span class="text-emerald-400">const</span> <span class="text-blue-400">props</span> = defineProps&lt;{
  msg: <span class="text-emerald-400">string</span>
  count: <span class="text-emerald-400">number</span>
}&gt;()

<span class="text-slate-500">// 2. 定義發出的事件名稱與參數</span>
<span class="text-emerald-400">const</span> <span class="text-blue-400">emit</span> = defineEmits&lt;{
  (e: <span class="text-amber-400">'change-name'</span>, name: <span class="text-emerald-400">string</span>): <span class="text-emerald-400">void</span>
}&gt;()

<span class="text-slate-500">// 3. 區域變數儲存輸入框內容</span>
<span class="text-emerald-400">const</span> <span class="text-blue-400">localName</span> = ref(<span class="text-amber-400">''</span>)

<span class="text-slate-500">// 4. 發出事件的動作函式</span>
<span class="text-emerald-400">const</span> <span class="text-yellow-400">notifyParent</span> = () => {
  <span class="text-blue-400">emit</span>(<span class="text-amber-400">'change-name'</span>, <span class="text-blue-400">localName</span>.value) <span class="text-slate-500">// 傳送輸入框內容</span>
}
<span class="text-emerald-400">&lt;/script&gt;</span>

<span class="text-emerald-400">&lt;template&gt;</span>
  <span class="text-blue-400">&lt;div&gt;</span>
    <span class="text-slate-500">&lt;!-- 雙向綁定區域變數 --&gt;</span>
    <span class="text-blue-400">&lt;input</span> <span class="text-amber-400">v-model</span>=<span class="text-amber-400">"localName"</span> <span class="text-blue-400">/&gt;</span>
    <span class="text-blue-400">&lt;button</span> <span class="text-amber-400">@click</span>=<span class="text-amber-400">"notifyParent"</span><span class="text-blue-400">&gt;</span>送出回應<span class="text-blue-400">&lt;/button&gt;</span>
  <span class="text-blue-400">&lt;/div&gt;</span>
<span class="text-emerald-400">&lt;/template&gt;</span>`

const childCodeJS = `<span class="text-emerald-400">&lt;script setup&gt;</span>
<span class="text-emerald-400">import</span> { ref } <span class="text-emerald-400">from</span> <span class="text-amber-400">'vue'</span>

<span class="text-slate-500">// 1. 定義接收的 Props 內容</span>
<span class="text-emerald-400">const</span> <span class="text-blue-400">props</span> = defineProps({
  msg: String,
  count: Number
})

<span class="text-slate-500">// 2. 定義發出的事件名稱</span>
<span class="text-emerald-400">const</span> <span class="text-blue-400">emit</span> = defineEmits([<span class="text-amber-400">'change-name'</span>])

<span class="text-slate-500">// 3. 區域變數儲存輸入內容</span>
<span class="text-emerald-400">const</span> <span class="text-blue-400">localName</span> = ref(<span class="text-amber-400">''</span>)

<span class="text-slate-500">// 4. 發出事件的動作函式</span>
<span class="text-emerald-400">const</span> <span class="text-yellow-400">notifyParent</span> = () => {
  <span class="text-blue-400">emit</span>(<span class="text-amber-400">'change-name'</span>, <span class="text-blue-400">localName</span>.value) <span class="text-slate-500">// 傳送資料給父組件</span>
}
<span class="text-emerald-400">&lt;/script&gt;</span>

<span class="text-emerald-400">&lt;template&gt;</span>
  <span class="text-blue-400">&lt;div&gt;</span>
    <span class="text-blue-400">&lt;input</span> <span class="text-amber-400">v-model</span>=<span class="text-amber-400">"localName"</span> <span class="text-blue-400">/&gt;</span>
    <span class="text-blue-400">&lt;button</span> <span class="text-amber-400">@click</span>=<span class="text-amber-400">"notifyParent"</span><span class="text-blue-400">&gt;</span>送出回應<span class="text-blue-400">&lt;/button&gt;</span>
  <span class="text-blue-400">&lt;/div&gt;</span>
<span class="text-emerald-400">&lt;/template&gt;</span>`</script>

<template>
  <div class="communication-view flex flex-col gap-12">
    <h1 class="text-3xl font-bold text-slate-800 border-b-2 border-amber-500 pb-4">
      組件通信 (Component Communication)
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- 父組件控制區 -->
      <section class="flex flex-col gap-10">
        <div class="p-8 bg-slate-100 rounded-2xl border-2 border-slate-200 shadow-sm flex flex-col gap-6">
          <h3 class="text-xl font-bold text-slate-800 mb-0 flex items-center gap-2">
            父組件 (Parent)
          </h3>
          <div class="flex flex-col gap-6">
            <div>
              <label class="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider"
                >輸入訊息傳給子組件：</label
              >
              <input
                v-model="parentMsg"
                type="text"
                class="w-full px-4 py-2 border-2 border-slate-300 bg-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-slate-800 font-semibold shadow-sm transition-all"
              />
            </div>
            <div class="flex items-center justify-between p-6 bg-white rounded-xl shadow-sm border">
              <span class="text-slate-600"
                >父組件計數：<strong class="text-2xl font-mono text-amber-600 ml-2">{{
                  parentCount
                }}</strong></span
              >
              <button
                @click="parentCount++"
                class="px-6 py-2 bg-amber-500 text-white rounded-lg font-bold shadow-md hover:bg-amber-600 active:scale-95 transition-all"
              >
                +1
              </button>
            </div>
          </div>

          <div
            class="p-4 bg-amber-50 rounded-lg border border-amber-200 text-sm italic text-amber-800"
          >
            <strong>實作觀察：</strong> 嘗試在這裡改變計數或訊息，你會發現下方<strong
              >「子組件 A」</strong
            >的內容會即時連動（透過 Props 傳遞）。
          </div>
        </div>

        <div class="p-8 bg-slate-50 rounded-xl border border-slate-200">
          <h4 class="font-bold text-slate-700 mb-4">核心概念：單向資料流</h4>
          <p class="text-sm text-slate-600 leading-relaxed">
            在 Vue 中，資料流是單向的：<strong>父組件透過 Props 傳資料給子組件</strong>，而<strong
              >子組件則透過 Emits 發出事件通知父組件</strong
            >進行修改。 這確保了資料源的單一性，讓除錯變得更容易。
          </p>
        </div>
      </section>

      <!-- 子組件區域 -->
      <section class="flex flex-col gap-10">
        <h3 class="text-lg font-bold text-slate-500 flex items-center gap-2 px-2">
          子組件 (Children)
        </h3>

        <!-- 子組件 A: 接收 Props -->
        <div class="transform transition-all hover:translate-y-[-2px]">
          <ChildProps :msg="parentMsg" :count="parentCount" />
        </div>

        <!-- 子組件 B: 發送 Emits -->
        <div class="transform transition-all hover:translate-y-[-2px]">
          <ChildEmits @change-name="handleNameChange" @reset-count="handleReset" />
        </div>

        <div class="p-6 bg-white border rounded-xl text-sm shadow-sm">
          <h4 class="font-bold text-slate-800 mb-3">學習重點：</h4>
          <ul class="list-disc pl-5 flex flex-col gap-2 text-slate-600">
            <li><strong>:prop="variable"</strong> 是 v-bind 的縮寫。</li>
            <li><strong>@event="method"</strong> 是 v-on 的縮寫。</li>
            <li>子組件不能直接修改 Props（唯讀），必須透過 Emit 通知父組件。</li>
          </ul>
        </div>
      </section>
    </div>

    <!-- 實作範例區 (參考 ClosureView.vue 結構) -->
    <div class="flex flex-col gap-10 border-t border-slate-100 pt-10">
      <div class="space-y-2">
        <h2 class="text-2xl font-black text-slate-800 tracking-tight">實作程式碼範例</h2>
        <p class="text-slate-500 font-medium text-sm italic">
          對照父組件呼叫與子組件定義，掌握雙向溝通邏輯
        </p>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <!-- 父組件範例 -->
        <div class="space-y-4">
          <div
            class="flex items-center gap-2 text-amber-600 font-bold font-mono text-sm uppercase tracking-tighter"
          >
            <span>#</span> {{ langMode === 'ts' ? 'ParentView.vue (TS)' : 'ParentView.vue (JS)' }}
          </div>
          <div
            class="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative group/code"
          >
            <div
              class="px-6 py-3 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center text-[10px] font-mono"
            >
              <span class="text-slate-400">{{
                langMode === 'ts' ? 'ParentView.vue' : 'ParentView.js'
              }}</span>
              <div class="flex items-center gap-3">
                <!-- 語言切換按鈕組 -->
                <div class="flex bg-slate-900 p-0.5 rounded-xl border border-slate-700">
                  <button
                    @click="langMode = 'ts'"
                    :class="[
                      langMode === 'ts'
                        ? 'bg-amber-500 text-white'
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
                        ? 'bg-amber-500 text-white'
                        : 'text-slate-500 hover:text-slate-300',
                    ]"
                    class="px-3 py-1 rounded-lg text-[8px] font-bold uppercase transition-all"
                  >
                    JS
                  </button>
                </div>
                <button
                  @click="copyToClipboard(langMode === 'ts' ? parentCodeTS : parentCodeJS)"
                  class="px-3 py-1.5 hover:bg-slate-700 rounded-lg text-slate-300 font-bold border border-slate-600 transition-all text-[9px]"
                >
                  複製
                </button>
              </div>
            </div>
            <pre
              class="code-pre"
              v-html="langMode === 'ts' ? parentCodeTS : parentCodeJS"
            ></pre>
          </div>
        </div>

        <!-- 子組件範例 -->
        <div class="space-y-4">
          <div
            class="flex items-center gap-2 text-amber-600 font-bold font-mono text-sm uppercase tracking-tighter"
          >
            <span>#</span> {{ langMode === 'ts' ? 'ChildComponent.vue (TS)' : 'ChildComponent.vue (JS)' }}
          </div>
          <div
            class="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative group/code"
          >
            <div
              class="px-6 py-3 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center text-[10px] font-mono"
            >
              <span class="text-slate-400">{{
                langMode === 'ts' ? 'ChildComponent.vue' : 'ChildComponent.js'
              }}</span>
              <div class="flex items-center gap-3">
                <!-- 語言切換按鈕組 -->
                <div class="flex bg-slate-900 p-0.5 rounded-xl border border-slate-700">
                  <button
                    @click="langMode = 'ts'"
                    :class="[
                      langMode === 'ts'
                        ? 'bg-amber-500 text-white'
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
                        ? 'bg-amber-500 text-white'
                        : 'text-slate-500 hover:text-slate-300',
                    ]"
                    class="px-3 py-1 rounded-lg text-[8px] font-bold uppercase transition-all"
                  >
                    JS
                  </button>
                </div>
                <button
                  @click="copyToClipboard(langMode === 'ts' ? childCodeTS : childCodeJS)"
                  class="px-3 py-1.5 hover:bg-slate-700 rounded-lg text-slate-300 font-bold border border-slate-600 transition-all text-[9px]"
                >
                  複製
                </button>
              </div>
            </div>
            <pre
              class="code-pre"
              v-html="langMode === 'ts' ? childCodeTS : childCodeJS"
            ></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
@reference "../assets/main.css";

.communication-view {
  animation: slideDown 0.5s ease-out;
}

.code-pre {
  @apply p-8 overflow-x-auto text-sm leading-relaxed font-mono text-white;
  white-space: pre !important;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
