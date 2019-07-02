import Koa from 'koa';
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

export default app;
