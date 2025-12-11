/*
 * @Author: 温石林
 * @Description: 
 * @FilePath: \react19_project\src\App.jsx
 */
import React, { useState, useEffect, Suspense, lazy } from 'react'
import './App.css'

const DemoD = lazy(() => import('./demos/demoD'))
const DemoE = lazy(() => import('./demos/demoE'))
const DemoG = lazy(() => import('./demos/demoG'))
const DemoH = lazy(() => import('./demos/demoH'))
const DemoI = lazy(() => import('./demos/demoI'))
const DemoJ = lazy(() => import('./demos/demoJ'))

const demos = [
  { id: 'D', name: '自动批处理', component: DemoD },
  { id: 'E', name: 'useTransition', component: DemoE },
  { id: 'G', name: '入口API', component: DemoG },
  { id: 'H', name: 'Compiler优化', component: DemoH },
  { id: 'I', name: 'ref简化', component: DemoI },
  { id: 'J', name: 'use Hook', component: DemoJ }
]

function App() {
  const [activeDemo, setActiveDemo] = useState(() => {
    return localStorage.getItem('react19-activeDemo') || 'D'
  })
  const [navExpanded, setNavExpanded] = useState(false)
  const ActiveComponent = demos.find(d => d.id === activeDemo)?.component

  useEffect(() => {
    localStorage.setItem('react19-activeDemo', activeDemo)
  }, [activeDemo])

  return (
    <div className="app">
      <nav className={`app-nav ${navExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="app-nav-header">
          <h1>React 19 新特性示例</h1>
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

// function App() {
//   return <DemoH />
// }

export default App
