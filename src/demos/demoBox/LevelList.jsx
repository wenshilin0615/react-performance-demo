/*
 * @Author: 温石林
 * @Description: 
 * @FilePath: \react16_project\src\demos\demoBox\LevelList.jsx
 */
import React, { memo } from 'react'
import { formatQty } from './utils'

// const LevelList = memo(({ levels, className = '' }) => (
//   <div className={`level-list ${className}`}>
//     {levels.map((level, i) => (
//       <div key={level.qty} className="level-item">
//         <span className="level-qty">{formatQty(level.qty)}</span>
//         <span className="level-bid">{level.bid}</span>
//         <span className="level-ask">{level.ask}</span>
//       </div>
//     ))}
//   </div>
// ))

const LevelList = memo(({ levels, className = '' }) => (
  <div className={`level-list ${className}`}>
    {levels.map((level, i) => (
      <div key={level.qty} className="level-item">
        <span className="level-qty">{level.qtyDisplay}</span>
        <span className="level-bid">{level.bid}</span>
        <span className="level-ask">{level.ask}</span>
      </div>
    ))}
  </div>
))

export default LevelList
