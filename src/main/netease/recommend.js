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

export function songs(data, cookies = '') {
  return http({
    method: 'POST',
    url: `https://music.163.com/weapi/v1/discovery/recommend/songs`,
    data: {
      limit: 100,
      offset: 0,
      total: true
    },
    crypto: 'weapi',
    cookies: cookies
  });
}
