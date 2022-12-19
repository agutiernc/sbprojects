import { useState, useEffect } from 'react';

const useLocalStorage = (key, firstVal = null) => {
  const initVal = localStorage.getItem(key) || firstVal;

  const [item, setItem] = useState(initVal)

  useEffect(() => {
      if (item === null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, item)
      }
  }, [key, item])

  return [item, setItem]
}

export default useLocalStorage;