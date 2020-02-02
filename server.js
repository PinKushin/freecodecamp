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
  res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  //passing in parameter/argument
  let dString = req.params.date_string;
  console.log(dString);
  //reg exp to test for 5 or more digits indicating unix time
  let unixRe = new RegExp("\\d{5,}", "gi");
  //test for unix time
  if (unixRe.test(dString)) {
    //change argument to an int so it can be converted to UTC
    let dInt = parseInt(dString, 10);
    //console.log(dInt + "\n")
    //return unix time as an int and convert to UTC time
    res.json({ unix: dString, utc: new Date(dInt).toUTCString() });
  }
  ///handle invalid arguments
  let dObj = new Date(dString);
  console.log(dObj + "\n");
  if (dObj == "Invalid Date") {
    res.json({unix: null, utc: "Invalid Date"});
    
  } else {
    res.json({unix: dObj.valueOf(), utc: dObj.toUTCString() });
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
