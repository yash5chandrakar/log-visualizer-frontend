import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000' });

export const fetchLogs = (params) => API.get('/api/logs', { params });
export const fetchStats = (seconds) => API.get('/api/stats', { params: { seconds } });
