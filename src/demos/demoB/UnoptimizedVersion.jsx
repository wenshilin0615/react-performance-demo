import React, { useState } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import './index.less';

// 未优化版本：所有组件都直接导入，没有懒加载
function UnoptimizedVersion() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'dashboard':
        return <Dashboard />;
      case 'settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="demo-b">
      <div className="demo-b-header">
        <h1>Demo B - 未优化版本</h1>
        <p>所有组件直接导入，无懒加载</p>
      </div>

      <div className="demo-b-content">
        <div className="demo-b-instructions">
          <h3>未优化特点：</h3>
          <ul>
            <li>所有页面组件在初始加载时就被打包进主 bundle</li>
            <li>即使用户不访问某些页面，代码也会被加载</li>
            <li>初始 bundle 体积较大，影响首屏加载速度</li>
            <li>没有加载状态反馈</li>
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
            仪表盘
          </button>
          <button 
            className={currentPage === 'settings' ? 'active' : ''}
            onClick={() => setCurrentPage('settings')}
          >
            设置
          </button>
        </div>

        {renderPage()}

        <div className="demo-b-summary unoptimized">
          <h3>存在的问题：</h3>
          <ul>
            <li><strong>Bundle 体积大：</strong>所有页面代码都在主 bundle 中</li>
            <li><strong>首屏慢：</strong>需要下载和解析所有代码才能渲染</li>
            <li><strong>资源浪费：</strong>用户可能永远不会访问某些页面</li>
            <li><strong>无加载反馈：</strong>页面切换没有过渡状态</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UnoptimizedVersion;
