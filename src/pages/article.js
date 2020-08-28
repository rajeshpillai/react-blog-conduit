import React, {useState, useEffect} from 'react';
import { Link, useParams} from 'react-router-dom';
import { API_BASE } from '../constants/systems';
import { useFetch } from '../hooks/use-fetch';

export default function Article() {
  let {slug} = useParams();
  const [article, setArticle] = useState({});
  const [comment, setComment] = useState({});

  // Post comment
  const [{isLoading, response:commentResponse, error}, doFetchComments] = useFetch(`articles/${slug}/comments`);

  // Fetch comments
  //GET /api/articles/:slug/comments
  const [{response:allComments}, fetchComments] = useFetch(`articles/${slug}/comments`);

  
  // Fetch comments for article
  useEffect(() => {
    fetchComments();

  }, [slug])

  // Fetch article
  useEffect(()=> {
    async function fetchArticle(url) {
     let response = await fetch(url);
     let data = await response.json();
     setArticle(data.article);
    }
    fetchArticle(`${API_BASE}/articles/${slug}`);
  },[slug])

  const handleChange = (e) => {
    e.preventDefault();
    setComment({
      ...comment,
      [e.target.name]: e.target.value
    })
  }
 
  if (!article) return <Link to="/">back</Link>;

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(JSON.stringify(comment));
    doFetchComments({
      method: "post",
      body:JSON.stringify({
        comment: {
          body: comment.body
        }
      })
    })
    setComment({
      body: ""
    })
  }

  return (
    <div className="post-container">
      <div className="post-item">
        <h3>{article.title}</h3>
        <div>{article.description}</div>
        <pre>{article.body}</pre>
        <Link to="/">back</Link> | 
        <Link to={`/article/${article.slug}/edit`}>edit</Link>
      </div>
      
      <div className="comments">
        <div className="card border-0 shadow">
          <div className="card-header">
            COMMENTS
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <textarea type="text" 
                  placeholder="enter conent"
                  name="body"
                  rows="5"
                  cols="50"
                  value={comment.body}
                  onChange= {handleChange}
                  className="form-input-control"
                  style={
                    {
                      height: "20vh",
                      width:"100%"
                    }
                  }
                  />
              </div>
              <button className="btn btn-primary">
                SUBMIT
              </button>
            </form>
          </div>
          </div>
        </div>
          <div className="comments">
            { allComments &&  allComments.comments.map(c => {
              return (
                <div key={c.id} className="comment">
                    <pre>
                      {c.body}
                    </pre>
                    <div>
                      commented by: {c.author.username}
                    </div>
                </div>
              )
            })
          }
          </div>
    </div>
  )
}
