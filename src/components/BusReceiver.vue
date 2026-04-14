<!-- 路徑: src/components/BusReceiver.vue | 功能: 事件接收者，透過 EventBus 監聽兄弟組件發送的訊息 -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { bus } from '../utils/bus'

const receivedMsg = ref<string>('')

// 1. 監聽事件
const onReceive = (msg: string) => {
  receivedMsg.value = msg
}

onMounted(() => {
  // 2. 在掛載時註冊監聽器
  bus.on('send-msg', onReceive)
})

onUnmounted(() => {
  // 3. 在卸載時取消監聽 (非常重要，否則會記憶體洩漏)
  bus.off('send-msg', onReceive)
})
</script>

<template>
  <div class="p-4 bg-sky-50 border border-sky-200 rounded-lg">
    <h4 class="font-bold text-sky-800 mb-2">兄弟 B (接收者)</h4>
    <p class="text-sm text-sky-700">我收到的廣播：</p>
    <div class="p-3 bg-white border border-sky-100 rounded-lg font-mono text-xs text-sky-600 min-h-[40px] flex items-center">
      <span v-if="receivedMsg">{{ receivedMsg }}</span>
      <span v-else class="text-slate-300 italic">等待廣播中...</span>
    </div>
  </div>
</template>
