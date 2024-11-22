import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts'; 

export const submitDeviceDetails = async (data: object) => {
  try {
    const response = await axios.post(API_URL, data);
    console.log('API Response:', response.data); // Debugging response
    return response.data;
  } catch (error) {
    throw new Error('Failed to submit device details');
  }
};
