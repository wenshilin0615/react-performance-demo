import { processData } from '../utils.js';

// Web Worker: 处理大数据
self.onmessage = function (e) {
  console.log('Worker received message:', e);
  const { dataSize } = e.data;

  const result = processData(dataSize);
  
  console.log('Worker sending message back:', result);
  self.postMessage(result);
};
