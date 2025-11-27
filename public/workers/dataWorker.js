// Web Worker: 处理大数据
self.onmessage = function(e) {
  const { dataSize } = e.data;
  
  // 生成数据
  const data = Array.from({ length: dataSize }, (_, i) => ({
    id: i,
    value: Math.random() * 1000,
    category: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]
  }));

  // 排序
  data.sort((a, b) => b.value - a.value);

  // 过滤
  const filtered = data.filter(item => item.value > 500);

  // 聚合统计
  const stats = filtered.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  // 返回结果
  self.postMessage({
    total: data.length,
    filtered: filtered.length,
    stats
  });
};
