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
                        saved: true
                    });
                    newArticle.save(function(err, newArticles) {
                        if (err) return console.error(err);
                    });
                }
            });
    });
});