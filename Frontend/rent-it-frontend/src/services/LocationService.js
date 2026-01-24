const BASE_URL = "http://localhost:8080/location";

export const getCities = async () => {
  const res = await fetch(`${BASE_URL}/cities`);
  return res.json();
};

export const getAreasByCity = async (cityId) => {
  const res = await fetch(`${BASE_URL}/areas/${cityId}`);
  return res.json();
};