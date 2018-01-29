// Dependencies
var bodyParser = require("body-parser");
var express = require("express");
var logger = require("morgan");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

// Require models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

// Scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Access ES6 promises for mongoose
mongoose.Promise = global.Promise;

// Initialize Express
var app = express();
var port = process.env.PORT || 4000;

// Database setup with Mongo
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/mongoHeadlines");
var db = mongoose.connection;
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

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