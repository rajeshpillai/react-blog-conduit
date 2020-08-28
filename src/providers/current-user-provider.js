import React, {useState} from 'react';
import { CurrentUserContext } from "../context/current-user-context"

import {useLocalStorage} from '../hooks/use-local-storage';
import { SYSTEM } from '../constants/systems';

export const CurrentUserProvider = ({children}) => {
  const [token, setToken] = useLocalStorage(SYSTEM.AUTH_TOKEN_KEY);

  const [state, setState] = useState({
    isLoading: false,
    isLoggedIn: token ? true : false, 
    currentUser: token  // We will fix this (if needed)
  })

  return(
    <CurrentUserContext.Provider value={[state, setState]}>
      {children}
    </CurrentUserContext.Provider>
  )
}