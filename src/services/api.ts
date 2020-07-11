import axios from 'axios';

const api = axios.create({
  baseURL: '192.168.1.6:3333',
});
// 192.168.1.4
// 172.17.0.1
// 10.0.2.2

export default api;
