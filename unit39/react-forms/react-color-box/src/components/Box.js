import React from 'react'

const Box = ({ width = 100, bgColor = 'orange', height = 100, id, handleRemove }) => {
  let boxStyle = {
    height: `${height}px`,
    width: `${width}px`,
    backgroundColor: bgColor
  }

  return (
    <div>
      <div id="box" style={boxStyle}>
        <button onClick={() => handleRemove(id)}>Remove Box</button>
      </div>
    </div>
  )
}


export default Box;