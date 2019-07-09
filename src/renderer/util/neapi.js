import axios from 'axios';

const neapi = axios.create({
  baseURL: 'http://localhost:10923/netease/',
  withCredentials: true
});

// 添加响应拦截器
neapi.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
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
