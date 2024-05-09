import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:3001', // 임시 url 추후 서버 url로 변경 및 .env로 이동
  timeout: 1000,
  withCredentials: true,
});
