// Dependencies
var cheerio = require("cheerio");
var request = require("request");
var mongoose = require("mongoose");
var Article = require("../models/Article.js");
mongoose.Promise = global.Promise;

// Export the routes
module.exports = function (app) {

// GET scraped articles to DB and render to user
app.get('/', (req, res) => {
    var articles = [];
    request('https://www.npr.org/sections/politics', (error, response, html) => {
        // console.log(html);
        var $ = cheerio.load(html);
        $(".item-info").each(function (i, element) {
                var title = $(this).children(".title").text();
                var link = $(this).children(".title").children("a").attr("href");
                var summary = $(this).children(".teaser").text();
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

                // Grab every doc in the Articles array
                Article.find()
                    .then( (articles) => {
                        console.log(articles);
                        res.render("index", { articles });
                    })
                    .catch( (err) => {
                        res.send("Error returning articles. Please try again");
                    });

        });        
        console.log(articles);
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
app.get("/saved", (req, res) => {
    Article.find({ "saved": true }).sort('+time').exec(
        function(err, docs) {
            res.render("saved", { savedArticles: docs });
        });
});

// Close routes function
};


// for initial scraping view
//res.render("index", { articles });