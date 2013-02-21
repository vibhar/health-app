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

// get all items
app.get("/journal", function(request, response){
  response.send({
    journal: journal,
    success: true
  });
});

// create new item
app.post("/journal", function(request, response) {
  console.log(request.body);
  var entry = {"calories": request.body.calories,
              "date": new Date(),
              "target": Number(request.body.price),
              "points": Number(request.body.points) };

  var successful =
      (entry.calories !== undefined) &&
      (entry.target !== undefined) &&
      (entry.points !== undefined);

  if (successful) {
    journal.push(entry);
    writeFile("data.txt", JSON.stringify(journal));
  } else {
    entry = undefined;
  }

  response.send({
    entry: entry,
    success: successful
  });
});

// update one item
// app.put("/listings/:id", function(request, response){
//   // change listing at index, to the new listing
//   var id = request.params.id;
//   var oldItem = listings[id];
//   var item = { "desc": request.body.desc,
//                "author": request.body.author,
//                "date": new Date(),
//                "price": request.body.price,
//                "sold": request.body.sold };
//   item.desc = (item.desc !== undefined) ? item.desc : oldItem.desc;
//   item.author = (item.author !== undefined) ? item.author : oldItem.author;
//   item.price = (item.price !== undefined) ? item.price : oldItem.price;
//   item.sold = (item.sold !== undefined) ? JSON.parse(item.sold) : oldItem.sold;
// 
//   // commit the update
//   listings[id] = item;
// 
//   response.send({
//     item: item,
//     success: true
//   });
// });

// delete entire list
app.delete("/listings", function(request, response){
  listings = [];
  writeFile("data.txt", JSON.stringify(listings));
  response.send({
    listings: listings,
    success: true
  });
});

// delete one item
app.delete("/listings/:id", function(request, response){
  var id = request.params.id;
  var old = listings[id];
  listings.splice(id, 1);
  writeFile("data.txt", JSON.stringify(listings));
  response.send({
    listings: old,
    success: (old !== undefined)
  });
});



app.get("/plan", function(request, response){
  if (journal["plan"])
    console.log("Holy cow");
  response.send({
    plan: journal["plan"],
    success: true
  });
});

app.post("/plan", function(request, response){
  var task = "" + request.body.task;

  var successful = (task !== ""); 

  if (successful) {
    journal["plan"].push(task);
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
      journal["plan"] = [];
    }
    else
      journal = JSON.parse(data);
  });
}

// Finally, initialize the server, then activate the server at port 8889
initServer();
app.listen(8889);
