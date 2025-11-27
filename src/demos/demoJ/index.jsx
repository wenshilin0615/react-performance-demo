/*
 * @Author: 温石林
 * @Description: 
 * @FilePath: \react16_project\src\demos\demoJ\index.jsx
 */
import React, { useState, useEffect } from 'react';
import './index.less';

function DemoJ() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setData({ user: '张三', email: 'zhangsan@example.com' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="demo-j">
      <h2>Demo J - React 16 异步数据处理</h2>
      <p className="demo-j-intro">
        React 16 需要手动管理 loading、error、data 三个状态来处理异步数据
      </p>

      <div className="demo-j-live">
        <h3>✨ 实际效果演示</h3>
        <div className="demo-j-display">
          {loading && <div className="demo-j-loading">⏳ 加载中...</div>}
          {error && <div className="demo-j-error">❌ 错误: {error}</div>}
          {!loading && data && (
            <div className="demo-j-data">
              <p>用户: {data.user}</p>
              <p>邮箱: {data.email}</p>
            </div>
          )}
          <button onClick={fetchData}>重新加载</button>
        </div>
      </div>

      <div className="demo-j-code-section">
        <h3>React 16 代码实现</h3>
        <div className="demo-j-code">
          <pre>{`// 需要手动管理 3 个状态
function Component() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!data) return null;
  return <div>{data}</div>;
}`}</pre>
        </div>
      </div>

      <div className="demo-j-challenges">
        <h3>React 16 的挑战</h3>
        <ul>
          <li>需要手动管理 loading、error、data 三个状态</li>
          <li>代码量大（~15 行）</li>
          <li>逻辑分散，可读性差</li>
          <li>容易出错，遗漏边界情况</li>
        </ul>
      </div>

      <div className="demo-j-react19">
        <h3>React 19 改进</h3>
        <ul>
          <li>引入 use Hook 直接处理 Promise</li>
          <li>配合 Suspense 自动处理加载状态</li>
          <li>代码减少 80%（~3 行）</li>
          <li>声明式，更清晰易读</li>
        </ul>
      </div>
    </div>
  );
}

export default DemoJ;
