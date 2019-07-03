import Koa from 'koa';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import body from 'koa-json-body';
import Router from 'koa-router';
// import tough from 'tough-cookie';
import netease from './netease';
const app = new Koa();

const router = new Router();
router.all('/netease/:api/:func', async ctx => {
  console.log(ctx.params);
  const api = netease[ctx.params.api][ctx.params.func];
  console.log(`ctx.headers.cookie:${ctx.headers.cookie}`);
  console.log(`ctx.request.body:${ctx.request.body}`);
  const ret = await api(ctx.request.body, ctx.headers.cookie);
  ctx.set('Set-Cookie', ret.cookies);
  ctx.state = ret.state;
  ctx.body = ret.body;
});

app.use(helmet());
app.use(
  cors({
    credentials: true
  })
);
app.use(body());
app.use(router.routes());
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

export default app;
