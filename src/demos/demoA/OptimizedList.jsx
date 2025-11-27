import React, { useState, memo, useMemo, useCallback, useRef } from 'react';
import './index.less';

// 昂贵的渲染计算
function expensiveCalculation(index) {
  let result = 0;
  for (let i = 0; i < 10000; i++) {
    result += Math.sqrt(i * index);
  }
  return result;
}

// 列表项组件 - 使用 React.memo 优化
const ListItem = memo(function ListItem({ item, isActive }) {
  // 使用 useMemo 缓存昂贵计算结果
  const calculation = useMemo(() => {
    const value = expensiveCalculation(item.index);
    return value.toFixed(2);
  }, [item.index]);
  
  return (
    <div className={`list-item ${isActive ? 'active-green' : ''}`}>
      <div>Item #{item.index}</div>
      <div className="list-item-result">
        计算结果: {calculation}
      </div>
    </div>
  );
});

// 虚拟化列表组件（类似 FixedSizeList 的实现）
const VirtualizedList = memo(function VirtualizedList({ 
  items, 
  activeIndex, 
  height = 600,
  itemSize = 70 
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const rafRef = useRef(null);
  
  // 计算可见范围（类似 react-window 的逻辑）
  const { startIndex, visibleItems, offsetY } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemSize));
    const visibleCount = Math.ceil(height / itemSize);
    const end = Math.min(items.length, start + visibleCount + 5);
    
    console.log('虚拟滚动:', { scrollTop, start, end, visibleCount });
    
    return {
      startIndex: start,
      visibleItems: items.slice(start, end),
      offsetY: start * itemSize
    };
  }, [items, scrollTop, itemSize, height]);
  
  const totalHeight = items.length * itemSize;
  
  // 使用 requestAnimationFrame 优化滚动性能
  const handleScroll = useCallback((e) => {
    // React 16 事件池，需要先保存值
    const scrollTopValue = e.target.scrollTop;
    
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      setScrollTop(scrollTopValue);
    });
  }, []);
  
  return (
    <div 
      className="list-container-viewport"
      onScroll={handleScroll}
      style={{ height: `${height}px`, overflow: 'auto', position: 'relative' }}
    >
      <div style={{ height: `${totalHeight}px` }}>
        <div style={{ 
          position: 'absolute',
          top: `${offsetY}px`,
          left: 0,
          right: 0,
          width: '100%'
        }}>
          {visibleItems.map(item => (
            <ListItem 
              key={item.id} 
              item={item} 
              isActive={item.index === activeIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

// 优化后的长列表组件
function OptimizedList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [count, setCount] = useState(0);
  
  // 生成 2000 项数据
  const items = useMemo(() => 
    Array.from({ length: 2000 }, (_, i) => ({ id: `item-${i}`, index: i })), 
  []);
  
  // 使用 useCallback 缓存事件处理器
  const handleCountClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  const handleRandomClick = useCallback(() => {
    setActiveIndex(Math.floor(Math.random() * 2000));
  }, []);
  
  return (
    <div className="list-container">
      <h2>Demo A - 优化版本</h2>
      <div className="list-container-controls">
        <button onClick={handleCountClick}>
          点击计数: {count}
        </button>
        <button onClick={handleRandomClick}>
          随机激活项
        </button>
      </div>
      
      <VirtualizedList 
        items={items} 
        activeIndex={activeIndex}
        height={600}
        itemSize={70}
      />
      
      <div className="list-container-tip">
        优化说明: React.memo + useMemo + useCallback + 虚拟化（类似 react-window）
      </div>
    </div>
  );
}

export default React.memo(OptimizedList);
