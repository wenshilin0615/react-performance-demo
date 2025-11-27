import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import './index.less';

const MyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    getValue: () => {
      return inputRef.current?.value;
    }
  }));

  return (
    <input 
      ref={inputRef}
      className="demo-i-input"
      placeholder="React 16 使用 forwardRef"
      {...props}
    />
  );
});

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
      <h2>Demo I - React 16 ref 处理</h2>
      <p className="demo-i-intro">
        React 16 需要使用 forwardRef 来转发 ref 到子组件
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
        <h3>React 16 代码实现</h3>
        <div className="demo-i-code">
          <pre>{`// 子组件需要使用 forwardRef 包装
const MyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    getValue: () => inputRef.current?.value
  }));
  
  return <input ref={inputRef} {...props} />;
});

// 父组件使用
function Parent() {
  const inputRef = useRef(null);
  return <MyInput ref={inputRef} />;
}`}</pre>
        </div>
      </div>

      <div className="demo-i-challenges">
        <h3>React 16 的限制</h3>
        <ul>
          <li>需要额外的 forwardRef 包装层</li>
          <li>代码繁琐，增加样板代码</li>
          <li>TypeScript 类型定义复杂</li>
          <li>组件名称可能在调试时丢失</li>
        </ul>
      </div>

      <div className="demo-i-react19">
        <h3>React 19 改进</h3>
        <ul>
          <li>ref 可以作为普通 prop 传递</li>
          <li>无需 forwardRef 包装</li>
          <li>代码更简洁直观</li>
          <li>更好的 TypeScript 类型推导</li>
        </ul>
      </div>
    </div>
  );
}

export default DemoI;
