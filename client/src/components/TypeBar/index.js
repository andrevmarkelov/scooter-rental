import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';


export const TypeBar = observer(() => {
  const { scooter } = useContext(Context);

  return (
    <ul>
      {scooter.types.map(type =>
        <li key={type.id} onClick={() => scooter.setSelectedType(type)}>{type.name}</li>
      )}
    </ul>
  )
});