import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Context } from '..';
import { Header } from '../components/Header';
import { createBrand, createScooter, createType, fetchBrand, fetchType } from '../http/scooterApi';


export const Admin = observer(() => {
  const { scooter } = useContext(Context);

  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');

  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState(null);
  const [specifications, setSpecifications] = useState([]);

  useEffect(() => {
    fetchType().then(data => scooter.setTypes(data));
    fetchBrand().then(data => scooter.setBrands(data));
  }, [scooter]);

  const addType = () => {
    createType({ name: type }).then(() => setType(''));
  }

  const addBrand = () => {
    createBrand({ name: brand }).then(() => setBrand(''));
  }

  const selectImage = item => {
    setImage(item.target.files[0]);
  }

  const changeSpecifications = (key, value, id) => {
    setSpecifications(specifications.map(item => item.id === id ? { ...item, [key]: value } : item));
  }

  const addSpecifications = () => {
    setSpecifications([...specifications, { title: '', description: '', id: Date.now() }])
  }

  const removeSpecifications = (id) => {
    setSpecifications(specifications.filter(item => item.id !== id))
  }

  const addScooter = () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('brandId', scooter.selectedBrand.id);
    formData.append('typeId', scooter.selectedType.id);
    formData.append('info', JSON.stringify(specifications));

    createScooter(formData).then(() => alert('Product added!'));
  }

  return (
    <div className="wrapper">
      <Header />
      <div className="createType">
        <p>Add a type</p>
        <input type="text" placeholder='Enter the type' value={type} onChange={event => setType(event.target.value)} />
        <button onClick={addType}>Add</button>
      </div>
      <div className="createBrand">
        <p>Add a brand</p>
        <input type="text" placeholder='Enter the brand' value={brand} onChange={event => setBrand(event.target.value)} />
        <button onClick={addBrand}>Add</button>
      </div>
      <div className="createBrand">
        <p>Add a product</p>
        <input type="file" onChange={selectImage} />
        <input type="text" placeholder='Product Name' value={name} onChange={event => setName(event.target.value)} />
        <input type="text" placeholder='Product Price' value={price} onChange={event => setPrice(Number(event.target.value))} />
        <div className="selectType">
          <span>Select the type</span>
          <div>{scooter.types.map(item => <input key={item.id} onClick={() => scooter.setSelectedType(item)} value={item.name} />)}</div>
        </div>
        <div className="selectBrand">
          <span>Select the brand</span>
          <div>{scooter.brands.map(item => <input key={item.id} onClick={() => scooter.setSelectedBrand(item)} value={item.name} />)}</div>
        </div>
        <div>
          <p>Specifications</p>
          <button onClick={addSpecifications}>Add a specification</button>
          {specifications.map(item =>
            <div key={item.id}>
              <input type="text" placeholder='Title specifications' value={item.title} onChange={event => changeSpecifications('title', event.target.value, item.id)} />
              <input type="text" placeholder='Specification description' value={item.description} onChange={event => changeSpecifications('description', event.target.value, item.id)} />
              <button onClick={() => removeSpecifications(item.id)}>x</button>
            </div>
          )}
          <div>
          </div>
        </div>
        <button onClick={addScooter}>Add</button>
      </div>
    </div>
  )
})