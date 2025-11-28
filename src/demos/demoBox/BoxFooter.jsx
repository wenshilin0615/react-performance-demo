import React, { memo } from 'react'

const BoxFooter = memo(({ index }) => (
  <div className="box-section box-footer">
    <div className="section-left">底左{index}</div>
    <div className="section-center">底中{index}</div>
    <div className="section-right">底右{index}</div>
  </div>
))

export default BoxFooter
