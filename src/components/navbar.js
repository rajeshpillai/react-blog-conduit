import React from 'react';
import {
  Link,
  NavLink
} from 'react-router-dom';

import AuthLink from './auth-links';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand">
          BLOG
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <AuthLink />
        </ul>
      </div>
    </nav>
  )
}
