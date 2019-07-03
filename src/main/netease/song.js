import http from './../util/http';

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
