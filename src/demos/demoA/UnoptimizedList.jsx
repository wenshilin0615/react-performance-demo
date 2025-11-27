import React, { useState } from 'react';
import './index.less';

// 昂贵的渲染计算
function expensiveCalculation(index) {
  let result = 0;
  for (let i = 0; i < 10000; i++) {
    result += Math.sqrt(i * index);
  }
  return result;
}

// 列表项组件 - 未优化版本
function ListItem({ index, isActive }) {
  const calculation = expensiveCalculation(index);
  
  return (
    <div className={`list-item ${isActive ? 'active-blue' : ''}`}>
      <div>Item #{index}</div>
      <div className="list-item-result">
        计算结果: {calculation.toFixed(2)}
      </div>
    </div>
  );
}

// 未优化的长列表组件
function UnoptimizedList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [count, setCount] = useState(0);
  
  // 生成 2000 项数据
  const items = Array.from({ length: 2000 }, (_, i) => i);
  
  return (
    <div className="list-container">
      <h2>Demo A - 未优化版本</h2>
      <div className="list-container-controls">
        <button onClick={() => setCount(count + 1)}>
          点击计数: {count}
        </button>
        <button onClick={() => setActiveIndex(Math.floor(Math.random() * 2000))}>
          随机激活项
        </button>
      </div>
      
      <div className="list-container-viewport">
        {items.map(index => (
          <ListItem 
            key={index} 
            index={index} 
            isActive={index === activeIndex}
          />
        ))}
      </div>
      
      <div className="list-container-tip">
        提示: 点击按钮会感觉明显卡顿,因为每次更新都会重新渲染所有 2000 个列表项
      </div>
    </div>
  );
}

export default UnoptimizedList;
