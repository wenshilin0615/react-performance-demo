import React, { useState, useRef, useEffect } from 'react';

// 场景1：大数据处理 - 优化版本（Web Worker）
function DataProcessingOptimized() {
  const [dataSize, setDataSize] = useState(100000);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [duration, setDuration] = useState(0);
  const workerRef = useRef(null);

  useEffect(() => {
    // 创建 Worker
    workerRef.current = new Worker('/workers/dataWorker.js');
    
    workerRef.current.onmessage = (e) => {
      const endTime = performance.now();
      setDuration(endTime - workerRef.current.startTime);
      setResult(e.data);
      setProcessing(false);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const processData = () => {
    setProcessing(true);
    setResult(null);
    workerRef.current.startTime = performance.now();
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
        <button onClick={processData} disabled={processing}>
          {processing ? '处理中...' : '开始处理'}
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

      {duration > 0 && (
        <div className="demo-c-scenario-performance">
          ⏱️ 处理耗时：{duration.toFixed(2)} ms
          <span style={{ color: '#4caf50', marginLeft: '10px' }}>
            ✅ 使用 Web Worker，主线程未阻塞
          </span>
        </div>
      )}

      <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>
        <strong>优化效果：</strong>处理过程中可以自由操作界面，无卡顿感
      </div>
    </div>
  );
}

export default DataProcessingOptimized;
