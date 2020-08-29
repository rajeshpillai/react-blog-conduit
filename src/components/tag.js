import React from 'react';
import { Link } from 'react-router-dom';

export default function Tag({tag}) {
  return (
    <span key={tag} className="tag">
      <Link to={`/tag/${tag}/articles`}>{tag}</Link>
    </span>
  );
}