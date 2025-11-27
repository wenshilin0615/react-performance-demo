import React, { useState, Profiler } from 'react';
import DataProcessing from './scenarios/DataProcessing';
import DataProcessingOptimized from './scenarios/DataProcessingOptimized';
import TextSearch from './scenarios/TextSearch';
import TextSearchOptimized from './scenarios/TextSearchOptimized';
import './index.less';

function DemoC() {
  const [currentScenario, setCurrentScenario] = useState('data');
  const [showOptimized, setShowOptimized] = useState(false);
  
  const onRenderCallback = (id, phase, actualDuration) => {
    console.log(`[Profiler] ${id} - ${phase} 阶段耗时: ${actualDuration.toFixed(2)}ms`);
  };

  const renderScenario = () => {
    if (showOptimized) {
      return currentScenario === 'data' ? <DataProcessingOptimized /> : <TextSearchOptimized />;
    } else {
      return currentScenario === 'data' ? <DataProcessing /> : <TextSearch />;
    }
  };

  return (
    <div className="demo-c-wrapper">
      <div className="demo-c-main-header">
        <h1>Demo C - 耗时计算移出主线程</h1>
        <p>对比主线程阻塞与优化方案的性能差异</p>
      </div>

      <div className="demo-c-main-content">
        <div className="demo-c-instructions">
          <h3>常见业务场景：</h3>
          <ul>
            <li><strong>大数据处理：</strong>Excel 导入、数据分析、复杂计算</li>
            <li><strong>文本搜索：</strong>大量数据的模糊搜索、全文检索</li>
          </ul>
        </div>

        <div className="demo-c-toggle">
          <button
            onClick={() => setShowOptimized(!showOptimized)}
            className={`demo-c-toggle-btn ${showOptimized ? 'optimized' : 'unoptimized'}`}
          >
            {showOptimized ? '切换到未优化版本' : '切换到优化版本'}
          </button>
        </div>

        <div className="demo-c-toggle" style={{ marginTop: '10px' }}>
          <button
            onClick={() => setCurrentScenario('data')}
            className={`demo-c-toggle-btn ${currentScenario === 'data' ? 'optimized' : 'unoptimized'}`}
          >
            大数据处理
          </button>
          <button
            onClick={() => setCurrentScenario('search')}
            className={`demo-c-toggle-btn ${currentScenario === 'search' ? 'optimized' : 'unoptimized'}`}
            style={{ marginLeft: '10px' }}
          >
            文本搜索
          </button>
        </div>

        <Profiler 
          id={`${currentScenario}-${showOptimized ? 'optimized' : 'unoptimized'}`} 
          onRender={onRenderCallback}
        >
          {renderScenario()}
        </Profiler>

        <div className="demo-c-comparison">
          <h3>优化方案对比：</h3>
          <table>
            <thead>
              <tr>
                <th>场景</th>
                <th>未优化问题</th>
                <th>优化方案</th>
                <th>效果</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>大数据处理</strong></td>
                <td>主线程阻塞，UI 卡死</td>
                <td>Web Worker</td>
                <td>UI 完全流畅</td>
              </tr>
              <tr>
                <td><strong>文本搜索</strong></td>
                <td>输入卡顿，每次重新生成数据</td>
                <td>Web Worker</td>
                <td>UI 保持响应</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#e3f2fd', 
          borderRadius: '4px' 
        }}>
          <h3>性能优化建议：</h3>
          <ul>
            <li>耗时超过 50ms 的计算应考虑移出主线程</li>
            <li>使用 Performance API 监控关键操作耗时</li>
            <li>对于用户输入触发的计算，使用防抖或节流</li>
            <li>大数据处理优先考虑 Web Worker</li>
            <li>图片处理可使用 OffscreenCanvas（需浏览器支持）</li>
            <li>使用 React Profiler 定位性能瓶颈</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DemoC;
