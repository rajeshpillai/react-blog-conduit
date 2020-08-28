import React, {useState, useEffect} from 'react';
import {useHistory, useParams}  from 'react-router-dom';
import {useFetch} from '../hooks/use-fetch';

export default function ArticleEditor({onCreated, onUpdated}) {
  const [article, setArticle] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [],
    tags: ""
  });

  let history = useHistory();
  let {slug} = useParams();

  
  // Post new article
  const [{isLoading, response, error}, doFetch] = useFetch("articles");

  // Fetch article for edit
  const [{isLoading:_1, response:articleResponse, error:errorFetchEdit}, doArticleFetch] = useFetch(`articles/${slug}`);
  
  // Update article - PUT /api/articles/:slug
  const [{isLoading:isLoadingPut, response:articleUpdateResponse, error:errorUpdate}, doArticleUpdate] = useFetch(`articles/${slug}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!slug) createArticle();
    else updateArticle();
  }

  const createArticle = () => {
    doFetch({
      method: "post",
      body:JSON.stringify({
        article: {
          title: article.title,
          body: article.body,
          description: article.description,
          tagList: article.tags.split(",")
        }
      })
    })
  }

  // api call
  const updateArticle = () => {
    doArticleUpdate({
      method: "put",
      body:JSON.stringify({
        article: {
          title: article.title,
          body: article.body,
          description: article.description,
          tagList: article.tags.split(",")
        }
      })
    })
  }

  // edit
  useEffect(() => {
    if (!slug) return;
    doArticleFetch();
  }, [slug])

  // article fetched for edit
  useEffect(() => {
    if (!articleResponse?.article) return;
    setArticle({
      ...article,
      title: articleResponse.article.title,
      description: articleResponse.article.description,
      body: articleResponse.article.body,
      tags: articleResponse.article.tag_list.join(",")
    })

  }, [articleResponse])



  // new article
  useEffect(() => {
    if (!response) return;
    if (!response.article) return;

    onCreated(response.article);
    // reset state
    setArticle({
      title: "",
      description: "",
      body: "",
      tags: "",
      tagList: []
    });

    history.push("/");

  },[response])


   // update article
   useEffect(() => {
    if (!articleUpdateResponse) return;
    if (!articleUpdateResponse.article) return;

    onUpdated(articleUpdateResponse.article);
    // reset state
    setArticle({
      title: "",
      description: "",
      body: "",
      tags: "",
      tagList: []
    });

    history.push("/");

  },[articleUpdateResponse])

  const handleChange = (e) => {
    e.preventDefault();
    setArticle({
      ...article,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="card border-0 shadow">
      <div className="card-header">
        ARTICLE EDITOR {slug ? "(edit)" : "new"}
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" 
              placeholder="enter article title"
              name="title"
              value={article.title}
              onChange= {handleChange}
              className="form-input-control"/>
          </div>
          <div className="form-group">
            <input type="text" 
              placeholder="enter article description"
              name="description"
              value={article.description}
              onChange= {handleChange}
              className="form-input-control"/>
          </div>
          <div className="form-group">
            <textarea type="text" 
              placeholder="enter conent"
              name="body"
              rows="10"
              cols="50"
              value={article.body}
              onChange= {handleChange}
              className="form-input-control"
              style={
                {
                  height: "80vh",
                  width:"100%"
                }
              }
              />
          </div>
          <div className="form-group">
            <input type="text" 
              placeholder="enter tags (comma separated)"
              name="tags"
              value={article.tags}
              onChange= {handleChange}
              className="form-input-control"/>
          </div>
          <button className="btn btn-primary">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  )
}
