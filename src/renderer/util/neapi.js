import axios from 'axios';

const neapi = axios.create({
  baseURL: 'http://localhost:3000/netease/',
  withCredentials: true
});

export default (url, data = {}) => {
  return neapi.request(
    Object.assign(
      { method: 'post' },
      {
        url: url,
        data: data
      }
    )
  );
};
