<!-- 路徑: src/views/LifecycleView.vue | 功能: 解析 Vue 3 生命週期與響應式監聽，並新增 onUpdated 聊天室捲動範例 -->
<script setup lang="ts">
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  ref,
  computed,
  watch,
} from 'vue'

// --- 1. 生命週期與紀錄 ---
const count = ref<number>(0)
const logs = ref<string[]>([])
const langMode = ref<'ts' | 'js'>('ts')

const addLog = (hook: string, updateUi: boolean = true): void => {
  const time = new Date().toLocaleTimeString()
  const message = `[${time}] 觸發 ${hook}`
  if (updateUi) {
    logs.value.unshift(message)
    if (logs.value.length > 25) logs.value.pop()
  }
  console.log(`%c[Vue Debug]%c ${hook}`, 'color: #42b883; font-weight: bold', '')
}

// 掛鉤實作
onBeforeMount(() => addLog('onBeforeMount (掛載前)'))
onMounted(() => addLog('onMounted (掛載後)'))
onBeforeUpdate(() => addLog('onBeforeUpdate (更新前)', false))
onUpdated(() => {
  addLog('onUpdated (更新後 - 觸發自動捲動)', true)
  // 聊天室自動捲動邏輯
  scrollToBottom()
})
onBeforeUnmount(() => addLog('onBeforeUnmount (卸載前)'))
onUnmounted(() => addLog('onUnmounted (卸載後)'))

// --- 2. Computed 姓名案例 ---
const firstName = ref<string>('王')
const lastName = ref<string>('小明')
const fullName = computed<string>(() => {
  addLog('computed (重新計算姓名)', true)
  return `${firstName.value}${lastName.value}`
})

// --- 3. Watch 搜尋案例 ---
const searchQuery = ref<string>('')
const searchResult = ref<string>('等待輸入...')
watch(searchQuery, (newValue, oldValue) => {
  addLog(`watch (搜尋變更: "${oldValue}" -> "${newValue}")`, true)
  searchResult.value = '正在搜尋中...'
  setTimeout(() => {
    if (newValue === searchQuery.value) {
      searchResult.value = newValue ? `找到關於 "${newValue}" 的結果` : '等待輸入...'
    }
  }, 500)
})

// --- 4. onUpdated 聊天室案例 ---
interface Message {
  id: number
  text: string
  time: string
}

const messages = ref<Message[]>([
  { id: 1, text: '歡迎來到即時聊天室！', time: '10:00:01' },
  { id: 2, text: '這個範例展示了 onUpdated 的威力。', time: '10:00:05' }
])
const newMessage = ref<string>('')
const chatContainer = ref<HTMLElement | null>(null)

const sendMessage = (): void => {
  if (!newMessage.value.trim()) return
  
  messages.value.push({
    id: Date.now(),
    text: newMessage.value,
    time: new Date().toLocaleTimeString()
  })
  newMessage.value = ''
}

// 捲動到底部函式
const scrollToBottom = (): void => {
  if (chatContainer.value) {
    // 將捲軸位置設定為總高度
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

// --- 通用 ---
const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text)
    alert('程式碼已複製到剪貼簿')
  } catch (err) {
    console.error('複製失敗:', err)
  }
}

// --- 範例程式碼 ---
const scrollCodeTS = `import { ref, onUpdated } from 'vue'

const messages = ref<string[]>([])
const chatRef = ref<HTMLElement | null>(null)

// 當訊息增加並渲染後，執行捲動
onUpdated(() => {
  if (chatRef.value) {
    chatRef.value.scrollTop = chatRef.value.scrollHeight
  }
})

const send = (msg: string) => {
  messages.value.push(msg)
}`

const scrollCodeJS = `import { ref, onUpdated } from 'vue'

const messages = ref([])
const chatRef = ref(null)

onUpdated(() => {
  chatRef.value.scrollTop = chatRef.value.scrollHeight
})

const send = (msg) => {
  messages.value.push(msg)
}`

const scrollHTML_TS = `<span class="text-emerald-400">const</span> <span class="text-blue-400">chatRef</span> = ref&lt;<span class="text-yellow-400">HTMLElement</span> | <span class="text-emerald-400">null</span>&gt;(<span class="text-emerald-400">null</span>)

<span class="text-yellow-400">onUpdated</span>(() => {
  <span class="text-slate-500">// 渲染完成後，將捲軸拉到底部</span>
  <span class="text-emerald-400">if</span> (<span class="text-blue-400">chatRef</span>.value) {
    <span class="text-blue-400">chatRef</span>.value.scrollTop = <span class="text-blue-400">chatRef</span>.value.scrollHeight
  }
})`

const scrollHTML_JS = `<span class="text-yellow-400">onUpdated</span>(() => {
  <span class="text-blue-400">chatRef</span>.value.scrollTop = <span class="text-blue-400">chatRef</span>.value.scrollHeight
})`
</script>

