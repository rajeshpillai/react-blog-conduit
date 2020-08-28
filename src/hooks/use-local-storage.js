import {useState, useEffect} from 'react';

export function useLocalStorage (key, initialValue = '') {
  const [value, setValue] = useState(() => {
    let data = localStorage.getItem(key)  || initialValue; 
    return data;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value])

  return [value, setValue];
}