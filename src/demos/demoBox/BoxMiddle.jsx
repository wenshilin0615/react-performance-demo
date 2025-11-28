import React, { memo } from 'react'

const BoxMiddle = memo(({ index, ask, bid }) => (
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
))

export default BoxMiddle
