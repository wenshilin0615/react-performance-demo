import React, { useState, useMemo, useCallback, memo } from 'react';
import './index.less';

const ExpensiveChild = memo(({ value, onClick }) => {
  console.log('[ExpensiveChild] 渲染');
  return (
    <div className="demo-h-child">
      <p>子组件值: {value}</p>
      <button onClick={onClick}>点击</button>
    </div>
  );
});

function UnoptimizedVersion() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const expensiveValue = count * 2;
  console.log('计算 expensiveValue', expensiveValue);
  const handleClick = () => console.log('点击');
  const clickBtn = () => {
    setCount(count + 1);
  };

  return (
    <div className="demo-h-version demo-h-unoptimized">
      <h3>❌ 未优化版本</h3>
      <div className="demo-h-controls">
        <button onClick={clickBtn}>
          增加计数: {count}
        </button>
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder="输入文本试试"
        />
      </div>
      <ExpensiveChild value={expensiveValue} onClick={handleClick} />
      <div className="demo-h-note">
        ❌ 输入文本时子组件会重渲染（查看控制台）
      </div>
    </div>
  );
}

function OptimizedVersion() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const expensiveValue = useMemo(() => {
    console.log('[useMemo] 计算 expensiveValue', count * 2);
    return count * 2;
  }, [count]);
  
  const handleClick = useCallback(() => {
    console.log('[useCallback] 点击');
  }, []);

  return (
    <div className="demo-h-version demo-h-optimized">
      <h3>✅ 优化版本</h3>
      <div className="demo-h-controls">
        <button onClick={() => setCount(count + 1)}>
          增加计数: {count}
        </button>
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder="输入文本试试"
        />
      </div>
      <ExpensiveChild value={expensiveValue} onClick={handleClick} />
      <div className="demo-h-note">
        ✅ 输入文本时子组件不会重渲染（查看控制台）
      </div>
    </div>
  );
}

function DemoH() {
  return (
    <div className="demo-h">
      <h2>Demo H - React 16 手动优化</h2>
      <p className="demo-h-intro">
        React 16 需要手动使用 memo/useMemo/useCallback 进行性能优化
      </p>

      <div className="demo-h-comparison">
        <UnoptimizedVersion />
        <OptimizedVersion />
      </div>

      <div className="demo-h-code-section">
        <h3>React 16 优化代码</h3>
        <div className="demo-h-code">
          <pre>{`// 需要手动添加优化
function Component() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // 手动使用 useMemo
  const expensiveValue = useMemo(
    () => count * 2, 
    [count]
  );
  
  // 手动使用 useCallback
  const handleClick = useCallback(
    () => console.log('点击'), 
    []
  );

  return (
    <ExpensiveChild 
      value={expensiveValue} 
      onClick={handleClick} 
    />
  );
}`}</pre>
        </div>
      </div>

      <div className="demo-h-challenges">
        <h3>React 16 优化挑战</h3>
        <ul>
          <li>需要开发者手动识别优化点</li>
          <li>容易遗漏，导致性能问题</li>
          <li>代码充斥大量优化代码，可读性下降</li>
          <li>依赖开发者经验，优化效果不一致</li>
        </ul>
      </div>

      <div className="demo-h-react19">
        <h3>React 19 改进</h3>
        <ul>
          <li>引入 React Compiler 自动优化</li>
          <li>无需手动添加 memo/useMemo/useCallback</li>
          <li>代码更简洁，逻辑更清晰</li>
          <li>一致的优化效果</li>
        </ul>
      </div>
    </div>
  );
}

export default DemoH;
