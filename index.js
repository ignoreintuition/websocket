const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 8080
});

wss.on('connection', function connection(ws) {
  var deviceId = null;
  var deviceStatus = deviceStatus || null;
  ws.on('message', function incoming(d) {
    console.log('received: %s', d);
    deviceId = d;
    deviceStatus = (deviceStatus == "On") ? "Off" : "On";
  });

  var intervalID = setInterval(myCallback, 1000);

  function myCallback() {
    getTemp(deviceId).then((t)=>{
      ws.send(JSON.stringify({
        "DeviceID": deviceId,
        "State": deviceStatus,
        "Temperature": t
      }))

    })
  }
  function getTemp(d) {
    return new Promise((resolve, reject) => {
      let t = null;
      if (deviceStatus == "On")
      t = Math.floor(Math.random()*100)/2 + 50;
      else t = "N/A";
      resolve(t);
    })
  }
});
