var app = require('http').createServer(handler),
    io  = require('socket.io')(app);
    fs  = require('fs'),

    sockets = [];

app.listen(80);



function handler (req, res) {
  
  
  function cb (err, data) {
  
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  
  }
  

  fs.readFile(__dirname + '/index.html', cb);

}

io.on('connection', function (socket) {
  
  sockets.push(socket);
  
  socket.on('keydown', function (key) {
    
    var len = sockets.length,
        i   = 0;

    for (; i < len; i += 1) {
      
      if (sockets[i] !== socket) {
        sockets[i].emit('update', key);
      }
    
    }

    console.log('Key received: ' + key);
  
  });

});