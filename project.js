const raspi = require('raspi');
const Serial = require('raspi-serial').Serial;
var express = require('express');
var app = express();
var fs = require ('fs');
var http = require('http').Server(app);
var io = require('socket.io')(http);



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('command is: ' + msg);
    	var arr = msg.split("");
      var serial = new Serial();
      function sendserial1() {
      serial.write(arr[1]);
      };
      function sendserial2() {
      serial.write(arr[2]);
      };
      serial.open(() => {
        serial.write(arr[0]);
        setTimeout(sendserial1, 100);
        setTimeout(sendserial2, 100);
      });
  });
});

http.listen(3000, function(){
  console.log('Server is up. Listening on port 3000');
});