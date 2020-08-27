import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './App.scss';
import NavBar from './components/navbar';
import GlobalFeed from './pages/global-feed';
import Article from './pages/article';
import Login from './pages/login';
import Register from './pages/register';

import {useFetch} from './hooks/use-fetch';

function App() {
  const [articles, setArticles] = useState([]);

  const [{isLoading, response, error}, doFetch] = useFetch("posts");

  useEffect(() => {
    doFetch({
      method: "get"
    })
  },[])

  // The data is actually available now or any errror is there
  useEffect(() => {
    if (!response)  return;
    console.log("POSTS:", response);
    setArticles(response);
  },[response, error])



  return (
    <div className="container">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact >
            <GlobalFeed data={articles}/>
          </Route>
          <Route path="/articles/:slug" 
            component={Article} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
