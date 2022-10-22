import React from "react";
import '../Pokedex.css'

import Pokecard from '../components/Pokecard'
import pokemons from '../data'

const Pokedex = () => {

  return (
    <div className="Pokdex">
      <h1 className="Pokedex-title">Pokedex</h1>

      <div className="Pokdex-cards">
      {
        pokemons.map(p => 
          <Pokecard 
            key={p.id}
            id={p.id}
            name={p.name}
            type={p.type}
            baseEx={p.base_experience}
          />
        )
      }
      </div>
    </div>
  )
}

export default Pokedex;