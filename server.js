// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const moment = require('moment')

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
  let valid = true
  
  //Process if date is provided
  if(date){
    console.log(typeof(date))
    console.log(isNaN(date))
    //Process if to determine if UNIX string 
    if(!isNaN(date)){
      date = new Date(date)
    }
    //Handle ISO format 8601
    else{
      let IsoTrue = moment(date, moment.ISO_8601, true).isValid()
      IsoTrue ?  date = new Date(date) : valid = false
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