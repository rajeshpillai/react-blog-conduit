import React, {useState, useEffect,useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {useFetch} from '../hooks/use-fetch';
import BackendError from '../components/backend-error-messages';
import {SYSTEM} from '../constants/systems';
import {useLocalStorage} from '../hooks/use-local-storage';

import {CurrentUserContext} from '../context/current-user-context';


export default function Login() {

  const [currentUserState, setCurrentUserState] 
      = useContext(CurrentUserContext);

  const [user, setUser] = useState({
    email: "test@test.com",  // only for temp demo purpose
    password: "12345678"
  });

  const [token, setToken] = useLocalStorage(SYSTEM.AUTH_TOKEN_KEY);

  // useFetch
  const [{isLoading, response, error}, doFetch] 
    = useFetch("users/login");

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  // When user logins in
  useEffect(() => {
    if (!response) return;

    if (!response.user) return;
    
    // Set the auth token in localStorage
    setToken(response.user.token);
    
    // Update the userContext
    setCurrentUserState(state => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response.user
    }))
  },[response])



  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(JSON.stringify(user));

    doFetch({
      method: "post",
      body: JSON.stringify({
        user: {
          email: user.email,
          password: user.password
        }
      })
    });
  }

  if (currentUserState.isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <div className="container">
      <div className="mt-5">
        <h1 className="text-xs-center">Login</h1>
        <Link to="/register">Need an account?</Link>
      </div>
      {isLoading && <h4>Loading.....</h4>}
      {error && <BackendError errors={error} />}
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" 
             name="email"
             onChange={handleChange}
             value={user.email} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input type="password" className="form-control"
             name="password"
             onChange={handleChange}
             value={user.password} />
          </div>
        </div>
        <button className="btn btn-lg btn-primary pull-xs-right">
          Sign in
        </button>
      </form>
    </div>
  )
}
