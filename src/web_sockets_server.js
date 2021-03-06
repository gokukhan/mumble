const http = require('http');
const WebSocket = require('ws');

const clients = [];

exports.webSocketClients = clients;

exports.startWebSocketServer = (port) => {
  const server = http.createServer();
  const wss = new WebSocket.Server({ server });

  wss.on('connection', function connection(ws, req) {
    console.log('Incoming connection from %s', req.connection.remoteAddress);
    clients.push(ws);

    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    });

    ws.on('close', function() {
      console.log('%s disconnected', ws._socket.remoteAddress);
      const id = clients.indexOf(ws);
      delete clients[id];
    });
  });

  server.listen(port, () => console.log('HTTP Server is listening on port %s ', port));
};
