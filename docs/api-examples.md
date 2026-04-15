# 運行時 API 範例

VitePress 提供了一些內建的 API 來輔助文件開發。

## 範例：使用組件

在 VitePress 中，你可以直接在 Markdown 中使用 Vue 組件。

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<button @click="count++">計數器：{{ count }}</button>
