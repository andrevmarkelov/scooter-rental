import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { fetchItemScooter } from '../http/scooterApi';

export const ProductDetail = () => {
  const [scooter, setScooter] = useState({ info: [] });
  const { id } = useParams();

  useEffect(() => {
    fetchItemScooter(id).then(data => setScooter(data))
  });

  return (
    <div>
      <Header />
      <h1>{scooter.name}</h1>
    </div>
  )
}