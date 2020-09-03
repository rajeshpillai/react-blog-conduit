import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from 'react-router-dom';

import './App.scss';
import NavBar from './components/navbar';
import GlobalFeed from './pages/global-feed';
import Article from './pages/article';
import Login from './pages/login';
import Register from './pages/register';

import {useFetch} from './hooks/use-fetch';
import { CurrentUserProvider } from './providers/current-user-provider';

import ArticleEditor from './pages/article-editor';
import AuthenticatedRoutes from './components/authenticated-routes';
import UserLoader from './components/user-loader';
import TagFeeds from './pages/tag-feeds';

function App() {
  const [articles, setArticles] = useState([]);
  const [deleteArticleSlug, setDeleteArticleSlug] = useState();

  const [{isLoading, response, error}, doFetch] = useFetch("articles");

  const [{isLoading:isLoadingDelete,
          response:deleteResponse, 
          error:deleteError}, doFetchDelete] = useFetch(`articles/${deleteArticleSlug}`);


  useEffect(() => {
    doFetch({
      method: "get"
    })
  },[deleteArticleSlug, deleteResponse])

  // The data is actually available now or any errror is there
  useEffect(() => {
    if (!response)  return;
    console.log("POSTS:", response.articles);
    setArticles(response.articles);
  },[response, error])

  // For deleting article
  useEffect(() => {
    if (!deleteArticleSlug) return;
    doFetchDelete({
      method: "delete"
    })
  }, [deleteArticleSlug])

  const onArticleDeleted = (slug) => {
    setDeleteArticleSlug(slug);
  }

  const onArticleCreated = (article) => {
    // alert(JSON.stringify(article));
    setArticles([
      article,
      ...articles
    ])
  }

  const onArticleUpdated = (article) => {
     let updated = articles.map(a => {
       if (a.slug == article.slug) {
         return article;
       }
       return a;
     })

     setArticles([
       ...updated
     ])
  }

  const onToggleFavs = (slug, status) => {
    let updated = articles.map(a => {
      if (a.slug == slug) {
        a.favorited = status;
        a.favorites_count = a.favorites_count + (status ? 1 : -1);
        return a;
      }
      return a;
    })

    setArticles([
      ...updated
    ])
  }

  return (
    <CurrentUserProvider>
      <UserLoader>
        <div className="container">
          <Router>
            <NavBar />
            <Switch>
              <Route path="/" exact >
                <GlobalFeed 
                  onArticleDeleted = {onArticleDeleted}
                  onToggleFavs={onToggleFavs}
                  data={articles}/>
              </Route>
              
              <Route path="/tag/:tag/articles">
                <TagFeeds
                    onToggleFavs={onToggleFavs}
                    onArticleDeleted = {onArticleDeleted}
                    data={articles} />
              </Route>
              
              
              <Route path="/articles/:slug" 
                component={Article} />
              
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />

              <AuthenticatedRoutes>
                <Route path="/article/new" >
                    <ArticleEditor onCreated={onArticleCreated} />
                </Route>
                <Route path="/article/:slug/edit">
                  <ArticleEditor onUpdated= {onArticleUpdated} />
               </Route>
              </AuthenticatedRoutes>
            </Switch>
          </Router>
        </div>
      </UserLoader>
    </CurrentUserProvider>
  );
}

export default App;
