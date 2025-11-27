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
            <p>✅ 已加载（2秒）</p>
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
            <p>✅ 已加载（3秒）</p>
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
            <p>✅ 已加载（4秒）</p>
          </div>
        )
      });
    }, 4000);
  })
);

// React 19 - 增强的 Suspense
function DemoF() {
  const [showComponents, setShowComponents] = useState(false);

  return (
    <div className="demo-f">
      <h2>Demo F - React 19 Suspense 演示</h2>
      <p>React 19 支持并发 Suspense，组件可以独立加载和显示</p>

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

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>
        <strong>React 19 优势（客户端）：</strong>
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          <li>支持并发 Suspense，每个组件独立加载</li>
          <li>组件加载完成后立即显示，无需等待其他组件</li>
          <li>更好的用户体验，渐进式内容展示</li>
        </ul>
        <strong style={{ display: 'block', marginTop: '10px' }}>SSR 流式渲染（需服务端环境）：</strong>
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          <li>React 19 SSR：使用 renderToPipeableStream，分段输出 HTML</li>
          <li>用户信息 2 秒后就能看到，不用等待 4 秒</li>
          <li>FCP 改善 40-60%，TTI 提前 30-50%</li>
          <li>当前 Demo 是纯客户端应用，无法展示 SSR 差异</li>
        </ul>
        <strong style={{ display: 'block', marginTop: '10px' }}>如何验证 SSR 流式渲染：</strong>
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          <li>需要搭建 Node.js 服务端环境（如 Next.js）</li>
          <li>打开浏览器 Network 面板，查看 HTML 响应</li>
          <li>React 19 会分段返回 HTML，而不是一次性返回</li>
          <li>可以看到 Transfer-Encoding: chunked 响应头</li>
        </ul>
      </div>
    </div>
  );
}

export default DemoF;
