

var http = require("http");
var fs = require('fs');
http
  .createServer(function(req, res) {
var body = `
<html>
<head>
<meta http-equiv="Content-Type" content="text/html" charset="UTF-8"/>
</head>

<body>
    <form action="/message" method="post">
        <textarea name="message" rows="5" cols="60"></textarea>
        <input type="submit" value="Submit text"/>
    </form>
</body>
</html>`;
if (req.url =='/') {
  res.writeHead(200,{"Content-Type" : "text/html"});
  res.write(body);
  
  res.end();
}


if (req.url = '/message'){
  let text;
  // console.log(req.url);
  req.on('data', chunk => {
    text = chunk.toString().split('=')[1].split('+').join(' ');
    
    fs.appendFile('message.txt', text, function (err) {
      if (err) throw err;
      console.log('It\'s saved! in same location.');
      res.writeHead(200,{"Content-Type" : "text/html"});
      // var myText = req.query.message;
      res.write('message saved successfuly');
      res.end();
  });
  });

}
  })
  .listen(8080);