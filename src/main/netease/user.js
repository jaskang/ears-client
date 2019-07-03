import http from './../util/http';

export function playlist(data, cookies = '') {
  return http({
    method: 'POST',
    url: `https://music.163.com/weapi/user/playlist`,
    data: {
      uid: data.uid,
      limit: data.limit || 30,
      offset: data.offset || 0
    },
    crypto: 'weapi',
    cookie: cookies
  });
}

export function likelist(data, cookies = '') {
  return http({
    method: 'POST',
    url: `https://music.163.com/weapi/song/like/get`,
    data: { uid: data.uid },
    crypto: 'weapi',
    cookies: cookies
  });
}

export function detail(data, cookies = '') {
  return http({
    method: 'POST',
    url: `https://music.163.com/weapi/v1/user/detail/${data.uid}`,
    data: {},
    crypto: 'weapi',
    cookies: cookies
  });
}
