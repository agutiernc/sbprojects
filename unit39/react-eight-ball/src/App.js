import React from 'react'
import EightBall from './components/EightBall'
import answers from '../src/data'

const App = () => {

  return (
    <div>
      <EightBall answers={answers} />
    </div>
  )
}

export default App;