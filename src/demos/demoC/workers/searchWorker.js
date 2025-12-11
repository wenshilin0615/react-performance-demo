import { generateSearchData, searchData } from '../utils.js';

// Web Worker: 文本搜索
self.onmessage = function (e) {
  console.log('Worker received message:', e);
  const { searchTerm } = e.data;

  const data = generateSearchData();
  const filtered = searchData(data, searchTerm);

  const results = filtered.slice(0, 20);
  console.log('Worker sending message back:', results);
  self.postMessage({
    results,
  });
};
