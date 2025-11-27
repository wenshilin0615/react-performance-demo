import React from 'react';

// 模拟重量级组件 - 添加延迟以便观察懒加载
const heavyData = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  value: Math.random() * 1000
}));

function Dashboard() {
  return (
    <div className="demo-b-page">
      <h2>仪表盘</h2>
      <p>这是一个较重的组件，使用懒加载优化首屏性能。</p>
      <div style={{ marginTop: '20px' }}>
        <h3>数据统计：</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {heavyData.slice(0, 8).map(item => (
            <div key={item.id} style={{ 
              padding: '15px', 
              backgroundColor: '#f3e5f5', 
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '12px', color: '#666' }}>项目 {item.id}</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#7b1fa2' }}>
                {item.value.toFixed(0)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
