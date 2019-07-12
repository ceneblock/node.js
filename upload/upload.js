var http   = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = '/home/ceneblock/dev/node.js/upload/' + files.filetoupload.name;
      ///renameFile won't work on my setup, because /tmp and /home are on
      //seperate partitions, so we'll just copy the file; although this means
      //the old file will still exist.
      fs.copyFile(oldpath, newpath, (err) => {
          if (err) throw err;
      });
      ///Now we'll delete the old file.
      fs.unlink(oldpath, (err) => {
          if (err) throw err;
      });
     res.write(oldpath + " was copied to " + newpath + "\n");
     res.end();
});
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080); 
