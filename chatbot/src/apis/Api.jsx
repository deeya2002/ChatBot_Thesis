import axios from 'axios';
const Api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// configuration for axios
const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
};

// const token = getToken();
console.log('Token:', config);

// Creating test api
export const testApi = () => Api.get('/test');
// http://localhost:5000//test

//Auth Api for user
//  Creating register api
export const registerApi = data => Api.post('/api/users/register', data);
// Create login api
export const loginApi = data => Api.post('/api/users/login', data);

const URL_API = 'http://localhost:5000/api/prompt'

export const makeRequest = async (message) => {
  console.log(message)
  const { data } = await axios.post(URL_API, message)

  return data
}

// API to get data by userid
export const getDataByUserId = async (params) => {
  const { id } = params;
  try {
    const { data } = await Api.get(`/api/gethistory/${id}`, config);
    return data;
  } catch (error) {
    console.error('Error fetching data by userid:', error);
    throw error;
  }
};
