// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  let date = req.params.date_string
  let dateArr = []
  let valid = true
  
  if(date){
    //Have to determine if UNIX string or ISO
    if(!isNaN(date)){
      date = new Date(date)
    }
    //Handle ISO format 8601
    else{
      dateArr = date.split('-')
      //Test for valid date length
      console.log(dateArr)
      console.log(dateArr.length)
      dateArr.length >= 3 & dateArr.lengeth <= 6 ? date = new Date(date) : valid = false
      //Valid Month and Date?
      dateArr[1] > 12 || dateArr[1] < 1 ? valid = false : null
      dateArr[2] > 31 || dateArr[2] < 1 ? valid = false : null
    }
  }
  else{date = new Date()}
  console.log(date)
  let dateObj ={}
  valid ? dateObj = {"unix": date.getTime(), "utc":date.toUTCString()} : 
        dateObj = {"error": "Invalid Date"}
  res.json(dateObj);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});