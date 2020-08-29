import React from 'react';
import Tag from './tag';

export default function Tags({item}) {
  return item.tag_list.map(t => {
    return (
      <Tag tag={t} />
    );
  });
}