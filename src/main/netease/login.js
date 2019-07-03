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
