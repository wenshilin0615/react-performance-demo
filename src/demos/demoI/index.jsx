import React, { useRef } from 'react';
import './index.less';

function MyInput({ ref, ...props }) {
  const inputRef = useRef(null);

  if (ref) {
    ref.current = {
      focus: () => {
        inputRef.current?.focus();
      },
      getValue: () => {
        return inputRef.current?.value;
      }
    };
  }

  return (
    <input 
      ref={inputRef}
      className="demo-i-input"
      placeholder="React 19 直接使用 ref prop"
      {...props}
    />
  );
}

function DemoI() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleGetValue = () => {
    const value = inputRef.current?.getValue();
    alert(`输入值: ${value || '空'}`);
  };

  return (
    <div className="demo-i">
      <h2>Demo I - React 19 ref 处理简化</h2>
      <p className="demo-i-intro">
        React 19 允许 ref 作为普通 prop 传递，无需使用 forwardRef
      </p>

      <div className="demo-i-live">
        <h3>✨ 实际效果演示</h3>
        <div className="demo-i-controls">
          <MyInput ref={inputRef} />
          <button onClick={handleFocus}>聚焦输入框</button>
          <button onClick={handleGetValue}>获取值</button>
        </div>
      </div>

      <div className="demo-i-code-section">
        <h3>React 19 代码实现</h3>
        <div className="demo-i-code">
          <pre>{`// 子组件直接接收 ref 作为 prop
function MyInput({ ref, ...props }) {
  const inputRef = useRef(null);
  
  if (ref) {
    ref.current = {
      focus: () => inputRef.current?.focus(),
      getValue: () => inputRef.current?.value
    };
  }
  
  return <input ref={inputRef} {...props} />;
}

// 父组件使用
function Parent() {
  const inputRef = useRef(null);
  return <MyInput ref={inputRef} />;
}`}</pre>
        </div>
      </div>

      <div className="demo-i-features">
        <h3>React 19 特性</h3>
        <ul>
          <li>ref 作为普通 prop 传递</li>
          <li>无需 forwardRef 包装</li>
          <li>代码更简洁直观</li>
          <li>更好的 TypeScript 类型推导</li>
        </ul>
      </div>

      <div className="demo-i-benefits">
        <h3>相比 React 16 的改进</h3>
        <ul>
          <li>减少样板代码</li>
          <li>提升开发效率</li>
          <li>更符合直觉的 API 设计</li>
          <li>简化组件库封装</li>
        </ul>
      </div>
    </div>
  );
}

export default DemoI;
