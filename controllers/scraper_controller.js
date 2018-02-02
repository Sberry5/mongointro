// Dependencies
var cheerio = require("cheerio");
var request = require("request");
var mongoose = require("mongoose");
var Article = require("../models/Article.js");
mongoose.Promise = global.Promise;

// Export the routes
module.exports = function (app) {

// GET scraped articles to DB and render from DB to user
app.get('/', (req, res) => {
    var articles = [];
    request('https://www.npr.org/sections/politics', (error, response, html) => {
        var $ = cheerio.load(html);
        $(".item-info").each(function (i, element) {
                var title = $(this).children(".title").text();
                var link = $(this).children(".title").children("a").attr("href");
                var summary = $(this).children(".teaser").text();
                var note = [];
                if(title && link && summary) {
                    var articleFormat = {title, link, summary};
    
                    // Creat model instance of article in DB
                    Article
                        .create(articleFormat)
                        .then( () => {
                        console.log("Articles to DB");
                        })
                        .catch( (err) => {
                            console.log("Error returned from DB:", err);
                        });    
                }

            });

                // Render acrticles from DB once scraped
                Article.find()
                    .then( (articles) => {
                        //var thisId = $(this).attr("data-id");
                        console.log(articles);
                        res.render("index", { articles });
                    })
                    .catch( (err) => {
                        res.send("Error returning articles. Please try again");
                    });

        });        
        console.log(articles);
    });

// GET route to render saved articles
app.get("/saved", (req, res) => {
    Article.find({ "saved": true }).sort('+time').exec(
        function(err, docs) {
            res.render("saved", { savedArticles: docs });
        });
});

// Route to update article saved status to true
app.put("/api/article/save/:id", function(req, res) {
    Article.update({ _id: req.body.id }, { $set: { saved: true } }, function(err, docs) {
        if (err) {
            console.log(err);
        }
        res.redirect("/saved");
    });
});

// Route to update article saved status to false
app.put("/api/article/remove/:id", function(req, res) {
    Article.update({ _id: req.body.id }, { $set: { saved: false } }, function(err, docs) {
        if (err) {
            console.log(err);
        }
        res.redirect("/saved");
    });
});

// Close routes function
};