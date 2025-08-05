const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');
const readline = require('readline');

const LOG_FILE = './logfile.log'; // Log file location on your system
const PORT = 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve client HTML for demo
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client.html');
});

io.on('connection', (socket) => {
  console.log('New client connected');

  // Start tailing from end of file
  const fileStream = fs.createReadStream(LOG_FILE, { encoding: 'utf8', start: fs.statSync(LOG_FILE).size });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  rl.on('line', (line) => {
    socket.emit('log_update', line);
  });

  // Watch for new data
  fs.watchFile(LOG_FILE, (curr, prev) => {
    if (curr.size > prev.size) {
      const stream = fs.createReadStream(LOG_FILE, {
        encoding: 'utf8',
        start: prev.size,
        end: curr.size,
      });

      stream.on('data', (chunk) => {
        socket.emit('log_update', chunk);
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    rl.close();
    fs.unwatchFile(LOG_FILE);
  });
});

server.listen(PORT, () => {
  console.log(`Log watcher server running at http://localhost:${PORT}`);
});