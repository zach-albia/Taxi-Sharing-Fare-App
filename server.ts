// tslint:disable:no-var-requires
const compression = require("compression");
const express = require("express");
const next = require("next");
const { join } = require("path");
const { parse } = require("url");
// @ts-ignore
const routes = require("./routes");

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = routes.getRequestHandler(app);

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(compression());

    server.get("*", (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      if (pathname === "/service-worker.js") {
        const filePath = join(__dirname, ".next", pathname);
        app.serveStatic(req, res, filePath);
      } else {
        handler(req, res, parsedUrl);
      }
    });

    /* tslint:disable:no-console */
    server.listen(port, err => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on http://localhost:${3000}`);
      console.log(`> PID: ${process.pid}`);
    });
  })
  .catch(e => {
    console.error(e);
  });
