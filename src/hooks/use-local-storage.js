import {useState, useEffect} from 'react';

export function useLocalStorage (key, initialValue = '') {
  const [value, setValue] = useState(() => {
    let data = localStorage.getItem(key)  || initialValue; 
    console.log(`useLocalStore: ${key}-${data}`)
    return data;
  });

  console.log("useLocalStorage: ", value);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value])

  return [value, setValue];
}