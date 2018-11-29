// tslint:disable:no-var-requires
const compression = require("compression");
const express = require("express");
const next = require("next");
import { Application } from "express";
import { Server } from "next";
import { join } from "path";
import { parse } from "url";
import routes from "./routes";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app: Server = next({ dev });
const handler = routes.getRequestHandler(app);

app
  .prepare()
  .then(() => {
    const server: Application = express();

    server.use(compression());
    server.use(handler);

    server.get("*", (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      if (pathname === "/service-worker.js") {
        const filePath = join(__dirname, ".next", pathname);
        app.serveStatic(req, res, filePath);
      } else {
        handler(req, res);
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
