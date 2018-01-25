// Dependencies
var bodyParser = require("body-parser");
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Initialize Express
var app = express();
var port = process.env.PORT || 4000;

// Static js file
app.use(express.static("public"));

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Setup handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./controllers/scraper_controller.js")(app);

// Listener when server is started
app.listen(port, function() {
  console.log("App listening on PORT: " + port);
});