const http = require('http'); //recall that this is unsafe and https should be used
import app from './app';

/*const server = http.createServer((req, res) => {
    //node injects req and res into this function
    res.end('This is my server response!')
});*/

//our express app needs to know which port we're on so we say
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

//without defining anything in app expect a 404s

server.listen(process.env.PORT || 3000);
//process.env.PORT is allows node to dynamically pass the port the app is listining on which is not always the port we specify.