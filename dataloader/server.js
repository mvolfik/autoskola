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

  if (req.url === "/run.js") {
    esbuild
      .build({
        format: "iife",
        bundle: true,
        write: false,
        entryPoints: ["dataloader/download.ts"],
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

  if (
    // @ts-ignore
    !["/media-bundle.bin", "/data.json"].includes(req.url) ||
    req.method !== "POST"
  ) {
    res
      .writeHead(404, {
        "Content-Type": "text/plain",
      })
      .end("404 Not Found");
    return;
  }

  // else: it's an upload!
  req.pipe(fs.createWriteStream("public" + req.url));

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
});

console.error(
  "Go to https://etesty2.mdcr.cz/, open browser console (Ctrl+Shift+K in Firefox) and paste the following code:"
);
console.log(
  `(()=>{const e=document.createElement("script");e.src="http://localhost:8678/run.js";document.body.appendChild(e)})()`
);
console.error(
  "All of the questions and images will be downloaded and streamed into a local server, which writes them into the data folder."
);
console.error("Listening on 127.0.0.1:8678");

server.listen(8678, "127.0.0.1");
