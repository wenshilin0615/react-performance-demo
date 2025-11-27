import React, { useState, useEffect } from 'react';
import './index.less';

function StrictModeDemo() {
  const [effectCount, setEffectCount] = useState(0);

  useEffect(() => {
    setEffectCount(prev => prev + 1);
    console.log(`[React 16 StrictMode] Effect 执行次数: ${effectCount + 1}`);
    
    return () => {
      console.log('[React 16 StrictMode] Effect cleanup');
    };
  }, []);

  return (
    <div className="demo-g-strictmode">
      <h3>✨ React 16 StrictMode 实际效果</h3>
      <div className="demo-g-stats">
        <div className="demo-g-stat">
          <span className="label">Effect 执行次数:</span>
          <span className="value">{effectCount}</span>
        </div>
      </div>
      <p className="demo-g-note">
        💡 打开控制台查看：开发模式下 Effect 执行 1 次
      </p>
    </div>
  );
}

function DemoG() {
  return (
    <div className="demo-g">
      <h2>Demo G - React 16 入口 API 与 StrictMode</h2>
      
      <div className="demo-g-api">
        <h3>React 16 入口 API</h3>
        <div className="demo-g-code">
          <pre>{`// main.jsx
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);`}</pre>
        </div>
      </div>

      <StrictModeDemo />

      <div className="demo-g-features">
        <h3>React 16 StrictMode 特点</h3>
        <ul>
          <li>Effect 执行 1 次</li>
          <li>基础检查和警告</li>
          <li>检测不安全的生命周期</li>
          <li>检测过时的 API</li>
        </ul>
      </div>

      <div className="demo-g-migration">
        <h3>升级到 React 19 的变化</h3>
        <ul>
          <li>入口 API：ReactDOM.render → createRoot</li>
          <li>StrictMode：Effect 执行 2 次（开发模式）</li>
          <li>需要确保 Effects 是幂等的</li>
        </ul>
      </div>
    </div>
  );
}

export default DemoG;
