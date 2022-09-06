import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { ProductItem } from '../productItem';


export const ListProduct = observer(() => {
  const { scooter } = useContext(Context);

  return (
    <div className='productList'>
      {scooter.scooters.map(item => <ProductItem key={item.id} scooter={item} />)}
    </div>
  )
});