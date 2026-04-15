<!-- 路徑: src/views/CommunicationView.vue | 功能: 演示組件之間的通信 (Component Communication)，包含 Props 下行與 Emits 上行的單向資料流原則 -->
<script setup lang="ts">
import { ref } from 'vue'
import ChildProps from '../components/ChildProps.vue'
import ChildEmits from '../components/ChildEmits.vue'

// 1. 父組件資料 (即將傳遞給子組件 A)
const parentMsg = ref('Hello, Child!')
const parentCount = ref(0)

// 2. 接收子組件 B 事件的函式
const handleNameChange = (newName: string) => {
  parentMsg.value = newName
}

// 3. 重置計數的函式
const handleReset = () => {
  parentCount.value = 0
}
</script>

<template>
  <div class="communication-view space-y-8">
    <h1 class="text-3xl font-bold text-slate-800 border-b-2 border-amber-500 pb-2">
      組件通信 (Component Communication)
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 父組件控制區 -->
      <section class="space-y-6">
        <div class="p-8 bg-slate-100 rounded-2xl border-2 border-slate-200">
          <h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            父組件 (Parent)
          </h3>
          <div class="space-y-4 mb-6">
            <div>
              <label class="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider"
                >輸入訊息傳給子組件：</label
              >
              <input
                v-model="parentMsg"
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <div class="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border">
              <span class="text-slate-600"
                >父組件計數：<strong class="text-2xl font-mono text-amber-600">{{
                  parentCount
                }}</strong></span
              >
              <button
                @click="parentCount++"
                class="px-4 py-2 bg-amber-500 text-white rounded-lg font-bold shadow-md hover:bg-amber-600"
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

        <div class="p-6 bg-slate-50 rounded-xl border border-slate-200">
          <h4 class="font-bold text-slate-700 mb-3">核心概念：單向資料流</h4>
          <p class="text-sm text-slate-600 leading-relaxed">
            在 Vue 中，資料流是單向的：<strong>父組件透過 Props 傳資料給子組件</strong>，而<strong
              >子組件則透過 Emits 發出事件通知父組件</strong
            >進行修改。 這確保了資料源的單一性，讓除錯變得更容易。
          </p>
        </div>
      </section>

      <!-- 子組件區域 -->
      <section class="space-y-6">
        <h3 class="text-lg font-bold text-slate-500 flex items-center gap-2">
          子組件 (Children)
        </h3>

        <!-- 子組件 A: 接收 Props -->
        <ChildProps :msg="parentMsg" :count="parentCount" />

        <!-- 子組件 B: 發送 Emits -->
        <ChildEmits @change-name="handleNameChange" @reset-count="handleReset" />

        <div class="p-4 bg-white border rounded-xl text-sm shadow-sm">
          <h4 class="font-bold text-slate-800 mb-2">學習重點：</h4>
          <ul class="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>:prop="variable"</strong> 是 v-bind 的縮寫。</li>
            <li><strong>@event="method"</strong> 是 v-on 的縮寫。</li>
            <li>子組件不能直接修改 Props（唯讀），必須透過 Emit 通知父組件。</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.communication-view {
  animation: slideDown 0.5s ease-out;
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
