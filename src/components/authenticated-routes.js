import React, {useContext} from 'react'
import {Redirect} from 'react-router-dom';
import {CurrentUserContext} from '../context/current-user-context';

// Anything here needs authentication
export default function AuthenticatedRoutes({children}) {
  const [userContext, _] = useContext(CurrentUserContext);

  if (!userContext.isLoggedIn) {
    return <Redirect to = "/login" />
  }

  return (
    children
  )
}
