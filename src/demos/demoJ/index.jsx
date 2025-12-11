import React, { Suspense, use } from 'react';
import './index.less';

let promiseCache = null;
// 每次组件渲染时， fetchUserData() 都会创建一个 新的 Promise ，导致 use Hook 一直处于 pending 状态，Suspense 持续显示 loading。
// 因此需要使用 promiseCache 缓存 Promise
function fetchUserData() {
  if (!promiseCache) {
    promiseCache = new Promise(resolve => {
      setTimeout(() => {
        resolve({ user: '李四', email: 'lisi@example.com' });
      }, 1500);
    });
  }
  return promiseCache;
}

function UserData(props) {
  const { permission = false } = props;
// use Hook 与传统 Hook 的最大区别：
// ✅ 可以在条件语句中使用
// ✅ 可以在循环中使用
// ✅ 可以在 try-catch 中使用
// ✅ 不受 Hook 规则限制
  const data = permission ? use(fetchUserData()) : { user: '未知', email: 'unknown@example.com'};

  return (
    <div className="demo-j-data">
      <p>用户: {data.user}</p>
      <p>邮箱: {data.email}</p>
    </div>
  );
}

function DemoJ() {
  const [refreshKey, setRefreshKey] = React.useState(0);

  const handleRefresh = () => {
    promiseCache = null;
    setRefreshKey(prev => prev + 1);
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
          <Suspense fallback={<div className="demo-j-loading">⏳ 1加载中...</div>}>
            <UserData key={refreshKey} permission/>
          </Suspense>
          <Suspense fallback={<div className="demo-j-loading">⏳ 2加载中...</div>}>
            <UserData key={refreshKey} permission={false}/>
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
          <pre>{`// React 19 use Hook - 直接使用 Promise
function UserData() {
  const data = use(fetchUserData());

  return (
    <div>
      <p>用户: {data.user}</p>
      <p>邮箱: {data.email}</p>
    </div>
  );
}

// 配合 Suspense 使用
<Suspense fallback={<div>⏳ 加载中...</div>}>
  <UserData />
</Suspense>

// ✅ 无需 useState/useEffect
// ✅ 无需手动判断 loading
// ✅ 代码减少 80%`}</pre>
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
