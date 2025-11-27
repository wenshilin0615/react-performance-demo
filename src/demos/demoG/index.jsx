import React, { useState, useEffect } from 'react';
import './index.less';

function StrictModeDemo() {
  const [effectCount, setEffectCount] = useState(0);

  useEffect(() => {
    setEffectCount(prev => prev + 1);
    console.log(`[React 19 StrictMode] Effect 执行次数: ${effectCount + 1}`);
    
    return () => {
      console.log('[React 19 StrictMode] Effect cleanup');
    };
  }, []);

  return (
    <div className="demo-g-strictmode">
      <h3>✨ React 19 StrictMode 实际效果</h3>
      <div className="demo-g-stats">
        <div className="demo-g-stat">
          <span className="label">Effect 执行次数:</span>
          <span className="value">{effectCount}</span>
        </div>
      </div>
      <p className="demo-g-note">
        💡 打开控制台查看：开发模式下 Effect 会执行 2 次（mount → cleanup → mount）
      </p>
    </div>
  );
}

function DemoG() {
  return (
    <div className="demo-g">
      <h2>Demo G - React 19 入口 API 与 StrictMode</h2>
      
      <div className="demo-g-api">
        <h3>React 19 入口 API</h3>
        <div className="demo-g-code">
          <pre>{`// main.jsx
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(
  document.getElementById('root')
);
root.render(<App />);`}</pre>
        </div>
      </div>

      <StrictModeDemo />

      <div className="demo-g-features">
        <h3>React 19 StrictMode 特点</h3>
        <ul>
          <li>Effect 执行 2 次（开发模式）</li>
          <li>mount → cleanup → mount 流程</li>
          <li>暴露不幂等的副作用</li>
          <li>帮助发现潜在问题</li>
        </ul>
      </div>

      <div className="demo-g-benefits">
        <h3>相比 React 16 的改进</h3>
        <ul>
          <li>新的 createRoot API 启用并发特性</li>
          <li>更严格的 StrictMode 检查</li>
          <li>更好的开发体验和错误提示</li>
        </ul>
      </div>
    </div>
  );
}

export default DemoG;
