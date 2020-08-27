import React from 'react';

export default function GlobalFeed({data}) {
  return (
    <div className="posts">
      {
        data.map(item => {
          return (
            <article className="post-item">
              <h4>{item.title}</h4>
              <div>{item.body}</div>
            </article>
          )
        })
      }
    </div>
  )
}
