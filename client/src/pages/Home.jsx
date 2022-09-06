import React from 'react';
import { Link } from 'react-router-dom';
import { CATALOG_ROUTE } from '../utils/consts';


export const Home = () => {
  return (
    <div>
      <p>Landing page</p>
      <Link to={CATALOG_ROUTE}>Catalog</Link>
    </div>
  )
}