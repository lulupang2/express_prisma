import { Context } from 'koa';

const Koa = require('koa');

const app = new Koa();

app.use((ctx: Context) => {
  ctx.body = 'hello, Jacob!';
});

app.listen(555, () => {
    console.log('Server running at: http://localhost:555')

});
