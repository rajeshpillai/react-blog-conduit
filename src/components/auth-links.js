import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom';
import {useLocalStorage} from '../hooks/use-local-storage';
import {CurrentUserContext} from '../context/current-user-context';
import {SYSTEM} from '../constants/systems';

export default function AuthLinks() {

  const [currentUserState,setCurrentUserState] = useContext(CurrentUserContext);
  const [token, setToken] = useLocalStorage(SYSTEM.AUTH_TOKEN_KEY);

  // Logout process
  // Clear Token
  // Reset user context
  const handleSignOut = (e) => {
    e.preventDefault();
    setToken("");
    setCurrentUserState(state => ({
      ...state,
      isLoggedIn: false, 
      isLoading: false,
      currentUser: null
    }));
  }
  return (
    <React.Fragment>
    { !currentUserState.isLoggedIn && 
    <React.Fragment>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link">
            Sign in
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/register" className="nav-link">
            Sign up
          </NavLink>
        </li>
      </React.Fragment>
    }
    { currentUserState.isLoggedIn && 
      <>
        <li className="nav-item">
          <NavLink to="/article/new" className="nav-link">
            New Article
          </NavLink>
        </li>

        <li className="nav-item">
          <a  onClick={handleSignOut} href="#" className="nav-link">
            Signout
          </a>
        </li>
      </>
    }
    </React.Fragment>
  )
}
