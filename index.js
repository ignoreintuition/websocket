const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  var intervalID = setInterval(myCallback, 1000);

  function myCallback() {
    ws.send(JSON.stringify({
      "gender": (Math.floor(Math.random()*2) == 1) ? "Male" : "Female",
      "age": Math.floor(Math.random()*100)
    }));
  }

});
