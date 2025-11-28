/*
 * @Author: 温石林
 * @Description: 
 * @FilePath: \react16_project\src\demos\demoBox\DemoBox3.jsx
 */
import React, { useEffect, useRef } from 'react'
import LevelList2 from './LevelList2'
import './index.less'

const BoxHeader3 = ({ index }) => (
  <div className="box-section box-header">
    <div className="section-left">头左{index}</div>
    <div className="section-center">头中{index}</div>
    <div className="section-right">头右{index}</div>
  </div>
)

const BoxMiddle3 = ({ index, ask, bid }) => (
  <div className="box-middle-wrapper">
    <div className="box-section box-middle-top">
      <div className="section-left">中上左{index}</div>
      <div className="section-center">中上中{index}</div>
      <div className="section-right">中上右{index}</div>
    </div>
    <div className="box-section box-middle-bottom">
      <div className="section-left">{bid}</div>
      <div className="section-center">中下中{index}</div>
      <div className="section-right">{ask}</div>
    </div>
  </div>
)

const BoxFooter3 = ({ index }) => (
  <div className="box-section box-footer">
    <div className="section-left">底左{index}</div>
    <div className="section-center">底中{index}</div>
    <div className="section-right">底右{index}</div>
  </div>
)

const DemoBox3 = ({ boxData }) => {
  // ❌ 内存泄漏问题1：定时器未清理
  // 每次组件渲染都会创建新的定时器，但从不清理
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('DemoBox3 定时器执行', new Date().toLocaleTimeString())
    }, 1000)
    
    // ❌ 缺少清理函数，导致定时器累积
    return () => clearInterval(timer)
  }, [boxData])

  // ❌ 内存泄漏问题2：DOM 事件监听器未移除
  const containerRef = useRef(null)
  
  useEffect(() => {
    const handleScroll = () => {
      console.log('DemoBox3 滚动事件')
    }
    
    if (containerRef.current) {
      window.addEventListener('scroll', handleScroll)
    }
    
    // ❌ 缺少清理函数，导致事件监听器累积
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // ❌ 内存泄漏问题3：闭包引用大对象
  useEffect(() => {
    const largeData = new Array(100000).fill(boxData)
    
    const handleClick = () => {
      console.log('DemoBox3 点击', largeData.length)
    }
    
    document.addEventListener('click', handleClick)
    
    // ❌ 缺少清理函数，largeData 无法被垃圾回收
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [boxData])

  return (
    <div className="demo-box-container" ref={containerRef}>
      <div className="box-list">
        {boxData.map((box, i) => (
          <div key={box.boxId} className="box">
            <BoxHeader3 index={i + 1} />
            <BoxMiddle3 index={i + 1} ask={box.ask} bid={box.bid} />
            <LevelList2 levels={box.levels} />
            <BoxFooter3 index={i + 1} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DemoBox3
