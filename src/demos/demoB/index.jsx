import React, { useState, Suspense, lazy, Profiler } from 'react';
import './index.less';

// 懒加载两个版本，避免同时加载
const UnoptimizedVersion = lazy(() => import('./UnoptimizedVersion'));
const OptimizedVersion = lazy(() => import('./OptimizedVersion'));

function Loading() {
  return (
    <div className="demo-b-loading">
      <div>⏳ 加载中...</div>
    </div>
  );
}

function DemoB() {
  const [showOptimized, setShowOptimized] = useState(false);
  
  const onRenderCallback = (id, phase, actualDuration) => {
    console.log(`[Profiler] ${id} - ${phase} 阶段耗时: ${actualDuration.toFixed(2)}ms`);
  };

  return (
    <div className="demo-b-wrapper">
      <div className="demo-b-main-header">
        <h1>Demo B - Code Splitting + Suspense 对比</h1>
        <p>对比未优化与优化版本的性能差异</p>
      </div>

      <div className="demo-b-main-content">
        <div className="demo-b-toggle">
          <button
            onClick={() => setShowOptimized(!showOptimized)}
            className={`demo-b-toggle-btn ${showOptimized ? 'optimized' : 'unoptimized'}`}
          >
            {showOptimized ? '切换到未优化版本' : '切换到优化版本'}
          </button>
        </div>

        <div className="demo-b-compare-instructions">
          <h3>对比说明：</h3>
          <ol>
            <li>打开浏览器 DevTools 的 Network 面板</li>
            <li>刷新页面，观察初始加载的文件数量和大小</li>
            <li>切换到仪表盘或设置页面</li>
            <li>对比两个版本的加载行为差异</li>
            <li>优化版本会动态加载新的 chunk 文件</li>
          </ol>
        </div>

        <Profiler id={showOptimized ? "OptimizedVersion" : "UnoptimizedVersion"} onRender={onRenderCallback}>
          <Suspense fallback={<Loading />}>
            {showOptimized ? <OptimizedVersion /> : <UnoptimizedVersion />}
          </Suspense>
        </Profiler>

        <div className="demo-b-comparison-table">
          <h3>性能对比预期：</h3>
          <table>
            <thead>
              <tr>
                <th>指标</th>
                <th>未优化版本</th>
                <th>优化版本</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>初始 Bundle 大小</td>
                <td>包含所有页面代码</td>
                <td>仅包含首页代码</td>
              </tr>
              <tr>
                <td>首屏加载时间</td>
                <td>较慢</td>
                <td>较快（减少 30-50%）</td>
              </tr>
              <tr>
                <td>页面切换</td>
                <td>立即显示</td>
                <td>首次有加载状态</td>
              </tr>
              <tr>
                <td>网络请求</td>
                <td>初始一次性加载</td>
                <td>按需加载多个 chunk</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DemoB;
