import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import VendingMachine from "./components/VendingMachine";
import Soda from './components/Soda'
import Liquorice from './components/Liquorice'
import Chips from './components/Chips'


const App = () => {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<VendingMachine />} />
          <Route path="/soda" element={<Soda />} />
          <Route path="/liquorice" element={<Liquorice />} />
          <Route path="/chips" element={<Chips />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
