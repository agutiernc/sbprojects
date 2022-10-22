import React from 'react'
import '../Pokecard.css'

const Pokecard = ({ id, name, type, baseEx }) => {
  return (
    <div className='Pokecard'>
      <h4 className='Pokecard-title'>{ name }</h4>
      <img 
        alt='pokemons'
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
      />
      <p className='Pokecard-data'>Type: { type }</p>
      <p className='Pokecard-data'>EXP: { baseEx }</p>
    </div>
  )
}

export default Pokecard;