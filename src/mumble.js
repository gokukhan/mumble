const { mumbleConfig } = require('../config/mumble.js');
const tcp = require('./tcp_server.js');
const wss = require('./web_sockets_server.js');

// start the http + websocket server
wss.startWebSocketServer(mumbleConfig.webSockets.port);

// tracking, but we don't want to send any messages yet
const tracking = tcp.createTCPServer(mumbleConfig.tracking.port, []);

tracking.listen(mumbleConfig.tracking.port, () => {
  console.log('server listening to %j', tracking.address());
});

// potential
const potential = tcp.createTCPServer(mumbleConfig.potential.port, wss.webSocketClients);
potential.listen(mumbleConfig.potential.port, () => {
  console.log('server listening to %j', potential.address());
});
