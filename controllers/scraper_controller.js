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
                        console.log(articles);
                        res.render("index", { articles });
                    })
                    .catch( (err) => {
                        res.send("Error returning articles. Please try again");
                    });

        });        
        console.log(articles);
    });



// View saved articles
app.get('/savedArticles', function saveArticleToDB (title, link, summary) {
    return new Promise(function(resolve, reject) {
        Article.find({ "title": title },
            function(err, docs) {
                if (docs.length === 0) {
                    var newArticle = new Article({
                        title: title,
                        link: link,
                        summary: summary,
                        note: [],
                        saved: true
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


// Route to update article saved status to true
app.put("/api/article/save/:id", function(req, res) {
    Article.update({ _id: req.body.id }, { $set: { saved: true } }, function(err, docs) {
        if (err) {
            console.log(err);
        }
        res.redirect("/saved");
    });
});

// Close routes function
};