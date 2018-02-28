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
                var saved = false;
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
                        var thisId = $(this).attr("data-id");
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
app.get("/savedArticles", (req, res) => {
    Article
    .find({ "saved": true })
    // .sort({time: -1})
    .then((docs) => {
        res.render("saved", { savedArticles: docs });
    })
    .catch((err)=> {
        console.log(err)
    })
});


// Save an article
app.put("/savedArticles/:id", (req, res) => {
    Article.findOneAndUpdate({"_id": req.body._id}, {$set: {"note": req.body.note, saved: true}})
        .then((document) => {
            console.log('your document saved scucessfully')
        }, (err) => {
            console.log(`you had an error ${err}`)
        })
});
};