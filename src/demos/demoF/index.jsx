import React, { useState, Suspense, lazy } from 'react';
import './index.less';

// 模拟异步组件加载
const UserInfo = lazy(() => 
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="demo-f-component">
            <h3>用户信息</h3>
            <p>用户名: 张三</p>
            <p>邮箱: zhangsan@example.com</p>
          </div>
        )
      });
    }, 2000);
  })
);

const Comments = lazy(() =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="demo-f-component">
            <h3>评论列表</h3>
            <p>评论1: 这是一条评论</p>
            <p>评论2: 这是另一条评论</p>
          </div>
        )
      });
    }, 3000);
  })
);

const Recommendations = lazy(() =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="demo-f-component">
            <h3>推荐内容</h3>
            <p>推荐1: 相关文章A</p>
            <p>推荐2: 相关文章B</p>
          </div>
        )
      });
    }, 4000);
  })
);

// React 16 - Suspense 基础支持
function DemoF() {
  const [showComponents, setShowComponents] = useState(false);

  return (
    <div className="demo-f">
      <h2>Demo F - React 16 Suspense 演示</h2>
      <p>React 16 支持多个 Suspense 边界，但缺少并发渲染特性</p>

      <div className="demo-f-controls">
        <button onClick={() => setShowComponents(true)}>
          加载所有组件
        </button>
        <button onClick={() => setShowComponents(false)}>
          重置
        </button>
      </div>

      {showComponents && (
        <>
          <Suspense fallback={
            <div className="demo-f-loading">⏳ 加载用户信息...</div>
          }>
            <UserInfo />
          </Suspense>

          <Suspense fallback={
            <div className="demo-f-loading">⏳ 加载评论列表...</div>
          }>
            <Comments />
          </Suspense>

          <Suspense fallback={
            <div className="demo-f-loading">⏳ 加载推荐内容...</div>
          }>
            <Recommendations />
          </Suspense>
        </>
      )}

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#ffebee', borderRadius: '4px' }}>
        <strong>React 16 特点（客户端）：</strong>
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          <li>支持多个 Suspense 边界，组件可以独立加载显示</li>
          <li>组件会按顺序加载：2秒、 3秒、 4秒</li>
        </ul>
        <strong style={{ display: 'block', marginTop: '10px' }}>SSR 限制（需服务端环境）：</strong>
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          <li>React 16 SSR：使用 renderToString，必须等待所有数据</li>
          <li>服务端需要等待 4 秒才能返回 HTML</li>
          <li>用户看到白屏时间长，FCP 慢</li>
          <li>当前 Demo 是纯客户端应用，无法展示 SSR 差异</li>
        </ul>
      </div>
    </div>
  );
}

export default DemoF;
