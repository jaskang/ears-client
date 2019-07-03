import axios from 'axios';
import encrypt from './crypto';
import querystring from 'querystring';
// import PacProxyAgent from 'pac-proxy-agent';
import zlib from 'zlib';

// request.debug = true // 开启可看到更详细信息

const chooseUserAgent = ua => {
  const userAgentList = [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89;GameHelper',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1',
    'Mozilla/5.0 (iPad; CPU OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:46.0) Gecko/20100101 Firefox/46.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:46.0) Gecko/20100101 Firefox/46.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/13.10586'
  ];
  let index = 0;
  if (typeof ua == 'undefined')
    index = Math.floor(Math.random() * userAgentList.length);
  else if (ua === 'mobile') index = Math.floor(Math.random() * 7);
  else if (ua === 'pc') index = Math.floor(Math.random() * 5) + 8;
  else return ua;
  return userAgentList[index];
};

const createRequest = ({
  method = 'get',
  url = '',
  data = {},
  cookies = '',
  ua = '',
  crypto = 'weapi'
}) => {
  return new Promise((resolve, reject) => {
    let headers = { 'User-Agent': chooseUserAgent(ua) };
    if (method.toUpperCase() === 'POST')
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    if (url.includes('music.163.com'))
      headers['Referer'] = 'https://music.163.com';
    // headers['X-Real-IP'] = '118.88.88.88'

    if (typeof cookies === 'object') {
      headers['Cookie'] = Object.keys(cookies)
        .map(
          key =>
            encodeURIComponent(key) + '=' + encodeURIComponent(cookies[key])
        )
        .join('; ');
    } else if (cookies) {
      headers['Cookie'] = cookies;
    }

    if (crypto === 'weapi') {
      let csrfToken = (headers['Cookie'] || '').match(/_csrf=([^(;|$)]+)/);
      // console.log(`headers:${JSON.stringify(headers)}`);
      data.csrf_token = csrfToken ? csrfToken[1] : '';
      // console.log(`csrf_token:${data.csrf_token}`);
      data = encrypt.weapi(data);
      url = url.replace(/\w*api/, 'weapi');
      // console.log(`data:${JSON.stringify(data)}`);
    } else if (crypto === 'linuxapi') {
      data = encrypt.linuxapi({
        method: method,
        url: url.replace(/\w*api/, 'api'),
        params: data
      });
      headers['User-Agent'] =
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36';
      url = 'https://music.163.com/api/linux/forward';
    } else if (crypto === 'eapi') {
      const csrfToken = cookies['__csrf'] || '';
      const header = {
        osver: cookies.osver, //系统版本
        deviceId: cookies.deviceId, //encrypt.base64.encode(imei + '\t02:00:00:00:00:00\t5106025eb79a5247\t70ffbaac7')
        appver: cookies.appver || '6.1.1', // app版本
        versioncode: cookies.versioncode || '140', //版本号
        mobilename: cookies.mobilename, //设备model
        buildver:
          cookies.buildver ||
          Date.now()
            .toString()
            .substr(0, 10),
        resolution: cookies.resolution || '1920x1080', //设备分辨率
        __csrf: csrfToken,
        os: cookies.os || 'android',
        channel: cookies.channel,
        requestId: `${Date.now()}_${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(4, '0')}`
      };
      if (cookies.MUSIC_U) header['MUSIC_U'] = cookies.MUSIC_U;
      if (cookies.MUSIC_A) header['MUSIC_A'] = cookies.MUSIC_A;
      headers['Cookie'] = Object.keys(header)
        .map(
          key => encodeURIComponent(key) + '=' + encodeURIComponent(header[key])
        )
        .join('; ');
      data.header = header;
      data = encrypt.eapi(url, data);
      url = url.replace(/\w*api/, 'eapi');
    }

    const settings = {
      method: method,
      url: url,
      headers: headers,
      data: querystring.stringify(data)
    };
    // console.log(headers);

    if (crypto === 'eapi') settings.responseType = 'arraybuffer';

    // if (/\.pac$/i.test(options.proxy)) {
    //   settings.httpAgent = new PacProxyAgent(options.proxy);
    // } else {
    //   settings.proxy = options.proxy;
    // }

    const answer = { status: 500, body: {}, cookies: '' };
    axios(settings)
      .then(function(resp) {
        answer.cookies = (resp.headers['set-cookie'] || []).map(x =>
          x.replace(/\s*Domain=[^(;|$)]+;*/, '')
        );
        try {
          if (crypto === 'eapi') {
            zlib.unzip(resp.data, function(err, buffer) {
              const _buffer = err ? resp.data : buffer;
              try {
                try {
                  answer.body = JSON.parse(encrypt.decrypt(_buffer).toString());
                  answer.status = answer.body.code || resp.status;
                } catch (e) {
                  answer.body = JSON.parse(_buffer.toString());
                  answer.status = resp.status;
                }
              } catch (e) {
                answer.body = _buffer.toString();
                answer.status = resp.status;
              }
              answer.status =
                100 < answer.status && answer.status < 600
                  ? answer.status
                  : 400;
              if (answer.status === 200) resolve(answer);
              else reject(answer);
            });
            return false;
          } else {
            answer.body = JSON.parse(resp.data);
            answer.status = answer.body.code || resp.status;
          }
        } catch (e) {
          answer.body = resp.data;
          answer.status = resp.status;
        }

        answer.status =
          100 < answer.status && answer.status < 600 ? answer.status : 400;
        if (answer.status == 200) resolve(answer);
        else reject(answer);
      })
      .catch(function(err) {
        answer.status = 502;
        answer.body = { code: 502, msg: err.stack };
        reject(answer);
      });
  });
};

export default createRequest;
