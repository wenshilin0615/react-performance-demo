import React, { useState, useRef, Profiler } from 'react';
import './index.less';

// Profiler 回调函数
function onRenderCallback(id, phase, actualDuration) {
  console.log(`[Profiler] ${id} - ${phase} 阶段，耗时: ${actualDuration.toFixed(2)}ms`);
}

// React 19 - 自动批处理演示
function DemoD() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState([]);
  const renderLog = useRef([]);
  const prevStateRef = useRef({ count: 0, flag: false, data: [] });

  // 检测状态变化并记录渲染
  if (count !== prevStateRef.current.count || 
      flag !== prevStateRef.current.flag || 
      data !== prevStateRef.current.data) {
    if (renderLog.current.length > 0 || count !== 0 || flag !== false || data.length !== 0) {
      const timestamp = new Date().toLocaleTimeString();
      renderLog.current.push(`渲染 #${renderLog.current.length + 1} - ${timestamp}`);
    }
    prevStateRef.current = { count, flag, data };
  }

  const handleTimeoutUpdate = () => {
    renderLog.current = [];
    
    setTimeout(() => {
      setCount(c => c + 1);
      setFlag(f => !f);
      setData([1, 2, 3]);
    }, 100);
  };

  const handlePromiseUpdate = () => {
    renderLog.current = [];
    
    Promise.resolve().then(() => {
      setCount(c => c + 1);
      setFlag(f => !f);
      setData([4, 5, 6]);
    });
  };

  const handleEventUpdate = () => {
    renderLog.current = [];
    
    setCount(c => c + 1);
    setFlag(f => !f);
    setData([7, 8, 9]);
  };

  return (
    <Profiler id="DemoD" onRender={onRenderCallback}>
      <div className="demo-d">
      <h2>Demo D - React 19 自动批处理演示</h2>
      <p>React 19 在所有场景下都自动批处理，多次 setState 合并为一次渲染</p>

      <div className="demo-d-controls">
        <button onClick={handleTimeoutUpdate}>setTimeout 更新</button>
        <button onClick={handlePromiseUpdate}>Promise 更新</button>
        <button onClick={handleEventUpdate}>事件处理器更新</button>
      </div>

      <div className="demo-d-stats">
        <div><span>Count:</span><strong>{count}</strong></div>
        <div><span>Flag:</span><strong>{flag ? 'true' : 'false'}</strong></div>
        <div><span>Data:</span><strong>[{data.join(', ')}]</strong></div>
        <div><span>渲染次数:</span><strong style={{ color: '#4caf50' }}>{renderLog.current.length}</strong></div>
      </div>

      <div className="demo-d-render-log">
        <h4>渲染日志：</h4>
        {renderLog.current.length === 0 ? (
          <div style={{ color: '#999', fontStyle: 'italic' }}>点击按钮开始测试...</div>
        ) : (
          renderLog.current.map((log, index) => (
            <div key={index} className="demo-d-render-log-item">{log}</div>
          ))
        )}
      </div>

      <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>
        <strong>React 19 特点：</strong>
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          <li>所有场景下：3 次 setState = 1 次渲染（自动批处理）</li>
          <li>性能提升：减少 60-80% 的渲染次数</li>
        </ul>
      </div>
      </div>
    </Profiler>
  );
}

export default DemoD;
