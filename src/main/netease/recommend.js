import http from './../util/http';

export function resource(data, cookies = '') {
  return http({
    method: 'POST',
    url: `https://music.163.com/weapi/v1/discovery/recommend/resource`,
    data: {},
    crypto: 'weapi',
    cookies: cookies
  });
}
