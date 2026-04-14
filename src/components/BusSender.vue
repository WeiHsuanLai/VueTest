<!-- 路徑: src/components/BusSender.vue | 功能: 事件發送者，透過 EventBus 向兄弟組件發送訊息 -->
<script setup lang="ts">
import { ref } from 'vue'
import { bus } from '../utils/bus'

const inputMsg = ref('')

const sendMessage = () => {
  if (!inputMsg.value) return
  // 使用 bus.emit 發送事件
  bus.emit('send-msg', inputMsg.value)
  inputMsg.value = ''
}
</script>

<template>
  <div class="p-4 bg-orange-50 border border-orange-200 rounded-lg">
    <h4 class="font-bold text-orange-800 mb-2">兄弟 A (發送者)</h4>
    <input 
      v-model="inputMsg" 
      type="text" 
      placeholder="輸入訊息..." 
      class="w-full px-3 py-1 text-sm border rounded mb-2 outline-none focus:border-orange-500"
    >
    <button 
      @click="sendMessage" 
      class="w-full bg-orange-500 text-white text-xs py-2 rounded font-bold"
    >
      透過 EventBus 廣播
    </button>
  </div>
</template>
