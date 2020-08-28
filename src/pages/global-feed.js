import React from 'react';

export default function GlobalFeed({data}) {
  return (
    <div className="posts">
      {
        data.map(item => {
          return (
            <article key={data.slug} className="post-item">
              <h4>{item.title}</h4>
              <div>{item.body}</div>

              <footer className="tags">
                {
                  item.tag_list.map(t => {
                    return <span className="tag">{t}</span>
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
