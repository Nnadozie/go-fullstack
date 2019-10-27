/*const http = require('http'); //recall that this is unsafe and https should be used
const app = require('./app.js');
/*const server = http.createServer((req, res) => {
    //node injects req and res into this function
    res.end('This is my server response!')
});*/

//our express app needs to know which port we're on so we say
/*app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

//without defining anything in app expect a 404s
*/
//process.env.PORT is allows node to dynamically pass the port the app is listining on which is not always the port we specify.

const http = require('http');
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
