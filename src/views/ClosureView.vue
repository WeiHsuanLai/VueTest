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
// 使用明確的 CounterItem[] 取代 any[]
const counterList = ref<CounterItem[]>([])
const newCounterName = ref('')

const addNewCounter = () => {
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

const handleIncrement = (index: number) => {
  const item = counterList.value[index]

  // 加入檢查，確保項目存在
  if (!item) return

  // 3. 執行閉包內部的邏輯
  const newValue = item.instance.increment()

  // 4. 更新「響應式變數」，觸發畫面更新
  item.displayValue = newValue

  console.log(`[閉包更新] ${item.name} 目前內部私有值為: ${newValue}`)
}
</script>

<template>
  <div class="closure-view space-y-8">
    <h1 class="text-3xl font-bold text-slate-800 border-b-2 border-indigo-500 pb-2">
      JavaScript 閉包 (Closure)
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <section class="prose prose-slate max-w-none">
        <div class="p-6 bg-indigo-50 rounded-xl border border-indigo-100">
          <h2 class="text-xl font-bold text-indigo-800 mb-3">為什麼需要「橋樑」？</h2>
          <p class="text-indigo-900 text-sm leading-relaxed">
            純 JavaScript 的閉包變數是<strong>「隱形」</strong>的。Vue 的監控系統看不到函數內部的
            <code>let count</code>。 <br /><br />
            為了讓畫面更新，我們必須在點擊時，將閉包計算後的結果<strong
              >賦值給 Vue 的響應式變數</strong
            >（如 <code>displayValue</code>）。
          </p>
        </div>
      </section>

      <section class="space-y-6">
        <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2">
            閉包與 Vue 協作實驗室
          </h3>
          <div class="flex gap-2 mb-6">
            <input
              v-model="newCounterName"
              @keyup.enter="addNewCounter"
              type="text"
              placeholder="給計數器一個名字..."
              class="flex-1 px-4 py-2 border rounded-lg outline-none focus:border-indigo-500"
            />
            <button @click="addNewCounter" class="px-4 py-2 bg-indigo-500 text-white rounded-lg">
              建立
            </button>
          </div>

          <div class="space-y-3">
            <div
              v-for="(item, index) in counterList"
              :key="index"
              class="p-4 bg-slate-50 rounded-lg border flex justify-between items-center"
            >
              <div>
                <span class="text-xs font-bold text-indigo-500 uppercase">{{ item.name }}</span>
                <p class="text-2xl font-mono font-bold text-slate-700">
                  Value: {{ item.displayValue }}
                </p>
              </div>
              <button
                @click="handleIncrement(index)"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md font-bold shadow-md active:scale-95"
              >
                +1 (執行閉包)
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
