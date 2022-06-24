const Koa = require("koa");
const Router = require("@koa/router");

const app = new Koa();
const router = new Router({ prefix: "/api" });

const mongoDB = require("./database");

mongoDB();
// logger
app.use(router.routes());

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

app.on("error", (err) => {
  console.log("Error!", err);
});

router.get("/", (ctx, next) => {
  ctx.body = { message: "Route index" };
});

router.get("/users", (ctx, next) => {
  ctx.body = [
    {
      name: "Van",
    },
    {
      name: "John",
    },
  ];
});

app.listen(3000);
