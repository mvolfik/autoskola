import http from "node:http";
import fs from "node:fs";
import esbuild from "esbuild";

let received = 0;

const server = http.createServer((req, res) => {
  console.error(
    req.method,
    req.url,
    req.headers["user-agent"] ?? "unidentified"
  );

  // @ts-ignore
  if (["/download.ts", "/test.ts"].includes(req.url) && req.method === "GET") {
    esbuild
      .build({
        format: "iife",
        bundle: true,
        write: false,
        sourcemap: "inline",
        entryPoints: ["dataloader" + req.url],
      })
      .then((build) => {
        res
          .writeHead(200, {
            "Content-Type": "text/javascript",
          })
          .end(build.outputFiles[0].text);
      })
      .catch((e) => {
        console.error(e);
        res
          .writeHead(500, {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*",
          })
          .end(e);
      });
    return;
  }

  // @ts-ignore
  if (["/media-bundle.bin", "/data.json"].includes(req.url)) {
    if (req.method === "POST") {
      req.pipe(fs.createWriteStream("src/data" + req.url));

      req.on("end", () => {
        res
          .writeHead(200, {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*",
          })
          .end("ok");
        if (++received === 2) {
          server.close();
        }
      });

      req.on("error", (e) => {
        console.error(e);
        res
          .writeHead(500, {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*",
          })
          .end(e);
      });
      return;
    } else if (req.method === "GET") {
      res.writeHead(200, {
        "Content-Type": req.url?.endsWith(".json")
          ? "application/json"
          : "application/octet-stream",
        "Access-Control-Allow-Origin": "*",
      });
      fs.createReadStream("src/data" + req.url).pipe(res);
      return;
    }
  }

  // else: wrong path or method
  res
    .writeHead(404, {
      "Content-Type": "text/plain",
    })
    .end("404 Not Found");
});

console.log(
  `
To import/refresh list of questions, go to https://etesty2.mdcr.cz/, open browser console (Ctrl+Shift+K in Firefox) and paste the following code:

(()=>{const e=document.createElement("script");e.src="http://localhost:8678/download.ts";document.body.appendChild(e)})()

All of the questions and images will be downloaded and streamed into a local server, which writes them into the data folder.


To generate 1000 tests and check if they only contains questions found in the stored data, use the following piece of code:

(()=>{const e=document.createElement("script");e.src="http://localhost:8678/test.ts";document.body.appendChild(e)})()


Listening on 127.0.0.1:8678`
);

server.listen(8678, "127.0.0.1");
