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

// GET route to render scraped articles page
// app.get("/", function(req, res) {
//     //Article.find({}).sort('+time').exec(
//         function(err, docs) {
//             res.render("index", { articles: docs });
//         });
// });


// Scraping route
app.get('/scraped', (req, res) => {
    var articles = [];
    request('https://www.npr.org/sections/politics', (error, response, html) => {
        // console.log(html);
        var $ = cheerio.load(html);
        $("h2").each(function (i, element) {
            articles.push({
                title: $(this).children().text(),
                link: $(this).children().attr("href"),
                summary: $(this).children(".teaser").attr("href")
            });
        });
        res.render("index", { articles });        
        console.log(articles);
    });
});

// Close routes function
}