
// Dependencies
var mongoose = require("mongoose");

// Schema
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        require: true
    },
    notes: [{ cnote: String, articleId: Schema.Types.ObjectId }],
    saved: Boolean,
    time: { type: Date, default: Date.now }
});

// Model
var Article = mongoose.model("Article", articleSchema);

// Export model
module.exports = Article;