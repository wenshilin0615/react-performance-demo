/*
 * @Author: 温石林
 * @Description: 
 * @FilePath: \react16_project\src\demos\demoC\scenarios\TextSearchOptimized.jsx
 */
import React, { useState, useRef, useEffect } from 'react';

// 场景3：文本搜索 - 优化版本（Web Worker）
function TextSearchOptimized() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [duration, setDuration] = useState(0);
  const [searching, setSearching] = useState(false);
  const workerRef = useRef(null);

  useEffect(() => {
    // 创建 Worker
    workerRef.current = new Worker(new URL('../workers/searchWorker.js', import.meta.url), { type: 'module' });
    
    workerRef.current.onmessage = (e) => {
      console.log('Received result from worker:', e);
      const endTime = performance.now();
      setDuration(endTime - workerRef.current.startTime);
      setResults(e.data.results);
      setSearching(false);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    
    if (!term) {
      setResults([]);
      setDuration(0);
      setSearching(false);
      return;
    }

    setSearching(true);
    workerRef.current.startTime = performance.now();
    console.log('Posting message to worker with searchTerm:', term);
    workerRef.current.postMessage({ searchTerm: term });
  };

  return (
    <div className="demo-c-scenario">
      <h2>场景2：文本搜索（优化版本 - Web Worker）</h2>
      <p>使用 Web Worker 在后台线程搜索，UI 保持流畅</p>

      <div className="demo-c-scenario-controls">
        <input
          type="text"
          placeholder="输入搜索关键词..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {searching && (
        <div className="demo-c-scenario-performance">
          ⏳ 搜索中...
        </div>
      )}

      {duration > 0 && !searching && (
        <div className="demo-c-scenario-performance">
          ⏱️ 搜索耗时：{duration.toFixed(2)} ms - 找到 {results.length} 条结果
          <span className="success-text">
            ✅ 使用 Web Worker，主线程未阻塞
          </span>
        </div>
      )}

      <div className="demo-c-scenario-result">
        {results.map(item => (
          <div key={item.id} className="search-result-item">
            <strong>{item.title}</strong>
            <p className="search-result-content">
              {item.content}
            </p>
          </div>
        ))}
      </div>

      <div className="demo-c-scenario-tip">
        <strong>优化效果：</strong>搜索过程中可以自由操作界面，无卡顿感
      </div>
    </div>
  );
}

export default React.memo(TextSearchOptimized);
