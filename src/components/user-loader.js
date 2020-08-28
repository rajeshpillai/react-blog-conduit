import React, {useEffect,useContext} from 'react';
import { CurrentUserContext } from '../context/current-user-context';
import { useFetch } from '../hooks/use-fetch';
import { useLocalStorage } from '../hooks/use-local-storage';
import {SYSTEM} from '../constants/systems';

export default function UserLoader({children}) {
  const [, setCurrentUserState] = useContext(CurrentUserContext);
  const [{response}, doFetch] = useFetch(`user`);
  const [token] = useLocalStorage(SYSTEM.AUTH_TOKEN_KEY);

  useEffect(() => {
    if (!token) {
      setCurrentUserState(state => ({
        ...state,
        isLoggedIn: false
      }))
      return; 
    }

    doFetch();

    setCurrentUserState(state => ({
      ...state,
      isLoading: true
    }));
  },[doFetch, setCurrentUserState, token]);
  
  useEffect(() => {
    if (!response) {
      return;
    }
    
    setCurrentUserState(state => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response.user
    }))
    
  }, [response, setCurrentUserState]);
  
  return children;
}
