import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Context } from '..';
import { createBrand, createScooter, createType, fetchBrand, fetchType } from '../http/scooterApi';
import styles from '../styles/Admin.module.scss'
import { Link } from 'react-router-dom';
import { CATALOG_ROUTE } from '../utils/consts';
import { fetchUsers } from '../http/userApi';


export const Admin = observer(() => {
  const { scooter } = useContext(Context);
  const { user } = useContext(Context);

  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');

  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState(null);
  const [specifications, setSpecifications] = useState([]);

  useEffect(() => {
    fetchType().then(data => scooter.setTypes(data));
    fetchBrand().then(data => scooter.setBrands(data));
    fetchUsers().then(data => user.setListUsers(data));
  }, [scooter, user]);

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
    <div className={styles.wrapper}>
      <div className={styles.menu}>
        <Link to={CATALOG_ROUTE} className={styles.logo}>
          <img width={50} height={50} src='/image/logotype.png' alt='logo' />
          <div className={styles.title}>
            <h1>Scooter Rental</h1>
            <p>Anytime Everywhere</p>
          </div>
        </Link>
        <ul className={styles.list}>
          <li>Add a type</li>
          <li>Add a brand</li>
          <li>Add a product</li>
          <li>Users</li>
        </ul>
      </div>
      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <p>Add a type</p>
          </div>
          <div className={styles.cardBody}>
            <input type="text" placeholder='Enter the type' value={type} onChange={event => setType(event.target.value)} />
          </div>
          <div className={styles.cardFooter}>
            <button onClick={addType}>Add</button>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <p>Add a brand</p>
          </div>
          <div className={styles.cardBody}>
            <input type="text" placeholder='Enter the brand' value={brand} onChange={event => setBrand(event.target.value)} />
          </div>
          <div className={styles.cardFooter}>
            <button onClick={addBrand}>Add</button>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <p>Add a product</p>
          </div>
          <div className={styles.cardBody}>
            <input type="file" onChange={selectImage} />
            <input type="text" placeholder='Product Name' value={name} onChange={event => setName(event.target.value)} />
            <input type="number" placeholder='Product Price' value={price} onChange={event => setPrice(Number(event.target.value))} />
            <div className={styles.selection}>
              <span>Select the type</span>
              <div>{scooter.types.map(item =>
                <input
                  key={item.id}
                  onClick={() => scooter.setSelectedType(item)}
                  readonly="readonly"
                  className={item.id === scooter.selectedType.id ? 'active' : ''}
                  defaultValue={item.name} />)}
              </div>
            </div>
            <div className={styles.selection}>
              <span>Select the brand</span>
              <div>{scooter.brands.map(item =>
                <input
                  key={item.id}
                  onClick={() => scooter.setSelectedBrand(item)}
                  readonly="readonly"
                  className={item.id === scooter.selectedBrand.id ? 'active' : ''}
                  defaultValue={item.name} />)}
              </div>
            </div>
            <div className={styles.specifications}>
              <p>Specifications</p>
              <button onClick={addSpecifications} className={styles.addSpecificationButton}>Add a specification</button>
              {specifications.map(item =>
                <div key={item.id} className={styles.specificationsItem}>
                  <input type="text" placeholder='Title' value={item.title} onChange={event => changeSpecifications('title', event.target.value, item.id)} />
                  <input type="text" placeholder='Description' value={item.description} onChange={event => changeSpecifications('description', event.target.value, item.id)} />
                  <button onClick={() => removeSpecifications(item.id)}>
                    <img src="/image/delete-icon.png" width={30} height={30} alt="Deleting a specification" />
                  </button>
                </div>
              )}
              <div>
              </div>
            </div>
          </div>
          <div className={styles.cardFooter}>
            <button onClick={addScooter}>Add</button>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <p>List users</p>
          </div>
          <div className={styles.cardBody}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Registration date</th>
                </tr>
              </thead>
              <tbody>
                {user.listUsers.map(item =>
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.role}</td>
                  <td>{item.createdAt}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
})