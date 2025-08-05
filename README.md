# Log-File-Watcher-
Node.js + Socket.IO Log File Watcher

# Real-Time Log File Watcher using Node.js and Socket.IO

This is a simple Node.js application that watches a log file (`logfile.log`) and streams new log lines to connected clients in real-time using WebSockets (`Socket.IO`).

## Features

- Monitors a log file and sends newly appended content to clients
- Uses `fs.watchFile()` for file changes and `readline` for line-by-line reading
- Real-time updates via Socket.IO
- Basic client page to display logs in the browser

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14+ recommended)

## Installation

1. Clone the repository or copy the files into a directory:

   ```bash
   git clone https://github.com/your-username/log-watcher.git
   cd log-watcher

2. Install dependencies:

npm install express socket.io

3. Create or update a logfile.log in the root of the project. This is the file that will be watched for updates.

## Usage
Run the server:

node server.js

Open your browser and go to:

http://localhost:3000
You should see a live stream of log entries from logfile.log.

## File Structure
├── server.js        # Main Node.js server file
├── client.html      # Front-end client to display logs
├── logfile.log      # Log file being watched
└── README.md        # This file

## How It Works
When a client connects via the browser, the server begins reading from the current end of the log file.

The server watches for new data appended to the file using fs.watchFile.

New log content is streamed to the client in real-time using Socket.IO events (log_update).

## Notes
If logfile.log doesn't exist or is empty, the app will start watching but nothing will appear until content is written.

Make sure logfile.log has read permissions.
