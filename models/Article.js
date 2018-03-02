
// Dependencies
var mongoose = require("mongoose");

// Schema (does not allow duplicates based on article title)
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: { type: String, 
            unique: true 
        },
    link: String,
    summary: String,
    saved: { type: Boolean, 
            default: 0 
        },
    time: { type: Date, 
            default: Date.now 
        },
    note: [{ type: Schema.Types.String, 
        ref: 'Note'
    }]
});

// Model
var Article = mongoose.model('Article', articleSchema);

// Export model
module.exports = Article;
//here is a dang change for you, github