import {useState, useEffect} from 'react';

export function useLocalStorage (key, initialValue = '') {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key)  || initialValue; 
  });

  console.log("useLocalStorage: ", value);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value])

  return [value, setValue];
}