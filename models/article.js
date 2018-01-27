
// Dependencies
var mongoose = require("mongoose");

// Schema
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: {
        type: String,
    },

    link: {
        type: String,
    },
    summary: {
        type: String,
    },
    notes: [{ cnote: String, articleId: Schema.Types.ObjectId }],
    saved: Boolean,
    time: { type: Date, default: Date.now }
});

// Model
var Article = mongoose.model("Article", articleSchema);

// Export model
module.exports = Article;