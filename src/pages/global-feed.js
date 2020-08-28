import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Tags from '../components/tags';
import {CurrentUserContext} from '../context/current-user-context';
import {useFetch} from '../hooks/use-fetch';

export default function GlobalFeed({data, onArticleDeleted, onToggleFavs}) {

  const [currentUserState] = useContext(CurrentUserContext);

  const [favslug, setFavSlug] = useState({
    slug: undefined,
    isfav: false
  });
  const [{response, error, isLoading}, doFetchToggleFavs] = 
    useFetch(`articles/${favslug.slug}/favorite`)

  // favs effect
  useEffect(() => {
    if (!favslug.slug) return;
    doFetchToggleFavs({
      method: favslug.isfav ? "post" :"delete"
    })
  }, [favslug])

  const handleDelete = (slug) => {
    let result = window.confirm(`Are you sure you want to delete ${slug}?`);
    if (result) {
      onArticleDeleted(slug);
    }
  }

  const isAuthor = (article) => {
    if (!currentUserState.currentUser) return false;
    // if (currentUser.isLoggedIn == null) return false;
    // console.log("CURRENT USER : ",currentUserState.currentUser, article.author.username);
    return (
      currentUserState.currentUser.username === article.author.username
    )
  }

  const toggleFavs = (slug, toggle) => {
    setFavSlug({
      slug: slug,
      isfav: !toggle
    });
    onToggleFavs &&  onToggleFavs(slug, !toggle);
  }

  return (
    <div className="posts">
      {
        data.map(item => {
          let favClass = item.favorited ? "favorited" : "not-favorited";
          return (
            <div key={item.slug} className="post-item">
              <h4><Link to={`/articles/${item.slug}`}>{item.title}</Link></h4>
              { isAuthor(item) &&  <button 
                  onClick={()=> handleDelete(item.slug)}
                  className="btn btn-sm btn-danger float-right">
                    x
                </button>
              }
              <div className="post-meta float-right">
                <span className="post-author">
                  - written by {item.author.username}
                </span>
                <span className={favClass} onClick={()=>toggleFavs(item.slug, item.favorited)}>
                  ❤
                </span>
                <span>
                  {item.favorites_count}
                </span>
              </div>
              
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


