import React, {useState, useEffect} from 'react';
import { Link, useParams} from 'react-router-dom';
import { API_BASE } from '../constants/systems';

export default function Article() {
  let {slug} = useParams();
  const [article, setArticle] = useState({});

  useEffect(()=> {
    async function fetchArticle(url) {
     let response = await fetch(url);
     let data = await response.json();
     setArticle(data.article);
    }
    fetchArticle(`${API_BASE}/articles/${slug}`);
  },[slug])
 
 if (!article) return <Link to="/">back</Link>;

  return (
     <div className="post-item">
      <h3>{article.title}</h3>
      <div>{article.description}</div>
      <pre>{article.body}</pre>
      <Link to="/">back</Link> | 
      <Link to={`/article/${article.slug}/edit`}>edit</Link>
    </div>
  )
}
