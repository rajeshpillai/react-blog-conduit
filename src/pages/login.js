import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useFetch} from '../hooks/use-fetch';
import BackendError from '../components/backend-error-messages';

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  // useFetch
  const [{isLoading, response, error}, doFetch] 
    = useFetch("/users/login");

  console.log("login: ",isLoading, response, error);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(JSON.stringify(user));

    doFetch({
      method: "POST",
      body: JSON.stringify({
        user: {
          email: user.email,
          password: user.password
        }
      })
    });

    // fetch(`${API}/users/login`, {
    //   method: 'post',
    //   body: JSON.stringify({
    //     user: {
    //       email: user.email,
    //       password: user.password
    //     }
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8"
    //   }
    // })
    // .then(res => res.json())
    // .then(json => {
    //   console.log(json);
    // })
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
