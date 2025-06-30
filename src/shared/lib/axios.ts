import axios from 'axios';

export const Web2ApiInstance = axios.create({
  baseURL: 'https://serv.gamler.atma-dev.ru',
});
