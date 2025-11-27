// Web Worker: 文本搜索
self.onmessage = function(e) {
  const { searchTerm } = e.data;
  
  // 生成大量数据
  const data = Array.from({ length: 200000 }, (_, i) => ({
    id: i,
    title: `文章标题 ${i} - ${Math.random().toString(36).substring(7)}`,
    content: `这是第 ${i} 篇文章的内容，包含一些随机文本 ${Math.random().toString(36).substring(2, 15)}`
  }));

  // 模糊搜索
  const filtered = data.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 返回结果
  self.postMessage({
    results: filtered.slice(0, 20)
  });
};
