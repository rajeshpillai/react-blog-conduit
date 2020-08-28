import React, {useState} from 'react';
import { CurrentUserContext } from "../context/current-user-context"

import {useLocalStorage} from '../hooks/use-local-storage';
import { AUTH_TOKEN_KEY } from '../constants/systems';

export const CurrentUserProvider = ({children}) => {
  const [token, setToken] = useLocalStorage(AUTH_TOKEN_KEY);

  const [state, setState] = useState({
    isLoading: false,
    isLoggedIn: token ? true : false, 
    currentUser: token 
  })

  return(
    <CurrentUserContext.Provider value={[state, setState]}>
      {children}
    </CurrentUserContext.Provider>
  )
}