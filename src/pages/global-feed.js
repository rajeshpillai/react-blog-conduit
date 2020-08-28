import React, {useContext} from 'react';
import Tags from '../components/tags';
import {CurrentUserContext} from '../context/current-user-context';

export default function GlobalFeed({data, onArticleDeleted}) {

  const [currentUserState] = useContext(CurrentUserContext);

  const handleDelete = (slug) => {
    let result = window.confirm(`Are you sure you want to delete ${slug}?`);
    if (result) {
      onArticleDeleted(slug);
    }
  }

  const isAuthor = (article) => {
    if (!currentUserState.currentUser) return false;
    // if (currentUser.isLoggedIn == null) return false;
    console.log("CURRENT USER : ",currentUserState.currentUser, article.author.username);
    return (
      currentUserState.currentUser.username === article.author.username
    )
  }

  return (
    <div className="posts">
      {
        data.map(item => {
          return (
            <div key={item.slug} className="post-item">
              <h4>{item.title}</h4>
              { isAuthor(item) &&  <button 
                onClick={()=> handleDelete(item.slug)}
                className="float-right">
                  x
              </button>
              }
              <span className="post-author">
                - written by {item.author.username}
              </span>
              
              <pre className="post-body">
                {item.body}
              </pre>

              <footer className="tags">
                  <Tags item ={item} />
              </footer>
            </div>
          )
        })
      }
    </div>
  )
}


