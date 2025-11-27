import React, { useState, Suspense, lazy } from 'react';
import Home from './pages/Home';
import './index.less';

// 使用 React.lazy 懒加载组件
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

// 加载中组件
function Loading() {
  return (
    <div className="demo-b-loading">
      <div>⏳ 加载中...</div>
    </div>
  );
}

// 优化版本：使用 React.lazy + Suspense
function OptimizedVersion() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'dashboard':
        return (
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        );
      case 'settings':
        return (
          <Suspense fallback={<Loading />}>
            <Settings />
          </Suspense>
        );
      default:
        return <Home />;
    }
  };

  return (
    <div className="demo-b">
      <div className="demo-b-header">
        <h1>Demo B - 优化版本</h1>
        <p>使用 React.lazy + Suspense 实现懒加载</p>
      </div>

      <div className="demo-b-content">
        <div className="demo-b-instructions">
          <h3>优化特点：</h3>
          <ul>
            <li>首页立即加载，无需等待</li>
            <li>仪表盘和设置页面使用 React.lazy 懒加载</li>
            <li>切换页面时观察加载状态（Suspense fallback）</li>
            <li><strong>开发模式：</strong>在 Network 面板筛选 "JS" 类型，点击按钮时会看到新的请求</li>
            <li><strong>生产模式：</strong>运行 npm run build 查看代码分割效果</li>
          </ul>
        </div>

        <div className="demo-b-nav">
          <button 
            className={currentPage === 'home' ? 'active' : ''}
            onClick={() => setCurrentPage('home')}
          >
            首页
          </button>
          <button 
            className={currentPage === 'dashboard' ? 'active' : ''}
            onClick={() => setCurrentPage('dashboard')}
          >
            仪表盘（懒加载）
          </button>
          <button 
            className={currentPage === 'settings' ? 'active' : ''}
            onClick={() => setCurrentPage('settings')}
          >
            设置（懒加载）
          </button>
        </div>

        {renderPage()}

        <div className="demo-b-summary optimized">
          <h3>如何验证懒加载：</h3>
          <ul>
            <li><strong>开发模式验证：</strong>
              <ol>
                <li>打开 DevTools Network 面板</li>
                <li>筛选 "JS" 类型文件</li>
                <li>刷新页面，记录初始加载的文件</li>
                <li>点击"仪表盘"，会看到 Dashboard.jsx 被加载</li>
                <li>点击"设置"，会看到 Settings.jsx 被加载</li>
              </ol>
            </li>
            <li><strong>生产模式验证：</strong>
              <ol>
                <li>运行 npm run build</li>
                <li>查看 dist 目录，会看到多个 chunk 文件</li>
                <li>运行 npm run preview 预览生产版本</li>
                <li>Network 面板会清晰看到按需加载的 chunk</li>
              </ol>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OptimizedVersion;
