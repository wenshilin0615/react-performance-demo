# Web Worker 使用指南

## 一、什么是 Web Worker

Web Worker 是 HTML5 提供的一个 JavaScript 多线程解决方案，允许在后台线程中运行脚本，不会阻塞主线程（UI 线程）。

### 核心特点

- **独立线程**：运行在与主线程分离的后台线程中
- **不阻塞 UI**：耗时计算不会影响页面交互和渲染
- **无法访问 DOM**：Worker 线程无法直接操作 DOM
- **通信机制**：通过消息传递（postMessage）与主线程通信

## 二、基本用法

### 2.1 创建 Worker 文件

在 `public/workers/` 目录下创建 Worker 文件（例如：`dataWorker.js`）：

```javascript
// public/workers/dataWorker.js

// 监听主线程发来的消息
self.onmessage = function(e) {
  const { dataSize } = e.data;
  
  // 执行耗时计算
  const data = Array.from({ length: dataSize }, (_, i) => ({
    id: i,
    value: Math.random() * 1000
  }));
  
  // 处理数据
  data.sort((a, b) => b.value - a.value);
  
  // 返回结果给主线程
  self.postMessage({
    total: data.length,
    result: data.slice(0, 10)
  });
};
```

### 2.2 在 React 组件中使用 Worker

```javascript
import React, { useState, useRef, useEffect } from 'react';

function DataProcessing() {
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const workerRef = useRef(null);

  // 初始化 Worker
  useEffect(() => {
    // 创建 Worker 实例
    workerRef.current = new Worker('/workers/dataWorker.js');
    
    // 监听 Worker 返回的消息
    workerRef.current.onmessage = (e) => {
      setResult(e.data);
      setProcessing(false);
    };

    // 监听 Worker 错误
    workerRef.current.onerror = (error) => {
      console.error('Worker error:', error);
      setProcessing(false);
    };

    // 组件卸载时终止 Worker
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  // 发送消息给 Worker
  const handleProcess = () => {
    setProcessing(true);
    workerRef.current.postMessage({ dataSize: 100000 });
  };

  return (
    <div>
      <button onClick={handleProcess} disabled={processing}>
        {processing ? '处理中...' : '开始处理'}
      </button>
      {result && <div>结果：{JSON.stringify(result)}</div>}
    </div>
  );
}
```

## 三、完整示例：文本搜索

### 3.1 Worker 文件

```javascript
// public/workers/searchWorker.js

self.onmessage = function(e) {
  const { searchTerm } = e.data;
  
  // 生成大量数据
  const data = Array.from({ length: 200000 }, (_, i) => ({
    id: i,
    title: `文章标题 ${i}`,
    content: `文章内容 ${i}`
  }));

  // 执行搜索
  const filtered = data.filter(item => 
    item.title.includes(searchTerm) ||
    item.content.includes(searchTerm)
  );

  // 返回结果
  self.postMessage({
    results: filtered.slice(0, 20)
  });
};
```

### 3.2 React 组件

```javascript
import React, { useState, useRef, useEffect } from 'react';

function TextSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const workerRef = useRef(null);

  useEffect(() => {
    workerRef.current = new Worker('/workers/searchWorker.js');
    
    workerRef.current.onmessage = (e) => {
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
      return;
    }

    setSearching(true);
    workerRef.current.postMessage({ searchTerm: term });
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="搜索..."
      />
      {searching && <div>搜索中...</div>}
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 四、通信机制详解

### 4.1 主线程 → Worker

```javascript
// 发送简单数据
worker.postMessage({ type: 'start', value: 100 });

// 发送复杂数据
worker.postMessage({
  action: 'process',
  data: [1, 2, 3, 4, 5],
  options: { sort: true }
});
```

### 4.2 Worker → 主线程

```javascript
// Worker 文件中
self.onmessage = function(e) {
  const { action, data } = e.data;
  
  if (action === 'process') {
    const result = processData(data);
    self.postMessage({ status: 'success', result });
  }
};
```

### 4.3 错误处理

```javascript
// 主线程中
worker.onerror = function(error) {
  console.error('Worker 错误:', error.message);
  console.error('文件:', error.filename);
  console.error('行号:', error.lineno);
};

// Worker 文件中
self.onerror = function(error) {
  console.error('Worker 内部错误:', error);
};
```

## 五、性能优化技巧

### 5.1 记录处理时间

```javascript
// 主线程
const startTime = performance.now();
workerRef.current.startTime = startTime;
workerRef.current.postMessage({ data });

workerRef.current.onmessage = (e) => {
  const duration = performance.now() - workerRef.current.startTime;
  console.log(`处理耗时: ${duration.toFixed(2)} ms`);
};
```

### 5.2 传输大数据（Transferable Objects）

```javascript
// 使用 Transferable Objects 避免数据拷贝
const buffer = new ArrayBuffer(1024 * 1024); // 1MB
worker.postMessage({ buffer }, [buffer]); // 第二个参数是可转移对象列表