<template>
  <div class="lifecycle-view max-w-7xl mx-auto p-12 flex flex-col gap-12 text-slate-900 font-sans">
    <!-- 標題區 -->
    <div class="text-center space-y-4">
      <h1 class="text-5xl font-extrabold tracking-tight">Vue 3 核心機制與生命週期</h1>
      <p class="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
        深度解析
        <code class="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-emerald-600 font-mono">onUpdated</code>
        在聊天室捲動等 DOM 副作用上的實戰應用。
      </p>
    </div>

    <!-- 核心展示區 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      <!-- 2a. 用法指南 (左側滾動區) -->
      <section class="flex flex-col gap-6 overflow-y-auto max-h-[1200px] pt-8 pr-4 custom-scrollbar">
        
        <!-- 1. Setup -->
        <div class="group relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">
          <div class="absolute -top-3 left-6 px-3 py-0.5 bg-slate-500 text-white text-sm font-black rounded-full shadow-lg px-5">1. SETUP() 階段</div>
          <h3 class="text-lg font-bold text-slate-800 mb-2">組合式 API 的起點</h3>
          <p class="text-sm text-slate-500 leading-relaxed">
            取代了 Vue 2 的 <code>beforeCreate</code> 與 <code>created</code>。
            <br /><strong class="text-slate-700">注意：</strong> 此時組件實例尚未掛載到 DOM。
          </p>
        </div>

        <!-- 2. Mounted -->
        <div class="group relative bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300">
          <div class="absolute -top-3 left-6 px-3 py-0.5 bg-emerald-500 text-white text-sm font-black rounded-full shadow-lg px-5">2. 掛載階段 (onMounted)</div>
          <h3 class="text-lg font-bold text-emerald-800 mb-2">資源初始化的黃金時機</h3>
          <p class="text-sm text-slate-600 leading-relaxed mb-2">
            <strong>用法：</strong> 這是最常用的掛鉤。用於發送 API 請求、操作 DOM 元素或設定計時器。
          </p>
        </div>

        <!-- 3. Updated -->
        <div class="group relative bg-white p-6 rounded-3xl border border-amber-100 shadow-sm hover:shadow-xl transition-all duration-300">
          <div class="absolute -top-3 left-6 px-3 py-0.5 bg-amber-500 text-white text-sm font-black rounded-full shadow-lg px-5">3. 更新階段 (onUpdated)</div>
          <h3 class="text-lg font-bold text-amber-800 mb-2">畫面渲染後的副作用</h3>
          <p class="text-sm text-slate-600 leading-relaxed mb-4">
            <strong>用法：</strong> 在數據更新導致 DOM 重新渲染後執行。
          </p>
          <div class="bg-amber-50 p-4 rounded-2xl border border-amber-100 text-[11px] text-amber-900 leading-relaxed">
            💡 <strong>典型應用：即時聊天室。</strong><br />
            當訊息清單更新後，我們需要立刻將捲軸「拉到底部」。因為清單的高度是在渲染後才改變的，所以必須在 <code>onUpdated</code> 中操作。
          </div>
        </div>

        <!-- 4. Unmounted -->
        <div class="group relative bg-white p-6 rounded-3xl border border-rose-100 shadow-sm hover:shadow-xl transition-all duration-300">
          <div class="absolute -top-3 left-6 px-3 py-0.5 bg-rose-500 text-white text-sm font-black rounded-full shadow-lg px-5">4. 卸載階段 (onUnmounted)</div>
          <h3 class="text-lg font-bold text-rose-800 mb-2">資源清理與預防溢漏</h3>
          <p class="text-sm text-slate-600 leading-relaxed">
            用於清除定時器、中斷 API 請求或移除全域事件監聽，確保組件消失後不佔效能。
          </p>
        </div>

        <!-- 5. Computed & 6. Watch (簡略) -->
        <div class="grid grid-cols-2 gap-4">
          <div class="p-5 bg-blue-50 rounded-3xl border border-blue-100">
            <h4 class="text-xs font-black text-blue-800 mb-2">5. Computed</h4>
            <p class="text-[11px] text-blue-600">衍生數據與效能快取。</p>
          </div>
          <div class="p-5 bg-amber-50 rounded-3xl border border-amber-100">
            <h4 class="text-xs font-black text-amber-800 mb-2">6. Watch</h4>
            <p class="text-[11px] text-amber-600">監控數據並執行異步邏輯。</p>
          </div>
        </div>
      </section>

      <!-- 2b. 實驗室儀表板 (右側) -->
      <section class="flex flex-col gap-6">
        
        <!-- 1. Lifecycle 實驗區 -->
        <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="font-bold text-slate-800 text-sm italic"># Lifecycle Lab</h4>
            <span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] rounded font-mono font-bold">COUNT: {{ count }}</span>
          </div>
          <button @click="count++" class="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95">觸發 Update 掛鉤</button>
        </div>

        <!-- 2. Computed 實驗區 -->
        <div class="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-4">
          <h4 class="font-bold text-blue-800 text-sm italic"># Computed Lab</h4>
          <div class="grid grid-cols-2 gap-3 text-[10px]">
            <input v-model="firstName" class="px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg outline-none focus:border-blue-400" />
            <input v-model="lastName" class="px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg outline-none focus:border-blue-400" />
          </div>
          <div class="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-center font-bold text-blue-900">{{ fullName }}</div>
        </div>

        <!-- 3. Watch 實驗區 -->
        <div class="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-4">
          <h4 class="font-bold text-amber-800 text-sm italic"># Watch Lab</h4>
          <input v-model="searchQuery" placeholder="輸入搜尋..." class="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs outline-none focus:border-amber-400" />
          <div class="p-3 bg-amber-50/50 rounded-xl border border-amber-100 text-[11px] text-amber-900">{{ searchResult }}</div>
        </div>

        <!-- 4. 聊天室實驗區 (onUpdated) -->
        <div class="bg-white p-6 rounded-3xl border border-amber-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between border-b border-amber-50 pb-3">
            <h4 class="font-black text-slate-800 text-sm italic"># onUpdated 聊天室實驗</h4>
            <div class="flex gap-1">
              <div class="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></div>
              <div class="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div class="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
          
          <!-- 訊息容器 -->
          <div 
            ref="chatContainer"
            class="h-48 bg-slate-50 rounded-2xl p-4 overflow-y-auto custom-scrollbar space-y-3 border border-slate-100 shadow-inner"
          >
            <div 
              v-for="msg in messages" 
              :key="msg.id"
              class="flex flex-col"
            >
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{{ msg.time }}</span>
                <span class="px-1.5 py-0.5 bg-white text-[8px] font-bold text-slate-400 rounded-md border border-slate-100 shadow-sm">GUEST</span>
              </div>
              <div class="px-3 py-2 bg-white rounded-2xl rounded-tl-none border border-slate-100 text-xs text-slate-700 shadow-sm inline-block max-w-[85%]">
                {{ msg.text }}
              </div>
            </div>
          </div>

          <!-- 輸入區 -->
          <div class="flex gap-2">
            <input 
              v-model="newMessage" 
              @keyup.enter="sendMessage"
              placeholder="輸入訊息..." 
              class="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-amber-400 transition-all text-xs"
            />
            <button 
              @click="sendMessage"
              class="px-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition-all shadow-md active:scale-95"
            >
              發送
            </button>
          </div>
        </div>

        <!-- 系統紀錄儀 -->
        <div class="flex-1 bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden border border-slate-800">
          <div class="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
            <h4 class="text-emerald-400 font-mono text-[10px] font-bold tracking-widest uppercase tracking-tighter">Runtime Monitor</h4>
            <button @click="logs = []" class="text-[9px] font-bold text-slate-600 hover:text-white transition-colors">RESET</button>
          </div>
          <div class="space-y-2 font-mono text-[11px] overflow-y-auto custom-scrollbar max-h-[300px] pr-2">
            <div v-for="(log, index) in logs" :key="index" class="text-emerald-100/40 hover:text-emerald-100 transition-colors py-0.5">
              <span class="text-slate-700 mr-2">[{{ logs.length - index }}]</span>{{ log }}
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 3. 實作範例區 -->
    <div class="flex flex-col gap-8 border-t border-slate-100 pt-10">
      <div class="flex items-center gap-3">
        <h2 class="text-3xl font-black text-slate-800 tracking-tight">實作範例</h2>
        <span class="px-2 py-0.5 bg-amber-100 text-amber-600 text-[10px] font-black rounded-lg">ONUPDATED</span>
      </div>

      <div class="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800">
        <div class="px-8 py-4 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center text-[10px] font-mono">
          <span class="text-slate-400">ChatRoomAutoScroll.vue</span>
          <div class="flex bg-slate-900 p-1 rounded-xl border border-slate-700">
            <button @click="langMode = 'ts'" :class="[langMode === 'ts' ? 'bg-amber-500 text-white' : 'text-slate-500']" class="px-3 py-1 rounded-lg transition-all font-bold">TS</button>
            <button @click="langMode = 'js'" :class="[langMode === 'js' ? 'bg-blue-500 text-white' : 'text-slate-500']" class="px-3 py-1 rounded-lg transition-all font-bold">JS</button>
          </div>
        </div>
        <pre class="code-pre p-8 text-sm" v-html="langMode === 'ts' ? scrollHTML_TS : scrollHTML_JS"></pre>
        <div class="px-8 py-4 bg-slate-800/30 flex justify-end">
          <button 
            @click="copyToClipboard(langMode === 'ts' ? scrollCodeTS : scrollCodeJS)"
            class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-black rounded-xl transition-all"
          >
            COPY TO CLIPBOARD
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
@reference "../assets/main.css";

.code-pre {
  @apply overflow-x-auto leading-relaxed font-mono text-white;
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
</style>
