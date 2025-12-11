/*
 * @Author: 温石林
 * @Description: 
 * @FilePath: \react19_project\src\demos\demoE\index.jsx
 */
import React, { useState, useMemo, useTransition, useDeferredValue, Profiler } from 'react';
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

// React 19 - 使用 useTransition + useDeferredValue
function DemoE() {
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isPending, startTransition] = useTransition();
  const data = useMemo(() => generateData(), []);
  
  // 使用 useDeferredValue 延迟更新查询值
  const deferredQuery = useDeferredValue(query);
  // const deferredQuery = query;

  // 过滤数据（耗时操作）- 使用 deferredQuery
  const filteredResults = useMemo(() => {
    if (!deferredQuery) return [];
    // const startTime = performance.now();
    const results = data.filter(item =>
      item.name.includes(deferredQuery) || item.description.includes(deferredQuery)
    );
    // const duration = performance.now() - startTime;
    // console.log(`过滤耗时: ${duration.toFixed(2)}ms`);
    return results.slice(0, 100);
  }, [deferredQuery, data]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value); // 高优先级，立即更新
    
    // 使用 startTransition 将列表更新标记为低优先级
    startTransition(() => {
      setQuery(value);
    });
  };

  return (
    <Profiler id="DemoE-React19" onRender={onRenderCallback}>
      <div className="demo-e">
        <h2>Demo E - React 19 搜索演示（useTransition + useDeferredValue）</h2>
        <p>结合 useTransition 和 useDeferredValue 实现流畅的搜索体验</p>

        <div className="demo-e-search">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="输入搜索关键词（尝试快速输入）..."
          />
        </div>

        <div className={`demo-e-stats ${isPending ? 'pending' : ''}`}>
          <div>搜索关键词: {query || '(空)'} deferredQuery: {deferredQuery}</div>
          <div>找到结果: {filteredResults.length} 条</div>
          {isPending && <div style={{ color: '#ff9800' }}>⏳ 正在更新结果...</div>}
        </div>

        <div className={`demo-e-results ${isPending ? 'pending' : ''}`}>
          <h3>搜索结果：</h3>
          {filteredResults.map(item => (
            <div key={item.id} className="demo-e-results-item">
              <strong>{item.name}</strong>
              <div>{item.description}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>
          <strong>React 19 优化：</strong>
          <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
            <li>useTransition: 将列表更新标记为低优先级</li>
            <li>useDeferredValue: 延迟更新查询值，避免频繁过滤</li>
            <li>输入框立即响应，不阻塞</li>
            <li>输入响应时间: &lt;50ms</li>
            <li>isPending 状态提供加载反馈</li>
          </ul>
        </div>
      </div>
    </Profiler>
  );
}

export default DemoE;