// 注意：buffer 在主线程中将不可用
```

### 5.3 Worker 池

```javascript
class WorkerPool {
  constructor(workerPath, poolSize = 4) {
    this.workers = [];
    this.taskQueue = [];
    
    for (let i = 0; i < poolSize; i++) {
      const worker = new Worker(workerPath);
      worker.busy = false;
      worker.onmessage = (e) => this.handleMessage(worker, e);
      this.workers.push(worker);
    }
  }

  execute(data) {
    return new Promise((resolve) => {
      const task = { data, resolve };
      const worker = this.workers.find(w => !w.busy);
      
      if (worker) {
        this.runTask(worker, task);
      } else {
        this.taskQueue.push(task);
      }
    });
  }

  runTask(worker, task) {
    worker.busy = true;
    worker.currentTask = task;
    worker.postMessage(task.data);
  }

  handleMessage(worker, e) {
    worker.currentTask.resolve(e.data);
    worker.busy = false;
    
    if (this.taskQueue.length > 0) {
      const nextTask = this.taskQueue.shift();
      this.runTask(worker, nextTask);
    }
  }

  terminate() {
    this.workers.forEach(w => w.terminate());
  }
}

// 使用
const pool = new WorkerPool('/workers/dataWorker.js', 4);
const result = await pool.execute({ dataSize: 100000 });
```

## 六、使用场景

### 适合使用 Worker 的场景

✅ **大数据处理**
- Excel 文件解析
- JSON 数据转换
- 数据排序、过滤、聚合

✅ **复杂计算**
- 图像处理（滤镜、压缩）
- 加密解密
- 数学运算

✅ **文本处理**
- 全文搜索
- 正则表达式匹配
- Markdown 解析

✅ **文件操作**
- 文件压缩/解压
- 文件分片上传
- 文件格式转换

### 不适合使用 Worker 的场景

❌ **需要操作 DOM**
- Worker 无法访问 DOM

❌ **轻量计算**
- 耗时小于 50ms 的操作，Worker 通信开销可能更大

❌ **需要访问 window 对象**
- Worker 中无法使用 localStorage、sessionStorage 等

## 七、注意事项

### 7.1 Worker 的限制

- 无法访问 DOM
- 无法访问 window、document、parent 对象
- 可以使用 navigator、location（只读）
- 可以使用 XMLHttpRequest、fetch
- 可以使用 setTimeout、setInterval
- 可以导入其他脚本（importScripts）

### 7.2 数据传递

```javascript
// ✅ 可以传递的数据类型
worker.postMessage({
  string: 'hello',
  number: 123,
  boolean: true,
  array: [1, 2, 3],
  object: { a: 1 },
  date: new Date(),
  regexp: /test/,
  arrayBuffer: new ArrayBuffer(8)
});

// ❌ 不能传递的数据类型
worker.postMessage({
  function: () => {},  // 函数不能传递
  dom: document.body,  // DOM 节点不能传递
  symbol: Symbol()     // Symbol 不能传递
});
```

### 7.3 调试技巧

```javascript
// Worker 文件中添加日志
self.onmessage = function(e) {
  console.log('[Worker] 收到消息:', e.data);
  
  try {
    const result = processData(e.data);
    console.log('[Worker] 处理完成:', result);
    self.postMessage(result);
  } catch (error) {
    console.error('[Worker] 处理错误:', error);
    self.postMessage({ error: error.message });
  }
};
```

## 八、浏览器兼容性

Web Worker 支持所有现代浏览器：

- Chrome 4+
- Firefox 3.5+
- Safari 4+
- Edge 12+
- Opera 10.6+

检测浏览器是否支持：

```javascript
if (typeof Worker !== 'undefined') {
  // 支持 Web Worker
  const worker = new Worker('/workers/myWorker.js');
} else {
  // 不支持，使用降级方案
  console.warn('浏览器不支持 Web Worker');
}
```

## 九、总结

### 何时使用 Web Worker

- 耗时操作超过 50ms
- 需要保持 UI 流畅响应
- CPU 密集型计算
- 不需要访问 DOM

### 最佳实践

1. **合理使用**：不是所有计算都需要 Worker
2. **错误处理**：始终添加错误处理逻辑
3. **及时清理**：组件卸载时终止 Worker
4. **性能监控**：使用 Performance API 监控耗时
5. **数据优化**：传输大数据时考虑使用 Transferable Objects

### 性能对比

| 场景 | 主线程 | Web Worker |
|------|--------|------------|
| 10万数据排序 | UI 阻塞 200-500ms | UI 流畅，0ms 阻塞 |
| 20万文本搜索 | 输入卡顿 | 输入流畅 |
| 图片滤镜处理 | 页面冻结 | 可正常交互 |

通过合理使用 Web Worker，可以显著提升应用的性能和用户体验！
