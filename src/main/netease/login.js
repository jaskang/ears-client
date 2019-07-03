// 手机登录

import crypto from 'crypto';
import http from './../util/http';
export function cellphone(data, cookies = '') {
  const _data = {
    phone: data.phone,
    countrycode: data.countrycode,
    password: crypto
      .createHash('md5')
      .update(data.password)
      .digest('hex'),
    rememberLogin: 'true'
  };
  cookies += '; os=pc';
  return http({
    method: 'POST',
    url: `https://music.163.com/weapi/login/cellphone`,
    data: _data,
    crypto: 'weapi',
    ua: 'pc',
    cookies: cookies
  });
}

// 登录状态

export function state(data, cookies = '') {
  return http({
    method: 'GET',
    url: `https://music.163.com`,
    data: {},
    cookies: cookies
  }).then(response => {
    try {
      let profile = eval(`(${/GUser\s*=\s*([^;]+);/.exec(response.body)[1]})`);
      return Promise.resolve({
        status: 200,
        body: { code: 200, profile: profile }
      });
    } catch (err) {
      return Promise.resolve({ status: 301, body: { code: 301 } });
    }
  });
}

export function refresh(data, cookies = '') {
  return http({
    method: 'POST',
    url: `https://music.163.com/weapi/login/token/refresh`,
    data: {},
    crypto: 'weapi',
    ua: 'pc',
    cookies: cookies
  });
}
