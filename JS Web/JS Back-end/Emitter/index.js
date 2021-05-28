// const stream = require('stream');

// function createReadableStream(data) {
//     let counter = 0;
//     const rs = stream.Readable({
//         read(size) {
//             const item = data[counter++] || null;
//             this.push(item ? Buffer.from(item.toString()) : null);
//         }
//     })
//     return rs;
// }

// function createWritableStream() {
//     let data;

//     const ws = stream.Writable({
//         write(chunk, enc, next) {
//             data = !data ? chunk : Buffer.concat([data, chunk]);
//             next();
//         },
//         final() {
//             console.log(data);
//         }
//     })
//     return ws;
// }

// const rs = createReadableStream([1, 2, 3, 4, 5, 6, 7])
// const ws = createWritableStream();

// rs.pipe(ws);




const config = require('./config.json');
const http = require('http');
const fs = require('fs');
const url = require('url');

const stream = require('stream');
const zlib = require('zlib');

const zips = zlib.createGzip();

function createUpperCaseStream() {
    const ts = stream.Transform({
        transform(chunk, enc, next) {
            // this.push()
            chunk = Buffer.from(chunk.toString().toUpperCase());
            next(null, chunk);
        }
    })
    return ts;
}
const us = createUpperCaseStream();

http.createServer(function (req, res) {

    const path = url.parse(req.url).pathname;
    if (path === '/') {
        const rs = fs.createReadStream('./text.txt', { highWaterMark: 10 });
        rs.on('data', function (chunk) {
            // console.log(chunk);
        });

        rs.pipe(us).pipe(zips).pipe(res);
        // fs.readFile('./text.txt', { encoding: 'utf-8' }, function (err, content) {
        //     res.end(content.toUpperCase());
        // })
    } else if (path === '/test') {
        res.end('Hello!');
    }

}).listen(config.port, () => console.log('Server listening on port 7800...'));