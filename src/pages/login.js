import React from 'react';
import {Link} from 'react-router-dom';

export default function Login() {
  return (
    <div className="container">
      <div className="mt-5">
        <Link to="/register">Need an account?</Link>
      </div>
      <form>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input type="email" class="form-control" />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">
            Password
          </label>
          <div class="col-sm-10">
            <input type="password" class="form-control" />
          </div>
        </div>
        <button className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
      </form>
    </div>
  )
}
