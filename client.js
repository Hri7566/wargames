const net = require('net');


let socket;


const start = () => {
    try {
        socket = net.createConnection({
            port: 40500,
            host: process.argv[2] || '127.0.0.1'
        });
    } catch (err) {
        start();
    }
}

start();

socket.on('connect', () => {
    socket.write('wargames');
});

socket.pipe(process.stdout);
process.stdin.pipe(socket);
