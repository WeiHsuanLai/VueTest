// 路徑: src/utils/bus.ts | 功能: 建立 Mitt 事件中心 (Event Bus) 以供全域組件通信使用
import mitt from 'mitt'

// 定義事件類型
type Events = {
  'send-msg': string;
  'clear-msg': void;
};

// 匯出實例
export const bus = mitt<Events>()
