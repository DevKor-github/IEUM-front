import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://api.ieum.devkor.club',
  timeout: 1000,
  withCredentials: true,
});
