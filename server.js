// ====== Required packages ===== //
var bodyParser = require("body-parser");
var express = require("express");
var exphbs = require("express-handlebars");


// Set PORT
var port = process.env.PORT || 4000;

// App will run with express for routing
var app = express();

// Static js file
app.use(express.static("public"));

// Body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Use main handlebars as the default
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Listener when server is started
app.listen(port, function() {
  console.log("App listening on PORT: " + port);
});