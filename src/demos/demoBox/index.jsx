/*
 * @Author: 温石林
 * @Description: 
 * @FilePath: \react16_project\src\demos\demoBox\index.jsx
 */
import React, { useState, useEffect, useCallback, memo } from 'react'
import DemoBox1 from './DemoBox1'
import DemoBox2 from './DemoBox2'
import DemoBox3 from './DemoBox3'
import { generateRandomPrice, formatQty } from './utils'
import './index.less'

// const MemoBox1 = memo(DemoBox1)
// const MemoBox2 = memo(DemoBox2)
const MemoBox3 = memo(DemoBox3)

const DemoBox = ({ updateInterval = 1000 }) => {
  const [boxData, setBoxData] = useState(
    Array.from({ length: 20 }, () => ({
      boxId: Math.random().toString(36).substr(2, 9),
      ask: generateRandomPrice(),
      bid: generateRandomPrice(),
      levels: [
        { qty: 1000000, ask: generateRandomPrice(), bid: generateRandomPrice() },
        { qty: 3000000, ask: generateRandomPrice(), bid: generateRandomPrice() },
        { qty: 5000000, ask: generateRandomPrice(), bid: generateRandomPrice() },
        { qty: 7000000, ask: generateRandomPrice(), bid: generateRandomPrice() },
        { qty: 10000000, ask: generateRandomPrice(), bid: generateRandomPrice() }
      ]
    }))
  )
  const [isRunning, setIsRunning] = useState(true)

  const updateData = useCallback(() => {
    setBoxData(prev => prev.map(box => ({
      ...box,
      ask: generateRandomPrice(),
      bid: generateRandomPrice(),
      levels: box.levels.map(level => ({
        ...level,
        qtyDisplay: formatQty(level.qty),
        ask: generateRandomPrice(),
        bid: generateRandomPrice()
      }))
    })))
  }, [])

  const handleStart = useCallback(() => setIsRunning(true), [])
  const handleStop = useCallback(() => setIsRunning(false), [])

  useEffect(() => {
    if (!isRunning) return
    const timer = setInterval(updateData, updateInterval)
    return () => clearInterval(timer)
  }, [isRunning, updateInterval, updateData])

  return (
    <>
      <div className="control-panel">
        <button onClick={handleStart}>开始实时更新</button>
        <button onClick={handleStop}>停止实时更新</button>
        <button onClick={updateData}>更新一次</button>
      </div>
      {/* <MemoBox1 boxData={boxData} /> */}
      {/* <MemoBox2 boxData={boxData} /> */}
      <MemoBox3 boxData={boxData} />
    </>
  )
}

export default DemoBox
