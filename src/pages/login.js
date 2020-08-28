import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useFetch} from '../hooks/use-fetch';
import BackendError from '../components/backend-error-messages';
import {AUTH_TOKEN_KEY} from '../constants/systems';
import {useLocalStorage} from '../hooks/use-local-storage';

export default function Login() {
  const [user, setUser] = useState({
    email: "test@test.com",  // only for temp demo purpose
    password: "12345678"
  });

  const [token, setToken] = useLocalStorage(AUTH_TOKEN_KEY);

  // useFetch
  const [{isLoading, response, error}, doFetch] 
    = useFetch("users/login");

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  useEffect(() => {
    if (!response) return;
    setToken(response.user.token);
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
