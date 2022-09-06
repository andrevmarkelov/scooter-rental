import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../..';


export const Pagination = observer(() => {
  const { scooter } = useContext(Context);
  const pageCount = Math.ceil(scooter.totalCount / scooter.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <div className='pagination'>
      {pages.map(item => <button key={item} onClick={() => scooter.setPage(item)}>{item}</button>)}
    </div>
  );
});