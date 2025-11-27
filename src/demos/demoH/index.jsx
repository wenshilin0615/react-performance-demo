import React, { useState, memo } from 'react';
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

function CompilerVersion() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // ✨ Compiler 自动优化，无需手动 memo
  const expensiveValue = count * 2;
  const handleClick = () => console.log('点击');

  return (
    <div className="demo-h-version demo-h-compiler">
      <h3>✨ React 19 Compiler 版本</h3>
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
        ✨ Compiler 自动优化，输入文本时子组件不会重渲染
      </div>
    </div>
  );
}

function DemoH() {
  return (
    <div className="demo-h">
      <h2>Demo H - React 19 Compiler 自动优化</h2>
      <p className="demo-h-intro">
        React 19 Compiler 可以自动优化代码，无需手动添加 memo/useMemo/useCallback
      </p>

      <CompilerVersion />

      <div className="demo-h-code-section">
        <h3>React 19 Compiler 代码</h3>
        <div className="demo-h-code">
          <pre>{`// 无需手动优化，Compiler 自动处理
function Component() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // ✨ Compiler 自动识别并优化
  const expensiveValue = count * 2;
  const handleClick = () => console.log('点击');

  return (
    <ExpensiveChild 
      value={expensiveValue} 
      onClick={handleClick} 
    />
  );
}

// Compiler 自动生成等价于：
// useMemo(() => count * 2, [count])
// useCallback(() => {...}, [])`}</pre>
        </div>
      </div>

      <div className="demo-h-features">
        <h3>React 19 Compiler 特性</h3>
        <ul>
          <li>自动分析代码并生成优化版本</li>
          <li>无需手动添加 memo/useMemo/useCallback</li>
          <li>代码更简洁，逻辑更清晰</li>
          <li>一致的优化效果</li>
        </ul>
      </div>

      <div className="demo-h-benefits">
        <h3>相比 React 16 的改进</h3>
        <ul>
          <li>降低开发心智负担</li>
          <li>减少样板代码</li>
          <li>自动化性能优化</li>
          <li>更好的代码可读性</li>
        </ul>
      </div>
    </div>
  );
}

export default DemoH;
