import { useState } from 'react';
import axios from 'axios';
import uuid from "uuid";

export const useFlip = () => {
  const [state, setState] = useState(true)

  const flipCard = () => {
    setState(state => !state)
  }

  return [state, flipCard]
}

export const useAxios = (url) => {
  const [state, setState] = useState([])
  
  const addCard = async (addToUrl) => {
    const urlStr = typeof addToUrl === 'string' ? addToUrl : ''
    const response = await axios.get(new URL(urlStr, url));

    setState(cards => [...cards, { ...response.data, id: uuid() }]);
  };
  
  return [state, addCard]
}