import React from 'react'
import { formatQty } from './utils'

const LevelList2 = ({ levels }) => (
  <div className="level-list">
    {levels.map((level, i) => (
      <div key={i} className="level-item">
        <span className="level-qty">{formatQty(level.qty)}</span>
        <span className="level-bid">{level.bid}</span>
        <span className="level-ask">{level.ask}</span>
      </div>
    ))}
  </div>
)

export default LevelList2
