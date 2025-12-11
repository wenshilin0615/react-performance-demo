import React, { useState } from 'react';
import { processData as processDataUtil } from '../utils';

// 场景1：大数据处理 - 未优化版本（主线程阻塞）
function DataProcessingUnoptimized() {
  const [dataSize, setDataSize] = useState(500000);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState({ processing: false, duration: 0 });

  const processData = () => {
    setStatus({ processing: true, duration: 0 });
    setResult(null);
    const startTime = performance.now();

    const result = processDataUtil(dataSize);

    const endTime = performance.now();
    setStatus({ processing: false, duration: endTime - startTime });
    setResult(result);
  };

  return (
    <div className="demo-c-scenario">
      <h2>场景1：大数据处理（未优化）</h2>
      <p>在主线程中处理大量数据，会阻塞 UI 交互</p>

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
          {status.duration > 100 && <span style={{ color: '#d32f2f', marginLeft: '10px' }}>
            ⚠️ 主线程阻塞超过 100ms
          </span>}
        </div>
      )}
    </div>
  );
}

export default React.memo(DataProcessingUnoptimized);
