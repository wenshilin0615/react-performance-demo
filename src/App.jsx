/*
 * @Author: 温石林
 * @Description: 
 * @FilePath: \react16_project\src\App.jsx
 */
import React from 'react'
import DemoA from './demos/demoA'
// import DemoB from './demos/demoB'
// import DemoC from './demos/demoC'
// import DemoD from './demos/demoD'
// import DemoE from './demos/demoE'
// import DemoF from './demos/demoF'
// import DemoG from './demos/demoG'
// import DemoH from './demos/demoH'
// import DemoI from './demos/demoI'
import DemoJ from './demos/demoJ'
import './App.css'

function App() {
  return (
    <>
      {/* Render 瓶颈定位与优化 */}
      <DemoA />
      {/* Code Splitting 与懒加载 */}
      {/* <DemoB /> */}
      {/* 计算密集型任务优化 */}
      {/* <DemoC /> */}
      {/* 多次 setState 多次渲染 */}
      {/* <DemoD /> */}
      {/* 输入卡顿，无优先级 */}
      {/* <DemoE /> */}
      {/* Suspense 基础支持 */}
      {/* <DemoF /> */}
      {/* 入口 API */}
      {/* <DemoG /> */}
      {/* 手动优化 */}
      {/* <DemoH /> */}
      {/* forwardRef 包装 */}
      {/* <DemoI /> */}
      {/* 手动管理异步状态 */}
      {/* <DemoJ /> */}
    </>
  )
}

export default App
