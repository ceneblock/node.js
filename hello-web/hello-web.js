var http = require('http');
var date = require('./date');

http.createServer(function(request, results) {
  results.writeHead(200, {'Content-Type': 'text/plain'});
  results.write("Requested URL " + request.url + "\n");
  results.write("The date is: " + date.myDateTime() + "\n");
  results.end('Hello World');
}).listen(8080);
