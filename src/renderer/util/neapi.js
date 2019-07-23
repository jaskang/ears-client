import axios from 'axios';

const neapi = axios.create({
  baseURL: 'http://localhost:10923/netease/',
  withCredentials: true
});

// 添加响应拦截器
neapi.interceptors.response.use(
  function(response) {
    if (response.data && response.data.code === 200) {
      return response.data;
    } else {
      return Promise.reject(new Error(`code:${response.data.code}`));
    }
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
