import React from 'react';

export default function GlobalFeed({data}) {
  return (
    <div className="posts">
      {
        data.map(item => {
          return (
            <article key={item.slug} className="post-item">
              <h4>{item.title}</h4>
              <span className="post-author">
                - written by {item.author.username}
              </span>
              
              <pre className="post-body">
                {item.body}
              </pre>

              <footer className="tags">
                {
                  item.tag_list.map(t => {
                    return (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    )
                  })
                }
              </footer>
            </article>
          )
        })
      }
    </div>
  )
}
