import React, { useState, useEffect, Suspense } from 'react';
import './index.less';

let cache = new Map();

function fetchUserData() {
  const cacheKey = 'userData';
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({ user: '李四', email: 'lisi@example.com' });
    }, 1500);
  });

  cache.set(cacheKey, promise);
  return promise;
}

function UserData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchUserData().then(setData);
  }, []);

  if (!data) {
    return <div className="demo-j-loading">⏳ 加载中...</div>;
  }

  return (
    <div className="demo-j-data">
      <p>用户: {data.user}</p>
      <p>邮箱: {data.email}</p>
    </div>
  );
}

function DemoJ() {
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    cache.clear();
    setKey(prev => prev + 1);
  };

  return (
    <div className="demo-j">
      <h2>Demo J - React 19 use Hook 异步处理</h2>
      <p className="demo-j-intro">
        React 19 use Hook 配合 Suspense 实现优雅的异步数据处理
      </p>

      <div className="demo-j-live">
        <h3>✨ 实际效果演示</h3>
        <div className="demo-j-display">
          <Suspense fallback={<div className="demo-j-loading">⏳ 加载中...</div>}>
            <UserData key={key} />
          </Suspense>
          <button onClick={handleRefresh}>重新加载</button>
        </div>
        <div className="demo-j-note">
          💡 Suspense 自动处理加载状态
        </div>
      </div>

      <div className="demo-j-code-section">
        <h3>React 19 use Hook 代码</h3>
        <div className="demo-j-code">
          <pre>{`// 直接使用 Promise，无需状态管理
function Component() {
  const data = use(fetchData());
  return <div>{data}</div>;
}

// 配合 Suspense 使用
<Suspense fallback={<Loading />}>
  <Component />
</Suspense>

// ✅ 代码减少 80%
// ✅ 自动处理加载状态
// ✅ 声明式，更清晰`}</pre>
        </div>
      </div>

      <div className="demo-j-features">
        <h3>React 19 use Hook 特性</h3>
        <ul>
          <li>直接使用 Promise，无需包装成 state</li>
          <li>Promise pending 时自动触发 Suspense fallback</li>
          <li>与并发特性完美集成</li>
          <li>代码更简洁，逻辑更清晰</li>
        </ul>
      </div>

      <div className="demo-j-benefits">
        <h3>相比 React 16 的改进</h3>
        <ul>
          <li>无需手动管理 loading/error/data 状态</li>
          <li>代码量减少 80%</li>
          <li>声明式，更易读</li>
          <li>Error Boundary 统一处理错误</li>
        </ul>
      </div>
    </div>
  );
}

export default DemoJ;
