<!-- 路徑: src/views/AccessorView.vue | 功能: 講解 JavaScript Get/Set 存取器與 Vue 3 可寫入計算屬性 (Writable Computed) 的用法 -->
<script setup lang="ts">
import { ref, computed } from 'vue'

// --- 1. 基礎 JavaScript Get/Set 範例 ---
const jsUser = {
  firstName: '王',
  lastName: '小明',
  // 使用 get 定義唯讀屬性
  get fullName() {
    return `${this.firstName}${this.lastName}`
  },
}

// --- 2. Vue 3 可寫入計算屬性 (Writable Computed) ---
const firstName = ref('張')
const lastName = ref('君雅')

// 定義一個具備 get 與 set 的計算屬性
const fullName = computed({
  // 讀取時執行
  get() {
    return `${firstName.value}${lastName.value}`
  },
  // 寫入時執行 (例如：fullName.value = '李大華')
  set(newValue: string) {
    // 簡單的拆分邏輯：假設第一個字是姓，其餘是名
    // substring 方法用於提取字串的一部分，這裡將 newValue 的第一個字作為姓，剩餘部分作為名
    firstName.value = newValue.substring(0, 1)
    // substring(1) 從索引 1 開始提取字串，直到結尾，這裡將 newValue 的剩餘部分作為名
    lastName.value = newValue.substring(1)
  },
})

const updateFullName = () => {
  fullName.value = '李大華' // 這會觸發 set()
}

const resetData = () => {
  firstName.value = '張' //AccessorView.vue
  lastName.value = '君雅' //AccessorView.vue
}
</script>

<template>
  <div class="accessor-view space-y-10">
    <h1 class="text-3xl font-bold text-slate-800 border-b-2 border-indigo-500 pb-2">
      Get 與 Set 存取器
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 理論說明 -->
      <section class="space-y-6">
        <div class="p-6 bg-indigo-50 rounded-xl border border-indigo-100">
          <h2 class="text-xl font-bold text-indigo-800 mb-3">什麼是 Get/Set？</h2>
          <p class="text-sm text-indigo-900 leading-relaxed">
            這是一種特殊的函式，讓你可以像存取「屬性」一樣去呼叫「函式」。
          </p>
          <ul class="mt-4 list-disc pl-5 text-sm text-indigo-700 space-y-2">
            <li><strong>Get (Getter)</strong>：當有人「讀取」該值時觸發。</li>
            <li><strong>Set (Setter)</strong>：當有人「賦值/修改」該值時觸發。</li>
          </ul>
        </div>

        <div class="p-6 bg-slate-50 rounded-xl border border-slate-200">
          <h3 class="font-bold text-slate-800 mb-2">Vue 3 的應用場景</h3>
          <p class="text-sm text-slate-600">
            最常見於需要<strong>「雙向綁定」計算結果</strong>的場合。例如： 將 UI
            上的單一輸入框內容拆分並存入多個響應式變數中。
          </p>
        </div>
      </section>

      <!-- 實作展示區 -->
      <section class="space-y-6">
        <div class="p-8 bg-white rounded-2xl border shadow-sm">
          <h3 class="font-bold text-slate-800 mb-6 flex items-center gap-2">
            實戰：可寫入計算屬性
          </h3>

          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-400 mb-1"
                  >姓 (firstName) {{ firstName }}</label
                >
                <input
                  v-model="firstName"
                  type="text"
                  class="w-full px-3 py-2 border rounded-lg bg-slate-50"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-400 mb-1"
                  >名 (lastName){{ lastName }}</label
                >
                <input
                  v-model="lastName"
                  type="text"
                  class="w-full px-3 py-2 border rounded-lg bg-slate-50"
                />
              </div>
            </div>

            <div class="pt-4 border-t">
              <label class="block text-xs font-bold text-indigo-500 mb-1"
                >全名 (fullName) - 雙向綁定</label
              >
              <input
                v-model="fullName"
                type="text"
                class="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl focus:border-indigo-500 outline-none transition-colors font-bold text-lg"
              />
              <p class="mt-2 text-[10px] text-slate-400 italic">
                # 提示：直接修改上方「全名」，會透過
                <strong>set()</strong> 同步拆分給「姓」與「名」。
              </p>
            </div>

            <div class="flex gap-2">
              <button
                @click="updateFullName"
                class="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow-md hover:bg-indigo-700 active:scale-95 transition-all"
              >
                一鍵改名
              </button>
              <button
                @click="resetData"
                class="flex-1 py-2 bg-slate-200 text-slate-700 rounded-lg font-bold shadow-md hover:bg-slate-300 active:scale-95 transition-all"
              >
                重置資料
              </button>
            </div>
          </div>
        </div>

        <div class="p-6 bg-slate-900 rounded-xl text-indigo-300 font-mono text-xs leading-relaxed">
          <p class="text-slate-500 mb-2">// JavaScript 物件範例結果</p>
          <p>const jsUser = { ... }</p>
          <p>jsUser.fullName; // 輸出: "{{ jsUser.fullName }}"</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.accessor-view {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
