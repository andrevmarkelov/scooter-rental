import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '..';
import { Brandbar } from '../components/BrandBar';
import { Header } from '../components/Header';
import { ListProduct } from '../components/listProduct';
import { Pagination } from '../components/Pagination';
import { TypeBar } from '../components/TypeBar';
import { fetchBrand, fetchScooter, fetchType } from '../http/scooterApi';


export const Catalog = observer(() => {
  const { scooter } = useContext(Context);

  useEffect(() => {
    fetchType().then(data => scooter.setTypes(data));
    fetchBrand().then(data => scooter.setBrands(data));
    fetchScooter(null, null, 2, 2).then(data => {
      scooter.setScooters(data.rows);
      scooter.setTotalCount(data.count);
    });
  });

  useEffect(() => {
    fetchScooter(scooter.selectedType.id, scooter.selectedBrand.id, scooter.page, 2).then(data => {
      scooter.setScooters(data.rows);
      scooter.setTotalCount(data.count);
    })
  }, [scooter.page, scooter.selectedType, scooter.selectedType]);

  return (
    <div>
      <Header />
      <div className="catalog-wrapper">
        <div className="catalog-list">
          <TypeBar />
          <Brandbar />
        </div>
        <div className="list-product">
          <ListProduct />
          <Pagination />
        </div>
      </div>
    </div>
  )
})