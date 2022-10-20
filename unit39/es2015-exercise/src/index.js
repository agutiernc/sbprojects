import React from 'react';
import ReactDOM from 'react-dom';

import fruits from './foods'
import { choice, remove } from './helpers'

let fruit = choice(fruits)

// output
console.log(`I’d like one ${fruit}, please.`)
console.log(`Here you go: ${fruit}`)
console.log('Delicious! May I have another?')

// remove fruit from fruits array
const updatedFruits = remove(fruits, fruit)

// output again
console.log(`I’m sorry, we’re all out. We have ${updatedFruits.length} left.`)


const App = () => {

  return (
    <div>
      <h1>Exercise</h1>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
