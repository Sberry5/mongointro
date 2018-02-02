$(document).ready(function () {

// Function to save article to the DB
$("#saveButton").click(function (title, link, summary) {
    console.log("save button clicked");
    return new Promise(function(resolve, reject) {
        Article.find({ "title": title },
            function(err, docs) {
                if (docs.length === 0) {
                    var newArticle = new Article({
                        title: title,
                        link: link,
                        summary: summary,
                        note: $("#userNote").val(),
                        saved: true
                    });
                    newArticle.save(function(err, newArticles) {
                        if (err) return console.error(err);
                    });
                };
            });
    });
});

$("#saveButton").click(function () {
    var thisId = $(this).attr("data-id");
    
};

});