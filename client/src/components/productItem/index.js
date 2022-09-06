import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_ROUTE } from '../../utils/consts';
import styles from './productItem.module.scss'


export const ProductItem = ({scooter}) => {
  const navigate = useNavigate();

  return (
    <div className='product'>
      <div className='productImage'>
        <img width={150} height={150} src={process.env.REACT_APP_API_URL + scooter.image} alt={scooter.name} />
      </div>
      <div className={styles.productName}>
        <p onClick={() => navigate(PRODUCT_ROUTE + '/' + scooter.id)}>{scooter.name}</p>
      </div>
      <p className='productPrice'>{scooter.price}</p>
    </div>      
  )
}