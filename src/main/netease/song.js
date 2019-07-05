import http from './../util/http';
import crypto from 'crypto';

export function detail(data, cookies = '') {
  return http({
    method: 'POST',
    url: `https://music.163.com/weapi/v3/song/detail`,
    data: {
      c: '[' + data.ids.map(id => '{"id":' + id + '}').join(',') + ']',
      ids: '[' + data.ids.join(',') + ']'
    },
    cookies: cookies
  });
}
export function url(data, cookies = '') {
  if (cookies.indexOf('MUSIC_U') === -1) {
    cookies =
      cookies + '; _ntes_nuid=' + crypto.randomBytes(16).toString('hex');
  }
  return http({
    method: 'POST',
    url: `https://music.163.com/weapi/song/enhance/player/url`,
    data: {
      ids: '[' + data.id + ']',
      br: parseInt(data.br || 999000)
    },
    crypto: 'weapi',
    cookies: cookies
  });
}
