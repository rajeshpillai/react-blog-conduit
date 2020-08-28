import React, {useState, useEffect} from 'react';
import {useHistory}  from 'react-router-dom';
import {useFetch} from '../hooks/use-fetch';

export default function ArticleEditor({onCreated}) {
  const [article, setArticle] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [],
    tags: ""
  });

  let history = useHistory();

  const [{isLoading, response, error}, doFetch] = useFetch("articles");

  const handleSubmit = (e) => {
    e.preventDefault();
    // {
    //   "article": {
    //     "title": "How to train your dragon",
    //     "description": "Ever wonder how?",
    //     "body": "You have to believe",
    //     "tagList": ["reactjs", "angularjs", "dragons"]
    //   }
    // }

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
        ARTICLE EDITOR
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
