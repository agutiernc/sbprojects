import React, { useState } from 'react';
import Box from './Box'
import NewBoxForm from './NewBoxForm';

const BoxList = () => {
  const [boxes, setBoxes] = useState([])

  const newBox = (boxObj) => setBoxes(boxes => [...boxes, boxObj])
  const removeBox = (id) => setBoxes(boxes => boxes.filter(b => b.id !== id))

  return (
    <div>
      <NewBoxForm newBox={newBox} />

      {
        boxes.map(b => (
          <Box
            key={b.id}
            id={b.id}
            width={b.width}
            height={b.height}
            bgColor={b.bgColor}
            handleRemove={removeBox}
          />
        ))
      }
    </div>
  )
}


export default BoxList;