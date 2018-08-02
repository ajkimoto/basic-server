const app = require('./app')();
const PORT = 5000;
const httpServer = require('http').createServer(app);

// handle server exit
function handleExit() {
  console.info('closing server');
  httpServer.close((err) => {
    if (err) {
      console.error('error on server close:', err);
    }
    console.info('server process exiting');
    process.exit(0);
  });
}

process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);

// start the server
httpServer.listen(PORT, () => {
  console.info({
    address: httpServer.address(),
  }, 'server started');
});


module.exports = httpServer;