/*
 * @Author: 温石林
 * @Description: 
 * @FilePath: \react16_project\src\demos\demoC\utils.js
 */
// 数据处理公共方法
export const processData = (dataSize) => {
  const data = Array.from({ length: dataSize }, (_, i) => ({
    id: i,
    value: Math.random() * 1000,
    category: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]
  }));

  data.sort((a, b) => b.value - a.value);
  const filtered = data.filter(item => item.value > 500);
  const stats = filtered.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  return {
    total: data.length,
    filtered: filtered.length,
    stats
  };
};

// 生成搜索数据
export const generateSearchData = () => {
  return Array.from({ length: 500000 }, (_, i) => ({
    id: i,
    title: `文章标题 ${i} - ${Math.random().toString(36).substring(7)}`,
    content: `这是第 ${i} 篇文章的内容，包含一些随机文本 ${Math.random().toString(36).substring(2, 15)}`
  }));
};

// 搜索方法
export const searchData = (data, searchTerm) => {
  return data.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
