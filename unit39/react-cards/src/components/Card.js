import React from 'react';

const Card = ({ imgUrl }) => {

  return (
    <div>
      <img src={imgUrl} alt='card' />
    </div>
  )
}

export default Card;