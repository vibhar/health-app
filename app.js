// 15-237 Project 2 - health-app

var express = require("express"); // imports express
var app = express();        // create a new instance of express

// imports the fs module (reading and writing to a text file)
var fs = require("fs");
var path = require("path");
// the bodyParser middleware allows us to parse the
// body of a request
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'static')));
// The global datastore for this example
var journal;

// Asynchronously read file contents, then call callbackFn
function readFile(filename, defaultData, callbackFn) {
  fs.readFile(filename, function(err, data) {
    if (err) {
      console.log("Error reading file: ", filename);
      data = defaultData;
    } else {
      console.log("Success reading file: ", filename);
    }
    if (callbackFn) callbackFn(err, data);
  });
}

// Asynchronously write file contents, then call callbackFn
function writeFile(filename, data, callbackFn) {
  fs.writeFile(filename, data, function(err) {
    if (err) {
      console.log("Error writing file: ", filename);
    } else {
      console.log("Success writing file: ", filename);
    }
    if (callbackFn) callbackFn(err);
  });
}

function isSameDay(day1, day2){
  return day1.getMonth() === day2.getMonth() &&
         day1.getYear() === day2.getYear() &&
         day1.getDate() === day2.getDate();
}

app.get("/plan", function(request, response){
  var currDate = new Date();
  var postDate = new Date(journal["plan"]["date"])
  if (!isSameDay(currDate, postDate)){
    console.log("got here");
    journal["plan"]["items"] = [];
    journal["plan"]["date"] = currDate;
    writeFile("data.txt", JSON.stringify(journal));
  }
  response.send({
    plan: journal["plan"]["items"],
    success: true
  });
});

app.get("/entry", function(request, response){
  var currDate = new Date();
  var postDate = new Date(journal["entries"]["date"]);
  if (!isSameDay(currDate, postDate)){
    console.log("got here");
    journal["entries"]["list"] = {};
    journal["entries"]["date"] = currDate;
    writeFile("data.txt", JSON.stringify(journal));
  }
  response.send({
    entries: journal["entries"]["list"],
    success: true
  });
});

app.post("/plan", function(request, response){
  var task = "" + request.body.task;

  var successful = (task !== ""); 

  if (successful) {
    journal["plan"]["items"].push(task);
    writeFile("data.txt", JSON.stringify(journal));
  } 
  else {
    task = undefined;
  }

  response.send({
    task: task,
    success: successful
  });
});

app.post("/entry", function(request, response){
  var entry = "" + request.body.entry;
  console.log("Serverside:" + entry);

  var successful = (entry !== ""); 

  if (successful) {
    var date = new Date();
    journal["entries"]["list"][date] = entry;
    writeFile("data.txt", JSON.stringify(journal));
  } 

  else {
    entry = undefined;
  }
  response.send({
    entry: entry,
    success: successful
  });
});


// This is for serving files in the static directory
app.get("/static/:staticFilename", function (request, response) {
    response.sendfile("static/" + request.params.staticFilename);
});


function initServer() {
  // When we start the server, we must load the stored data
  var defaultList = "";
  readFile("data.txt", defaultList, function(err, data) {
    if (data === ""){
      journal = {};
      journal["plan"] = {};
      journal["plan"]["items"] = [];
      journal["plan"]["date"] = new Date();
      journal["entries"] = {};
      journal["entries"]["date"] = new Date();
      journal["entries"]["list"] = {};
    }
    else
      journal = JSON.parse(data);
  });
}

// Finally, initialize the server, then activate the server at port 8889
initServer();
app.listen(8889);