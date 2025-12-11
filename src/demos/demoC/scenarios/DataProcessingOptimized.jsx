/*
 * @Author: 温石林
 * @Description: 
 * @FilePath: \react16_project\src\demos\demoC\scenarios\DataProcessingOptimized.jsx
 */
import React, { useState, useRef, useEffect } from 'react';

// 场景1：大数据处理 - 优化版本（Web Worker）
function DataProcessingOptimized() {
  const [dataSize, setDataSize] = useState(500000);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState({ processing: false, duration: 0 });
  const workerRef = useRef(null);

  useEffect(() => {
    // 创建 Worker
    workerRef.current = new Worker(new URL('../workers/dataWorker.js', import.meta.url), { type: 'module' });
    
    workerRef.current.onmessage = (e) => {
      console.log('Received result from worker:', e);
      const endTime = performance.now();
      setStatus({ processing: false, duration: endTime - workerRef.current.startTime });
      setResult(e.data);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const processData = () => {
    setStatus({ processing: true, duration: 0 });
    setResult(null);
    workerRef.current.startTime = performance.now();
    console.log('Posting message to worker with dataSize:', dataSize);
    workerRef.current.postMessage({ dataSize });
  };

  return (
    <div className="demo-c-scenario">
      <h2>场景1：大数据处理（优化版本 - Web Worker）</h2>
      <p>使用 Web Worker 在后台线程处理，UI 保持流畅</p>

      <div className="demo-c-scenario-controls">
        <label>
          数据量：
          <input
            type="number"
            value={dataSize}
            onChange={(e) => setDataSize(Number(e.target.value))}
            min="10000"
            max="1000000"
            step="10000"
          />
        </label>
        <button onClick={processData} disabled={status.processing}>
          {status.processing ? '处理中...' : '开始处理'}
        </button>
      </div>

      {result && (
        <div className="demo-c-scenario-result success">
          <h3>处理结果：</h3>
          <p>总数据量：{result.total}</p>
          <p>过滤后：{result.filtered}</p>
          <p>分类统计：{JSON.stringify(result.stats)}</p>
        </div>
      )}

      {status.duration > 0 && (
        <div className="demo-c-scenario-performance">
          ⏱️ 处理耗时：{status.duration.toFixed(2)} ms
          <span className="success-text">
            ✅ 使用 Web Worker，主线程未阻塞
          </span>
        </div>
      )}

      <div className="demo-c-scenario-tip">
        <strong>优化效果：</strong>处理过程中可以自由操作界面，无卡顿感
      </div>
    </div>
  );
}

export default React.memo(DataProcessingOptimized);
