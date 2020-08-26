import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './App.scss';
import NavBar from './components/navbar';
import GlobalFeed from './pages/global-feed';
import Article from './pages/article';

function App() {
  return (
    <div className="container">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" component={GlobalFeed} exact />
          <Route path="/articles/:slug" component={Article} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
