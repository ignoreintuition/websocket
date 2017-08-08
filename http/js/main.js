var tempData = [];

var svg = d3.select("#graph").append("svg")
  .attr("height", 200)
  .attr("width", 500)

// Retrieve the template data from the HTML (jQuery is used here).
var template = $('#deviceProperties').html();

// Compile the template data into a function
var templateScript = Handlebars.compile(template);

// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');

// Connection opened
socket.addEventListener('open', function(event) {
  socket.send("1A37F239BC1");
});

// Listen for messages
socket.addEventListener('message', function(event) {
  var d = JSON.parse(event.data)
  var context = {
    'deviceId': d.DeviceID,
    'state': d.State,
    'temp': d.Temperature
  };
  if (d.Temperature != 'N/A') {
    tempData.push(d.Temperature);
    if (tempData.length > 35)
      tempdata = tempData.splice(0, 1);
    render();
  }

  var html = templateScript(context);
  $("#entry").html(html);

});

document.querySelector('#toggleState').addEventListener('click', function() {
  socket.send("1A37F239BC1");
})
