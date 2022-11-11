import React, { useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import ColorsList from "./components/ColorsList";
import Color from "./components/Color";
import ColorForm from "./components/ColorForm";

const App = ({ color }) => {
  const [colors, setColors] = useState(color)

  const newColors = (newColor) => setColors(colors => [...colors, newColor]) 
  
  return (
    <Container>
      <Routes>
        <Route path='/colors' element={<ColorsList colors={colors} />} />
        <Route path='/colors/:name' element={<Color colors={colors} />} />
        <Route
          path='/colors/new'
          element={<ColorForm newColors={newColors} colors={colors} />}
        />
        <Route path="/" element={<Navigate replace to="/colors" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}


App.defaultProps = {
  color: ['red', 'blue', 'orange', 'green']
}

export default App;
