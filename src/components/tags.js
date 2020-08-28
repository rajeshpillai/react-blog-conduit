import React from 'react';

export default function Tags({item}) {
  return item.tag_list.map(t => {
    return (
      <span key={t} className="tag">
        {t}
      </span>
    );
  });
}