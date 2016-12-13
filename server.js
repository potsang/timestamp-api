var express = require('express');
var dateFormat = require('dateformat');
var app = express();

function getInstruction() {
  var howToPage = "<h2>" + "Example usage:" + "</h2>";
  howToPage += "<p>";
  howToPage += "https://camper-api-project-potsang.c9users.io/December 15, 2015";
  howToPage += "</p>";
  howToPage += "<p>";
  howToPage += "https://camper-api-project-potsang.c9users.io/1450137600";
  howToPage += "</p>";
  
  return  howToPage;
}

app.get('/', function (req, res) {
  res.send(getInstruction());
});

app.get(/^\/\d+$/, function (req, res) {
  var unixTime = req.url.slice(1);
  var date = new Date(unixTime * 1000);
  var result = {
  "unix": date.getTime() / 1000,
  "natural": dateFormat(date, "mmmm d, yyyy")
  }
  res.send(result);
});


app.get(/^\/\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)(%20)*(0[1-9]|[1-2][0-9]|3[01])(%20)*[,](%20)*((19[7-9]\d|20\d{2})|\d{2})$/, function (req, res) {
  var dateStr = decodeURI(req.url).slice(1);
  var date = new Date(dateStr);
  var result = {
  "unix": date.getTime() / 1000,
  "natural": dateFormat(date, "mmmm d, yyyy")
  }
  res.send(result);
});

app.get(/^\/[\w]*[\D][\w]*/, function (req, res) {

  var result = {
  "unix": null,
  "natural": null
  }
  res.send(result);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});