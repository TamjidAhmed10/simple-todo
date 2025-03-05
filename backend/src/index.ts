import { Hono } from "hono";
import route from "./routes/todos";
import { cors } from 'hono/cors'

const app = new Hono();

app.use("*",cors())
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const apiroutes = app.basePath("/api/v1/").route("/", route);

export default app;
export type AppType = typeof apiroutes;
