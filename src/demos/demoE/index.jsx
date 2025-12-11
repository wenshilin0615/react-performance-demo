/*
 * @Author: 温石林
 * @Description: 
 * @FilePath: \react16_project\src\demos\demoE\index.jsx
 */
import React, { useState, useMemo, Profiler } from 'react';
import './index.less';

// 生成大量数据
const generateData = () => {
  console.log('生成大量数据...');
  return Array.from({ length: 3000000 }, (_, i) => ({
    id: i,
    name: `项目 ${i}`,
    description: `这是第 ${i} 个项目的描述信息`
  }));
};

// Profiler 回调
function onRenderCallback(id, phase, actualDuration) {
  console.log(`[Profiler] ${id} - ${phase} 阶段，耗时: ${actualDuration.toFixed(2)}ms`);
}

// React 16 - 无并发渲染
function DemoE() {
  const [query, setQuery] = useState('');
  // const [inputValue, setInputValue] = useState('');
  const data = useMemo(() => generateData(), []);

  // 过滤数据（耗时操作）
  const filteredResults = useMemo(() => {
    if (!query) return [];
    // const startTime = performance.now();
    const results = data.filter(item =>
      item.name.includes(query) || item.description.includes(query)
    );
    // const duration = performance.now() - startTime;
    // console.log(`过滤耗时: ${duration.toFixed(2)}ms`);
    return results.slice(0, 100);
  }, [query, data]);

  const handleChange = (e) => {
    const value = e.target.value;
    // setInputValue(value);
    // React 16: 直接更新，会阻塞输入
    setQuery(value);
  };

  return (
    <Profiler id="DemoE-React16" onRender={onRenderCallback}>
      <div className="demo-e">
        <h2>Demo E - React 16 搜索演示</h2>
        <p>所有更新同等优先级，输入时会感觉卡顿</p>

        <div className="demo-e-search">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="输入搜索关键词（尝试快速输入）..."
          />
        </div>

        <div className="demo-e-stats">
          <div>搜索关键词: {query || '(空)'}</div>
          <div>找到结果: {filteredResults.length} 条</div>
        </div>

        <div className="demo-e-results">
          <h3>搜索结果：</h3>
          {filteredResults.map(item => (
            <div key={item.id} className="demo-e-results-item">
              <strong>{item.name}</strong>
              <div>{item.description}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#ffebee', borderRadius: '4px' }}>
          <strong>React 16 问题：</strong>
          <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
            <li>输入和列表更新同等优先级</li>
            <li>快速输入时会感觉明显卡顿</li>
            <li>输入响应时间: 200-500ms</li>
          </ul>
        </div>
      </div>
    </Profiler>
  );
}

export default DemoE;
