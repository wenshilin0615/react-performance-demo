/*
 * @Author: 温石林
 * @Description: 
 * @FilePath: \react16_project\src\App.jsx
 */
import React, { useState, useEffect, Suspense, lazy } from 'react'
import './App.css'

const DemoA = lazy(() => import('./demos/demoA'))
const DemoB = lazy(() => import('./demos/demoB'))
const DemoC = lazy(() => import('./demos/demoC'))
const DemoD = lazy(() => import('./demos/demoD'))
const DemoE = lazy(() => import('./demos/demoE'))
const DemoG = lazy(() => import('./demos/demoG'))
const DemoH = lazy(() => import('./demos/demoH'))
const DemoI = lazy(() => import('./demos/demoI'))
const DemoJ = lazy(() => import('./demos/demoJ'))
const DemoBox = lazy(() => import('./demos/demoBox'))

const demos = [
  { id: 'A', name: 'Render优化', component: DemoA },
  { id: 'B', name: 'Code Splitting', component: DemoB },
  { id: 'C', name: 'Web Worker', component: DemoC },
  { id: 'D', name: '批处理', component: DemoD },
  { id: 'E', name: '所有更新同等优先级', component: DemoE },
  { id: 'G', name: '入口API', component: DemoG },
  { id: 'H', name: '手动优化', component: DemoH },
  { id: 'I', name: 'forwardRef', component: DemoI },
  { id: 'J', name: '异步状态', component: DemoJ },
  { id: 'Box', name: '性能大礼包', component: DemoBox }
]

function App() {
  const [activeDemo, setActiveDemo] = useState(() => {
    return localStorage.getItem('react16-activeDemo') || 'A'
  })
  const [navExpanded, setNavExpanded] = useState(false)
  const ActiveComponent = demos.find(d => d.id === activeDemo)?.component

  useEffect(() => {
    localStorage.setItem('react16-activeDemo', activeDemo)
  }, [activeDemo])

  return (
    <div className="app">
      <nav className={`app-nav ${navExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="app-nav-header">
          <h1>React 16 性能优化示例</h1>
          <button className="app-nav-toggle" onClick={() => setNavExpanded(!navExpanded)}>
            {navExpanded ? '▲ 收起' : '▼ 展开'}
          </button>
        </div>
        {navExpanded && <div className="app-nav-tabs">
          {demos.map(demo => (
            <button
              key={demo.id}
              className={`app-nav-tab ${activeDemo === demo.id ? 'active' : ''}`}
              onClick={() => setActiveDemo(demo.id)}
            >
              Demo {demo.id}: {demo.name}
            </button>
          ))}
        </div>}
      </nav>
      <main className="app-content">
        <Suspense fallback={<div style={{ padding: '20px', textAlign: 'center' }}>加载中...</div>}>
          {ActiveComponent && <ActiveComponent />}
        </Suspense>
      </main>
    </div>
  )
}

export default App
