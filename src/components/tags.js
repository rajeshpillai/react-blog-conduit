import React from 'react';
import { Link } from 'react-router-dom';

export default function Tags({item}) {
  return item.tag_list.map(t => {
    return (
      <span key={t} className="tag">
        <Link to={`/tag/${t}/articles`}>{t}</Link>
      </span>
    );
  });
}