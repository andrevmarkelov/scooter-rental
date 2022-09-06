import { $authHost, $host } from './index';


export const createType = async (type) => {
  const { data } = await $authHost.post('api/type', type);
  return data;
}

export const fetchType = async () => {
  const { data } = await $host.get('api/type');
  return data;
}

export const createBrand = async (brand) => {
  const { data } = await $authHost.post('api/brand', brand);
  return data;
}

export const fetchBrand = async () => {
  const { data } = await $host.get('api/brand');
  return data;
}

export const createScooter = async (scooter) => {
  const { data } = await $authHost.post('api/scooter', scooter);
  return data;
}

export const fetchScooter = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $host.get('api/scooter', {params: {
    typeId, brandId, page, limit
  }});
  return data;
}

export const fetchItemScooter = async (id) => {
  const { data } = await $host.get(`api/scooter/${id}`);
  return data;
}