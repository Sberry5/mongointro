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

// GET scraping/home route
app.get('/', (req, res) => {
    var dbPromises = [];
    var articles = [];
    request('https://www.npr.org/sections/politics', (error, response, html) => {
        // console.log(html);
        var $ = cheerio.load(html);
        $(".item-info").each(function (i, element) {
            articles.push({
                title: $(this).children(".title").text(),
                link: $(this).children(".title").children("a").attr("href"),
                summary: $(this).children(".teaser").text()
            });
        });
        res.render("index", { articles });        
        console.log(articles);
    });
});

// Function to save article to the DB
$("#saveButton").click(function saveArticleToDB(title, link, summary) {
    return new Promise(function(resolve, reject) {
        Article.find({ "title": title },
            function(err, docs) {
                if (docs.length === 0) {
                    var newArticle = new Article({
                        title: title,
                        link: link,
                        summary: summary,
                        note: [],
                        saved: false
                    });
                    newArticle.save(function(err, newArticles) {
                        if (err) return console.error(err);
                    });
                }
            });
    });
});

// GET route to render saved articles from DB to saved articles page
app.get("/saved", function(req, res) {
    Article.find({ "saved": true }).sort('+time').exec(
        function(err, docs) {
            res.render("saved", { savedArticles: docs });
        });
});

// Close routes function
}