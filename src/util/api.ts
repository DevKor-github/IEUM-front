import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://api.ieum.devkor.club/api',
  timeout: 1000,
  withCredentials: true,
});
