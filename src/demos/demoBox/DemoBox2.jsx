import React from 'react'
import BoxHeader from './BoxHeader'
import BoxMiddle2 from './BoxMiddle2'
import BoxFooter from './BoxFooter'
import LevelList from './LevelList'
import './index.less'

const DemoBox2 = ({ boxData }) => {
  return (
    <div className="demo-box-container">
      <div className="box-list">
        {boxData.map((box, i) => (
          <div key={box.boxId} className="box box-absolute">
            <BoxHeader index={i + 1} />
            <BoxMiddle2 index={i + 1} />
            <BoxFooter index={i + 1} />
            <div className="price-overlay">
              <div className="price-left">{box.bid}</div>
              <div className="price-right">{box.ask}</div>
            </div>
            <LevelList levels={box.levels} className="level-absolute" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DemoBox2
