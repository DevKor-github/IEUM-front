import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://api.ieum.devkor.club',
  timeout: 3000,
  withCredentials: true,
});

// Response 인터셉터 추가
API.interceptors.response.use(
  (response) => {
    // 응답 데이터를 변환합니다.
    return response?.data;
  },
  (error) => {
    // 에러를 그대로 전달합니다.
    return Promise.reject(error);
  },
);
