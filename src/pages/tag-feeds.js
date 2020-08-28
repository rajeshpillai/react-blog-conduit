import React,{useState, useEffect} from 'react';
import GlobalFeed from './global-feed';
import {useParams} from 'react-router-dom';
import { useFetch } from '../hooks/use-fetch';

export default function TagFeeds(props) {
  let {tag} = useParams();
  let [{response}, doFetch] = useFetch(`articles?tag=${tag}`);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    doFetch();
  },[tag])

  useEffect(() => {
    if (!response) return;
    setArticles(response.articles);
  },[response])

  // Code duplicate (as in app.js as well):  REFACTOR (intentionally kep)
  const onFavs = (slug, status) => {
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
    ]);

    props.onToggleFavs(slug, status);
  }

  return (
    <div>
      <h4>Search result for tag "{tag}..."</h4>
      <GlobalFeed 
        onArticleDeleted = {props.onArticleDeleted}
        onToggleFavs={onFavs}
        data={articles}
      />
    </div>
  )
}