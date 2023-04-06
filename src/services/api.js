import axios from 'axios';

// json-server --watch -d 180 --host seu ipconfig ipv4 192.168.15.92 db.json

const api = axios.create({
    baseURL: 'http://192.168.15.92:3000/'
});

export default api;