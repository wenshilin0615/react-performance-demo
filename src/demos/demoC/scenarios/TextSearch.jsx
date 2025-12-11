import React, { useState } from 'react';
import { generateSearchData, searchData } from '../utils';

// 场景3：文本搜索 - 未优化版本
function TextSearchUnoptimized() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [duration, setDuration] = useState(0);

  const handleSearch = (term) => {
    setSearchTerm(term);
    
    if (!term) {
      setResults([]);
      setDuration(0);
      return;
    }

    const startTime = performance.now();
    
    const data = generateSearchData();
    const filtered = searchData(data, term);

    const endTime = performance.now();
    setDuration(endTime - startTime);
    setResults(filtered.slice(0, 20));
  };

  return (
    <div className="demo-c-scenario">
      <h2>场景2：文本搜索（未优化）</h2>
      <p>在主线程中搜索大量文本，输入时会卡顿</p>

      <div className="demo-c-scenario-controls">
        <input
          type="text"
          placeholder="输入搜索关键词..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: '300px' }}
        />
      </div>

      {duration > 0 && (
        <div className="demo-c-scenario-performance">
          ⏱️ 搜索耗时：{duration.toFixed(2)} ms - 找到 {results.length} 条结果
        </div>
      )}

      <div className="demo-c-scenario-result">
        {results.map(item => (
          <div key={item.id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
            <strong>{item.title}</strong>
            <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(TextSearchUnoptimized);
