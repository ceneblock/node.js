var uppercase = require('upper-case');
var http      = require('http');
var fs        = require('fs');
http.createServer(function (request, results) {
   if(request.url == "/") {
    fs.readFile('index.html', function(error, data) {
      results.writeHead(200, {'Content-Type': 'text/html'});
      results.write(uppercase(data));
      results.end();
    });
  }
  else {
    fs.readFile(request.url.substring(1), function(error, data) {
      if(!error) {
        results.writeHead(200, {'Content-Type': 'text/html'});
        results.write(uppercase(data));
        results.end();
      }
      else {
        fs.readFile('404.html', function(error, data) {
          results.writeHead(404, {'Content-Type': 'text/html'});
          results.write(uppercase(data));
          results.end();
        });
      }
    });
  }
 
}).listen(8080);
