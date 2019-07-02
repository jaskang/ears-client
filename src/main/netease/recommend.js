export function resource(query, request) {
  return request(
    'POST',
    `https://music.163.com/weapi/v1/discovery/recommend/resource`,
    {},
    { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
  );
}
