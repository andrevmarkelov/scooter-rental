import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';


export const Brandbar = observer(() => {
  const { scooter } = useContext(Context);

  return (
    <ul>
      {scooter.brands.map(item =>
        <li key={item.id} onClick={() => scooter.setSelectedBrand(item)}>{item.name}</li>
      )}
    </ul>
  )
});