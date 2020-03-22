

var http = require("http");
var fs = require('fs');
http
  .createServer(function(req, res) {
var body = `
<html>
<head>
<meta http-equiv="Content-Type" content="text/html" charset="UTF-8"/>
<style>

    h3, p {
      text-align: center;
      font-weight: 700;
    }
    .container {
      width: 60%;
      margin: 0 auto;
      background: #ccc;
      padding: 20px;
    }
    textarea {
      width: 100%;
    }
    .btn-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn {
      margin: 20px 0;
      padding: 10px 20px;
      background: blue;
      border: none;
      color: #fff;
      cursor: pointer;
    }

    
</style>
</head>

<body>
    <div class="container">
      <h1>Start.ng Node Js Task</h1>
      <h3>Please enter a message below: </h3>
      <form action="/message" method="post">
          <textarea name="message" rows="3"></textarea>
          <div class="btn-container">
            <input class="btn" type="submit" value="Submit text"/>
          </div>
      </form>
    </div>
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