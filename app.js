const http = require("http");
const fs = require("fs");

const htmlFiles = fs
  .readdirSync("./pages", { withFileTypes: true })
  .map((file) => file.name);
const home = "/";
let errPage;
fs.readFile("./pages/404.html", (err, html) => {
  errPage = html;
});
const server = http.createServer((req, res) => {
  let fileName = req.url;

  fileName = fileName === homepage ? "index" : fileName.slice(1);
  if (htmlFiles.includes(`${fileName}.html`)) {
    fileName += ".html";
  }

  fs.readFile(`./pages/${fileName}`, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(errPage);
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
});

server.listen(3000, () => {
  console.log("Server started! --- listening on port 3000");
});
