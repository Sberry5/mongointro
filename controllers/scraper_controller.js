// Dependencies
var cheerio = require("cheerio");
var request = require("request");
var mongoose = require("mongoose");
var Article = require("../models/article.js");
mongoose.Promise = Promise;
//var app = express();

mongoose.Promise = Promise;

// Export the routes

module.exports = function (app) {
// mongoose.connect("mongodb://localhost/week18Populater", {
//   useMongoClient: true
// });


// GET route to render scraped articles page
    app.get("/", function(req, res) {
        Article.find({}).sort('+time').exec(
            function(err, docs) {
                res.render("index", { articles: docs });
            });
        });

app.get("/scraped", function (req, res) {
    var articles = [];
    var promises = [];
    // Load the html
    request("https://wodwell.com/wods/", (function (error, response, html) {    
    var $ = cheerio.load(html);

    $(".wod").each(function (i, element) {
        var title = $(this).children(".wod-title").text();
        var summary = $(this).children(".wod-workout");
        var link = $(this).children("a").attr("href");

        articles.push({ title: title, link: link, summary: summary });
        console.log(error);
        console.log(articles);
    });
    for (var i = 0; i < articles.length; i++) {
        promises.push(saveArticle(articles[i].title, articles[i].link, articles[i].summary));
    }
    Promise.all(promises).then(function() {
        res.redirect("/");

        });
    }));
    console.log(promises);
});

// Close route function
}