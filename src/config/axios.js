import axios from "axios";

const instance = axios.create({
  baseURL: 'https://date.nager.at/api/v3/',
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export default instance;
