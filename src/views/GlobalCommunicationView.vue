<!-- 路徑: src/views/GlobalCommunicationView.vue | 功能: 解析全域與隔代組件通信，包含 EventBus (mitt) 與 $attrs 穿透模式 -->
<script setup lang="ts">
import { ref } from 'vue'
import BusSender from '../components/BusSender.vue'
import BusReceiver from '../components/BusReceiver.vue'
import MiddleComponent from '../components/MiddleComponent.vue'

// 1. 為隔代通信準備的資料
const ancestorMsg = ref('祖父傳來的秘密訊息')
const ancestorCount = ref(0)

const resetAncestor = () => {
  ancestorCount.value = 0
  ancestorMsg.value = '祖父傳來的秘密訊息'
}
</script>

<template>
  <div class="global-view space-y-12">
    <h1 class="text-3xl font-bold text-slate-800 border-b-2 border-sky-500 pb-2">
      全域與隔代組件通信
    </h1>

    <!-- 1. EventBus 模式演示 -->
    <section class="space-y-6">
      <div class="p-6 bg-white rounded-2xl border border-sky-100 shadow-sm">
        <h2 class="text-xl font-bold text-sky-800 mb-2 flex items-center gap-2">
          模式一：EventBus (全域廣播)
        </h2>
        <p class="text-sm text-slate-600 mb-6">
          適用場景：<strong>兄弟組件</strong>、<strong>不相關組件</strong>。透過
          <code>mitt</code> 或 <code>bus.ts</code> 發送與監聽事件，不需建立層級關係。
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BusSender />
          <BusReceiver />
        </div>

        <div class="mt-6 p-4 bg-sky-50 rounded-lg text-xs text-sky-700 font-mono italic">
          註：Vue 3 官方建議如果專案較大，應優先考慮 Pinia，而非 EventBus。
        </div>
      </div>
    </section>

    <!-- 2. $attrs 模式演示 -->
    <section class="space-y-6">
      <div class="p-6 bg-white rounded-2xl border border-rose-100 shadow-sm">
        <h2 class="text-xl font-bold text-rose-800 mb-2 flex items-center gap-2">
          模式二：$attrs (隔代穿透)
        </h2>
        <p class="text-sm text-slate-600 mb-6">
          適用場景：<strong>祖父傳孫子</strong>。中間組件不需宣告 Props，只需透傳
          <code>v-bind="$attrs"</code>，孫子即可接收所有屬性與事件。
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div class="space-y-4">
            <h3 class="font-bold text-slate-700">祖父組件 (Ancestor)</h3>
            <div class="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 shadow-inner">
              <input
                v-model="ancestorMsg"
                type="text"
                class="w-full px-4 py-2 border-2 border-slate-300 bg-white rounded-lg mb-4 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none text-slate-800 font-semibold shadow-sm transition-all"
              />
              <div class="flex items-center justify-between">
                <span
                  >祖父計數:
                  <strong class="text-xl text-rose-500">{{ ancestorCount }}</strong></span
                >
                <button
                  @click="ancestorCount++"
                  class="px-4 py-2 bg-rose-500 text-white rounded-lg"
                >
                  +1
                </button>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="font-bold text-slate-700">組件階層展示</h3>
            <!-- 傳遞資料與事件給中轉組件，中轉組件不接，直接傳給孫子 -->
            <MiddleComponent :msg="ancestorMsg" :count="ancestorCount" @reset="resetAncestor" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.global-view {
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
