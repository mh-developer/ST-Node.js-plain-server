import { createReadStream } from "fs";
import { createServer } from "http";
import { extname } from "path";

var mime = {
    html: "text/html",
    txt: "text/plain",
    css: "text/css",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    svg: "image/svg+xml",
    js: "application/javascript",
};

createServer((req, res) => {
    if (req.url.startsWith("/funkcionalnosti-odjemalca")) {
        httpResponse(res, "./files/index.html");
    } else if (req.url.startsWith("/posebnosti")) {
        httpResponse(res, "./files/posebnosti.txt");
    } else if (req.url.startsWith("/use-case.png")) {
        httpResponse(res, "./files/primeri_uporabe_HideNSneak.png");
    } else {
        res.write(`
            <h1>Welcome!! We are HideNSneak</h1>
            <a href="/funkcionalnosti-odjemalca">Funkcionalnosti odjemalca</a><br>
            <a href="/posebnosti">Posebnosti</a>
        `);
        res.end();
    }
}).listen(3000);

function httpResponse(res, file) {
    const type = mime[extname(file).slice(1)];
    const stream = createReadStream(file);
    stream.on("open", function () {
        res.setHeader("Content-Type", type);
        stream.pipe(res);
    });
    stream.on("error", function () {
        res.setHeader("Content-Type", "text/plain");
        res.statusCode = 400;
        res.end("Not found");
    });
    stream.on("end", () => {
        res.end();
    });
}
