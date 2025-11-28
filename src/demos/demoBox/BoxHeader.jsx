import React, { memo } from 'react'

const BoxHeader = memo(({ index }) => (
  <div className="box-section box-header">
    <div className="section-left">头左{index}</div>
    <div className="section-center">头中{index}</div>
    <div className="section-right">头右{index}</div>
  </div>
))

export default BoxHeader
