// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

//Date and time endpoint
app.get("/api/timestamp", (req, res) => {
  res.json({ Unix: Date.now(), UTC: Date() });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  //passing in parameter/argument
  let dString = req.params.date_string;
  //reg exp to test for 5 or more digits indicating unix time
  let unixRe = /\d{5,}/;
  //test for unix time
  if (unixRe.test(dString)) {
    //change argument to an int so it can be converted to UTC
    let dInt = parseInt(dString);
    //return unix time as an int and convert to UTC time
    res.json({ Unix: dString, UTC: new Date(dInt).toUTCString() });
  }
  ///handle invalid arguments
  let dObj = new Date(dString);
  if (dObj.toString == "Invalid Date") {
    res.json({Unix: null, UTC: "Invalid Date"});
  } else {
    res.json({Unix: dObj.valueOf(), UTC: dObj.toUTCString() });
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
