import React from 'react'
import BoxHeader from './BoxHeader'
import BoxMiddle from './BoxMiddle'
import BoxFooter from './BoxFooter'
import LevelList from './LevelList'
import './index.less'

const DemoBox1 = ({ boxData }) => {
  return (
    <div className="demo-box-container">
      <div className="box-list">
        {boxData.map((box, i) => (
          <div key={box.boxId} className="box">
            <BoxHeader index={i + 1} />
            <BoxMiddle index={i + 1} ask={box.ask} bid={box.bid} />
            <LevelList levels={box.levels} />
            <BoxFooter index={i + 1} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DemoBox1
