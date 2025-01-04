// const http=require('http').createServer();
// const io=require('socket.io')(http,{
//     cors:{origin:"*"}
// });

// io.on('connection',(socket)=>{
//     console.log("user is connected")
//     socket.on('message',(message)=>{
//         console.log(message);
//         io.emit('message',`${socket.id.substr(0,2)} said ${message}`)
//     });

// });

// http.listen(8080,()=>{ console.log("server is running under 8080 port")})




const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer((req, res) => {
    // Serve a simple HTML file
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const io = require('socket.io')(server, {
    cors: { origin: '*' },
});

io.on('connection', (socket) => {
    console.log('user is connected');
    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
    });
});

server.listen(8080,'0.0.0.0', () => {
    console.log('server is running under 8080 port');
});         