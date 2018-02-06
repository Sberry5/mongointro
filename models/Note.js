
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Note schema
var NoteSchema = new Schema({
  note: {
    type: String, 
    article: Article._id
  }
});

var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;