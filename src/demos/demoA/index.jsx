/*
 * @Author: 温石林
 * @Description: 
 * @FilePath: \react16_project\src\demos\demoA\index.jsx
 */
import React, { useState, Profiler } from 'react';
import UnoptimizedList from './UnoptimizedList';
import OptimizedList from './OptimizedList';
import './index.less';

function DemoA() {
  const [showOptimized, setShowOptimized] = useState(false);
  

  const onRenderCallback = (
    id, // Profiler 树的 "id"
    phase, // "mount"（挂载） 或 "update"（更新）
    actualDuration, // 本次更新 committed 花费的渲染时间
    baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
    startTime, // 本次更新中 React 开始渲染的时间
    commitTime, // 本次更新中 React committed 的时间
    interactions // 属于本次更新的 interactions 的集合
  ) => {
    console.log(`[Profiler] ${id} - ${phase} 阶段耗时: ${actualDuration.toFixed(2)}ms`);
  };
  
  return (
    <div className="demo-a">
      <div className="demo-a-header">
        <h2>Demo A - Render 瓶颈定位与优化</h2>
        <p>对比未优化与优化版本的性能差异</p>
      </div>
      
      <div className="demo-a-content">
        <div className="demo-a-toggle">
          <button
            onClick={() => setShowOptimized(!showOptimized)}
            className={`demo-a-btn ${showOptimized ? 'optimized' : 'unoptimized'}`}
          >
            {showOptimized ? '切换到未优化版本' : '切换到优化版本'}
          </button>
        </div>
        
        <Profiler id={showOptimized ? "OptimizedList" : "UnoptimizedList"} onRender={onRenderCallback}>
          {showOptimized ? <OptimizedList /> : <UnoptimizedList />}
        </Profiler>
        
        <div className="demo-a-summary">
          <h3>性能对比预期:</h3>
          <ul>
            <li><strong>未优化版本:</strong> 每次点击都会重新渲染所有 2000 个列表项,明显卡顿</li>
            <li><strong>优化版本:</strong> 使用 React.memo 避免不必要的重渲染 + 虚拟化只渲染可见项</li>
            <li><strong>性能提升:</strong> 渲染时间减少 90%+, 交互流畅度显著提升</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DemoA;
